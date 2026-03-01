<script lang="ts">
	import meBlue from '$assets/me-blue-bg-no.png';

	const portraitImageUrl = typeof meBlue === 'string' ? meBlue : (meBlue as { src: string }).src;
	const stack = ['TypeScript', 'SvelteKit', 'Node.js', 'Agents'];
</script>

<div class="relative h-[630px] w-[1200px] overflow-hidden bg-[#0f1218] text-white">
	<div class="absolute inset-0 bg-[radial-gradient(860px_420px_at_84%_12%,rgba(255,106,0,0.28),transparent_60%)]"></div>
	<div class="absolute inset-0 bg-[radial-gradient(640px_420px_at_0%_100%,rgba(41,73,220,0.24),transparent_62%)]"></div>
	<div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:44px_44px] opacity-20"></div>
	<div class="absolute right-0 top-0 h-full w-[470px] border-l border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]"></div>

	<div class="absolute left-12 top-12 z-20 w-[660px]">
		<p class="font-mono text-[30px] tracking-[0.12em] text-orange-200 uppercase">ANDY J TYLER</p>
		<h1 class="mt-2 font-sans text-[102px] leading-[0.86] font-black tracking-[-0.04em] uppercase drop-shadow-[0_8px_22px_rgba(0,0,0,0.32)]">
			BUILD AI
			<br />
			PRODUCTS
		</h1>
		<p class="mt-6 font-sans text-[38px] leading-[1.08] font-semibold text-white/86">
			Strategy + code + shipping cadence.
		</p>
	</div>

	<div class="absolute bottom-12 left-12 z-20 flex gap-3">
		{#each stack as item}
			<span
				class="rounded-full border border-white/24 bg-white/[0.11] px-5 py-2.5 font-mono text-[26px] tracking-[0.06em] text-white/92 uppercase shadow-[0_10px_22px_rgba(0,0,0,0.2)]"
				>{item}</span
			>
		{/each}
	</div>

	<div class="absolute right-2 bottom-0 z-10 h-[600px] w-[550px]">
		<div class="absolute inset-x-14 top-10 h-20 rounded-full bg-orange-400/32 blur-2xl"></div>
		<div class="absolute inset-0 rounded-t-[2rem] border border-white/14 bg-white/[0.08]"></div>
		<img
			src={portraitImageUrl}
			alt="3D render of Andy Tyler"
			class="relative h-full w-full object-contain object-bottom drop-shadow-[0_26px_44px_rgba(0,0,0,0.34)]"
		/>
	</div>
</div>
