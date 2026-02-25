<script lang="ts">
	import type { AttendeeCompany } from '$lib/data/attendee-companies';

	let { companies }: { companies: AttendeeCompany[] } = $props();
</script>

<div class="flex flex-wrap items-center gap-px" style="background-color: var(--dn-border);">
	<span
		class="shrink-0 px-5 py-4 text-[10px] font-medium uppercase tracking-wider"
		style="background-color: var(--dn-surface); color: var(--dn-accent);"
	>
		Attendees from
	</span>
	{#each companies as company}
		<span
			class="flex items-center px-5 py-4"
			style="background-color: var(--dn-surface);"
		>
			{#if company.wordmark}
				<img
					src={company.wordmark}
					alt={company.name}
					class="h-4 w-auto opacity-50"
				/>
			{:else}
				<span class="text-xs" style="color: var(--dn-muted);">{company.name}</span>
			{/if}
		</span>
	{/each}
</div>
