# Mode Toggle: Dev Mode / Product Mode

## Overview

Add a toggle to ajt.dev that switches between "dev mode" (new default) and "product mode" (current hero landing page). Mode is stored in the URL query parameter `?mode=`.

## URL Behavior

- `/` → dev mode (default, no query param needed)
- `/?mode=product` → current animated hero page
- Toggle updates query param via `goto()` with `replaceState: true`

## Toggle Component

- Fixed top-right position
- Slash command style with icons: `⌘ /mode dev` / `✦ /mode product`
- Click toggles between modes
- JetBrains Mono font (already in project)
- Subtle, doesn't fight with page content

## Dev Mode Page

Text-heavy, minimal, Notion-like inline styling. Sections:

1. **Header** — Name + one-liner tagline
2. **Now** — Current focus areas (2-3 bullet points with inline icons)
3. **Projects** — List with `→` links, short descriptions, inline tech tags
4. **Repos** — Public GitHub repos with inline link icons
5. **Interests** — Short list
6. **Links** — GitHub, X, LinkedIn, email — inline with small icons

## Data Model

New file: `src/lib/data/profile.ts`

```typescript
type Project = { name: string; description: string; url?: string; repo?: string; tags: string[] }
type SocialLink = { platform: string; url: string; label: string }
type Interest = { name: string; icon?: string }

export const bio = { name, title, tagline, now: string[] }
export const projects: Project[]
export const repos: { name, description, url }[]
export const interests: Interest[]
export const socials: SocialLink[]
```

## Architecture

- **Approach A:** Query param drives conditional rendering in single `+page.svelte`
- `{#if mode === 'dev'}` / `{:else}` blocks in the page
- Toggle component reads from `$page.url.searchParams`
- No localStorage, no separate routes — simple and shareable

## Files to Create/Modify

- `src/lib/data/profile.ts` — new data file
- `src/lib/components/ModeToggle.svelte` — new toggle component
- `src/routes/(main)/+page.svelte` — add conditional rendering
- `src/routes/(main)/+page.ts` — read query param, pass to page
