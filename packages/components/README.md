# @flow3/components — FLOW³ UI Kit

Componentes de UI por Kit (α, β, γ, δ, ε), cada uno con **spec sheet** en su carpeta.

## Requisitos

- Cargar **tokens FLOW³** en la app (p. ej. `@import '@flow3/tokens'` o `packages/tokens/dist/flow3-tokens.css`).
- React 18+.

## Componentes

| Componente   | Kit     | Spec sheet | Descripción                    |
|-------------|---------|------------|---------------------------------|
| **HeroFeatured** | α (Alpha) | [alpha/HeroFeatured/HeroFeatured.spec.md](./src/alpha/HeroFeatured/HeroFeatured.spec.md) | Hero 610×377, subdivisión φ |
| **AssetCard**    | γ (Gamma) | [gamma/AssetCard/AssetCard.spec.md](./src/gamma/AssetCard/AssetCard.spec.md) | Card 233×377, auction-grid |
| **Sidebar**      | γ (Gamma) | [gamma/Sidebar/Sidebar.spec.md](./src/gamma/Sidebar/Sidebar.spec.md) | Navegación ancho 233px |
| **Button**       | ε (Epsilon) | [epsilon/Button/Button.spec.md](./src/epsilon/Button/Button.spec.md) | Botón ε.1 (55px) / ε.2 (34px) |
| **Navbar**       | ε (Epsilon) | [epsilon/Navbar/Navbar.spec.md](./src/epsilon/Navbar/Navbar.spec.md) | Barra superior 55px |
| **FilterBar**    | ε (Epsilon) | [epsilon/FilterBar/FilterBar.spec.md](./src/epsilon/FilterBar/FilterBar.spec.md) | Filtros chips 34px |
| **HelpBanner**   | Compound   | [compound/HelpBanner/HelpBanner.spec.md](./src/compound/HelpBanner/HelpBanner.spec.md) | Banner φ-split, icon δ |
| **Footer**       | Compound   | [compound/Footer/Footer.spec.md](./src/compound/Footer/Footer.spec.md) | Pie con grid φ |

## Uso

```tsx
import {
  HeroFeatured,
  AssetCard,
  Sidebar,
  Button,
  Navbar,
  FilterBar,
  HelpBanner,
  Footer,
} from '@flow3/components';

// Asegúrate de tener los tokens cargados (flow3-tokens.css)
```

Cada componente acepta un prop opcional `theme` para colores de marca (fondos, texto, CTAs) sin romper dimensiones FLOW³.

## Estructura por componente

Cada uno vive en su carpeta con:

- `ComponentName.tsx` — React + TypeScript
- `ComponentName.css` — Estilos con `var(--flow-*)` únicamente
- `ComponentName.spec.md` — Spec sheet (Kit, tokens, props, uso)

## Validación

- Dimensiones: solo Fibonacci o Kits.
- Espaciado: solo `--flow-space-*`.
- Subdivisiones: φ donde aplica (FLOW-004).
- Responsive: degradación de Kits en breakpoints 377 / 610 / 987 px.
