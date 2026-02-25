# AI Demo Nights — New Sections Design

## Context

AI Demo Nights is a curated community of engineers, builders, and super-early founders in London. Monthly events feature 4-min live demos (no slides) in the AI/ML space. High-signal attendees from frontier labs (OpenAI, DeepMind, Anthropic, xAI) and YC startups. Not-for-profit, relies on sponsors and venue partners. ~80-100 attendees per event, 1200+ newsletter subscribers.

## Goals (ranked)

1. **Social proof / credibility** — "Look who attends and supports us"
2. **Community recognition** — Make members and their companies feel seen
3. **Sponsor acquisition** — Clear path for potential sponsors

## Data Model

### `src/lib/data/attendee-companies.ts`

```ts
type AttendeeCompany = {
  name: string;       // "Anthropic", "OpenAI"
  wordmark?: string;  // path to SVG wordmark, optional — fall back to text
};
```

Flat list of notable employers. No tiers, no links.

### `src/lib/data/community-companies.ts`

```ts
type AffiliationTag = {
  label: string;      // "YC W25", "Sequoia-backed", "16:0 speedrun"
  icon?: string;      // optional small icon/logo
};

type CommunityCompany = {
  name: string;
  logo: string;        // path to logo SVG
  oneLiner: string;    // max ~50 chars
  affiliation?: AffiliationTag;
  featured?: boolean;  // true = shows in main page preview
  founderName?: string;
};
```

### `src/lib/data/partners.ts`

```ts
type Partner = {
  name: string;
  logo: string;
  url: string;
  contribution: string;  // "Venue partner", "Developer tools"
};
```

Existing `sponsors.ts` stays as-is.

## Main Page Changes

### New section order

1. Hero (unchanged)
2. Links (unchanged)
3. **"Attendees from" strip** — NEW
4. Past Demos (unchanged)
5. Photos (unchanged)
6. **Community Companies preview** — NEW
7. Membership (unchanged)
8. Cofounder Matching (unchanged)
9. **Partners** — NEW
10. **Sponsors** — SLIMMED (logos only + tiny CTA)
11. Upcoming Events (unchanged)

### AttendeeStrip.svelte (new)

Horizontal row of wordmarks/text names. Subtle, muted. No links, no hover effects. "Attendees from: Anthropic · OpenAI · Google DeepMind · Meta · ..." Quick credibility hit high on the page.

### CommunityPreview.svelte (new)

Grid of ~6-8 featured company cards. Each card: logo, name, one-liner, affiliation tag as small pill/badge. "See all" link at bottom going to `/aidemonights/community`.

### CommunityCompanyCard.svelte (new)

Shared card component used by both preview and full community page. Logo + name + one-liner + affiliation tag.

### Partners.svelte (new)

Compact section for venue hosts and in-kind supporters. Logo + name + contribution type. Distinct from sponsors — these orgs contribute non-monetary value.

### SponsorsWall.svelte (modified)

Strip down to just tiered logo display. Remove pitch section (stats, benefits table, big CTA). Add small understated "Become a sponsor" text link to `/aidemonights/sponsors`.

## New Routes

### `/aidemonights/community`

- Shares aidemonights layout (dark theme, header)
- Page title: "Community"
- Intro leaning into curation — high signal, frontier labs, YC startups
- Stats: 1200+ newsletter, 80-100 per event, 9 events
- "Attendees from" strip (reuse component)
- Full grid of all community companies using CommunityCompanyCard

### `/aidemonights/sponsors`

- Shares aidemonights layout
- Page title: "Sponsor AI Demo Nights"
- Not-for-profit angle upfront
- Audience stats: 80-100 attendees/event, 1200+ newsletter, frontier labs + YC
- Tier breakdown table (migrated from SponsorsWall pitch): headline, partner, community with benefits per tier
- CTA to get in touch (LinkedIn DM)

## Design Principles

- Follow existing component patterns (typed props, CSS custom properties, staggered animations)
- Use existing `--dn-*` CSS variables throughout
- Monospace aesthetic (JetBrains Mono, 0 border-radius)
- Keep it understated — social proof works best when it's not screaming
