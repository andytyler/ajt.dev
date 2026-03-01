<script lang="ts">
	import meBlue from '$assets/me-blue-bg-no.png';

	const portraitImageUrl = typeof meBlue === 'string' ? meBlue : (meBlue as { src: string }).src;
	const words = ['SHIP FAST', 'LEARN FAST', 'STAY USEFUL'];
</script>

<div class="relative h-[630px] w-[1200px] overflow-hidden bg-[#f49a42] text-[#261409]">
	<div class="absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#ffd7ac]/75 blur-2xl"></div>
	<div class="absolute right-[-70px] top-[130px] h-[280px] w-[280px] rounded-full bg-[#ffbf7b]/65 blur-2xl"></div>
	<div class="absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.16)_0%,transparent_42%)]"></div>
	<div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.24),rgba(244,154,66,0.96))]"></div>
	<div class="absolute right-0 top-0 h-full w-[520px] border-l border-black/10 bg-[linear-gradient(180deg,rgba(255,230,193,0.34),rgba(255,230,193,0.1))]"></div>

	<div class="absolute left-12 top-12 z-20 w-[700px]">
		<p class="font-mono text-[30px] tracking-[0.12em] text-black/76 uppercase">ANDY J TYLER</p>
		<h1 class="mt-2 font-sans text-[108px] leading-[0.86] font-black tracking-[-0.04em] text-[#1f120a] uppercase">
			AI
			<br />
			BUILDER
		</h1>
		<p class="mt-6 font-sans text-[40px] leading-[1.08] font-semibold text-black/75">
			Prototype hard. Ship what works.
		</p>
	</div>

	<div class="absolute bottom-12 left-12 z-20 flex gap-3">
		{#each words as word, index}
			<span
				class={`rounded-full border border-black/12 px-5 py-2.5 font-mono text-[26px] tracking-[0.06em] text-black/72 uppercase shadow-[0_10px_20px_rgba(0,0,0,0.09)] ${index % 2 === 0 ? 'bg-[#ffe5c5]' : 'bg-[#ffe0bb]'}`}
				>{word}</span
			>
		{/each}
	</div>

	<div class="absolute right-4 bottom-0 z-10 h-[610px] w-[540px]">
		<div class="absolute inset-x-14 top-8 h-20 rounded-full bg-[#fff0dc]/70 blur-2xl"></div>
		<div class="absolute inset-0 rounded-t-[2.2rem] border border-black/9 bg-white/22"></div>
		<img
			src={portraitImageUrl}
			alt="3D render of Andy Tyler"
			class="relative h-full w-full object-contain object-bottom drop-shadow-[0_24px_38px_rgba(0,0,0,0.22)]"
		/>
	</div>
</div>
