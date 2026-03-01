<script lang="ts">
	import meBlue from '$assets/me-blue-bg-no.png';

	const portraitImageUrl = typeof meBlue === 'string' ? meBlue : (meBlue as { src: string }).src;
	const words = ['AI PRODUCTS', 'FAST SHIPPING', 'REAL USERS'];
</script>

<div class="relative h-[630px] w-[1200px] overflow-hidden bg-[#ec8d35] text-black">
	<div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.24),rgba(236,141,53,0.94))]"></div>
	<div class="absolute inset-0 bg-[radial-gradient(840px_340px_at_12%_0%,rgba(255,255,255,0.34),transparent_62%)]"></div>
	<div class="absolute inset-0 bg-[radial-gradient(760px_320px_at_50%_115%,rgba(0,0,0,0.12),transparent_68%)]"></div>
	<div class="absolute right-0 top-0 h-full w-[500px] border-l border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.04))]"></div>

	<div class="absolute left-12 top-12 z-20 w-[690px]">
		<p class="font-mono text-[30px] tracking-[0.12em] text-black/80 uppercase">ANDY J TYLER</p>
		<h1 class="mt-2 font-sans text-[108px] leading-[0.86] font-black tracking-[-0.04em] uppercase">
			PRODUCT
			<br />
			ENGINEER
		</h1>
		<p class="mt-6 font-sans text-[42px] leading-[1.05] font-semibold text-black/78">
			Build, ship, iterate.
		</p>
	</div>

	<div class="absolute bottom-12 left-12 z-20 flex gap-3">
		{#each words as word}
			<span
				class="rounded-full border border-black/16 bg-white/62 px-5 py-2.5 font-mono text-[26px] tracking-[0.06em] text-black/74 uppercase shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
				>{word}</span
			>
		{/each}
	</div>

	<div class="absolute right-2 bottom-0 z-10 h-[610px] w-[552px]">
		<div class="absolute inset-x-14 top-8 h-28 rounded-full bg-white/35 blur-2xl"></div>
		<div class="absolute inset-x-20 bottom-6 h-9 rounded-full bg-black/20 blur-xl"></div>
		<img
			src={portraitImageUrl}
			alt="3D render of Andy Tyler"
			class="relative h-full w-full object-contain object-bottom drop-shadow-[0_24px_38px_rgba(0,0,0,0.24)]"
		/>
	</div>
</div>
