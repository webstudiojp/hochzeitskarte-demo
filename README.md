# Digitale Hochzeitskarte — Demo

Vorlage für eine digitale Hochzeitseinladung, die per QR-Code geöffnet wird.
Statische Seite, kein Build-Schritt, kein Framework.

**Demo-Datensatz Furkan & Dilara ist frei erfunden** — Paar, Termin,
Location und Bankverbindung existieren nicht.

## Aufbau

| Datei | Inhalt |
|---|---|
| `js/config.js` | Alle Inhalte. Pro Paar wird nur diese Datei angefasst. |
| `js/hero.js` | Die Fahrt: Wagen, Perlenspur, Schriftzug auf der Fahrbahn. |
| `js/karte.js` | Countdown, Kalenderdatei, Route, Formular, Galerie. |
| `assets/img/` | Kulisse, Wagen, Rahmen und Fotos (WebP). |
| `assets/fonts/` | Schriften lokal, keine Anfragen an Google. |

## Zum Ausprobieren

- `?namen=Lea+%26+Tom` — setzt das Paar ohne Datei-Änderung
- `?schrift=strasse` / `?schrift=quer` — andere Ausrichtung des Schriftzugs

## Bildmaterial

`paar1`–`paar4` sind die echten Fotos des Paares und gehören in die Galerie.
`g1`–`g5` sind generierte Ersatzmotive (Brautstrauß, Ringe, Blumenbogen,
Festtafel, Lichterketten) für Paare, die keine eigenen Bilder liefern —
sie werden derzeit nicht eingebunden.

## Noch nicht angebunden

Rückmeldung und Gästealbum sind vollständige Oberflächen ohne Server:
Eingaben werden geprüft, aber nicht versendet oder gespeichert.
