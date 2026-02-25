# Dashboard JHL

## Cómo ejecutar (evitar 404)

1. **Abre la terminal en la raíz del proyecto** (la carpeta donde está `package.json`).
2. Instala dependencias si hace falta: `npm install`
3. Arranca el servidor: `npm run dev`
4. **Abre en el navegador la URL que muestra la terminal** (ej: `http://localhost:3000` o `http://localhost:3001` si el puerto está ocupado).

Si ves 404, comprueba que estás en la raíz del proyecto (`Dashboard-JC`) y que la URL es exactamente la que indica `npm run dev`.

## Rutas válidas

- `/` — Overview
- `/ventas` — Ventas
- `/deudores` — Deudores
- `/marketing` — Marketing

`/dashboard` y `/inicio` redirigen a `/`.
