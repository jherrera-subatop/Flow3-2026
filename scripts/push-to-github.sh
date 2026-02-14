#!/bin/bash
# Push a GitHub SIN que Git pida usuario/contraseña en la terminal.
# Lee .git-user-and-token y usa la URL con token para el push (no prompt).
set -e
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CREDFILE="$REPO_ROOT/.git-user-and-token"
if [ ! -f "$CREDFILE" ]; then
  echo "ERROR: Crea el archivo .git-user-and-token en la raíz del proyecto."
  echo "  Línea 1: tu usuario de GitHub"
  echo "  Línea 2: tu token"
  exit 1
fi
user=$(sed -n '1p' "$CREDFILE" | tr -d '\r\n')
pass=$(sed -n '2p' "$CREDFILE" | tr -d '\r\n')
if [ -z "$user" ] || [ -z "$pass" ]; then
  echo "ERROR: .git-user-and-token debe tener 2 líneas (usuario y token)."
  exit 1
fi
cd "$REPO_ROOT"
ORIGIN_URL=$(git config --get remote.origin.url)
# Usar URL con token para este push (Git no pide nada)
git remote set-url origin "https://${user}:${pass}@github.com/jherrera-subatop/Flow3-2026.git"
git push -u origin main
# Dejar la URL sin token guardada en el repo
git remote set-url origin "https://github.com/jherrera-subatop/Flow3-2026.git"
# Para que los próximos "git push" usen el archivo y no pidan nada
git config --local credential.helper "!$REPO_ROOT/scripts/git-credential-from-file.sh"
echo "Listo: push a GitHub hecho. Los próximos 'git push' usarán .git-user-and-token sin pedir nada."
