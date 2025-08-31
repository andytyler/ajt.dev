<script lang="ts">
	import { browser } from '$app/environment';
	import meBlue from '$assets/me-blue-bg-no.png?enhanced';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

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
	<!-- <div class="absolute right-0 bottom-0 left-0 z-10 h-2/3 bg-linear-180 from-transparent to-pink-500"></div> -->
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
