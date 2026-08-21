# Digitale Hochzeitskarte — Demo

Vorlage für eine digitale Hochzeitseinladung, die per QR-Code geöffnet wird.
Statische Seite, kein Build-Schritt, kein Framework.

**Demo-Datensatz Furkan & Dilara ist frei erfunden** — Paar, Termin,
Location und Bankverbindung existieren nicht.

## Zwei weitere Stile

Neben der Hauptkarte liegen unter `stile/` zwei eigenstaendige Demos, jede
mit eigenem HTML, CSS und Skript. Sie teilen sich mit der Hauptkarte nur die
lokalen Schriften und laufen ueber denselben Server:

| Adresse | Stil |
|---|---|
| `stile/` | Uebersicht mit beiden Kacheln |
| `stile/eleganz/` | Praegedruck: zwei geprägte Flügel mit Satinschleife, dahinter die vollstaendige Einladung |
| `stile/siegel/` | Wachssiegel aufbrechen, Glitzerherz freirubbeln, Save the Date |

**Eleganz** baut das Ornament nicht als gekachelte Tapete, sondern als halbes
Motiv mit der Achse am Falz — der rechte Fluegel spiegelt den linken, ueber der
goldenen Naht steht dann ein volles Ornament. Die Blindpraegung entsteht in
einem SVG-Filter aus `feSpecularLighting` und einem versetzten dunklen Abzug;
fuer den gespiegelten Fluegel dreht eine zweite Fassung den Lichteinfall mit,
damit ueber beiden Haelften dieselbe Lampe steht. Dasselbe Rankenwerk steht
danach weiss und doppelt gelegt an den Seiten des Himmels.

Die Einladung ist als Heft aufgebaut, nicht als Rolle: jeder Abschnitt hat
seinen eigenen Papierton (Creme, Papier, Blush) und endet in einem gerissenen
Rand, der in der Farbe des *naechsten* Bogens gefuellt ist — so liegt jedes
Blatt sichtbar auf dem darunter. Die Risse sind erzeugt, nicht gezeichnet:
drei Fassungen mit unterschiedlichem Zufallskeim, damit nicht dreimal derselbe
Rand untereinander steht.

Die Abschnitte sind durchnummeriert (01–05) und folgen alle demselben Bau:
Nummer und Titel mittig, der grosse Satz darunter linksbuendig. Diese eine
Asymmetrie traegt die ganze Seite. Das Formular arbeitet mit Linien statt
Kaesten und mit zwei Schaltern statt einer Auswahlliste — auf Papier gibt es
keine Eingabefelder, nur Zeilen, auf die man schreibt.

Die Abschnitte blenden ueber einen `IntersectionObserver` ein. Meldet der sich
nicht — etwa weil die Karte in einem Hintergrundreiter geoeffnet wurde —,
steht nach 1,8 Sekunden trotzdem alles da. Der Auftritt ist Zierrat, der
Inhalt nicht.

**Siegel** rubbelt nicht die ganze Seite frei, sondern nur das Herz: auf der
Leinwand wird ein blaues Glitzerherz gefuellt, ausserhalb der Form bleibt sie
durchsichtig. Gerubbelt wird mit `destination-out`, ausgefranst durch ein paar
Tupfen neben der Spur; die Glitzerspaene springen weg und bleiben liegen.
Umriss und Termin liegen fertig darunter, wie aufgedruckt: Sie tauchen genau
dort auf, wo die Schicht weg ist, nicht erst am Ende — sonst rubbelt der Gast
auf einer leeren Flaeche herum. Beide Formen stammen aus demselben Kaestchen
260x244, damit Fuellung und Umriss deckungsgleich liegen.
Ab 52 % abgetragener Flaeche loest der Rest sich auf,
und aus dem Hinweis wird der Kalenderknopf. Wer gar nicht rubbelt, sieht den
Termin nach neun Sekunden trotzdem — der Kniff ist huebsch, aber er darf
niemanden aussperren.

Der Rauputz im Hintergrund kommt aus `feTurbulence` plus `feDiffuseLighting`.
Das Rauschen muss vorher ueber `feComponentTransfer` gespreizt werden, sonst
hat das Licht kein Gefaelle und die Wand bleibt glatt.

### Bewegung

Beide Stile stehen nie still. Wo etwas gezeichnet ist, bewegt es sich auch:

| Was | Wie |
|---|---|
| Tauben | Koerper und Schwinge sind getrennte Elemente, die Schwinge schlaegt in Dauerschleife; die Himmelstaube zieht dazu in einem Bogen ueber die Wolken |
| Rosenblaetter | 16 Stueck, jedes mit eigenem Weg, Tempo und Anfang — sonst fallen sie im Gleichschritt und das sieht sofort gemacht aus |
| Schleife | Die Baender wiegen, bis jemand tippt; danach uebernimmt der Uebergang des Knotens |
| Praegung | Ein Lichtstreifen wandert alle sieben Sekunden ueber die Fluegel |
| Zierrat | Schnoerkel und Paar-Skizze zeichnen sich Strich fuer Strich, sobald der Bogen ins Bild kommt |
| Zeitleiste | Die Linie waechst von oben, die Rauten springen nacheinander auf |
| Countdown | Kacheln kippen gestaffelt herein, Ziffern rollen beim Wechsel |
| Kalligrafie | Wird geschrieben, nicht eingeblendet: der Anschnitt laeuft von links auf, ein Federpunkt zieht an der Kante mit. Bei verbundener Schreibschrift traegt schon der reine Vorschub die Illusion |
| Wachssiegel | Atmet, und ein Glanzstreif laeuft durch — beschnitten auf die Wachsform, nicht auf ein Rechteck darum |
| Glitzerherz | Schlaegt und funkelt; die Funken sitzen nur dort, wo auch Glitzer liegt, geprueft gegen dieselbe Herzform |

Zwei Dinge, die dabei wichtig waren:

Ein `<use>` erzeugt einen Schattenbaum, in den kein Selektor hineinreicht.
Die Schwinge der Taube ist darum ein eigenes Element im Dokument, kein Teil
der Figur in der Ablage. `stroke-dasharray` dagegen wird *vererbt* und wirkt
auch im Schattenbaum — so zeichnet sich der Schnoerkel, obwohl er ueber `<use>`
geholt wird. Mit `pathLength="1"` genuegt dafuer ein einziger Wert fuer alle
Striche, egal wie lang sie wirklich sind.

Und: unsichtbarer Text darf nie der Ruhezustand sein. Der Anschnitt der
Kalligrafie steht deshalb nicht in der Grundregel, sondern im ersten Schritt
des Ablaufs (`animation-fill-mode: both`). Laeuft der Ablauf nie — abgeschaltete
Animationen, fehlendes `clip-path`, eine in einem Hintergrundreiter
eingefrorene Zeitachse —, steht die Zeile einfach da, statt zu verschwinden.
Dasselbe gilt fuer jede Zeile, die mit `opacity` einsteigt.

Und: der Herzschlag skaliert die Rubbelflaeche. Die Kratzer werden deshalb
anteilig aus der gemessenen Flaeche umgerechnet statt fest ueber das
Pixelverhaeltnis — sonst laege die Spur neben dem Finger. Sobald jemand
rubbelt, hoert der Schlag ausserdem auf: ein Ziel, das unter dem Finger
wegatmet, ist kein gutes Ziel.

Alles zusammen haengt an `prefers-reduced-motion`. Wer Bewegung reduziert hat,
bekommt beide Karten vollstaendig, aber ruhig.

Beide Stile bringen ihre Inhalte oben im Skript in einem `DATEN`-Block mit;
fuer ein neues Paar wird nur dieser angefasst. Die Kalenderdatei entsteht in
beiden Faellen im Browser, ohne Server.

## Aufbau

| Datei | Inhalt |
|---|---|
| `js/config.js` | Alle Inhalte. Pro Paar wird nur diese Datei angefasst. |
| `js/hero.js` | Die Fahrt: Wagen, Perlenspur, Schriftzug auf der Fahrbahn. |
| `js/karte.js` | Countdown, Kalenderdatei, Route, Formular, Galerie. |
| `assets/img/` | Kulisse, Wagen, Rahmen und Fotos (WebP). |
| `assets/fonts/` | Schriften lokal, keine Anfragen an Google. Cormorant liegt auch kursiv vor — der Titel im Stil `siegel` braucht eine echte Kursive, keine geschraegte. |

## Sprachen

Alles Übersetzbare steht in `js/config.js` unter `sprachen`. Angaben, die in
jeder Sprache gleich sind — Namen, Termine, Uhrzeiten, Adresse, Bankverbindung —
stehen darüber und werden nur einmal gepflegt. Eine dritte Sprache ergänzt man,
indem man einen Block kopiert und den Schlüssel in `sprachfolge` einträgt.

Die Sprache richtet sich nach der Wahl des Gastes, sonst nach `?lang=tr` in der
Adresse, sonst nach der Browsersprache, sonst nach `standardsprache`.

## Musik

Eingebunden ist ein Ney-Solo (türkische Rohrflöte) unter **CC0 1.0** —
kommerziell nutzbar, ohne Namensnennung, ohne Share-Alike.
Quelle und Bearbeitung stehen in `assets/audio/HIER-MUSIK-ABLEGEN.txt`.

Sie startet, wenn der Gast den Umschlag antippt — vorher lässt kein Browser
Ton zu — blendet sanft ein und lässt sich über den Notenknopf abschalten.
Diese Entscheidung wird gemerkt. Zum Tauschen einfach `assets/audio/musik.mp3`
ersetzen; ohne Datei bleibt der Knopf verborgen.

## Vorschau beim Teilen

Die Open-Graph-Angaben stehen im Kopf der `index.html`, das Bild ist
`assets/img/vorschau.jpg` (1200×630). **Bei jedem neuen Projekt müssen dort die
eigene Adresse und das eigene Vorschaubild eingetragen werden** — Messenger
ignorieren relative Pfade.

## Zum Ausprobieren

- `?namen=Lea+%26+Tom` — setzt das Paar ohne Datei-Änderung
- `?lang=tr` / `?lang=de` — Sprache erzwingen
- `?schrift=strasse` / `?schrift=quer` — andere Ausrichtung des Schriftzugs

## Parallaxe

Jedes Bild mit Tiefenwirkung trägt `data-px="<stärke in prozent>"`. Das Skript
setzt daraus `--px-weg`, und das CSS macht das Bild oben und unten um genau
diesen Wert größer als seinen Rahmen. Weg und Überstand kommen damit zwingend
aus derselben Zahl — sonst fährt das Bild weiter, als seine Reserve reicht,
und am Rand klafft eine Lücke.

Auf Schirmen unter 700px werden die Wege auf 62 % gekürzt: Dort sind die
Bilder knapper aufgelöst, und jeder Prozentpunkt Überstand kostet Schärfe.

Gerechnet wird in einem gemeinsamen rAF-Takt, nur für Bilder im Fenster, und
nur wenn sich der Wert tatsächlich geändert hat.

## Bildschirmgrößen

Geprüft auf 360×640, 375×812, 430×932, 768×1024, 1024×768, 1440×900 und
1920×1080 — jeweils auf seitlichen Überlauf, Hero-Höhe, Lücken zwischen
Abschnitten und Zeilenlänge.

Die Hero-Szene ist hochformatig (1000:1800). Auf Schirmen, die breiter als
hoch sind, würde sie so stark beschnitten, dass vom Wagen nichts übrig bliebe.
Dort steht sie deshalb als Bühne in voller Höhe mittig, daneben dieselbe Allee
unscharf und abgedunkelt.

## Veröffentlichen

    ./bin/veroeffentlichen.sh "Was geändert wurde"

Setzt eine frische Versionsnummer an alle eigenen Dateien und stellt live.
Ohne das liefern Browser tagelang die alte Fassung aus dem Zwischenspeicher.

Beim Arbeiten am lokalen Server reicht `./bin/frisch.sh` — das setzt nur die
Versionsnummer neu, damit der Browser nicht das alte Stylesheet festhält.

## Bildmaterial

`paar1`–`paar4` sind die echten Fotos des Paares und stehen in der Galerie.
Die generierten Motive tragen die großen Flächen: `g4-tafel` den Zitat-Moment,
`g5-lichter` den Countdown, `g3-bogen` liegt zurückgenommen hinter dem Ort,
`g1-strauss` unter dem Abschied. `g2-ringe` ist frei als Ersatz.

## Noch nicht angebunden

Rückmeldung und Gästealbum sind vollständige Oberflächen ohne Server:
Eingaben werden geprüft, aber nicht versendet oder gespeichert.
