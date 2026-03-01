<script lang="ts">
	import { page } from '$app/state';
	import DevMode from '$lib/components/DevMode.svelte';
	import ProductMode from '$lib/components/ProductMode.svelte';

	const mode = $derived(page.url.searchParams.get('mode') ?? 'dev');
</script>

{#if mode === 'dev'}
	<DevMode />
{:else}
	<ProductMode />
{/if}

<style>
	:global(.mode-shared-mark) {
		view-transition-name: mode-shared-mark;
	}

	:global(.mode-shared-me) {
		view-transition-name: mode-shared-me;
	}

	:global(.mode-shared-name) {
		view-transition-name: mode-shared-name;
	}

	:global(::view-transition-old(mode-shared-mark)),
	:global(::view-transition-new(mode-shared-mark)) {
		animation-duration: var(--motion-base);
		animation-timing-function: var(--motion-bounce-sm);
	}

	:global(::view-transition-old(mode-shared-me)),
	:global(::view-transition-new(mode-shared-me)) {
		animation-duration: var(--motion-slow);
		animation-timing-function: var(--motion-smooth);
	}

	:global(::view-transition-old(mode-shared-name)),
	:global(::view-transition-new(mode-shared-name)) {
		animation-duration: var(--motion-base);
		animation-timing-function: var(--motion-smooth);
	}
</style>
