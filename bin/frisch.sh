#!/usr/bin/env bash
# Setzt nur die Versionsnummer neu, ohne zu veroeffentlichen.
# Fuer das Testen waehrend der Arbeit: sonst haelt der Browser das
# alte Stylesheet fest, weil sich die Adresse nicht geaendert hat.
set -euo pipefail
cd "$(dirname "$0")/.."
V="$(date +%Y%m%d%H%M%S)"
perl -0777 -i -pe "s|(href=\"css/[a-z-]+\\.css)(\\?v=\\d+)?\"|\$1?v=$V\"|g" index.html
perl -0777 -i -pe "s|(src=\"js/[a-z-]+\\.js)(\\?v=\\d+)?\"|\$1?v=$V\"|g" index.html
perl -0777 -i -pe "s|((?:src\|href)=\"assets/img/[a-z0-9-]+\\.webp)(\\?v=\\d+)?\"|\$1?v=$V\"|g" index.html
perl -0777 -i -pe "s|(^  version:\\s*')[^']*(')|\${1}$V\${2}|m" js/config.js

# Dieselbe Version fuer jede Stil-Demo unter stile/. Die Schleife
# nimmt sie sich selbst - sonst faellt beim naechsten Stil auf,
# dass hier jemand eine Liste haette pflegen muessen.
for SEITE in stile/*/index.html; do
  perl -0777 -i -pe "s|(href=\"css/[a-z-]+\\.css)(\\?v=\\d+)?\"|\$1?v=$V\"|g" "$SEITE"
  perl -0777 -i -pe "s|(src=\"js/[a-z-]+\\.js)(\\?v=\\d+)?\"|\$1?v=$V\"|g" "$SEITE"
  # Der gemeinsame Kern und die Bilder der Karte muessen mit. Ohne
  # das haelt der Browser eine alte - oder, direkt nach dem Anlegen,
  # eine leere - Fassung fest, und die Seite ist bilderlos.
  perl -0777 -i -pe "s|(\"\\.\\./gemeinsam/kern\\.(?:css\|js))(\\?v=\\d+)?\"|\$1?v=$V\"|g" "$SEITE"
  perl -0777 -i -pe "s|((?:src\|href)=\"bilder/[a-z0-9-]+\\.(?:webp\|jpg\|png))(\\?v=\\d+)?\"|\$1?v=$V\"|g" "$SEITE"
done
echo "Version $V"
