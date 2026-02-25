# AI Demo Nights — Visual Identity Exploration

**Date:** 2026-02-16
**Scope:** AI Demo Nights brand identity (NOT the personal ajt.dev site)
**Status:** Exploration — 4 directions built, awaiting review and direction choice
**Exploration page:** `/aidemonights/design-explore` (temporary, delete after decision)
**Source file:** `src/routes/aidemonights/design-explore/+page.svelte`

---

## Context

Andy expressed interest in a visual identity for AI Demo Nights rooted in:
- Halftone / halftone dots / dot art
- Dither / glyph dither
- ASCII art
- Grain / film noise
- Patterns

The current AI Demo Nights aesthetic is:
- Dark monocolor (#0A0A0A background)
- JetBrains Mono monospace font
- Neon orange accent (#FF4500)
- Zero border-radius (sharp, technical)
- Minimal decoration, clean information hierarchy
- Subtle hover glow effects

The exploration page builds 4 distinct directions that all live in the halftone/dither/grain family but feel very different from each other. Each direction shows: a full hero treatment, component examples (cards, dividers), texture variations, and typography samples — all using real AI Demo Nights content.

---

## Direction 1: HALFTONE PRESS

**Vibe:** Tactile, retro-futurist, like a screen-printed poster for a warehouse event. Indie zine meets tech event. Risograph print shop.

**What it looks like:**
- Big Ben-Day dots in orange (#FF4500) rendered as CSS radial-gradient patterns
- Dots create a vignette effect — dense in center, fading to edges
- Title "AI DEMO NIGHTS" in massive white bold text sitting on top of the dot field
- Cards have a halftone dot stripe running down the left edge as an accent
- Typography can be FILLED with dots using `background-clip: text`

**Key visual elements:**
- Staggered hex-grid dots (offset every other row for authentic halftone feel)
- CMYK rosette effect (dots at different rotation angles overlapping — 15deg and 45deg)
- Varying dot densities (fine 4px, medium 8px, bold)
- Dot gradient dividers that fade from dense to sparse

**Technical approach (all pure CSS):**
- `radial-gradient(circle, #FF4500 1.8px, transparent 1.8px)` for dots
- Two gradient layers with offset `background-position` for hex stagger: `0 0` and `4px 4px`
- `mask-image: radial-gradient(ellipse at center, black 10%, transparent 55%)` for vignette
- `background-clip: text` with `-webkit-text-fill-color: transparent` for dotted typography
- Rotated pseudo-elements (`::before`, `::after`) at different angles for CMYK rosette

**Strengths:**
- Immediately recognizable, strong brand identity
- Works great at all scales (hero backgrounds, card accents, typography)
- Very printable — translates well to physical materials (stickers, posters, t-shirts)
- The dot-filled text effect is memorable

**Weaknesses:**
- Can feel retro/dated if not handled carefully
- Limited color expression (mostly works with single accent color)
- May compete with content legibility at high densities

**Exploration page shows:**
1. Hero with staggered hex dots fading from center
2. 4 dot variation swatches (fine, medium, staggered, CMYK rosette)
3. Event card with halftone stripe accent
4. "DEMO WHAT YOU'VE BUILT" in dot-filled text
5. Gradient divider (dots fading out)

---

## Direction 2: GLYPH MATRIX

**Vibe:** Terminal aesthetic pushed into graphic design. Feels like the output of an AI thinking. The "AI" connection is literal — data as visual texture. Like watching a machine process information.

**What it looks like:**
- Backgrounds filled with faint unicode characters at low opacity: `░▒▓█▀▄▐▌╔═╗║╚╝╬┼├┤┬┴─│●○◆◇■□▲△`
- Title sits on top of the character field, glowing subtly orange
- A scanning line animates continuously down the hero (like an old CRT monitor)
- Cards use actual box-drawing characters as borders (`╔═╗║╚╝`)
- Section dividers are rows of repeating characters
- Unicode blocks create density gradients: `░░░▒▒▒▓▓▓███`

**Key visual elements:**
- Random character grid generated at mount time (90 cols x 28 rows)
- Characters from multiple sets: blocks, box-drawing, shapes, arrows, misc unicode
- Box-drawing card borders rendered as `<pre>` elements
- 4 character texture patterns: wave (░▒▓█▓▒░), grid (┼─┼│), diamond (◆·◇·◆), checker (▀▄▀▄)
- Scanline animation (thin orange gradient line sweeping top to bottom over 4 seconds)

**Technical approach:**
- Character grid: generated in `onMount()` with random selection from glyph character set
- Rendered as `<pre>` element, positioned absolute, low opacity (0.08), overflow hidden
- Box-drawing cards: literal `<pre>` elements with box characters
- Scanline: CSS `@keyframes` animating `top` from `-2px` to `100%` with orange gradient
- Title text-shadow: `0 0 60px rgba(255, 69, 0, 0.15)` for subtle glow

**Strengths:**
- Deeply connected to the AI/tech theme (data, code, terminal)
- Very unique — not something you see on other event sites
- The box-drawing cards are charming and distinctive
- Character textures provide a rich vocabulary of patterns
- Scanline animation adds life without being distracting

**Weaknesses:**
- Can feel "hackery" or too niche if overused
- Character grids don't scale well to very small screens
- May be too similar to existing monospace aesthetic (evolution not revolution)
- Box-drawing card borders need monospace font to align — limits typography choices

**Exploration page shows:**
1. Hero with random unicode character backdrop + scanline animation
2. Unicode density gradient strip (░▒▓█)
3. Box-drawing character card for event info
4. 4 character texture swatches (wave, grid, diamond, checker)
5. Double-line character divider (═══════)

---

## Direction 3: SIGNAL GRAIN

**Vibe:** Atmospheric, cinematic, like a signal emerging from noise. Raw analog feel — darkroom photography, analog TV static, film grain. Less "retro" and more "raw." The event as a broadcast emerging from chaos.

**What it looks like:**
- Heavy film grain noise over everything, generated via SVG feTurbulence filter
- Dark background (#050505) — even darker than current
- Title in orange (#FF4500) glowing through the static like a neon sign in fog
- Vignette effect: edges are darker, center is clearer — like looking through a lens
- Dithered gradients: smooth transitions replaced with visible stepped color bands
- Cards have subtle grain texture on their surface

**Key visual elements:**
- SVG noise: `feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4"`
- Vignette: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)`
- Dithered gradients at 8-step and 16-step quantization (hard color bands from black to orange)
- Three grain intensity levels: light (0.08 opacity), medium (0.18), heavy (0.35)
- Title text-shadow: `0 0 80px rgba(255, 69, 0, 0.3)` for deep glow

**Technical approach:**
- Inline `<svg>` elements with `<filter>` containing `feTurbulence`
- SVG positioned absolute, full width/height, low opacity, `mix-blend-mode: screen`
- Each noise instance uses unique filter IDs to avoid conflicts
- Dithered gradients: CSS `linear-gradient` with hard color stops (no transition between steps)
- Multiple SVG noise elements per section (hero, card, intensity swatches)

**Dithered gradient technique (8-step example):**
```css
background: linear-gradient(to right,
  #0a0a0a 0%, #0a0a0a 12.5%,
  #1a1210 12.5%, #1a1210 25%,
  #2d1a12 25%, #2d1a12 37.5%,
  /* ... hard steps from black to orange ... */
  #ff4500 87.5%, #ff4500 100%
);
```

**Strengths:**
- Very atmospheric and moody — creates a strong emotional response
- The grain texture feels alive, organic, authentic
- Dithered gradients are visually striking and unusual
- Works beautifully with the existing dark theme
- The "signal from noise" metaphor fits AI perfectly
- Vignette + glow creates cinematic depth

**Weaknesses:**
- SVG feTurbulence can be performance-heavy on large surfaces or mobile
- Grain can interfere with text legibility if opacity is too high
- Harder to translate to print/physical materials
- May feel too dark/moody for an event that's actually fun and social
- Dithered gradients are a niche aesthetic that not everyone appreciates

**Exploration page shows:**
1. Hero with heavy noise, vignette, and glowing orange title
2. 3 dithered gradient strips (8-step, 16-step, smooth reference)
3. Event card with subtle grain overlay
4. 3 grain intensity swatches (light, medium, heavy)
5. Noisy divider strip

---

## Direction 4: INTERFERENCE (Wildcard)

**Vibe:** Mathematical, generative, hypnotic. Optical tension from overlapping geometries. Like looking at the physical manifestation of wave interference — two signals colliding. Scientific, almost academic, but visually mesmerizing.

**What it looks like:**
- Overlapping line patterns at slightly different angles (0deg and 4deg) creating moire interference
- The interference patterns shift with slow CSS animation (20-25 second cycle)
- Title sits cleanly on top of the pattern field
- Multiple pattern types: linear (parallel lines), circular (concentric circles with offset centers), radial (conic gradients), and combined
- Cards have subtle interference backgrounds that SHIFT ON HOVER
- Interactive zone where hovering displaces one pattern layer, revealing interference dynamics

**Key visual elements:**
- Linear moire: two `repeating-linear-gradient` at 0deg and 4-5deg offset
- Circular moire: two `repeating-radial-gradient` with circle centers at 45%/55% (slightly offset)
- Radial pattern: `repeating-conic-gradient` with thin line segments
- Combined: all three layered together
- Slow rotation animation: `@keyframes moire-drift` rotating 0deg to 3deg over 20s
- Hover interaction on card: one pattern layer rotates 1deg on hover

**Technical approach (all pure CSS):**
```css
/* Linear moire — the key is SMALL angle offset (0-5deg) */
background:
  repeating-linear-gradient(0deg, transparent, transparent 3px,
    rgba(255,69,0,0.1) 3px, rgba(255,69,0,0.1) 4px),
  repeating-linear-gradient(4deg, transparent, transparent 3px,
    rgba(255,69,0,0.1) 3px, rgba(255,69,0,0.1) 4px);

/* Circular moire — offset circle centers by ~5% */
background:
  repeating-radial-gradient(circle at 45% 50%, ...),
  repeating-radial-gradient(circle at 55% 50%, ...);
```
- Two line layers on the hero with slow counter-rotating animations
- Interactive zone: `transition: transform 0.3s ease` on hover with `translate(15px, 10px) scale(1.02)`

**Strengths:**
- Incredibly visually striking — genuinely hypnotic
- The animation makes it feel alive and generative
- Strong conceptual connection: interference = multiple signals = community/collaboration
- Interactive hover effects are delightful and surprising
- Completely pure CSS — no SVG, no JS for the effects
- Very scalable — works at any size

**Weaknesses:**
- Can cause eye strain or discomfort if patterns are too dense
- The subtlety is key — too strong and it's overwhelming
- Not everyone will "get it" — it's more abstract than the other directions
- Hard to make work as small accent details (it needs space to breathe)
- May render differently across screen resolutions/sizes due to sub-pixel rendering

**Exploration page shows:**
1. Hero with animated linear moire (two line sets drifting slowly)
2. 4 pattern variations (linear, circular, radial, combined)
3. Event card with interactive moire — hover to shift the pattern
4. Interactive zone with concentric circle interference (hover to displace)
5. Moire divider band

---

## Current Site Context (for reference)

**Tech stack:** SvelteKit 2 + Svelte 5 + Tailwind CSS 4 + TypeScript
**AI Demo Nights CSS variables:**
```css
--dn-bg: #0A0A0A;
--dn-text: #E5E5E5;
--dn-muted: #737373;
--dn-accent: #FF4500;
--dn-border: #2A2A2A;
--dn-surface: #141414;
```
**Font:** JetBrains Mono (loaded via Google Fonts in aidemonights layout)
**Layout:** `src/routes/aidemonights/+layout.svelte` wraps all aidemonights pages with dark theme + Header

**Existing design language:**
- Zero border-radius (enforced globally via `.dn-root :global(*) { border-radius: 0 !important; }`)
- `gap-px` grids with border-color backgrounds for subtle grid lines
- Staggered fade-in animations with `animation-delay: {index * 60}ms`
- Hover glow effects using linear gradients
- Section pattern: border-bottom separators, uppercase tracked section labels

---

## Decision Points

When you come back to this:

1. **Pick a direction** (or hybrid) — visit `localhost:5173/aidemonights/design-explore` while dev server is running (`npm run dev`)
2. **Consider hybrids** — e.g., glyph matrix backgrounds + halftone accents, or grain + interference
3. **Consider intensity** — each direction can be dialed from subtle (background texture only) to bold (full identity treatment)
4. **Think about applications beyond web** — which direction works for: Luma event banners, social media graphics, stickers, t-shirts?
5. **Kill directions** that don't resonate — narrow to 1-2 for deeper exploration

## Possible Hybrid Combinations Worth Exploring

- **Glyph + Grain:** Character backgrounds with film grain overlay — "corrupted terminal"
- **Halftone + Grain:** Dot patterns with noise — "weathered print"
- **Glyph + Halftone:** Character density gradients that mimic halftone dot sizing
- **Interference + Grain:** Moire patterns emerging from noise — "signal detection"

---

## Files Created

- `src/routes/aidemonights/design-explore/+page.svelte` — The exploration page (TEMPORARY — delete after choosing direction)

## Next Steps After Choosing Direction

1. Delete the exploration page
2. Create a design doc for the chosen direction with specific component treatments
3. Write implementation plan for applying the identity across AI Demo Nights pages
4. Consider creating reusable CSS utilities or Svelte components for the chosen texture effects
