<script lang="ts">
	import profileMarkdown from '$lib/data/profile.md?raw';
	import { markdownToHtml } from '$lib/utils/markdown';
	// import asciiArt from '$lib/assets/ascii-art-andy.png';
	import asciiText from '$lib/assets/ascii-me.txt?raw';

	const profileHtml = $derived(markdownToHtml(profileMarkdown));
</script>

<main class="w-full max-w-4xl px-4 py-4 text-left md:px-10 lg:px-14">
	<div class="mt-6 flex flex-col items-start gap-3">
		<img
			src="/favicon.svg"
			alt="ajt"
			class="mode-shared-mark h-24 w-24 rounded-[1.1rem] shadow-[0_10px_36px_rgba(0,0,0,0.35)] transition-transform duration-[var(--motion-fast)] ease-[var(--motion-bounce-sm)]"
		/>
		<span
			class="mode-shared-name mt-6 mb-4 font-mono text-2xl font-semibold tracking-[0.18em] text-white uppercase"
		>
			Andy J Tyler
		</span>
	</div>
	<article class="dev-prose">
		{@html profileHtml}
	</article>
	<!-- <img src={asciiArt} alt="ASCII art of Andy Tyler" class="mt-2 w-48" /> -->
	<pre
		class="mode-shared-me pointer-events-none relative z-[95] mt-8 mb-8 h-48 w-auto overflow-hidden font-mono text-[1.5px] tracking-[0.35px] text-white">
		{asciiText}
	</pre>
</main>

<style>
	.dev-prose {
		font-family: var(--font-mono);
		max-width: 72ch;
		color: var(--foreground);
	}

	/* ── Headings ── */
	:global(.dev-prose h1) {
		margin-top: 0;
		margin-bottom: 0.4rem;
		font-size: 1.4rem;
		font-weight: 700;
		line-height: 1.2;
		color: var(--foreground);
	}

	:global(.dev-prose h2) {
		margin-top: 1.6rem;
		margin-bottom: 0.5rem;
		font-size: 1.1rem;
		font-weight: 700;
		line-height: 1.3;
		color: var(--foreground);
	}

	/* ── Comments ── */
	:global(.dev-prose .dev-comment) {
		margin: 0.3rem 0;
		font-size: 0.82rem;
		line-height: 1.55;
		color: var(--dev-comment);
		font-style: italic;
	}

	/* ── Body text ── */
	:global(.dev-prose p) {
		margin: 0 0 0.55rem;
	}

	:global(.dev-prose p),
	:global(.dev-prose li) {
		font-size: 0.82rem;
		line-height: 1.55;
		color: var(--foreground);
	}

	/* ── Lists ── */
	:global(.dev-prose ul),
	:global(.dev-prose ol) {
		margin: 0 0 0.55rem;
		padding-left: 1rem;
		list-style: none;
	}

	:global(.dev-prose li) {
		margin-bottom: 0.2rem;
		position: relative;
	}

	:global(.dev-prose li::before) {
		content: '–';
		position: absolute;
		left: -1rem;
		color: var(--primary);
	}

	/* ── Bold ── */
	:global(.dev-prose strong) {
		color: var(--primary);
		font-weight: 700;
	}

	/* ── Italic ── */
	:global(.dev-prose em) {
		font-style: italic;
		color: var(--foreground);
	}

	/* ── Strikethrough ── */
	:global(.dev-prose del) {
		text-decoration: line-through;
		color: var(--dev-text-muted);
	}

	/* ── Horizontal rule ── */
	:global(.dev-prose hr) {
		border: none;
		border-top: 1px solid var(--dev-hr);
		margin: 1rem 0;
	}

	/* ── Inline code ── */
	:global(.dev-prose code) {
		border: 1px solid var(--dev-code-border);
		background: var(--dev-code-bg);
		padding: 0.05rem 0.3rem;
		border-radius: 0.25rem;
		font-size: 0.88em;
		color: var(--primary);
	}

	/* ── Numbers ── */
	:global(.dev-prose .dev-num) {
		color: var(--primary);
		font-weight: 700;
	}

	/* ── Links ── */
	:global(.dev-prose a.dev-link) {
		display: inline-flex;
		align-items: baseline;
		gap: 0.28rem;
		max-width: 100%;
		line-height: inherit;
		vertical-align: baseline;
		color: var(--primary);
		text-decoration-line: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.2em;
		text-decoration-color: var(--dev-link-underline);
	}

	:global(.dev-prose a.dev-link > span) {
		min-width: 0;
		overflow-wrap: anywhere;
	}

	:global(.dev-prose a.dev-link:visited) {
		color: var(--primary);
	}

	:global(.dev-prose a.dev-link:hover) {
		color: var(--dev-link-hover);
		text-decoration-thickness: 2px;
		text-decoration-color: var(--dev-link-hover-underline);
	}

	:global(.dev-prose a.dev-link .dev-link-icon) {
		display: block;
		height: 1.15em;
		width: 1.15em;
		align-self: center;
		background: rgba(255, 255, 255, 1);
		border-radius: 20%;
		flex-shrink: 0;
		object-fit: fill;
		object-position: center;
	}

	:global(.dev-prose a.dev-link.link-size-lg .dev-link-icon) {
		height: 1.3em;
		width: 1.3em;
		background: transparent;
		border-radius: 0;
	}

	/* ── Link lists (horizontal flex) ── */
	:global(.dev-prose ul.link-list),
	:global(.dev-prose ol.link-list) {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem 0.85rem;
		margin: 0 0 0.7rem;
		padding-left: 0;
		list-style: none;
	}

	:global(.dev-prose ul.link-list li),
	:global(.dev-prose ol.link-list li) {
		margin: 0;
	}

	:global(.dev-prose ul.link-list li::before),
	:global(.dev-prose ol.link-list li::before) {
		content: none;
	}
</style>
