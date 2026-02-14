# Sidebar — Spec Sheet

| Property | Value |
|----------|--------|
| **Component** | Sidebar |
| **Kit** | γ (Gamma) — width only |
| **Dimension** | Width 233 px |
| **Role** | Navigation panel |

---

## FLOW³ Assignment

- **Width:** `--flow-kit-gamma-width` (233px). Content uses ε.1 height for interactive rows where applicable.
- **Spacing:** `--flow-space-lg` (padding), `--flow-space-xl` (gap between blocks), `--flow-space-xs` (between nav items).
- **Responsive:** At 610px can switch to horizontal/full-width (layout responsibility).

---

## Tokens Used

| Use | Token |
|-----|--------|
| Width | `--flow-kit-gamma-width` |
| Padding | `--flow-space-lg` |
| Gap (blocks) | `--flow-space-xl` |
| Gap (nav items) | `--flow-space-xs` |
| Item padding | `--flow-space-sm`, `--flow-space-md` |
| Radius | `--flow-radius-md` |
| Typography | `--flow-text-lg`, `--flow-text-xs`, `--flow-text-base` |
| Transition | `--flow-duration-fast`, `--flow-ease-out` |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logoTitle` | string | — | e.g. "VMC SUBASTAS" |
| `logoSub` | string | — | e.g. "Powered by SUBASTOP.Co" |
| `navItems` | { label: string; href?: string; icon?: string }[] | [] | Main nav links |
| `supportLabel` | string | 'SOPORTE' | Section label |
| `supportItems` | { label: string; href?: string }[] | [] | Support links |
| `className` | string | '' | Root class |
| `theme` | { bg?: string; text?: string; muted?: string; itemHover?: string } | {} | Colors |

---

## Usage

```tsx
<Sidebar
  logoTitle="VMC SUBASTAS"
  logoSub="Powered by SUBASTOP.Co"
  navItems={[
    { label: 'Mañana', href: '#', icon: '📅' },
    { label: 'Tipo de oferta', href: '#' },
  ]}
  supportLabel="SOPORTE"
  supportItems={[{ label: 'Centro de ayuda', href: '#' }]}
/>
```
