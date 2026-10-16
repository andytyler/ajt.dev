<script lang="ts">
	import { dev } from '$app/environment';
	import DevMode from '$lib/components/DevMode.svelte';
	import ColourPreview from '$lib/components/ColourPreview.svelte';
</script>

{#if dev}
	<ColourPreview />
{:else}
	<DevMode />
{/if}
