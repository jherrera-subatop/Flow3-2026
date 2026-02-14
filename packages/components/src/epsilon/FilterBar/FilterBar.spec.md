# FilterBar — Spec Sheet

| Property | Value |
|----------|--------|
| **Component** | FilterBar |
| **Kit** | ε (Epsilon) — height |
| **Element** | ε.2 height (34px) for chips |
| **Compound** | filter-bar |
| **Dimension** | Height 34 px per chip |

---

## FLOW³ Assignment

- **Chip height:** `--flow-fib-9` (34px). Gap `--flow-space-md`, `--flow-space-sm`.
- **Label:** `--flow-text-sm`. Chips use ε.2 height.

---

## Tokens Used

| Use | Token |
|-----|--------|
| Chip height | `--flow-fib-9` |
| Gap (bar) | `--flow-space-md` |
| Gap (chips) | `--flow-space-sm` |
| Padding chip | `--flow-space-md` |
| Radius | `--flow-radius-md` |
| Font | `--flow-text-sm` |
| Transition | `--flow-duration-fast`, `--flow-ease-out` |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | 'FILTRAR POR' | Label before chips |
| `options` | { id: string; label: string }[] | [] | Filter options |
| `activeId` | string | — | Active option id |
| `onChange` | (id: string) => void | — | When selection changes |
| `className` | string | '' | Root class |
| `theme` | { labelColor?: string; activeBg?: string; inactiveBg?: string; inactiveColor?: string } | {} | Colors |

---

## Usage

```tsx
<FilterBar
  label="FILTRAR POR"
  options={[
    { id: 'all', label: 'TODOS' },
    { id: 'auction', label: 'SUBASTA' },
  ]}
  activeId="all"
  onChange={(id) => {}}
/>
```
