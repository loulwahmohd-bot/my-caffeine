# Design Brief: الولد الذي عاش مع النعام

**Audience:** Middle school girls (Arabic-speaking), story-focused learning platform.
**Tone:** Warm, organic, approachable. Desert narrative aesthetics.
**Direction:** Right-to-left (RTL) from the start. No dark mode — warm daylight palette throughout.

---

## Visual Identity

| Element | OKLCH |
|---------|-------|
| **Primary** | `0.55 0.12 70` — Warm Ochre (desert sand) |
| **Secondary** | `0.60 0.15 35` — Sienna Rust (accents, highlights) |
| **Accent** | `0.60 0.18 15` — Coral Red (alerts, emphasis) |
| **Background** | `0.98 0.01 60` — Warm Cream (light, inviting) |
| **Card** | `0.96 0.02 55` — Off-White (subtle elevation) |
| **Foreground** | `0.20 0.03 40` — Deep Warm Brown (high contrast) |
| **Muted** | `0.45 0.02 55` — Warm Taupe (secondary text) |

---

## Typography

| Use | Font |
|-----|------|
| **Display/Headers** | Figtree (friendly serif) |
| **Body** | DMSans (Arabic-optimized sans-serif) |
| **Mono** | JetBrainsMono (system only) |

**Scale:** h1 32px bold → h2 24px → body 16px → caption 12px muted. Arabic text has native support.

---

## Structural Zones

| Zone | Background | Treatment |
|------|-----------|----------|
| Header | Card (`0.96 0.02 55`) | Border-bottom warm rust |
| Content | Background (`0.98 0.01 60`) | Open, minimal |
| Card/Section | Card (`0.96 0.02 55`) | Radius 8-12px, accent line top |
| Footer | Muted (`0.85 0.03 55`) | Border-top warm rust |
| Button (Primary) | Primary (`0.55 0.12 70`) | Radius 8px, no shadow |

---

## Component Patterns

- **Buttons:** Ochre primary, sienna secondary, muted ghost.
- **Inputs:** Subtle border; focus ring in primary.
- **Cards:** Cream background, 2px rust accent line top, 12px radius.
- **Progress:** Warm gradient ochre → sienna; no fills.
- **Badges:** Small circular cards, primary or secondary.

---

## Motion

- **Default:** `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` (smooth ease).
- **Entrance:** Fade-in + scale on question reveal.
- **Hover:** Primary deepens slightly; no skew/scale.
- **Page:** Fade between sections.

---

## Constraints

✗ No dark mode (warm daylight only).
✗ No gradients (solid OKLCH only).
✗ No harsh alerts (coral reserved for destructive).
✓ RTL priority — all layout mirrored.
✓ Warm grounding — every interactive ties to ochre/sienna.
✓ High contrast — Arabic text clarity.

---

## Signature Detail

**Desert Warmth System:** 2px rust accent line atop cards instead of shadow. Grounds interface in story's desert landscape without depth illusion.
