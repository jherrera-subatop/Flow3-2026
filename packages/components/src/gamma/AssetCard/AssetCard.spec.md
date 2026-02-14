# AssetCard — Spec Sheet

| Property | Value |
|----------|--------|
| **Component** | AssetCard |
| **Kit** | γ (Gamma) |
| **Element** | γ.1 |
| **Compound** | auction-grid |
| **Dimensions** | 233 × 377 px |
| **PHI level** | PHI1 |

---

## FLOW³ Assignment

- **Kit:** Gamma — golden rectangle (233×377). Aspect 0.618 : 1.
- **Vertical φ-split (FLOW-004):** Image 233px (F13) + body 144px (F12) = 377. Ratio 233/144 ≈ φ.
- **Degradation:** γ → β (377×377) at 987px; γ → δ (144×144) at 377px.
- **Constituent elements:** β.2 (thumbnail 233×233), ε.2, ε.1, ε.3, δ.5 (small icon). Action button: δ (144×144) or ε.

---

## Tokens Used

| Use | Token |
|-----|--------|
| Container | `--flow-kit-gamma-width`, `--flow-kit-gamma-height` |
| Image height | `--flow-kit-gamma-width` (233) |
| Body min-height | `--flow-kit-delta-width` (144) |
| Padding | `--flow-space-md` |
| Gap | `--flow-space-xs` |
| Radius | `--flow-radius-md` |
| Shadow | `--flow-shadow-md`, `--flow-shadow-lg` (hover) |
| Action button | `--flow-kit-delta-height` (144×144 circle) |
| Typography | `--flow-text-base`, `--flow-text-xs`, `--flow-text-lg` |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageUrl` | string | — | Card image |
| `imageAlt` | string | '' | Alt text |
| `title` | string | — | e.g. "TOYOTA HILUX" |
| `meta` | string | — | e.g. "2024 • LIMA • DIESEL" |
| `offerLabel` | string | 'OFERTA INICIAL' | Label above price |
| `price` | string | — | e.g. "US$ 17,999" |
| `onActionClick` | () => void | — | Arrow button click |
| `actionAriaLabel` | string | 'Ver detalle' | A11y for action button |
| `className` | string | '' | Root class |

---

## Usage

```tsx
<AssetCard
  imageUrl="/hilux.jpg"
  title="TOYOTA HILUX"
  meta="2024 • LIMA • DIESEL"
  price="US$ 17,999"
  onActionClick={() => {}}
/>
```
