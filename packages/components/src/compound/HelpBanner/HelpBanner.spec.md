# HelpBanner — Spec Sheet

| Property | Value |
|----------|--------|
| **Component** | HelpBanner |
| **Type** | Compound |
| **Layout** | φ-split: icon 1 / content 1.618 |
| **Icon** | Kit δ (144×144) |

---

## FLOW³ Assignment

- **Grid:** `grid-template-columns: 1fr 1.618fr` (FLOW-004).
- **Icon cell:** `--flow-kit-delta-width` × `--flow-kit-delta-height` (144×144).
- **Padding:** `--flow-space-xl`, gap `--flow-space-xl`.
- **CTA:** ε.1 height (55px), `--flow-radius-md`.

---

## Tokens Used

| Use | Token |
|-----|--------|
| Padding | `--flow-space-xl` |
| Gap | `--flow-space-xl` |
| Icon size | `--flow-kit-delta-width`, `--flow-kit-delta-height` |
| Radius | `--flow-radius-lg` |
| CTA height | `--flow-kit-epsilon-height` |
| CTA padding | `--flow-space-lg`, `--flow-space-sm` |
| Typography | `--flow-text-lg`, `--flow-text-sm`, `--flow-text-2xl` (icon) |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | ReactNode | — | Icon or emoji |
| `title` | string | — | e.g. "CENTRO DE AYUDA" |
| `description` | string | — | Body text |
| `ctaLabel` | string | 'IR AL CENTRO DE AYUDA' | Button text |
| `onCtaClick` | () => void | — | CTA handler |
| `className` | string | '' | Root class |
| `theme` | { bg?: string; ctaBg?: string; ctaColor?: string } | {} | Colors |

---

## Usage

```tsx
<HelpBanner
  icon="🎧"
  title="CENTRO DE AYUDA"
  description="Necesitas asistencia con tus ofertas..."
  ctaLabel="IR AL CENTRO DE AYUDA"
  onCtaClick={() => {}}
/>
```
