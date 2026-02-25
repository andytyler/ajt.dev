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
