<script lang="ts">
	import type { CommunityCompany } from '$lib/data/community-companies';

	let { company, index = 0 }: { company: CommunityCompany; index?: number } = $props();
</script>

<div
	class="card-enter group relative overflow-hidden p-6"
	style="background-color: var(--dn-surface); animation-delay: {index * 60}ms;"
>
	<div class="flex items-start gap-4">
		{#if company.logo}
			<img
				src={company.logo}
				alt={company.name}
				class="h-8 w-8 shrink-0 object-contain opacity-80"
			/>
		{:else}
			<div
				class="flex h-8 w-8 shrink-0 items-center justify-center text-xs font-bold"
				style="background-color: var(--dn-border); color: var(--dn-muted);"
			>
				{company.name.charAt(0)}
			</div>
		{/if}
		<div class="min-w-0 flex-1">
			<span class="text-sm font-medium" style="color: var(--dn-text);">
				{company.name}
			</span>
			<p class="mt-1 text-xs leading-relaxed" style="color: var(--dn-muted);">
				{company.oneLiner}
			</p>
			{#if company.affiliation}
				<span
					class="mt-2 inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider"
					style="background-color: var(--dn-border); color: var(--dn-accent);"
				>
					{company.affiliation.label}
				</span>
			{/if}
		</div>
	</div>
	<!-- Subtle hover glow -->
	<div
		class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		style="background: linear-gradient(135deg, rgba(255, 69, 0, 0.03) 0%, transparent 60%);"
	></div>
</div>

<style>
	.card-enter {
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
</style>
