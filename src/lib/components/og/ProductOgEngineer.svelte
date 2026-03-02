<script lang="ts">
	import asciiText from '$assets/ascii-me.txt?raw';
	const chips = ['Technical Founder', 'AI Tinkerer', 'Community Builder'];
</script>

<div class="relative h-[630px] w-[1200px] overflow-hidden bg-[#0a0d12] text-[#ede6da]">
	<div
		class="absolute inset-0 bg-[radial-gradient(760px_360px_at_0%_0%,rgba(255,106,0,0.18),transparent_62%)]"
	></div>
	<div
		class="absolute inset-0 bg-[radial-gradient(540px_300px_at_86%_16%,rgba(255,106,0,0.2),transparent_68%)]"
	></div>
	<div
		class="absolute inset-0 bg-[radial-gradient(700px_340px_at_100%_100%,rgba(57,83,139,0.2),transparent_70%)]"
	></div>
	<div
		class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[length:40px_40px] opacity-[0.14]"
	></div>
	<div
		class="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22),transparent_35%,rgba(0,0,0,0.35))]"
	></div>
	<div
		class="absolute top-0 right-0 h-full w-[540px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.03)_36%,rgba(255,255,255,0.01))]"
	></div>

	<div class="absolute top-12 left-12 z-20 w-[600px]">
		<p class="font-mono text-[28px] tracking-[0.12em] text-[#ff8a2a] uppercase">ANDY J TYLER</p>
		<h1 class="mt-3 font-sans text-[98px] leading-[0.94] font-black tracking-[-0.04em] uppercase">
			AI PRODUCT
			<br />
			ENGINEER
		</h1>
		<p class="mt-5 font-mono text-[38px] leading-[1.06] text-[#ff8a2a] uppercase">
			Build fast and make things
		</p>
	</div>

	<div class="absolute bottom-12 left-12 z-20 flex gap-3">
		{#each chips as chip}
			<p
				class="rounded-full border border-white/18 bg-white/[0.08] px-4 py-2.5 font-mono text-[23px] leading-none tracking-[0.04em] text-[#ede6da]/84 uppercase"
			>
				{chip}
			</p>
		{/each}
	</div>

	<div
		class="absolute top-[20px] right-[18px] z-10 h-[220px] w-[340px] rounded-full bg-[#ff8a2a]/24 blur-3xl"
	></div>
	<pre
		class="absolute right-[-14px] bottom-[-62px] z-20 m-0 font-mono text-[4.3px] leading-[6px] tracking-[1px] text-[#ede6da]/78">{asciiText}</pre>
</div>
