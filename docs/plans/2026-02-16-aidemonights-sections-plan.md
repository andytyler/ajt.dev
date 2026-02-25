# AI Demo Nights — New Sections Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add social proof sections (attendees strip, community companies, partners) to the AI Demo Nights page, slim down the sponsors section, and create dedicated `/community` and `/sponsors` subpages.

**Architecture:** Data-layer-first approach. Create the three new data files, then build components bottom-up (shared card → section components → page integration). Modify SponsorsWall last since it's extracting content to the new sponsors page. Each new component follows existing patterns: typed `$props()`, `--dn-*` CSS variables, staggered `fadeIn` animations, `gap-px` grid borders.

**Tech Stack:** SvelteKit, TypeScript, Tailwind CSS, CSS custom properties (`--dn-*`), JetBrains Mono font, SVG logos.

**Design doc:** `docs/plans/2026-02-16-aidemonights-sections-design.md`

---

### Task 1: Create attendee companies data file

**Files:**
- Create: `src/lib/data/attendee-companies.ts`

**Step 1: Create the data file with types and seed data**

```ts
export type AttendeeCompany = {
	name: string;
	wordmark?: string; // path to SVG in /static/wordmarks/, optional — falls back to text
};

export const attendeeCompanies: AttendeeCompany[] = [
	{ name: 'Anthropic' },
	{ name: 'OpenAI' },
	{ name: 'Google DeepMind' },
	{ name: 'xAI' },
	{ name: 'Meta' },
	{ name: 'Amazon' },
	{ name: 'Microsoft' }
];
```

Note: Wordmark SVGs are optional. The component will fall back to rendering the name as text. Logos can be added later to `/static/wordmarks/`.

**Step 2: Commit**

```bash
git add src/lib/data/attendee-companies.ts
git commit -m "feat: add attendee companies data file"
```

---

### Task 2: Create community companies data file

**Files:**
- Create: `src/lib/data/community-companies.ts`

**Step 1: Create the data file with types and seed data**

```ts
export type AffiliationTag = {
	label: string; // "YC W25", "Sequoia-backed"
	icon?: string; // optional path to small icon
};

export type CommunityCompany = {
	name: string;
	logo?: string; // path to logo SVG in /static/community/
	oneLiner: string; // max ~50 chars
	affiliation?: AffiliationTag;
	featured?: boolean; // true = shows on main page preview
	founderName?: string;
};

export const communityCompanies: CommunityCompany[] = [
	{
		name: 'Atla',
		logo: '/sponsors/atla.svg',
		oneLiner: 'AI evaluation platform for LLM systems',
		affiliation: { label: 'YC W25' },
		featured: true,
		founderName: 'Henry Broomfield'
	},
	{
		name: 'ventrue',
		oneLiner: 'Helping engineers replace project managers',
		featured: true,
		founderName: 'Kindred Salway'
	}
];

export const featuredCompanies = communityCompanies.filter((c) => c.featured);
```

Note: This is seed data — the user will add more companies over time. Using the existing Atla logo from `/static/sponsors/` for now. New logos go in `/static/community/` as they're added.

**Step 2: Commit**

```bash
git add src/lib/data/community-companies.ts
git commit -m "feat: add community companies data file"
```

---

### Task 3: Create partners data file

**Files:**
- Create: `src/lib/data/partners.ts`

**Step 1: Create the data file with types and seed data**

Migrate venue-type sponsors from `pastSponsors` into partners, since "Future House" and "London Founder House" were venue partners, not monetary sponsors.

```ts
export type Partner = {
	name: string;
	logo?: string;
	url: string;
	contribution: string; // "Venue partner", "Developer tools"
};

export const partners: Partner[] = [
	{
		name: 'Founders House',
		logo: '/sponsors/founders-house.svg',
		url: 'https://foundershouse.co',
		contribution: 'Venue partner'
	},
	{
		name: 'Future House',
		logo: '/sponsors/future-house.svg',
		url: '',
		contribution: 'Venue partner'
	},
	{
		name: 'London Founder House',
		logo: '/sponsors/london-founder-house.svg',
		url: '',
		contribution: 'Venue partner'
	}
];
```

Note: Founders House is currently a "community" sponsor — it may fit better as a partner since it provides venue space. The user can adjust this. Future House and London Founder House are moved from `pastSponsors` since they were venue partners, not sponsors.

**Step 2: Commit**

```bash
git add src/lib/data/partners.ts
git commit -m "feat: add partners data file"
```

---

### Task 4: Build AttendeeStrip component

**Files:**
- Create: `src/lib/components/aidemonights/AttendeeStrip.svelte`

**Step 1: Create the component**

Follow the existing pattern from `SponsorsWall.svelte` community strip (lines 155-183) — horizontal inline layout with `gap-px` borders. But simpler: no links, no hover effects.

```svelte
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
```

Key design decisions:
- "Attendees from" label uses `--dn-accent` to draw the eye
- Company names are muted (`--dn-muted`) — subtle, not screaming
- Uses `gap-px` with `--dn-border` background for the 1px grid line effect (same pattern as Membership benefits grid, SponsorsWall community strip)
- No links, no hover — this is a static credibility signal
- Wordmark images are supported but text fallback is the default

**Step 2: Commit**

```bash
git add src/lib/components/aidemonights/AttendeeStrip.svelte
git commit -m "feat: add AttendeeStrip component"
```

---

### Task 5: Build CommunityCompanyCard component

**Files:**
- Create: `src/lib/components/aidemonights/CommunityCompanyCard.svelte`

**Step 1: Create the shared card component**

This card is used in both the main page preview and the full community page.

```svelte
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
```

Key design decisions:
- Logo fallback: first letter of company name in a muted box (matches monospace aesthetic)
- Affiliation tag: pill with `--dn-border` bg and `--dn-accent` text — stands out without dominating
- Hover glow matches `Membership.svelte` pattern (lines 47-50)
- Staggered animation via `index` prop (same pattern as Membership benefits, 60ms delay)

**Step 2: Commit**

```bash
git add src/lib/components/aidemonights/CommunityCompanyCard.svelte
git commit -m "feat: add CommunityCompanyCard component"
```

---

### Task 6: Build CommunityPreview component

**Files:**
- Create: `src/lib/components/aidemonights/CommunityPreview.svelte`

**Step 1: Create the preview component**

Grid of featured companies with a "See all" link. Follows the `Membership.svelte` grid pattern.

```svelte
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
```

Key design decisions:
- `border-l-2` intro matches `Membership.svelte` pattern (line 16)
- 2-column grid with `gap-px` border effect
- "See all" link is understated — muted color, not a button

**Step 2: Commit**

```bash
git add src/lib/components/aidemonights/CommunityPreview.svelte
git commit -m "feat: add CommunityPreview component"
```

---

### Task 7: Build Partners component

**Files:**
- Create: `src/lib/components/aidemonights/Partners.svelte`

**Step 1: Create the partners component**

Compact display similar to the sponsor partner grid but simpler — no tier labels.

```svelte
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
```

Key design decisions:
- Same intro pattern as CommunityPreview and Membership (`border-l-2 pl-6`)
- Grid columns adapt to partner count (max 3)
- No links on partners — just recognition. Links can be added later with the perks/deals feature.
- Contribution type as small uppercase label

**Step 2: Commit**

```bash
git add src/lib/components/aidemonights/Partners.svelte
git commit -m "feat: add Partners component"
```

---

### Task 8: Slim down SponsorsWall component

**Files:**
- Modify: `src/lib/components/aidemonights/SponsorsWall.svelte`

**Step 1: Remove the pitch section and update props**

Remove everything from line 185 (`<!-- ▌ THE PITCH — audience stats + tiers + CTA ▌ -->`) through line 261 (end of CTA strip). This includes:
- `audienceStats` array (lines 14-19)
- `tiers` array (lines 21-49)
- The audience stats grid (lines 189-203)
- The tier breakdown grid (lines 206-233)
- The CTA strip (lines 236-260)
- The `.stat-enter`, `.shimmer`, `.cta-strip:hover .shimmer`, `@keyframes shimmerSlide` CSS

Replace the removed pitch section with a small text CTA link:

```svelte
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
```

Also remove the `linkedIn` prop since it's no longer needed in this component (the sponsors page will handle that).

**Step 2: Verify the dev server shows the slimmed sponsors section**

Run: `npm run dev` (or check the already-running dev server)
Expected: Sponsors section shows just the tiered logos + small "Become a sponsor" link + past sponsors. No stats, no tier table, no big orange CTA.

**Step 3: Commit**

```bash
git add src/lib/components/aidemonights/SponsorsWall.svelte
git commit -m "refactor: slim SponsorsWall to logos-only, move pitch to sponsors page"
```

---

### Task 9: Create sponsors subpage

**Files:**
- Create: `src/routes/aidemonights/sponsors/+page.svelte`
- Create: `src/routes/aidemonights/sponsors/+page.server.ts`

**Step 1: Create the page server loader**

```ts
import { sponsors, pastSponsors, sponsorLinkedIn } from '$lib/data/sponsors';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		sponsors,
		pastSponsors,
		sponsorLinkedIn
	};
};
```

**Step 2: Create the sponsors page**

This page absorbs the pitch content removed from SponsorsWall. It's the sales page for potential sponsors.

```svelte
<script lang="ts">
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

	const audienceStats = [
		{ value: '80-100', label: 'Attendees / event' },
		{ value: '1,200+', label: 'Newsletter subscribers' },
		{ value: '9', label: 'Events to date' },
		{ value: 'IRL', label: 'London only' }
	];

	const tiers = [
		{
			name: 'Headline',
			includes: [
				'Full-width logo feature on event page',
				'Opening shoutout at every event',
				'Logo on all marketing & comms',
				'Direct access to attendee community',
				'Dedicated recruiting slot',
				'Featured in newsletter (1,200+ builders)'
			]
		},
		{
			name: 'Partner',
			includes: [
				'Logo on event page',
				'Shoutout during event',
				'Community channel access',
				'Attendee introductions'
			]
		},
		{
			name: 'Community',
			includes: [
				'Logo on event page',
				'Mention in event comms',
				'Community access'
			]
		}
	];
</script>

<!-- Hero -->
<section class="border-b px-6 py-20" style="border-color: var(--dn-border);">
	<div class="mx-auto max-w-4xl">
		<a
			href="/aidemonights"
			class="mb-6 inline-flex items-center gap-2 text-xs transition-colors"
			style="color: var(--dn-muted);"
		>
			← Back to AI Demo Nights
		</a>
		<h1 class="text-3xl font-bold tracking-tight md:text-5xl" style="color: var(--dn-text);">
			Sponsor AI Demo Nights
		</h1>
		<p class="mt-4 text-sm leading-relaxed" style="color: var(--dn-muted);">
			We're not-for-profit and rely on sponsors to make the night happen. Your support
			puts you in front of London's most active AI builders — engineers from frontier labs,
			YC founders, and the people shipping real products.
		</p>
	</div>
</section>

<!-- Audience Stats -->
<section class="border-b px-6 py-12" style="border-color: var(--dn-border);">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-8 text-xs font-medium uppercase tracking-wider" style="color: var(--dn-muted);">
			The Audience
		</h2>
		<div class="grid grid-cols-2 gap-px md:grid-cols-4" style="background-color: var(--dn-border);">
			{#each audienceStats as stat, i}
				<div
					class="stat-enter p-6 text-center"
					style="background-color: var(--dn-surface); animation-delay: {i * 80}ms;"
				>
					<span class="block text-2xl font-bold md:text-3xl" style="color: var(--dn-accent);">
						{stat.value}
					</span>
					<span class="mt-1 block text-[10px] uppercase tracking-wider" style="color: var(--dn-muted);">
						{stat.label}
					</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Tiers -->
<section class="border-b px-6 py-12" style="border-color: var(--dn-border);">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-8 text-xs font-medium uppercase tracking-wider" style="color: var(--dn-muted);">
			Sponsorship Tiers
		</h2>
		<div class="grid gap-px md:grid-cols-3" style="background-color: var(--dn-border);">
			{#each tiers as tier, i}
				<div
					class="flex flex-col p-6 md:p-8"
					style="background-color: {i === 0 ? 'var(--dn-surface)' : 'var(--dn-bg)'};"
				>
					<div class="flex items-center gap-3">
						{#if i === 0}
							<span class="inline-block h-2 w-2" style="background-color: var(--dn-accent);"></span>
						{/if}
						<span
							class="text-sm font-semibold"
							style="color: {i === 0 ? 'var(--dn-accent)' : 'var(--dn-text)'};"
						>
							{tier.name}
						</span>
					</div>
					<ul class="mt-4 flex-1 space-y-2">
						{#each tier.includes as perk}
							<li class="flex items-start gap-2 text-xs leading-relaxed" style="color: var(--dn-muted);">
								<span class="mt-1 shrink-0" style="color: var(--dn-border);">—</span>
								{perk}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="px-6 py-12">
	<div class="mx-auto max-w-4xl">
		<a
			href={data.sponsorLinkedIn}
			target="_blank"
			rel="noopener noreferrer"
			class="cta-strip group relative block overflow-hidden p-6 transition-colors md:p-8"
			style="background-color: var(--dn-accent);"
		>
			<div class="relative flex items-center justify-between">
				<div>
					<span class="text-sm font-bold" style="color: var(--dn-bg);">
						Get in touch
					</span>
					<span class="ml-3 text-xs font-medium" style="color: rgba(10,10,10,0.6);">
						DM me on LinkedIn with your company, tier, and any questions
					</span>
				</div>
				<span
					class="text-lg font-bold transition-transform duration-200 group-hover:translate-x-2"
					style="color: var(--dn-bg);"
				>
					→
				</span>
			</div>
			<div class="shimmer"></div>
		</a>
	</div>
</section>

<style>
	.stat-enter {
		animation: fadeIn 0.4s ease-out both;
	}

	.shimmer {
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.08) 50%,
			transparent 100%
		);
		pointer-events: none;
	}

	.cta-strip:hover .shimmer {
		animation: shimmerSlide 0.6s ease-out forwards;
	}

	@keyframes shimmerSlide {
		from { left: -100%; }
		to { left: 100%; }
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
```

**Step 3: Verify the sponsors page renders at `/aidemonights/sponsors`**

Run: Visit `http://localhost:5173/aidemonights/sponsors` in browser
Expected: Sponsors pitch page with back link, hero, stats, tiers, and CTA. Shares the dark theme from aidemonights layout.

**Step 4: Commit**

```bash
git add src/routes/aidemonights/sponsors/
git commit -m "feat: add dedicated sponsors page with pitch content"
```

---

### Task 10: Create community subpage

**Files:**
- Create: `src/routes/aidemonights/community/+page.svelte`
- Create: `src/routes/aidemonights/community/+page.server.ts`

**Step 1: Create the page server loader**

```ts
import { communityCompanies } from '$lib/data/community-companies';
import { attendeeCompanies } from '$lib/data/attendee-companies';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		communityCompanies,
		attendeeCompanies
	};
};
```

**Step 2: Create the community page**

```svelte
<script lang="ts">
	import CommunityCompanyCard from '$lib/components/aidemonights/CommunityCompanyCard.svelte';
	import AttendeeStrip from '$lib/components/aidemonights/AttendeeStrip.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

	const stats = [
		{ value: '1,200+', label: 'Newsletter subscribers' },
		{ value: '80-100', label: 'Builders per event' },
		{ value: '9', label: 'Events and counting' }
	];
</script>

<!-- Hero -->
<section class="border-b px-6 py-20" style="border-color: var(--dn-border);">
	<div class="mx-auto max-w-4xl">
		<a
			href="/aidemonights"
			class="mb-6 inline-flex items-center gap-2 text-xs transition-colors"
			style="color: var(--dn-muted);"
		>
			← Back to AI Demo Nights
		</a>
		<h1 class="text-3xl font-bold tracking-tight md:text-5xl" style="color: var(--dn-text);">
			Community
		</h1>
		<p class="mt-4 text-sm leading-relaxed" style="color: var(--dn-muted);">
			Engineers, builders, and super-early founders shipping in AI. High signal — attendees
			from frontier labs, YC startups, and the best of London's AI scene.
		</p>
	</div>
</section>

<!-- Stats -->
<section class="border-b px-6 py-12" style="border-color: var(--dn-border);">
	<div class="mx-auto max-w-4xl">
		<div class="grid grid-cols-3 gap-px" style="background-color: var(--dn-border);">
			{#each stats as stat, i}
				<div
					class="stat-enter p-6 text-center"
					style="background-color: var(--dn-surface); animation-delay: {i * 80}ms;"
				>
					<span class="block text-2xl font-bold md:text-3xl" style="color: var(--dn-accent);">
						{stat.value}
					</span>
					<span class="mt-1 block text-[10px] uppercase tracking-wider" style="color: var(--dn-muted);">
						{stat.label}
					</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Attendees From -->
<section class="border-b px-6 py-12" style="border-color: var(--dn-border);">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-8 text-xs font-medium uppercase tracking-wider" style="color: var(--dn-muted);">
			Attendees From
		</h2>
		<AttendeeStrip companies={data.attendeeCompanies} />
	</div>
</section>

<!-- All Community Companies -->
<section class="px-6 py-12">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-8 text-xs font-medium uppercase tracking-wider" style="color: var(--dn-muted);">
			Community Companies
		</h2>
		<div class="grid gap-px md:grid-cols-2" style="background-color: var(--dn-border);">
			{#each data.communityCompanies as company, i}
				<CommunityCompanyCard {company} index={i} />
			{/each}
		</div>
	</div>
</section>

<style>
	.stat-enter {
		animation: fadeIn 0.4s ease-out both;
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
```

**Step 3: Verify the community page renders at `/aidemonights/community`**

Run: Visit `http://localhost:5173/aidemonights/community` in browser
Expected: Community page with back link, hero, stats, attendees strip, and company cards grid. Shares the dark theme.

**Step 4: Commit**

```bash
git add src/routes/aidemonights/community/
git commit -m "feat: add community page with company catalog"
```

---

### Task 11: Integrate new sections into main page

**Files:**
- Modify: `src/routes/aidemonights/+page.svelte`
- Modify: `src/routes/aidemonights/+page.server.ts`

**Step 1: Update the page server loader to include new data**

```ts
import { events, allDemos, nextEvent } from '$lib/data/demos';
import { attendeeCompanies } from '$lib/data/attendee-companies';
import { featuredCompanies } from '$lib/data/community-companies';
import { partners } from '$lib/data/partners';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		events,
		allDemos,
		nextEvent,
		attendeeCompanies,
		featuredCompanies,
		partners
	};
};
```

**Step 2: Update the page component**

Add imports for new components at top of `<script>`:

```ts
import AttendeeStrip from '$lib/components/aidemonights/AttendeeStrip.svelte';
import CommunityPreview from '$lib/components/aidemonights/CommunityPreview.svelte';
import Partners from '$lib/components/aidemonights/Partners.svelte';
```

Remove the `sponsorLinkedIn` import from the sponsors import (no longer passed to SponsorsWall).

Add new sections in this order in the template:

1. After Links section (after line 78), add Attendees From section:
```svelte
<!-- Attendees From -->
<section class="border-b px-6 py-12" style="border-color: var(--dn-border);">
	<div class="mx-auto max-w-4xl">
		<AttendeeStrip companies={data.attendeeCompanies} />
	</div>
</section>
```

2. After Photos section (after line 98), add Community Companies preview:
```svelte
<!-- Community Companies -->
<section class="border-b px-6 py-12" style="border-color: var(--dn-border);">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-8 text-xs font-medium uppercase tracking-wider" style="color: var(--dn-muted);">
			Community Companies
		</h2>
		<CommunityPreview companies={data.featuredCompanies} />
	</div>
</section>
```

3. After Cofounder Matching section (before Sponsors), add Partners:
```svelte
<!-- Partners -->
<section class="border-b px-6 py-12" style="border-color: var(--dn-border);">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-8 text-xs font-medium uppercase tracking-wider" style="color: var(--dn-muted);">
			Partners
		</h2>
		<Partners partners={data.partners} />
	</div>
</section>
```

4. Update the SponsorsWall usage to remove `linkedIn` prop:
```svelte
<SponsorsWall {sponsors} {pastSponsors} />
```

**Step 3: Verify the full page renders correctly**

Run: Visit `http://localhost:5173/aidemonights` in browser
Expected: All sections in new order — hero, links, attendees strip, demos, photos, community preview, membership, cofounder matching, partners, slimmed sponsors, upcoming events.

**Step 4: Commit**

```bash
git add src/routes/aidemonights/+page.svelte src/routes/aidemonights/+page.server.ts
git commit -m "feat: integrate attendee strip, community preview, partners into main page"
```

---

### Task 12: Final review and cleanup

**Step 1: Visual review of all pages**

Visit each page and check:
- `http://localhost:5173/aidemonights` — main page with new sections
- `http://localhost:5173/aidemonights/community` — full community catalog
- `http://localhost:5173/aidemonights/sponsors` — sponsor pitch page

Check responsive behavior at mobile (375px), tablet (768px), and desktop (1024px+).

**Step 2: Verify navigation flows**

- Main page "See all community companies →" link → community page
- Main page "Become a sponsor →" link → sponsors page
- Community page "← Back to AI Demo Nights" → main page
- Sponsors page "← Back to AI Demo Nights" → main page

**Step 3: Check for any TypeScript errors**

Run: `npx svelte-check`
Expected: No errors related to new files.

**Step 4: Final commit if any cleanup needed**

```bash
git add -A
git commit -m "chore: final cleanup for new aidemonights sections"
```
