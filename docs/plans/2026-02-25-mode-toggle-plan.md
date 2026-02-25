# Mode Toggle Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a dev/product mode toggle to the landing page, with dev mode as the new default showing a text-heavy engineer personal site.

**Architecture:** Single `+page.svelte` with conditional `{#if}` blocks driven by a `mode` query parameter. A `ModeToggle` component in the layout handles switching. Profile data lives in `src/lib/data/profile.ts` following existing data file conventions.

**Tech Stack:** SvelteKit 2, Svelte 5, Tailwind CSS 4, TypeScript

---

### Task 1: Create profile data file

**Files:**
- Create: `src/lib/data/profile.ts`

**Step 1: Create the data file with types and placeholder content**

```typescript
export type Project = {
	name: string;
	description: string;
	url?: string;
	repo?: string;
	tags: string[];
};

export type Repo = {
	name: string;
	description: string;
	url: string;
};

export type SocialLink = {
	platform: string;
	url: string;
	label: string;
};

export type Interest = {
	name: string;
	icon?: string;
};

export const bio = {
	name: 'Andy Tyler',
	title: 'Software Engineer',
	tagline: 'building at the intersection of AI and product',
	now: [
		'Running AI Demo Nights London — a monthly showcase for AI builders',
		'Building developer tools and AI-powered products',
		'Writing about SvelteKit, TypeScript, and the AI ecosystem'
	]
};

export const projects: Project[] = [
	{
		name: 'AI Demo Nights',
		description: 'Monthly London meetup showcasing AI demos from builders at Anthropic, OpenAI, Google DeepMind, and more',
		url: '/aidemonights',
		tags: ['community', 'AI']
	},
	{
		name: 'ajt.dev',
		description: 'This site — built with SvelteKit, Tailwind, and deployed on Vercel',
		repo: 'https://github.com/andytyler/ajt.dev',
		tags: ['SvelteKit', 'TypeScript']
	}
];

export const repos: Repo[] = [
	{
		name: 'ajt.dev',
		description: 'Personal site and AI Demo Nights hub',
		url: 'https://github.com/andytyler/ajt.dev'
	}
];

export const interests: Interest[] = [
	{ name: 'AI agents & tooling' },
	{ name: 'Developer experience' },
	{ name: 'SvelteKit & frontend craft' },
	{ name: 'Voice AI' },
	{ name: 'Product engineering' }
];

export const socials: SocialLink[] = [
	{ platform: 'github', url: 'https://github.com/andytyler', label: 'GitHub' },
	{ platform: 'x', url: 'https://x.com/ajtdev', label: 'X' },
	{ platform: 'linkedin', url: 'https://linkedin.com/in/ajt.dev', label: 'LinkedIn' }
];
```

**Step 2: Commit**

```bash
git add src/lib/data/profile.ts
git commit -m "feat: add profile data file for dev mode"
```

---

### Task 2: Create ModeToggle component

**Files:**
- Create: `src/lib/components/ModeToggle.svelte`

**Step 1: Create the toggle component**

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	const mode = $derived(page.url.searchParams.get('mode') ?? 'dev');

	function toggle() {
		const next = mode === 'dev' ? 'product' : 'dev';
		const url = new URL(page.url);
		if (next === 'dev') {
			url.searchParams.delete('mode');
		} else {
			url.searchParams.set('mode', next);
		}
		goto(url.toString(), { replaceState: true, noScroll: true });
	}
</script>

<button
	onclick={toggle}
	class="fixed top-4 right-4 z-[100] flex items-center gap-1.5 font-mono text-xs tracking-tight opacity-60 transition-opacity hover:opacity-100 cursor-pointer"
>
	{#if mode === 'dev'}
		<span class="text-sm">⌘</span>
		<span>/mode dev</span>
	{:else}
		<span class="text-sm">✦</span>
		<span>/mode product</span>
	{/if}
</button>
```

**Step 2: Commit**

```bash
git add src/lib/components/ModeToggle.svelte
git commit -m "feat: add ModeToggle slash-command style component"
```

---

### Task 3: Create DevMode page component

**Files:**
- Create: `src/lib/components/DevMode.svelte`

**Step 1: Create the dev mode view component**

This is the text-heavy, minimal engineer personal site view. It imports data from `profile.ts` and renders all sections. Notion-like inline icons for links. Monospace headings, proportional body text.

```svelte
<script lang="ts">
	import { bio, projects, repos, interests, socials } from '$lib/data/profile';
</script>

<div class="mx-auto max-w-2xl px-6 pt-24 pb-16 font-sans">
	<!-- Header -->
	<header class="mb-12">
		<h1 class="font-mono text-2xl font-bold">{bio.name}</h1>
		<p class="mt-1 text-muted-foreground">{bio.title} — {bio.tagline}</p>
	</header>

	<!-- Now -->
	<section class="mb-10">
		<h2 class="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">Now</h2>
		<ul class="space-y-1.5">
			{#each bio.now as item}
				<li class="flex items-start gap-2 text-sm">
					<span class="mt-0.5 text-muted-foreground">→</span>
					<span>{item}</span>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Projects -->
	<section class="mb-10">
		<h2 class="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">Projects</h2>
		<ul class="space-y-3">
			{#each projects as project}
				<li>
					<div class="flex items-center gap-2">
						{#if project.url}
							<a href={project.url} class="font-mono text-sm font-medium underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground">{project.name}</a>
						{:else}
							<span class="font-mono text-sm font-medium">{project.name}</span>
						{/if}
						{#if project.repo}
							<a href={project.repo} class="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener">
								<span class="iconify text-sm simple-icons--github"></span>
							</a>
						{/if}
						{#each project.tags as tag}
							<span class="text-xs text-muted-foreground">{tag}</span>
						{/each}
					</div>
					<p class="mt-0.5 text-sm text-muted-foreground">{project.description}</p>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Repos -->
	<section class="mb-10">
		<h2 class="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">Repos</h2>
		<ul class="space-y-2">
			{#each repos as repo}
				<li class="flex items-center gap-2">
					<span class="iconify text-sm text-muted-foreground simple-icons--github"></span>
					<a href={repo.url} class="font-mono text-sm underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground" target="_blank" rel="noopener">{repo.name}</a>
					<span class="text-xs text-muted-foreground">— {repo.description}</span>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Interests -->
	<section class="mb-10">
		<h2 class="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">Interests</h2>
		<div class="flex flex-wrap gap-x-4 gap-y-1">
			{#each interests as interest}
				<span class="text-sm">{interest.name}</span>
			{/each}
		</div>
	</section>

	<!-- Links -->
	<section>
		<h2 class="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">Links</h2>
		<div class="flex flex-wrap gap-4">
			{#each socials as social}
				<a
					href={social.url}
					class="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
					target="_blank"
					rel="noopener"
				>
					{#if social.platform === 'github'}
						<span class="iconify simple-icons--github"></span>
					{:else if social.platform === 'x'}
						<span class="iconify simple-icons--x"></span>
					{:else if social.platform === 'linkedin'}
						<span class="iconify simple-icons--linkedin"></span>
					{/if}
					<span>{social.label}</span>
				</a>
			{/each}
		</div>
	</section>
</div>
```

**Step 2: Commit**

```bash
git add src/lib/components/DevMode.svelte
git commit -m "feat: add DevMode text-heavy engineer personal site component"
```

---

### Task 4: Wire up mode toggle in the page

**Files:**
- Modify: `src/routes/(main)/+page.svelte`
- Modify: `src/routes/(main)/+layout.svelte`

**Step 1: Update +page.svelte to conditionally render dev/product mode**

The current entire content of `+page.svelte` becomes the product mode view. Wrap it in a conditional block and add the dev mode import.

Replace the full contents of `src/routes/(main)/+page.svelte` with:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import meBlue from '$assets/me-blue-bg-no.png?enhanced';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import DevMode from '$lib/components/DevMode.svelte';

	const mode = $derived(page.url.searchParams.get('mode') ?? 'dev');

	let startAnimation = $state(false);

	onMount(() => {
		if (browser) {
			setTimeout(() => {
				startAnimation = true;
			}, 500);
		}
	});
</script>

{#snippet text(text: string[])}
	<div
		class="flex w-full flex-row flex-nowrap items-center justify-center gap-4 text-4xl transition-all duration-500 md:text-6xl lg:gap-8 lg:text-8xl"
	>
		{#each text as t, i}
			{#key i}
				{#if t === 'ANDY' || t === 'TYLER'}
					<h1 class="text-black opacity-100">{t}</h1>
				{:else}
					<span class="opacity-40">{t}</span>
				{/if}
				<span class="text-2xl opacity-60 md:text-3xl lg:text-4xl">✦</span>
			{/key}
		{/each}
	</div>
{/snippet}

{#if mode === 'dev'}
	<DevMode />
{:else}
	<div
		class="fixed top-0 z-50 mx-auto flex h-16 w-full flex-row items-center justify-center bg-background/80 backdrop-blur-3xl"
	>
		<div
			class="flex w-full max-w-6xl flex-row items-center justify-between p-3 text-xl font-semibold uppercase"
		>
			<span class="text-black">Andy J Tyler</span>
			<span class="text-black">Software Engineer</span>
		</div>
	</div>

	<div class="relative flex min-h-screen w-full items-start justify-center">
		<div
			class="absolute top-1/4 left-0 z-20 flex h-full max-h-1/2 w-full flex-col justify-center gap-6 mask-radial-from-100 text-8xl font-bold text-nowrap text-black uppercase"
		>
			{@render text(['Typescript', 'Product', 'SvelteKit', 'Node.js'])}
			{@render text(['SvelteKit', 'ANDY', 'AI', 'Software Engineer'])}
			{@render text(['SvelteKit', 'TYLER', 'AI', 'Front End'])}
			{@render text(['Product', 'Voice AI', 'AI', 'Product Engineer'])}
			{@render text(['SvelteKit', 'Node.js', 'AI', 'Browser Scraping'])}
		</div>
		{#if startAnimation}
			<div
				class="lg:min-h-5/6ls absolute right-0 bottom-0 left-0 z-50 flex h-5/6 max-h-5/6 min-h-5/6 w-full items-end justify-center overflow-hidden object-contain transition-all duration-500 lg:max-h-5/6"
				in:slide={{ duration: 400, easing: quintOut, axis: 'y' }}
				out:slide={{ duration: 500, easing: quintOut, axis: 'y' }}
			>
				<div class="h-full w-full">
					<enhanced:img
						src={meBlue}
						class="mx-auto h-full object-contain object-bottom"
						alt="Emoji style image of Andy Tyler"
					/>
				</div>
			</div>
		{/if}
	</div>
{/if}
```

**Step 2: Add ModeToggle to the (main) layout**

Update `src/routes/(main)/+layout.svelte` to include the toggle on every page in the group:

```svelte
<script lang="ts">
	import SEO from '$lib/utils/seo/SEO.svelte';
	import ModeToggle from '$lib/components/ModeToggle.svelte';

	let { children }: { children: any } = $props();
</script>

<SEO />
<ModeToggle />

<main class="relative">
	<div
		class="absolute inset-0 z-0 h-screen w-screen bg-linear-180 from-transparent to-orange-500"
	></div>

	{@render children()}
</main>
```

**Step 3: Commit**

```bash
git add src/routes/(main)/+page.svelte src/routes/(main)/+layout.svelte
git commit -m "feat: wire up dev/product mode toggle with conditional rendering"
```

---

### Task 5: Hide product-mode background gradient in dev mode

**Files:**
- Modify: `src/routes/(main)/+layout.svelte`

**Step 1: Make the orange gradient conditional on mode**

The orange gradient background only makes sense for product mode. Pass mode info to the layout or use the page store directly:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import SEO from '$lib/utils/seo/SEO.svelte';
	import ModeToggle from '$lib/components/ModeToggle.svelte';

	let { children }: { children: any } = $props();

	const mode = $derived(page.url.searchParams.get('mode') ?? 'dev');
</script>

<SEO />
<ModeToggle />

<main class="relative">
	{#if mode === 'product'}
		<div
			class="absolute inset-0 z-0 h-screen w-screen bg-linear-180 from-transparent to-orange-500"
		></div>
	{/if}

	{@render children()}
</main>
```

**Step 2: Commit**

```bash
git add src/routes/(main)/+layout.svelte
git commit -m "feat: only show orange gradient in product mode"
```

---

### Task 6: Verify and polish

**Step 1: Run the dev server and test**

```bash
npm run dev
```

Verify:
- `/` shows dev mode (text-heavy page)
- Click toggle → URL changes to `/?mode=product`, hero page appears with gradient
- Click toggle again → URL goes back to `/`, dev mode returns
- Direct link to `/?mode=product` works
- Refresh on each mode preserves state

**Step 2: Final commit if any polish needed**

```bash
git add -A
git commit -m "chore: polish mode toggle and dev mode page"
```
