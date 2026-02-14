# Cómo usar el MCP de Figma en Cursor

Guía para conectar Figma Desktop con Cursor y generar código FLOW³ desde tus diseños.

---

## 1. Activar el servidor MCP en Figma Desktop

1. **Abre la app de escritorio de Figma** (no el navegador).
2. **Abre o crea un archivo de diseño** (Design file).
3. **Activa Dev Mode:** en la barra inferior haz clic en **Dev Mode** o usa **Shift + D**.
4. En el panel derecho (Inspect), busca la sección **MCP server**.
5. Haz clic en **Enable desktop MCP server**.

Deberías ver un mensaje abajo indicando que el servidor está activo en `http://127.0.0.1:3845/mcp`.

---

## 2. Configurar Cursor para conectar con Figma

1. En Cursor: **Cursor → Settings → Cursor Settings** (o ⌘ + ,).
2. Ve a la pestaña **MCP**.
3. Pulsa **+ Add new global MCP server** (o "Add new MCP server").
4. Añade esta configuración y guarda:

```json
{
  "mcpServers": {
    "figma-desktop": {
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}
```

> **Nota:** Si no conecta, en Figma (al activar el MCP) verás el puerto exacto; puede ser 3845 u otro. Úsalo en la URL.

5. **Reinicia Cursor** si hace falta para que cargue el servidor.

---

## 3. Cómo usar el MCP (dos formas)

### Opción A: Por selección (recomendada)

1. **En Figma Desktop:** selecciona el frame o capa que quieres implementar.
2. **En Cursor:** abre el chat (Agent mode si lo tienes).
3. **Escribe un prompt**, por ejemplo:
   - *"Genera código de mi selección de Figma usando FLOW³ tokens"*
   - *"Implementa mi selección con React y var(--flow-*)"*
   - *"Analiza mi selección de Figma y dime dimensiones y Kit FLOW³"*

El MCP enviará a Cursor el contexto de **lo que tienes seleccionado** en Figma.

### Opción B: Por enlace

1. En Figma, clic derecho en el frame o capa → **Copy link to selection**.
2. Pega ese enlace en el chat de Cursor y pide, por ejemplo:
   - *"Genera código de este diseño: [pegar URL]"*

El MCP usa el `node-id` del enlace para saber qué nodo analizar.

---

## 4. Prompts útiles para FLOW³

Para que el código salga con el design system FLOW³, sé explícito:

- *"Genera mi selección de Figma en React + TypeScript usando SOLO tokens FLOW³: var(--flow-space-*), var(--flow-kit-*), var(--flow-radius-*). Sin valores en px."*
- *"Analiza mi selección: dime dimensiones, qué Kit (α,β,γ,δ,ε) le corresponde y qué ajustes hay que hacer para ser FLOW³ compliant."*
- *"Implementa este componente en packages/components/src/gamma/ usando el compound auction-grid (γ.1, 233×377)."*

Cuanto más concreto sea el prompt, mejor alineado estará con FLOW³.

---

## 5. Comprobar que el MCP funciona

- En el chat de Cursor, escribe algo como: **"¿Qué herramientas de Figma MCP tienes?"** o **"#get_design_context"**.
- Si el MCP está bien configurado, deberías ver herramientas como `get_design_context`, `get_screenshot`, `get_metadata`, etc.

Si no aparecen:

- Comprueba que Figma Desktop está abierto y el MCP está **Enable** en Dev Mode.
- Comprueba la URL del servidor (puerto 3844 o 3845).
- Reinicia Figma y Cursor.

---

## 6. Resumen rápido

| Paso | Dónde | Acción |
|------|--------|--------|
| 1 | Figma Desktop | Dev Mode (Shift+D) → Enable desktop MCP server |
| 2 | Cursor | Settings → MCP → Add server → `http://127.0.0.1:3845/mcp` |
| 3 | Figma | Selecciona un frame |
| 4 | Cursor | "Genera código de mi selección con FLOW³ tokens" |

---

**Referencia:** [Figma MCP – Desktop server](https://developers.figma.com/docs/figma-mcp-server/local-server-installation), [Cursor MCP](https://docs.cursor.com/context/model-context-protocol).
