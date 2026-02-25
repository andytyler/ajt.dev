<script lang="ts">
	let { linkedIn }: { linkedIn: string } = $props();

	const steps = [
		{
			num: '01',
			title: 'Tell us what you\'re building',
			detail: 'Share your project, skills, and what kind of cofounder you\'re looking for.'
		},
		{
			num: '02',
			title: 'We match you',
			detail: 'Curated intros based on complementary skills, shared vision, and ambition level.'
		},
		{
			num: '03',
			title: 'Meet at Demo Night',
			detail: 'Your first meeting happens in person. See each other\'s work live before committing.'
		}
	];
</script>

<div class="space-y-8">
	<!-- Pitch -->
	<div class="grid gap-8 md:grid-cols-5">
		<div class="md:col-span-3">
			<p class="text-lg font-semibold leading-snug" style="color: var(--dn-text);">
				The best cofounders aren't found on a form.<br />
				<span style="color: var(--dn-accent);">They're found building.</span>
			</p>
			<p class="mt-3 text-sm leading-relaxed" style="color: var(--dn-muted);">
				Every month, dozens of AI builders demo live at Demo Night. We connect founders
				who are actively shipping — not just talking about ideas. If you're looking for
				a technical or non-technical cofounder, this is where it starts.
			</p>
		</div>
		<div
			class="flex flex-col justify-center border-l pl-6 md:col-span-2"
			style="border-color: var(--dn-border);"
		>
			<div class="space-y-2">
				<div class="flex items-baseline gap-3">
					<span class="text-2xl font-bold" style="color: var(--dn-text);">50+</span>
					<span class="text-xs" style="color: var(--dn-muted);">builders per event</span>
				</div>
				<div class="flex items-baseline gap-3">
					<span class="text-2xl font-bold" style="color: var(--dn-text);">8</span>
					<span class="text-xs" style="color: var(--dn-muted);">events and counting</span>
				</div>
				<div class="flex items-baseline gap-3">
					<span class="text-2xl font-bold" style="color: var(--dn-accent);">IRL</span>
					<span class="text-xs" style="color: var(--dn-muted);">London only</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Steps -->
	<div class="grid gap-px md:grid-cols-3" style="background-color: var(--dn-border);">
		{#each steps as step, i}
			<div
				class="group relative overflow-hidden p-6 step-enter"
				style="background-color: var(--dn-surface); animation-delay: {i * 100}ms;"
			>
				<span
					class="text-3xl font-bold"
					style="color: var(--dn-border); transition: color 0.3s;"
				>
					{step.num}
				</span>
				<h4 class="mt-3 text-sm font-medium" style="color: var(--dn-text);">
					{step.title}
				</h4>
				<p class="mt-2 text-xs leading-relaxed" style="color: var(--dn-muted);">
					{step.detail}
				</p>
				<!-- Step number lights up on hover -->
				<div
					class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					style="background: linear-gradient(180deg, rgba(255, 69, 0, 0.04) 0%, transparent 50%);"
				></div>
			</div>
		{/each}
	</div>

	<!-- CTA -->
	<a
		href={linkedIn}
		target="_blank"
		rel="noopener noreferrer"
		class="group relative block overflow-hidden border p-6 transition-colors"
		style="border-color: var(--dn-border); background-color: var(--dn-surface);"
	>
		<div class="flex items-center justify-between">
			<div>
				<span class="text-sm font-semibold" style="color: var(--dn-text);">
					Looking for a cofounder?
				</span>
				<span class="ml-3 text-xs" style="color: var(--dn-muted);">
					DM me on LinkedIn to get matched
				</span>
			</div>
			<span
				class="text-sm transition-transform duration-200 group-hover:translate-x-1"
				style="color: var(--dn-accent);"
			>
				→
			</span>
		</div>
		<div
			class="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
			style="background-color: var(--dn-accent);"
		></div>
	</a>
</div>

<style>
	.step-enter {
		animation: fadeIn 0.35s ease-out both;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.group:hover span[style*="color: var(--dn-border)"] {
		color: var(--dn-accent) !important;
	}
</style>
