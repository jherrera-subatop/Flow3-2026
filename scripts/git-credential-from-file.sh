#!/bin/bash
# Git credential helper: lee usuario y token de .git-user-and-token.
# Git NUNCA pide nada por terminal: llama a este script y listo.
action="$1"
if [ "$action" != "get" ]; then
  exit 0
fi
# Consumir stdin (protocol, host, etc.)
while read -r _; do
  :
done
CREDFILE="$(cd "$(dirname "$0")/.." && pwd)/.git-user-and-token"
if [ ! -f "$CREDFILE" ]; then
  exit 1
fi
user=$(sed -n '1p' "$CREDFILE" | tr -d '\r')
pass=$(sed -n '2p' "$CREDFILE" | tr -d '\r')
[ -z "$user" ] && exit 1
[ -z "$pass" ] && exit 1
echo "username=$user"
echo "password=$pass"
