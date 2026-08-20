#!/usr/bin/env bash
# Setzt eine frische Versionsnummer an alle eigenen Dateien und stellt live.
# Ohne das liefern Browser tagelang die alte Fassung aus dem Zwischenspeicher -
# beim Kunden hiesse das: geaenderte Uhrzeit, Gaeste sehen die alte.
set -euo pipefail
cd "$(dirname "$0")/.."

V="$(date +%Y%m%d%H%M)"

# Version an Stylesheets und Skripte in der index.html
perl -0777 -i -pe "s|(href=\"css/[a-z-]+\\.css)(\\?v=\\d+)?\"|\$1?v=$V\"|g" index.html
perl -0777 -i -pe "s|(src=\"js/[a-z-]+\\.js)(\\?v=\\d+)?\"|\$1?v=$V\"|g" index.html
# Bilder, die direkt im HTML stehen
perl -0777 -i -pe "s|(src=\"assets/img/[a-z0-9-]+\\.webp)(\\?v=\\d+)?\"|\$1?v=$V\"|g" index.html
# Dieselbe Version fuer die Bilder, die erst aus dem Skript geladen werden
perl -0777 -i -pe "s|(^  version:\\s*')[^']*(')|\${1}$V\${2}|m" js/config.js

echo "Version $V gesetzt."
git add -A
git commit -q -m "${1:-Aktualisierung}

Version $V

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>" || { echo "Nichts zu committen."; exit 0; }
git push -q origin main
echo "Live. In etwa einer Minute ausgeliefert:"
echo "https://webstudiojp.github.io/hochzeitskarte-demo/"
