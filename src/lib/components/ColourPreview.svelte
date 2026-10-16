<script lang="ts">
	import { page } from '$app/state';
	import { replaceState } from '$app/navigation';
	import DevMode from './DevMode.svelte';
	import markSvg from '../../../static/favicon.svg?raw';

	const namedColours: Record<string, string> = {
		blue: '#3b82f6',
		cyan: '#06b6d4',
		emerald: '#10b981',
		ice: '#b8cfdb',
		original: '#6b9fff'
	};
	const requestedColour = $derived(page.url.searchParams.get('colour') ?? '');
	const previewState = $derived(page.state as { previewColour?: string });
	const colour = $derived(
		normaliseHex(previewState.previewColour ?? '') ??
			normaliseHex(requestedColour) ??
			namedColours[requestedColour] ??
			'#88ff38'
	);
	let hexDraft = $state<string | null>(null);
	const markSource = $derived(
		'data:image/svg+xml,' + encodeURIComponent(markSvg.replace(/#88ff38/gi, colour))
	);

	function normaliseHex(value: string) {
		const hex = value.trim().replace(/^#/, '');
		if (/^[0-9a-f]{6}$/i.test(hex)) return '#' + hex.toLowerCase();
		if (/^[0-9a-f]{3}$/i.test(hex))
			return (
				'#' +
				[...hex]
					.map((digit) => digit + digit)
					.join('')
					.toLowerCase()
			);
		return null;
	}

	function setColour(value: string) {
		const hex = normaliseHex(value);
		if (!hex) return;
		const url = new URL(page.url);
		url.searchParams.set('colour', hex.slice(1));
		replaceState(url, { ...page.state, previewColour: hex });
	}

	function editHex(value: string) {
		hexDraft = value;
		if (/^#?[0-9a-f]{6}$/i.test(value.trim())) setColour(value);
	}

	function commitHex() {
		if (hexDraft !== null) setColour(hexDraft);
		hexDraft = null;
	}
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={markSource} />
</svelte:head>

<div class="colour-preview" style:--preview-colour={colour}>
	<DevMode {markSource} />
	<aside aria-label="Colour picker" class="colour-controls">
		<label class="label" for="brand-colour">Pick a colour</label>
		<div class="picker-row">
			<input
				id="brand-colour"
				type="color"
				value={colour}
				oninput={(event) => setColour(event.currentTarget.value)}
			/>
			<label class="hex-label">
				<span>Hex colour</span>
				<input
					type="text"
					value={hexDraft ?? colour.toUpperCase()}
					maxlength="7"
					spellcheck="false"
					autocomplete="off"
					oninput={(event) => editHex(event.currentTarget.value)}
					onblur={commitHex}
					onkeydown={(event) => {
						if (event.key === 'Enter') commitHex();
					}}
				/>
			</label>
		</div>
	</aside>
</div>

<style>
	.colour-preview {
		--primary: var(--preview-colour);
		--accent: var(--preview-colour);
		--ring: var(--preview-colour);
		--dev-comment: #9ca3af;
		--dev-code-border: color-mix(in srgb, var(--preview-colour) 30%, transparent);
		--dev-code-bg: color-mix(in srgb, var(--preview-colour) 7%, #09090b);
		--dev-link-hover: color-mix(in srgb, var(--preview-colour) 80%, white);
		--dev-link-underline: color-mix(in srgb, var(--preview-colour) 40%, transparent);
		--dev-link-hover-underline: var(--preview-colour);
		--dev-hr: color-mix(in srgb, var(--preview-colour) 20%, transparent);
		min-height: 100vh;
		padding-bottom: 7rem;
	}
	.colour-controls {
		position: fixed;
		z-index: 100;
		right: 1rem;
		bottom: 1rem;
		max-width: calc(100vw - 2rem);
		padding: 0.65rem;
		border: 1px solid #38383c;
		border-radius: 0.75rem;
		background: #151517;
		box-shadow: 0 8px 32px #0008;
		font: 0.7rem/1.4 var(--font-mono);
		color: #e4e4e7;
	}
	.label {
		display: block;
		margin: 0 0.3rem 0.4rem;
		color: #a1a1aa;
	}
	.picker-row {
		display: flex;
		align-items: end;
		gap: 0.65rem;
	}
	input {
		border: 1px solid #52525b;
		border-radius: 0.4rem;
		background: #09090b;
		color: #fafafa;
		font: inherit;
	}
	input[type='color'] {
		width: 3.5rem;
		height: 2.75rem;
		padding: 0.25rem;
		cursor: pointer;
	}
	input[type='color']::-webkit-color-swatch-wrapper {
		padding: 0;
	}
	input[type='color']::-webkit-color-swatch {
		border: 0;
		border-radius: 0.2rem;
	}
	input[type='color']::-moz-color-swatch {
		border: 0;
		border-radius: 0.2rem;
	}
	.hex-label {
		display: grid;
		gap: 0.25rem;
	}
	.hex-label span {
		color: #a1a1aa;
		font-size: 0.6rem;
	}
	input[type='text'] {
		width: 8.5rem;
		height: 2.75rem;
		padding: 0.5rem 0.65rem;
		font-size: 0.9rem;
	}
	input:focus-visible {
		outline: 2px solid #fff;
		outline-offset: 2px;
	}
	@media (max-width: 540px) {
		.colour-preview {
			padding-bottom: 11rem;
		}
		.colour-controls {
			right: 0.75rem;
			bottom: 0.75rem;
			max-width: calc(100vw - 1.5rem);
		}
	}
</style>
