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

## Sprachen

Alles Übersetzbare steht in `js/config.js` unter `sprachen`. Angaben, die in
jeder Sprache gleich sind — Namen, Termine, Uhrzeiten, Adresse, Bankverbindung —
stehen darüber und werden nur einmal gepflegt. Eine dritte Sprache ergänzt man,
indem man einen Block kopiert und den Schlüssel in `sprachfolge` einträgt.

Die Sprache richtet sich nach der Wahl des Gastes, sonst nach `?lang=tr` in der
Adresse, sonst nach der Browsersprache, sonst nach `standardsprache`.

## Musik

Datei als `assets/audio/musik.mp3` ablegen — siehe den Hinweis in diesem Ordner,
besonders zur Lizenzfrage. Ohne Datei bleibt der Notenknopf verborgen und die
Seite funktioniert vollständig.

## Vorschau beim Teilen

Die Open-Graph-Angaben stehen im Kopf der `index.html`, das Bild ist
`assets/img/vorschau.jpg` (1200×630). **Bei jedem neuen Projekt müssen dort die
eigene Adresse und das eigene Vorschaubild eingetragen werden** — Messenger
ignorieren relative Pfade.

## Zum Ausprobieren

- `?namen=Lea+%26+Tom` — setzt das Paar ohne Datei-Änderung
- `?lang=tr` / `?lang=de` — Sprache erzwingen
- `?schrift=strasse` / `?schrift=quer` — andere Ausrichtung des Schriftzugs

## Veröffentlichen

    ./bin/veroeffentlichen.sh "Was geändert wurde"

Setzt eine frische Versionsnummer an alle eigenen Dateien und stellt live.
Ohne das liefern Browser tagelang die alte Fassung aus dem Zwischenspeicher.

## Bildmaterial

`paar1`–`paar4` sind die echten Fotos des Paares und gehören in die Galerie.
`g1`–`g5` sind generierte Ersatzmotive (Brautstrauß, Ringe, Blumenbogen,
Festtafel, Lichterketten) für Paare, die keine eigenen Bilder liefern —
sie werden derzeit nicht eingebunden.

## Noch nicht angebunden

Rückmeldung und Gästealbum sind vollständige Oberflächen ohne Server:
Eingaben werden geprüft, aber nicht versendet oder gespeichert.
