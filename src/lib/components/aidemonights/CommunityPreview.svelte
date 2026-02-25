<script lang="ts">
	import type { CommunityCompany } from '$lib/data/community-companies';
	import CommunityCompanyCard from './CommunityCompanyCard.svelte';

	let { companies }: { companies: CommunityCompany[] } = $props();
</script>

<div class="space-y-8">
	<div class="border-l-2 pl-6" style="border-color: var(--dn-accent);">
		<p class="text-lg font-semibold" style="color: var(--dn-text);">
			Built by our community.
		</p>
		<p class="mt-2 text-sm" style="color: var(--dn-muted);">
			Startups and projects from AI Demo Nights members.
		</p>
	</div>

	<div class="grid gap-px md:grid-cols-2" style="background-color: var(--dn-border);">
		{#each companies as company, i}
			<CommunityCompanyCard {company} index={i} />
		{/each}
	</div>

	<a
		href="/aidemonights/community"
		class="group inline-flex items-center gap-2 text-sm transition-colors"
		style="color: var(--dn-muted);"
	>
		See all community companies
		<span class="transition-transform duration-200 group-hover:translate-x-1">→</span>
	</a>
</div>
