<script lang="ts">
	import type { Snippet } from 'svelte';
	import SEO from '$lib/utils/seo/SEO.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<SEO />

<main class="min-h-screen">
	{@render children()}
</main>
