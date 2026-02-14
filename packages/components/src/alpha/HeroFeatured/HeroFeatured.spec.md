# HeroFeatured — Spec Sheet

| Property | Value |
|----------|--------|
| **Component** | HeroFeatured |
| **Kit** | α (Alpha) |
| **Element** | α.1 |
| **Compound** | auction-featured |
| **Dimensions** | 610 × 377 px |
| **PHI level** | PHI1 |

---

## FLOW³ Assignment

- **Kit:** Alpha — full golden rectangle (610×377).
- **Aspect ratio:** 1.618 : 1 (φ).
- **Subdivision (FLOW-004):** Internal split follows φ. Image region ≈ 61.8%, details region ≈ 38.2% (`grid-template-columns: 1.618fr 1fr`).
- **Degradation:** α → β (377×377) at 987px; β → γ (233×377) at 610px; γ → δ (144×144) at 377px.

---

## Tokens Used

| Use | Token |
|-----|--------|
| Container size | `--flow-kit-alpha-width`, `--flow-kit-alpha-height` |
| Padding (details) | `--flow-space-lg` |
| Gap (details) | `--flow-space-md` |
| Border radius | `--flow-radius-lg` |
| Shadow | `--flow-shadow-lg` |
| Badge padding | `--flow-space-xs`, `--flow-space-md` |
| Badge radius | `--flow-radius-pill` |
| CTA height | `--flow-kit-epsilon-height` |
| CTA padding | `--flow-space-xl`, `--flow-space-sm` |
| Typography | `--flow-text-xs`, `--flow-text-sm`, `--flow-text-2xl`, `--flow-text-xl`, `--flow-leading-tight` |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageUrl` | string | — | Hero image URL |
| `imageAlt` | string | '' | Alt text |
| `badge` | string | — | e.g. "SUBASTA EN VIVO: 26 ENERO - 3:00 P.M." |
| `title` | string | — | Small title (e.g. "SERIES 3") |
| `model` | string | — | Main model name (e.g. "BMW 320i") |
| `specs` | string[] | [] | e.g. ["65,000 km", "Lima"] |
| `priceLabel` | string | 'PRECIO BASE' | Label above price |
| `price` | string | — | e.g. "$14,000" |
| `priceUnit` | string | 'USD' | Unit after price |
| `ctaLabel` | string | 'PARTICIPAR AHORA' | Button text |
| `onCtaClick` | () => void | — | CTA click handler |

---

## Usage

```tsx
<HeroFeatured
  imageUrl="/bmw.jpg"
  imageAlt="BMW 320i"
  badge="SUBASTA EN VIVO: 26 ENERO - 3:00 P.M."
  title="SERIES 3"
  model="BMW 320i"
  specs={['65,000 km', 'Lima']}
  price="$14,000"
  priceUnit="USD"
  ctaLabel="PARTICIPAR AHORA"
  onCtaClick={() => {}}
/>
```

---

## DOM Structure

- `.hero` (Kit α container)
  - `.heroImage` (φ-primary region)
  - `.heroDetails` (φ-secondary region)
    - `.heroBadge`
    - `.heroTitle`, `.heroModel`
    - `.heroSpecs`
    - Price block, `.heroCta`

---

## Accessibility

- Use `imageAlt` for the hero image.
- Prefer a single focusable CTA; ensure contrast for badge and price (WCAG 2.1 AA).
