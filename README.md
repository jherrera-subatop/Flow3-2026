# 🌊 FLOW³ Design System

A mathematical design system based on the **Golden Ratio** (φ = 1.618...) and the **Fibonacci sequence**. All dimensions and spacing use Fibonacci numbers; no arbitrary values.

**Repository:** [github.com/jherrera-subatop/Flow3-2026](https://github.com/jherrera-subatop/Flow3-2026)

---

## The 5 Kits

| Kit   | Dimensions   | Shape            | Use case                |
|-------|--------------|------------------|-------------------------|
| **α** | 610×377 px   | Golden Rectangle | Hero components         |
| **β** | 377×377 px   | Square           | Profile cards, thumbnails|
| **γ** | 233×377 px   | Golden Rectangle | Auction cards, panels   |
| **δ** | 144×144 px   | Square           | Icons, avatars, buttons |
| **ε** | 89×55 px     | Golden Rectangle | Badges, tags, micro UI  |

---

## Quick start

```bash
# Install (when dependencies are added)
npm install

# Build design tokens → packages/tokens/dist/flow3-tokens.css
npm run build:tokens

# Full build (all packages)
npm run build
```

Use tokens in CSS: `var(--flow-space-md)`, `var(--flow-kit-alpha-width)`, etc.

---

## Project structure

```
Flow3-2026/
├── .cursor/rules/       # FLOW³ AI rules (00–03)
├── packages/
│   ├── tokens/          # Fibonacci & Kit tokens → flow3-tokens.css
│   ├── components/      # UI by Kit (alpha…epsilon)
│   └── lint/            # Compliance linter
├── figma/
└── package.json
```

---

## Rules (summary)

1. **No arbitrary values** – only Fibonacci numbers (exception: 16px body text).
2. **Token-only** – use `var(--flow-*)`, never raw pixels for layout/spacing.
3. **Kit-first sizing** – components sized by Kit, not ad-hoc constraints.
4. **Fibonacci spacing** – use `--flow-space-*` tokens only.
5. **Kit degradation** – responsive by stepping down Kits (α→β→γ→δ→ε), not fluid scaling.
6. **Naming** – `--flow-[tier]-[category]-[variant]`.

---

## Connecting to the project

See [COMO-CONECTARSE-AL-PROYECTO.md](./COMO-CONECTARSE-AL-PROYECTO.md) for setup and GitHub connection.
