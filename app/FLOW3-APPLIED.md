# FLOW³ — Matemática aplicada en esta app

Este documento describe **qué matemática FLOW³** está aplicada en la implementación de VMC Subastas.

---

## 1. Proporción áurea (φ = 1.618...)

- **φ** y **1/φ ≈ 0.618** se usan para **subdivisiones internas** (regla FLOW-004).
- Donde antes había 50/50, ahora hay **61.8% / 38.2%** (ratio φ : 1).

### Dónde se usa φ

| Componente | Aplicación |
|------------|------------|
| **Hero** | `grid-template-columns: 1.618fr 1fr` → imagen 61.8%, detalles 38.2%. |
| **Cards γ.1** | Altura imagen 233px (F13) + cuerpo 144px (F12) = 377. Ratio 233/144 ≈ φ. |
| **Banner ayuda** | `grid-template-columns: 1fr 1.618fr` → icono 38.2%, texto 61.8%. |
| **Footer** | `grid-template-columns: 1.618fr 1fr 1fr auto` → columna marca más ancha (φ). |

---

## 2. Fibonacci en dimensiones

- **Anchos y alturas** salen de los Kits o de la escala Fibonacci.
- **Espaciado** solo con tokens `--flow-space-*` (2, 3, 5, 8, 13, 21, 34, 55, 89, 144 px).
- **Tipografía** con `--flow-text-*` (8, 13, 16, 21, 34, 55, 89 px) y **line-height 1.618** (φ) donde aplica.

### Kits usados

| Kit | Dimensiones | Uso en la app |
|-----|-------------|----------------|
| **α** | 610×377 px | Hero principal (subdivisión φ). |
| **β** | 377×377 px | Hero/cards en tablet (degradación). |
| **γ** | 233×377 px | Sidebar (233), cards (233×377), contenido. |
| **δ** | 144×144 px | Botón circular en card, icono banner, hero/cards en móvil pequeño. |
| **ε** | 89×55 px | Altura header, botones (55 px), chips. |

---

## 3. Degradación por breakpoints (FLOW-006)

La respuesta ante el ancho de pantalla sigue **Kit degradation**, no escalado fluido arbitrario.

| Breakpoint (max-width) | Hero | Cards | Sidebar |
|------------------------|------|-------|--------|
| **987 px** (F16) | α → **β** (377×377) | γ → **β** (377×377) | γ (233) |
| **610 px** (F15) | β → **γ** (233×377), layout en columna | β → **γ**, 1 columna | Horizontal, ancho 100% |
| **377 px** (F14) | γ → **δ** (144×144) | γ → **δ** (144×144) | — |

Los valores 377, 610, 987 son **Fibonacci** (F14, F15, F16).

---

## 4. Contenido y anchos máximos

- **Área de contenido principal:** `max-width: 987px` (F16).
- **Footer:** mismo `max-width: 987px` y columnas con ratio φ en la primera columna.

---

## 5. Resumen de reglas FLOW³ cubiertas

- **FLOW-001** — Dimensiones solo Fibonacci (o 16 px en body).
- **FLOW-002** — Uso de `var(--flow-*)`, sin px sueltos en layout/espaciado.
- **FLOW-003** — Componentes dentro de su Kit (α, β, γ, δ, ε).
- **FLOW-004** — Subdivisión φ en Hero, cards, banner y footer.
- **FLOW-005** — Espaciado solo con escala Fibonacci (`--flow-space-*`).
- **FLOW-006** — Responsive por degradación de Kits en 377 / 610 / 987 px.
- **FLOW-007** — Nombres de variables `--flow-*`.
- **FLOW-008** — Uso de elementos/coordenadas coherentes con los Kits.

Si quieres, en el siguiente paso podemos revisar juntos un componente concreto (por ejemplo Hero o Cards) y ajustar más fino (por ejemplo más variantes φ o más niveles de degradación).
