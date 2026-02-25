<script lang="ts">
	import type { Sponsor } from '$lib/data/sponsors';

	let {
		sponsors,
		pastSponsors
	}: { sponsors: Sponsor[]; pastSponsors: Sponsor[] } = $props();

	const headline = sponsors.filter((s) => s.tier === 'headline');
	const partners = sponsors.filter((s) => s.tier === 'partner');
	const community = sponsors.filter((s) => s.tier === 'community');
</script>

<div class="sponsors-root">

	<!-- ▌ HEADLINE SPONSOR — cinematic logo showcase ▌ -->
	{#each headline as sponsor}
		<a
			href={sponsor.url}
			target="_blank"
			rel="noopener noreferrer"
			class="headline-block group relative block overflow-hidden"
			style="background-color: var(--dn-surface);"
		>
			<div class="noise-overlay"></div>

			<div
				class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style="background: linear-gradient(135deg, rgba(255,69,0,0.08) 0%, transparent 40%, transparent 60%, rgba(255,69,0,0.04) 100%);"
			></div>

			<div class="relative flex min-h-[220px] flex-col justify-between p-8 md:p-12">
				<div class="flex items-center justify-between">
					<span
						class="text-[10px] font-medium uppercase tracking-[0.3em]"
						style="color: var(--dn-accent);"
					>
						Headline Sponsor
					</span>
					<span
						class="text-xs opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
						style="color: var(--dn-accent);"
					>
						Visit →
					</span>
				</div>

				<div class="mt-8">
					{#if sponsor.logo}
						<img
							src={sponsor.logo}
							alt={sponsor.name}
							class="headline-logo h-12 w-auto md:h-16 lg:h-20"
						/>
					{:else}
						<span
							class="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
							style="color: var(--dn-text);"
						>
							{sponsor.name}
						</span>
					{/if}
					{#if sponsor.tagline}
						<p class="mt-3 text-sm" style="color: var(--dn-muted);">{sponsor.tagline}</p>
					{/if}
				</div>
			</div>

			<div
				class="h-[3px] w-0 transition-all duration-700 ease-out group-hover:w-full"
				style="background: linear-gradient(to right, var(--dn-accent), transparent);"
			></div>
		</a>
	{/each}

	<!-- ▌ PARTNERS — logo grid ▌ -->
	{#if partners.length > 0}
		<div
			class="grid gap-px"
			style="background-color: var(--dn-border); grid-template-columns: repeat({partners.length}, 1fr);"
		>
			{#each partners as sponsor}
				<a
					href={sponsor.url}
					target="_blank"
					rel="noopener noreferrer"
					class="group relative flex flex-col items-start justify-between overflow-hidden p-6 transition-colors md:p-8"
					style="background-color: var(--dn-surface);"
				>
					<span class="text-[10px] uppercase tracking-wider" style="color: var(--dn-muted);">Partner</span>
					<div class="mt-6">
						{#if sponsor.logo}
							<img
								src={sponsor.logo}
								alt={sponsor.name}
								class="partner-logo h-7 w-auto opacity-80 transition-opacity group-hover:opacity-100 md:h-8"
							/>
						{:else}
							<span class="text-lg font-semibold md:text-xl" style="color: var(--dn-text);">
								{sponsor.name}
							</span>
						{/if}
						{#if sponsor.tagline}
							<p class="mt-2 text-xs" style="color: var(--dn-muted);">{sponsor.tagline}</p>
						{/if}
					</div>
					<div
						class="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
						style="background-color: var(--dn-accent);"
					></div>
				</a>
			{/each}
		</div>
	{/if}

	<!-- ▌ COMMUNITY — logo strip ▌ -->
	{#if community.length > 0}
		<div class="flex flex-wrap items-center gap-px" style="background-color: var(--dn-border);">
			<span
				class="px-5 py-4 text-[10px] uppercase tracking-wider"
				style="background-color: var(--dn-surface); color: var(--dn-muted);"
			>
				Community
			</span>
			{#each community as sponsor}
				<a
					href={sponsor.url}
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center gap-3 px-5 py-4 transition-colors"
					style="background-color: var(--dn-surface);"
				>
					{#if sponsor.logo}
						<img
							src={sponsor.logo}
							alt={sponsor.name}
							class="community-logo h-5 w-auto opacity-60 transition-opacity group-hover:opacity-100"
						/>
					{:else}
						<span class="text-xs" style="color: var(--dn-text);">{sponsor.name}</span>
					{/if}
				</a>
			{/each}
		</div>
	{/if}

	<!-- ▌ BECOME A SPONSOR — small CTA ▌ -->
	<div class="mt-8 flex items-center gap-4">
		<div class="h-px flex-1" style="background-color: var(--dn-border);"></div>
		<a
			href="/aidemonights/sponsors"
			class="group inline-flex items-center gap-2 text-xs transition-colors"
			style="color: var(--dn-muted);"
		>
			Become a sponsor
			<span class="transition-transform duration-200 group-hover:translate-x-1" style="color: var(--dn-accent);">→</span>
		</a>
		<div class="h-px flex-1" style="background-color: var(--dn-border);"></div>
	</div>

	<!-- ▌ PAST SPONSORS — inline with logos ▌ -->
	{#if pastSponsors.length > 0}
		<div class="mt-8 flex items-center gap-6">
			<span class="shrink-0 text-[10px] uppercase tracking-wider" style="color: var(--dn-muted);">
				Previously sponsored by
			</span>
			<div class="h-px flex-1" style="background-color: var(--dn-border);"></div>
			{#each pastSponsors as sponsor}
				{#if sponsor.logo}
					{#if sponsor.url}
						<a href={sponsor.url} target="_blank" rel="noopener noreferrer">
							<img
								src={sponsor.logo}
								alt={sponsor.name}
								class="past-logo h-4 w-auto opacity-40 transition-opacity hover:opacity-70"
							/>
						</a>
					{:else}
						<img
							src={sponsor.logo}
							alt={sponsor.name}
							class="past-logo h-4 w-auto opacity-40"
						/>
					{/if}
				{:else if sponsor.url}
					<a
						href={sponsor.url}
						target="_blank"
						rel="noopener noreferrer"
						class="text-xs transition-colors hover:underline"
						style="color: var(--dn-muted);"
					>
						{sponsor.name}
					</a>
				{:else}
					<span class="text-xs" style="color: var(--dn-muted);">{sponsor.name}</span>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.headline-block {
		animation: revealUp 0.6s ease-out both;
	}

	.noise-overlay {
		position: absolute;
		inset: 0;
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
		background-size: 128px 128px;
		pointer-events: none;
	}

	.headline-logo {
		filter: brightness(1);
		transition: filter 0.3s;
	}

	.headline-block:hover .headline-logo {
		filter: brightness(1.15);
	}

	@keyframes revealUp {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
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
