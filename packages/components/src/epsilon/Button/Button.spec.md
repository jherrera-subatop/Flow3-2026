# Button — Spec Sheet

| Property | Value |
|----------|--------|
| **Component** | Button |
| **Kit** | ε (Epsilon) |
| **Sizes** | ε.1 (89×55), ε.2 (55×34) |
| **Elements** | button-lg (55px h), button-md (34px h) |

---

## FLOW³ Assignment

- **ε.1:** height 55px (`--flow-kit-epsilon-height`), min width 89px. Primary CTAs.
- **ε.2:** height 34px (`--flow-fib-9`). Secondary, filter chips.
- **Padding / radius:** `--flow-space-lg`, `--flow-space-md`, `--flow-radius-md`.

---

## Tokens Used

| Use | Token |
|-----|--------|
| Height (lg) | `--flow-kit-epsilon-height` (55px) |
| Height (md) | `--flow-fib-9` (34px) |
| Padding x | `--flow-space-lg`, `--flow-space-md` |
| Padding y | `--flow-space-sm` |
| Gap | `--flow-space-sm` |
| Radius | `--flow-radius-md` |
| Font | `--flow-text-base`, `--flow-text-sm` |
| Transition | `--flow-duration-fast`, `--flow-ease-out` |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | — | Label (and optional icon) |
| `size` | 'lg' \| 'md' | 'lg' | ε.1 (55px) or ε.2 (34px) |
| `variant` | 'primary' \| 'secondary' \| 'ghost' | 'primary' | Visual variant |
| `href` | string | — | If set, renders as `<a>` |
| `onClick` | () => void | — | Click handler |
| `type` | 'button' \| 'submit' | 'button' | Button type |
| `disabled` | boolean | false | Disabled state |
| `className` | string | '' | Root class |
| `theme` | { bg?: string; color?: string } | {} | Override colors |

---

## Usage

```tsx
<Button size="lg" variant="primary">PARTICIPAR AHORA</Button>
<Button size="md" variant="secondary">TODOS</Button>
<Button href="/login">Ingresa →</Button>
```
