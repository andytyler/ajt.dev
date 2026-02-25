<script lang="ts">
	import { page } from '$app/state';
	import SEO from '$lib/utils/seo/SEO.svelte';
	import ModeToggle from '$lib/components/ModeToggle.svelte';

	let { children }: { children: any } = $props();

	const mode = $derived(page.url.searchParams.get('mode') ?? 'dev');
</script>

<SEO />

<main class="relative {mode === 'dev' ? 'dark bg-background text-foreground min-h-screen' : ''}">
	<ModeToggle />

	{#if mode === 'product'}
		<div
			class="absolute inset-0 z-0 h-screen w-screen bg-linear-180 from-transparent to-orange-500"
		></div>
	{/if}

	{@render children()}
</main>
