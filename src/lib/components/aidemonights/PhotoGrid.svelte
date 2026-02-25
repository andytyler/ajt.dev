<div class="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-4" style="background-color: var(--dn-border);">
	{#each Array(8) as _, i}
		<div
			class="flex aspect-square items-center justify-center"
			style="background-color: var(--dn-surface);"
		>
			<span class="text-xs" style="color: var(--dn-muted);">Photo {i + 1}</span>
		</div>
	{/each}
</div>
