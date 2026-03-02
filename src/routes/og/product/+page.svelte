<script lang="ts">
	import { page } from '$app/state';
	import ProductOgPremium from '$lib/components/og/ProductOgPremium.svelte';
	import ProductOgTechy from '$lib/components/og/ProductOgTechy.svelte';
	import ProductOgPlayful from '$lib/components/og/ProductOgPlayful.svelte';
	import ProductOgEngineer from '$lib/components/og/ProductOgEngineer.svelte';

	const variant = $derived((page.url.searchParams.get('variant') ?? 'engineer').toLowerCase());
</script>

<svelte:head>
	<title>OG Product Source</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if variant === 'techy'}
	<ProductOgTechy />
{:else if variant === 'playful'}
	<ProductOgPlayful />
{:else if variant === 'engineer'}
	<ProductOgEngineer />
{:else}
	<ProductOgPremium />
{/if}

<style>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
