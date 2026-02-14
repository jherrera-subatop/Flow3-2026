# Footer — Spec Sheet

| Property | Value |
|----------|--------|
| **Component** | Footer |
| **Type** | Compound / layout |
| **Layout** | φ-split columns: 1.618fr 1fr 1fr auto |
| **Max width** | 987px (F16) |

---

## FLOW³ Assignment

- **Grid:** `grid-template-columns: 1.618fr 1fr 1fr auto` (first column φ).
- **Gap:** `--flow-space-2xl`. Padding `--flow-space-2xl`, `--flow-space-xl`.
- **Max width:** `--flow-fib-16` (987px). Bottom bar padding-top `--flow-space-lg`, border `--flow-fib-3`.

---

## Tokens Used

| Use | Token |
|-----|--------|
| Padding | `--flow-space-2xl`, `--flow-space-xl` |
| Gap | `--flow-space-2xl` |
| Max width | `--flow-fib-16` |
| Column gap | `--flow-space-2xl` |
| Link margin | `--flow-space-xs` |
| Heading margin | `--flow-space-md` |
| Border | `--flow-fib-3` |
| Typography | `--flow-text-xs`, `--flow-text-sm` |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brandTitle` | string | — | e.g. "VMC SUBASTAS" |
| `brandSub` | string | — | e.g. "Powered by SUBASTOP.Co" |
| `brandDescription` | string | — | Short description |
| `columns` | { title: string; links: { label: string; href: string }[] }[] | [] | Link columns |
| `copyright` | string | — | Copyright text |
| `bottomLinks` | { label: string; href: string }[] | [] | Cookie policy, sitemap, etc. |
| `className` | string | '' | Root class |
| `theme` | { bg?: string; text?: string; muted?: string } | {} | Colors |

---

## Usage

```tsx
<Footer
  brandTitle="VMC SUBASTAS"
  brandSub="Powered by SUBASTOP.Co"
  brandDescription="Ecosistema digital de subastas..."
  columns={[{ title: 'PLATAFORMA', links: [{ label: 'SubasCars', href: '#' }] }]}
  copyright="© 2026 VMC Subastas..."
  bottomLinks={[{ label: 'Política de Cookies', href: '#' }]}
/>
```
