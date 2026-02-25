<script lang="ts">
	import type { Demo } from '$lib/data/demos';

	let { demos }: { demos: Demo[] } = $props();

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<div class="overflow-x-auto">
	<table class="w-full text-left text-sm" style="border-collapse: collapse;">
		<thead>
			<tr style="border-bottom: 1px solid var(--dn-border);">
				<th class="px-4 py-3 text-xs font-medium uppercase tracking-wider" style="color: var(--dn-muted);">Date</th>
				<th class="px-4 py-3 text-xs font-medium uppercase tracking-wider" style="color: var(--dn-muted);">Name</th>
				<th class="px-4 py-3 text-xs font-medium uppercase tracking-wider" style="color: var(--dn-muted);">Demo</th>
				<th class="px-4 py-3 text-xs font-medium uppercase tracking-wider" style="color: var(--dn-muted);">Link</th>
			</tr>
		</thead>
		<tbody>
			{#each demos as demo}
				<tr style="border-bottom: 1px solid var(--dn-border);">
					<td class="px-4 py-3 text-nowrap" style="color: var(--dn-muted);">{formatDate(demo.date)}</td>
					<td class="px-4 py-3" style="color: var(--dn-text);">{demo.name}</td>
					<td class="px-4 py-3">
						<div style="color: var(--dn-text);">{demo.title}</div>
						<div class="mt-1 text-xs" style="color: var(--dn-muted);">{demo.description}</div>
					</td>
					<td class="px-4 py-3">
						<a
							href={demo.projectUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="text-xs underline transition-colors"
							style="color: var(--dn-accent);"
						>
							View →
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
