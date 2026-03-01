<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { backOut, cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	type ViewTransition = {
		finished: Promise<void>;
	};

	type ViewTransitionDocument = Document & {
		startViewTransition?: (update: () => void | Promise<void>) => ViewTransition;
	};

	const mode = $derived(page.url.searchParams.get('mode') ?? 'dev');
	const isDevMode = $derived(mode === 'dev');
	const nextMode = $derived(isDevMode ? 'product' : 'dev');
	let isSwitching = $state(false);

	async function toggleMode() {
		const url = new URL(page.url);
		if (nextMode === 'dev') {
			url.searchParams.delete('mode');
		} else {
			url.searchParams.set('mode', nextMode);
		}

		const navigate = () =>
			goto(url.toString(), { replaceState: true, noScroll: true, keepFocus: true });

		if (browser) {
			const doc = document as ViewTransitionDocument;
			if (doc.startViewTransition) {
				isSwitching = true;
				try {
					await doc.startViewTransition(() => navigate()).finished;
				} finally {
					isSwitching = false;
				}
				return;
			}
		}

		await navigate();
	}
</script>

<button
	type="button"
	onclick={toggleMode}
	disabled={isSwitching}
	title={`Switch to ${nextMode} mode`}
	aria-label={`Switch to ${nextMode} mode`}
	class={`relative right-4 bottom-4 z-90 z-[100] flex cursor-pointer items-center gap-1.5 font-mono text-xs tracking-tight opacity-70 transition-all duration-500  hover:opacity-100 disabled:pointer-events-none disabled:opacity-45`}
>
	{#key mode}
		<span
			in:fly={{ y: 6, duration: 240, easing: backOut }}
			out:fly={{ y: -4, duration: 160, easing: cubicOut }}
			>{isDevMode ? 'ENGINEER MODE // ACTIVE' : 'FOUNDER MODE // ACTIVE'}</span
		>
	{/key}
</button>
