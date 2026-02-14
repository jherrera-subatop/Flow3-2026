# Cómo conectarse al proyecto (repositorio público)

Guía paso a paso: desde abrir Cursor hasta tener el proyecto conectado a GitHub.

**Repositorio:** https://github.com/jherrera-subatop/Flow3-2026  
**Es público:** no necesitas cuenta en GitHub para descargar y trabajar.

---

## Antes de empezar: tener instalado

1. **Cursor** – [Descargar Cursor](https://cursor.com). Instala y ábrelo.
2. **Git** – [Descargar Git](https://git-scm.com/downloads). Instala con las opciones por defecto.  
   Si Cursor ya estaba abierto, ciérralo y vuelve a abrirlo después de instalar Git.

---

## Opción A: Clonar con la Paleta de comandos

### Paso 1: Abrir Cursor

Abre Cursor (doble clic en el icono o desde el menú de inicio).

### Paso 2: Abrir la Paleta de comandos

- **Windows:** mantén pulsado **Ctrl** y **Shift** y luego pulsa **P**.
- **Mac:** mantén pulsado **Cmd** y **Shift** y luego pulsa **P**.

Verás un cuadro de texto arriba (o en el centro) donde se escribe.

### Paso 3: Pedir clonar un repositorio

En ese cuadro escribe:

```
Git: Clone
```

Cuando aparezca la opción **Git: Clone** en la lista, haz clic en ella o selecciónala con las flechas y pulsa **Enter**.

### Paso 4: Pegar la URL del repositorio

Te pedirá **“Provide repository URL”** o **“URL del repositorio”**. Pega exactamente esto (sin espacios antes ni después):

```
https://github.com/jherrera-subatop/Flow3-2026.git
```

Pulsa **Enter**.

### Paso 5: Elegir la carpeta donde guardar

Te preguntará en qué carpeta quieres guardar el proyecto. Elige una (por ejemplo **Documentos** o **Escritorio**) y confirma con **Seleccionar** / **Abrir** / **Open**.  
Se creará dentro una carpeta llamada **Flow3-2026**.

### Paso 6: Abrir el proyecto

Cuando termine de clonar, Cursor puede preguntar si quieres abrir el repositorio clonado. Elige **Abrir** (o **Open**).  
Si no pregunta nada: en el menú **File** → **Open Folder…** y entra en la carpeta **Flow3-2026** que se acaba de crear.

### Paso 7: Comprobar la conexión

- En la barra lateral izquierda deberías ver los archivos del proyecto.
- Abajo a la izquierda suele aparecer algo como **main** (rama de Git).  
  Eso significa que **ya tienes el proyecto conectado al GitHub del proyecto**.

---

## Opción B: Clonar con la Terminal de Cursor (si la Opción A no aparece)

Si no ves **Git: Clone** en la paleta o da error, usa la terminal dentro de Cursor.

### Paso 1: Abrir Cursor y abrir la Terminal

1. Abre **Cursor**.
2. En el menú superior: **Terminal** → **New Terminal** (Nueva terminal).  
   O atajo: **Ctrl+`** (Windows) / **Ctrl+Ñ** (Windows con teclado español) o **Cmd+J** (Mac) y luego pestaña **Terminal**.

Se abrirá una ventana abajo con una línea donde se escribe (prompt).

### Paso 2: Ir a la carpeta donde quieres el proyecto

Escribe uno de estos y pulsa **Enter**:

- **Windows (Documentos):**  
  `cd Documentos`
- **Mac (Documentos):**  
  `cd ~/Documentos`

(Si quieres otra carpeta, cambia `Documentos` por el nombre de esa carpeta.)

### Paso 3: Clonar el repositorio

Copia y pega este comando tal cual y pulsa **Enter**:

```
git clone https://github.com/jherrera-subatop/Flow3-2026.git
```

Espera a que termine. Se creará la carpeta **Flow3-2026** dentro de la carpeta donde estabas.

### Paso 4: Abrir esa carpeta en Cursor

1. Menú **File** → **Open Folder…** (Abrir carpeta).
2. Navega hasta la carpeta **Flow3-2026** (estará dentro de Documentos o donde hayas hecho el Paso 2).
3. Selecciónala y **Abrir** / **Open**.

Listo: el proyecto está abierto en Cursor y conectado a GitHub.

---

## Resumen rápido

**Opción A (Paleta de comandos)**  
1. Abrir Cursor.  
2. **Ctrl+Shift+P** (Windows) o **Cmd+Shift+P** (Mac).  
3. Escribir **Git: Clone** → Enter.  
4. Pegar `https://github.com/jherrera-subatop/Flow3-2026.git` → Enter.  
5. Elegir carpeta (ej. Documentos) → confirmar.  
6. Si pregunta, abrir el repositorio clonado; si no, **File** → **Open Folder…** → carpeta **Flow3-2026**.

**Opción B (Terminal)**  
1. Abrir Cursor → **Terminal** → **New Terminal**.  
2. `cd Documentos` (o `cd ~/Documentos` en Mac) → Enter.  
3. `git clone https://github.com/jherrera-subatop/Flow3-2026.git` → Enter.  
4. **File** → **Open Folder…** → elegir la carpeta **Flow3-2026**.

---

## Subir cambios (push) sin escribir contraseña

Si al hacer **git push** te pide usuario y contraseña y en el terminal no te deja escribir (o no quieres poner la contraseña cada vez), haz **una sola vez** una de estas dos opciones.

### Opción 1: Token de GitHub (recomendado)

1. En GitHub: **Settings** (tu foto) → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**.  
2. Ponle un nombre (ej. "Cursor Flow3"), marca el permiso **repo** y genera el token.  
3. **Copia el token** (solo se muestra una vez).  
4. En tu Mac, en la terminal (fuera de Cursor), ejecuta una sola vez:
   ```bash
   git config --global credential.helper osxkeychain
   ```
   La próxima vez que hagas `git push`, te pedirá **usuario** (tu usuario de GitHub) y **contraseña**: ahí **pega el token** en lugar de la contraseña. El Mac lo guardará en el llavero y no tendrás que volver a ponerlo.

### Opción 2: SSH

1. Generar una llave SSH (en terminal):  
   `ssh-keygen -t ed25519 -C "tu@email.com"`  
   (Enter para aceptar la ruta; puedes dejar la passphrase vacía.)  
2. Ver la llave pública:  
   `cat ~/.ssh/id_ed25519.pub`  
   Cópiala entera.  
3. En GitHub: **Settings** → **SSH and GPG keys** → **New SSH key** → pega la llave y guarda.  
4. En el proyecto Flow3-2026, cambiar el remote a SSH (solo una vez):  
   `git remote set-url origin git@github.com:jherrera-subatop/Flow3-2026.git`  
   A partir de ahí, `git push origin main` usará la llave y no pedirá contraseña.

Después de configurar **Opción 1** o **Opción 2**, cuando pidas en Cursor **"sube a github"**, el asistente podrá ejecutar el push por ti y no te pedirá la contraseña en el terminal.

---

## Si algo falla

- **“Git no encontrado” / “git is not recognized”:** instala Git desde [git-scm.com](https://git-scm.com/downloads), reinicia Cursor y repite.
- **No aparece “Git: Clone”:** usa la **Opción B** (Terminal).
- **Error al clonar:** comprueba que la URL sea exactamente  
  `https://github.com/jherrera-subatop/Flow3-2026.git`  
  sin espacios. Si sigue fallando, copia el mensaje de error y compártelo.

---

**Enlace al repositorio:** https://github.com/jherrera-subatop/Flow3-2026
