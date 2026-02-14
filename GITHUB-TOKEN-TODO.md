# Push a GitHub SIN que el terminal pida usuario/contraseña

El terminal se bloquea cuando Git pide la contraseña. Esta es la solución que **no usa ese prompt**: un script lee tu usuario y token de un archivo y hace el push por ti.

---

## Solución en 3 pasos (hazlo una vez)

### 1. Archivo con usuario y token (en Cursor)

En la **raíz del proyecto** crea el archivo **`.git-user-and-token`**.

Abre el archivo en Cursor y pon **solo 2 líneas**:

- **Línea 1:** tu usuario de GitHub (ej. `jherrera-subatop`)
- **Línea 2:** tu token (pegado completo, sin espacios)

Ejemplo:

```
jherrera-subatop
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Guarda (Cmd+S). El archivo está en `.gitignore` y no se sube a GitHub.

---

### 2. Dar permiso al script (en la terminal, una vez)

En la terminal de Cursor (o de tu Mac) pega y ejecuta:

```bash
chmod +x /Users/usuario/Flow3-2026/scripts/push-to-github.sh
```

---

### 3. Hacer el push (sin escribir nada cuando pida contraseña)

Siempre que quieras subir a GitHub, ejecuta:

```bash
/Users/usuario/Flow3-2026/scripts/push-to-github.sh
```

Ese script:

- Lee usuario y token de `.git-user-and-token`
- Hace el push usando la URL con token (Git **no** pide usuario ni contraseña)
- Restaura la URL del remote
- Configura el credential helper para que los **próximos** `git push` también usen el archivo

No tienes que escribir nada en ningún prompt.

---

## Después de la primera vez

Tras ejecutar el script una vez, queda configurado el credential helper. Puedes seguir usando:

- **Opción A:** `./scripts/push-to-github.sh` (desde la carpeta del proyecto)
- **Opción B:** `git push origin main` (también usará `.git-user-and-token` y no pedirá nada)

---

## Resumen

| Paso | Dónde | Qué hacer |
|------|--------|-----------|
| 1 | Cursor | Crear `.git-user-and-token` con 2 líneas: usuario y token. Guardar. |
| 2 | Terminal | `chmod +x /Users/usuario/Flow3-2026/scripts/push-to-github.sh` |
| 3 | Terminal | `/Users/usuario/Flow3-2026/scripts/push-to-github.sh` |

Si falta `.git-user-and-token` o tiene líneas vacías, el script te lo dirá. No hace falta escribir nada cuando pida contraseña: el script no usa ese prompt.
