import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const WIDTH = 1200;
const HEIGHT = 630;
const PORT = Number.parseInt(process.env.OG_PORT ?? '4173', 10);
const HOST = process.env.OG_HOST ?? '127.0.0.1';
const BASE_URL = process.env.OG_BASE_URL ?? `http://${HOST}:${PORT}`;
const MAIN_OUTPUT_PATH = path.resolve(process.env.OG_OUTPUT ?? 'static/og-image.jpg');
const KNOWN_VARIANTS = ['premium', 'techy', 'playful', 'engineer'];

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseVariants() {
	const raw = process.env.OG_VARIANTS ?? process.env.OG_VARIANT ?? KNOWN_VARIANTS.join(',');
	const parsed = raw
		.split(',')
		.map((entry) => entry.trim().toLowerCase())
		.filter((entry) => KNOWN_VARIANTS.includes(entry));

	return [...new Set(parsed.length > 0 ? parsed : ['premium'])];
}

function resolveBrowserPath() {
	const envPath =
		process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH || process.env.BROWSER_PATH;
	if (envPath && existsSync(envPath)) {
		return envPath;
	}

	const candidates = [
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		'/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
		'/Applications/Chromium.app/Contents/MacOS/Chromium',
		'/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
		'/usr/bin/google-chrome-stable',
		'/usr/bin/google-chrome',
		'/usr/bin/chromium-browser',
		'/usr/bin/chromium'
	];

	for (const candidate of candidates) {
		if (existsSync(candidate)) {
			return candidate;
		}
	}

	return null;
}

async function waitForServer(url, options = {}) {
	const { timeoutMs = 45_000, checkAlive } = options;
	const start = Date.now();

	while (Date.now() - start < timeoutMs) {
		if (checkAlive) {
			checkAlive();
		}
		try {
			const response = await fetch(url, { method: 'GET' });
			if (response.ok) {
				return;
			}
		} catch {
			// Keep retrying until timeout.
		}
		await sleep(350);
	}

	throw new Error(`Timed out waiting for ${url}`);
}

function getVariantUrl(variant) {
	return `${BASE_URL}/og/product?variant=${encodeURIComponent(variant)}`;
}

function getVariantOutputPath(variant) {
	return path.resolve(`static/og-image-${variant}.jpg`);
}

async function main() {
	const variants = parseVariants();
	const defaultVariant = (process.env.OG_DEFAULT_VARIANT ?? 'engineer').toLowerCase();

	let puppeteer;
	try {
		({ default: puppeteer } = await import('puppeteer-core'));
	} catch {
		throw new Error(
			'Missing dependency: puppeteer-core. Run `npm install -D puppeteer-core` and retry.'
		);
	}

	const browserPath = resolveBrowserPath();
	if (!browserPath) {
		throw new Error(
			'Missing browser binary. Install Chrome/Chromium or set PUPPETEER_EXECUTABLE_PATH to a browser executable.'
		);
	}

	await mkdir(path.dirname(MAIN_OUTPUT_PATH), { recursive: true });

	const devServer = spawn(
		'npm',
		['run', 'dev', '--', '--host', HOST, '--port', String(PORT), '--strictPort'],
		{
			cwd: process.cwd(),
			stdio: 'pipe',
			shell: false,
			env: { ...process.env }
		}
	);

	let serverOutput = '';
	devServer.stdout.on('data', (chunk) => {
		serverOutput += chunk.toString();
	});
	devServer.stderr.on('data', (chunk) => {
		serverOutput += chunk.toString();
	});

	const assertServerAlive = () => {
		if (devServer.exitCode !== null) {
			throw new Error(
				`Dev server exited early with code ${devServer.exitCode}.\n${serverOutput || '(no output)'}`
			);
		}
	};

	let browser;
	const generated = new Map();
	try {
		await waitForServer(getVariantUrl(variants[0]), { checkAlive: assertServerAlive });

		browser = await puppeteer.launch({
			headless: true,
			executablePath: browserPath,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});
		const page = await browser.newPage();
		await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });

		for (const variant of variants) {
			const targetUrl = getVariantUrl(variant);
			const outputPath = getVariantOutputPath(variant);
			await mkdir(path.dirname(outputPath), { recursive: true });
			await page.goto(targetUrl, { waitUntil: 'networkidle2' });
			await page.evaluate(async () => {
				if (document.fonts?.ready) {
					await document.fonts.ready;
				}
			});
			await sleep(120);
			await page.screenshot({
				path: outputPath,
				type: 'jpeg',
				quality: 92,
				clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT }
			});
			generated.set(variant, outputPath);
			console.log(`Generated ${variant}: ${outputPath}`);
		}

		const selectedVariant = generated.has(defaultVariant) ? defaultVariant : variants[0];
		await copyFile(generated.get(selectedVariant), MAIN_OUTPUT_PATH);
		console.log(`Set default OG image (${selectedVariant}) -> ${MAIN_OUTPUT_PATH}`);
	} finally {
		if (browser) {
			await browser.close();
		}
		devServer.kill('SIGTERM');
	}
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
});
