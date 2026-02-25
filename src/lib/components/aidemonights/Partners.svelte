<script lang="ts">
	import type { Partner } from '$lib/data/partners';

	let { partners }: { partners: Partner[] } = $props();
</script>

<div class="space-y-8">
	<div class="border-l-2 pl-6" style="border-color: var(--dn-accent);">
		<p class="text-lg font-semibold" style="color: var(--dn-text);">
			Our partners make it happen.
		</p>
		<p class="mt-2 text-sm" style="color: var(--dn-muted);">
			Venues, tools, and support from orgs who believe in the community.
		</p>
	</div>

	<div
		class="grid gap-px"
		style="background-color: var(--dn-border); grid-template-columns: repeat({Math.min(partners.length, 3)}, 1fr);"
	>
		{#each partners as partner, i}
			<div
				class="partner-enter flex flex-col items-start justify-between p-6"
				style="background-color: var(--dn-surface); animation-delay: {i * 60}ms;"
			>
				{#if partner.logo}
					<img
						src={partner.logo}
						alt={partner.name}
						class="h-6 w-auto opacity-70"
					/>
				{:else}
					<span class="text-sm font-medium" style="color: var(--dn-text);">
						{partner.name}
					</span>
				{/if}
				<span class="mt-3 text-[10px] uppercase tracking-wider" style="color: var(--dn-muted);">
					{partner.contribution}
				</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.partner-enter {
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
