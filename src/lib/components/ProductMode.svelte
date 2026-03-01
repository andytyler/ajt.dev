<script lang="ts">
	import meBlue from '$assets/me-blue-bg-no.png';

	const portraitImageUrl = typeof meBlue === 'string' ? meBlue : (meBlue as { src: string }).src;

	const focusAreas = [
		'AI product strategy',
		'Rapid prototyping',
		'Full-stack delivery',
		'Growth experiments',
		'Founder-level ownership'
	];

	const stats = [
		{ value: '12+', label: 'Products shipped end-to-end' },
		{ value: '1.2k+', label: 'AI Demo Nights community members' },
		{ value: '~20%', label: 'MoM community growth' }
	];

	const lanes = [
		['TypeScript', 'SvelteKit', 'Node.js', 'Agents', 'Evals', 'RAG'],
		['Product Thinking', 'Execution Speed', 'Founder Mode', 'Design Sense', 'Growth Loops']
	];
</script>

<div class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
	<div
		class="product-blob absolute top-10 -left-20 h-64 w-64 rounded-full bg-orange-500/26 blur-3xl"
	></div>
	<div
		class="product-blob product-blob-reverse absolute top-40 -right-24 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"
	></div>
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.35),transparent_56%)]"
	></div>
</div>

<header class="fixed top-0 z-50 mx-auto flex h-16 w-full items-center justify-center">
	<div
		class="mx-3 flex h-12 w-full max-w-6xl items-center justify-between rounded-full border border-black/10 bg-white/65 px-4 backdrop-blur-xl md:px-5"
	>
		<div class="flex items-center gap-3">
			<img
				src="/favicon.svg"
				alt="ajt"
				class="mode-shared-mark h-8 w-8 rounded-[0.65rem] shadow-[0_8px_24px_rgba(0,0,0,0.22)]"
			/>
			<span
				class="mode-shared-name font-sans text-sm font-semibold tracking-[0.1em] text-black uppercase"
				>Andy J Tyler</span
			>
		</div>
		<div
			class="hidden items-center gap-2 font-sans text-[11px] tracking-[0.14em] text-black/70 uppercase sm:flex"
		>
			<span class="rounded-full border border-black/15 px-2 py-1">Product Mode</span>
			<span>AI Product Engineer</span>
		</div>
	</div>
</header>

<section
	class="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pt-24 pb-20 md:px-10 lg:flex-row lg:items-end lg:gap-10 lg:px-14"
>
	<div class="w-full lg:w-[54%]">
		<p class="mb-5 font-mono text-xs tracking-[0.2em] text-black/55 uppercase">
			Product Engineer · Technical Founder · AI Builder
		</p>
		<h1
			class="max-w-[18ch] font-sans text-4xl leading-[0.95] font-black text-black md:text-6xl lg:text-7xl"
		>
			I build AI products that people actually use.
		</h1>
		<p class="mt-5 max-w-[56ch] font-sans text-base leading-relaxed text-black/72 md:text-lg">
			From idea to shipped workflow, I focus on product outcomes, not demo polish. Strategy, design,
			engineering, and growth execution in one loop.
		</p>

		<div class="mt-6 flex flex-wrap gap-2.5">
			{#each focusAreas as area}
				<span
					class="rounded-full border border-black/16 bg-white/65 px-3 py-1.5 font-mono text-[11px] tracking-[0.09em] text-black/75 uppercase"
				>
					{area}
				</span>
			{/each}
		</div>

		<div class="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
			{#each stats as stat}
				<div
					class="rounded-2xl border border-black/12 bg-white/72 p-4 shadow-[0_10px_26px_rgba(0,0,0,0.08)]"
				>
					<p class="font-sans text-2xl leading-none font-black text-black md:text-3xl">
						{stat.value}
					</p>
					<p
						class="mt-2 font-mono text-[11px] leading-snug tracking-[0.08em] text-black/65 uppercase"
					>
						{stat.label}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="relative mt-10 w-full lg:mt-0 lg:w-[46%]">
		<div
			class="relative rounded-[2rem] border border-black/12 bg-white/70 p-3 shadow-[0_28px_70px_rgba(0,0,0,0.18)] md:p-4"
		>
			<div
				class="absolute inset-x-12 top-4 h-16 rounded-full bg-orange-300/55 blur-2xl md:inset-x-16"
			></div>
			<div
				class="relative overflow-hidden rounded-[1.45rem] bg-[linear-gradient(165deg,rgba(255,255,255,0.95),rgba(255,255,255,0.28))]"
			>
				<div
					class="absolute inset-0 bg-[radial-gradient(circle_at_50%_6%,rgba(255,120,30,0.24),transparent_58%)]"
				></div>
				<img
					src={portraitImageUrl}
					alt="3D render of Andy Tyler"
					class="mode-shared-me relative mx-auto h-[56svh] min-h-[340px] w-full object-contain object-bottom md:h-[68svh] md:min-h-[420px]"
				/>
			</div>
		</div>

		<div
			class="absolute top-4 -left-2 rounded-xl border border-black/12 bg-white/80 px-3 py-2 font-mono text-[10px] tracking-[0.08em] text-black/70 uppercase shadow-[0_10px_24px_rgba(0,0,0,0.12)] md:-left-6"
		>
			Shipped weekly
		</div>
		<div
			class="absolute -right-2 bottom-24 rounded-xl border border-black/12 bg-white/80 px-3 py-2 font-mono text-[10px] tracking-[0.08em] text-black/70 uppercase shadow-[0_10px_24px_rgba(0,0,0,0.12)] md:-right-6"
		>
			Outcome > Output
		</div>
	</div>
</section>

<section class="relative z-10 mx-auto -mt-10 mb-10 w-full max-w-7xl px-6 md:px-10 lg:px-14">
	{#each lanes as lane, i}
		<div class="product-lane-shell">
			<div class={`product-lane ${i % 2 === 0 ? 'product-lane-forward' : 'product-lane-reverse'}`}>
				{#each [...lane, ...lane] as item}
					<span
						class="rounded-full border border-black/16 bg-white/70 px-3 py-1.5 font-mono text-[11px] tracking-[0.09em] text-black/72 uppercase"
					>
						{item}
					</span>
				{/each}
			</div>
		</div>
	{/each}
</section>

<style>
	.product-lane-shell {
		overflow: hidden;
		padding: 0.35rem 0;
	}

	.product-lane {
		display: flex;
		width: max-content;
		gap: 0.5rem;
	}

	.product-lane-forward {
		animation: lane-forward 22s linear infinite;
	}

	.product-lane-reverse {
		animation: lane-reverse 26s linear infinite;
	}

	.product-blob {
		animation: blob-drift 15s ease-in-out infinite;
	}

	.product-blob-reverse {
		animation-direction: reverse;
		animation-duration: 18s;
	}

	@keyframes lane-forward {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@keyframes lane-reverse {
		from {
			transform: translateX(-50%);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes blob-drift {
		0% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			transform: translate3d(10px, -12px, 0) scale(1.04);
		}
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.product-lane-forward,
		.product-lane-reverse,
		.product-blob,
		.product-blob-reverse {
			animation: none;
		}
	}
</style>
