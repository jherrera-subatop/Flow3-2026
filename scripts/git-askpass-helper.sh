#!/bin/bash
# Git usa este script para obtener usuario y token SIN que tengas que escribir
# en la terminal (cuando el prompt se bloquea). No hace falta escribir nada:
# todo se lee del archivo .git-user-and-token (lo editas en Cursor).
CREDFILE="$(cd "$(dirname "$0")/.." && pwd)/.git-user-and-token"
if [ ! -f "$CREDFILE" ]; then
  echo "" >&2
  exit 1
fi
if echo "$1" | grep -qi "password\|contraseña"; then
  sed -n '2p' "$CREDFILE"
else
  sed -n '1p' "$CREDFILE"
fi
