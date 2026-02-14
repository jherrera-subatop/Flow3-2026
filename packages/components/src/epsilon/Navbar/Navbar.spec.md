# Navbar — Spec Sheet

| Property | Value |
|----------|--------|
| **Component** | Navbar |
| **Kit** | ε (Epsilon) — height |
| **Element** | ε.1 height (55px) |
| **Compound** | navbar |
| **Dimension** | Height 55 px, width 100% |

---

## FLOW³ Assignment

- **Height:** `--flow-kit-epsilon-height` (55px). Full width (viewport).
- **Padding x:** `--flow-space-xl`, gap between items `--flow-space-xl`.
- **Constituents:** logo (β.8), nav items (ε.2), actions (δ.3), avatar (β.5) per manifest.

---

## Tokens Used

| Use | Token |
|-----|--------|
| Height | `--flow-kit-epsilon-height` |
| Padding x | `--flow-space-xl` |
| Gap | `--flow-space-xl` |
| Border | `--flow-fib-3` |
| Typography | `--flow-text-base` |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | — | Right-aligned content (e.g. Button "Ingresa") |
| `className` | string | '' | Root class |
| `theme` | { bg?: string; border?: string } | {} | Colors |

---

## Usage

```tsx
<Navbar>
  <Button href="/login">Ingresa →</Button>
</Navbar>
```
