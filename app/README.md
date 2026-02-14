# VMC Subastas — App FLOW³

Implementación del diseño [Prueba Cursor (Figma)](https://www.figma.com/design/1IANLDtvEW9rauM9w5cHqu/Prueba-Cursor?node-id=1-539) usando **solo tokens FLOW³** y **matemática FLOW³** (φ, Fibonacci, degradación de Kits).

**Matemática aplicada:** proporción áurea (φ) en subdivisiones, espaciado Fibonacci, breakpoints 377/610/987 px y degradación α→β→γ→δ. Ver [FLOW3-APPLIED.md](./FLOW3-APPLIED.md).

## Cómo correr

```bash
# Desde la raíz del repo
npm install
cd app && npm run dev
```

Abre http://localhost:5173

**Página del Design System:** http://localhost:5173/design-system  
Ahí verás cada componente del UI Kit con su spec sheet (cuándo usarlo, cómo, tokens, props) y ejemplos en vivo. Desde la app VMC, el enlace "Design System" en el header lleva a esa página.

## FLOW³ usado

- **Sidebar:** ancho `var(--flow-kit-gamma-width)` (233px)
- **Header:** altura `var(--flow-kit-epsilon-height)` (55px) — navbar ε.1
- **Hero:** Kit α (610×377) — auction-featured
- **Filtros:** altura 34px (ε.2), gaps `--flow-space-*`
- **Cards:** Kit γ (233×377) — auction-grid
- **Botones:** altura 55px (ε.1), padding y radius con tokens
- **Espaciado:** solo `--flow-space-xs` a `--flow-space-4xl`
- **Tipografía:** `--flow-text-*`, body 16px
- **Radius / sombras:** `--flow-radius-*`, `--flow-shadow-*`

Colores de marca en `src/theme-vmc.css` (no afectan dimensiones).
