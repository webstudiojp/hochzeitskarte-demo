# Digitale Hochzeitskarte — Demo

Vorlage für eine digitale Hochzeitseinladung, die per QR-Code geöffnet wird.
Statische Seite, kein Build-Schritt, kein Framework.

**Demo-Datensatz Furkan & Dilara ist frei erfunden** — Paar, Termin,
Location und Bankverbindung existieren nicht.

## Drei weitere Stile

Neben der Hauptkarte liegen unter `stile/` drei eigenstaendige Demos, jede
mit eigenem HTML, CSS und Skript. Sie teilen sich mit der Hauptkarte nur die
lokalen Schriften und laufen ueber denselben Server:

| Adresse | Stil |
|---|---|
| `stile/` | Uebersicht mit allen Kacheln |
| `stile/eleganz/` | Praegedruck: zwei geprägte Flügel mit Satinschleife, dahinter die vollstaendige Einladung |
| `stile/siegel/` | Wachssiegel aufbrechen, Glitzerherz freirubbeln, dann Countdown, Termin, Ort |
| `stile/funke/` | Nacht und Gold: das Siegel selbst aufbrechen, aus dem Licht darin entstehen die Namen |

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

Unter der Save-the-Date folgen nur die Angaben, die man *jetzt schon*
braucht: Countdown, Termin, Ort mit Weg dorthin, Anreise und drei Hinweise. Der ganze Ablauf gehoert
nicht auf eine Save-the-Date — der kommt mit der Einladung. Der Kalenderknopf
steht zweimal auf der Seite, oben nach dem Aufrubbeln und unten am Ende: wer
bis dorthin gelesen hat, soll nicht zurueckblaettern muessen.

Der Rauputz im Hintergrund kommt aus `feTurbulence` plus `feDiffuseLighting`.
Das Rauschen muss vorher ueber `feComponentTransfer` gespreizt werden, sonst
hat das Licht kein Gefaelle und die Wand bleibt glatt.

### Der Weg dorthin

Beide Karten verlinken auf **Google Maps und Apple Karten** — nicht auf eines
von beiden. Wer ein iPhone hat, will Apple Karten; alle anderen Google. Auf
einem Apple-Geraet stellt das Skript Apple Karten nach vorn.

Verlinkt, nicht eingebettet: eine Karte im Rahmen laedt schon beim Oeffnen der
Seite Daten zum Anbieter, ein Link erst, wenn jemand ihn antippt. Ohne
Einwilligung ist das der einzige saubere Weg.

Die Adressen stehen einmal im `DATEN`-Block und werden dort zusammengesetzt.
Anfangs stand der Ortsname zweimal im Routenziel, weil Name und Adresse doppelt
verkettet wurden — deshalb liegen sie jetzt getrennt (`ortName`, `adresse`) und
die vollstaendige Angabe entsteht an genau einer Stelle.

**Funke** ist die dunkle Schwester. Sie beginnt nicht mit einem Umschlag,
sondern mit einer einzigen Sache im Dunkeln, die man anfassen kann: einem
Siegel aus granatrotem Wachs. Der Rest der Karte bleibt in derselben Nacht
stehen — der Auftakt ist kein Vorspann *vor* der Karte, er ist die Welt,
in der sie steht. Deshalb gibt es hier auch keinen Schnitt zurueck ins
Rosa, sondern nur eine Kamera, die weitergeht.

Aufgebrochen wird von Hand, und zwar dort, wo der Finger liegt: der Sprung
waechst vom Beruehrungspunkt nach aussen, wer zieht, zieht ihn mit, wer
haelt, treibt ihn schneller. Ein blosses Antippen genuegt trotzdem — sonst
haette der Kniff eine Huerde eingebaut. Die Aeste werden bei jedem Druck
neu gewuerfelt, mit je einer Gabel ab der Mitte; ohne die sieht der Bruch
aus wie ein Stern und nicht wie gesprungenes Wachs.

Der Riss steht in drei Lagen auf demselben Pfad, und die Reihenfolge ist
die ganze Wirkung: unten der weiche Schein, darauf die dunkle Bruchkante,
oben der helle Kern. Anders herum liegt ein Strich *auf* dem Wachs statt
Licht *darin*. Waehrenddessen geht die Kamera heran, damit man von der
Struktur auf einem Telefon ueberhaupt etwas hat.

Dann zerspringt es, und was folgt, ist ein Teilchensystem mit drei
Zustaenden: Splitter, Flug, Namen. Das Wachs faellt weg, das Licht darin
bleibt und zieht sich zu `Furkan & Dilara` zusammen. Die Schrift ist dabei
nicht gezeichnet, sondern abgetastet — der Name wird einmal auf eine
unsichtbare Leinwand gesetzt, danach sind nur noch seine Bildpunkte das
Ziel der Teilchen. Fuer ein anderes Paar aendert sich nichts ausser
`DATEN.namen`; genau das kann ein gerendertes Video nicht.

Zwei Dinge, die dabei wichtig waren: Ausgangs- und Zielpunkte werden beide
nach links sortiert, sonst kreuzen sich alle Wege und aus dem Flug wird ein
Knaeuel. Und gezeichnet wird nach Farbton sortiert und mit `lighter` — so
wechselt der Pinsel siebenmal je Bild statt zweitausendmal, und das Gold
leuchtet, statt nur hell zu sein. Das Wachs verschwindet ueber die Groesse
statt ueber die Deckung, aus demselben Grund.

Unter dem Auftakt traegt nicht Typografie allein, sondern ein eigener
Zierrat: osmanische Ornamentik, ausschliesslich aus Strichen, nichts
eingesetzt. Ueber den Namen steht ein *sivri kemer*, der osmanische
Spitzbogen, doppelt gezogen und mit Alem an der Spitze — die Namen stehen
darin, nicht davor. Darin ein *semse*, das Medaillon der osmanischen
Buchkunst. Jeder Abschnitt traegt als Marke den achtzackigen Stern aus zwei
gegeneinander gedrehten Quadraten, unter dem Anfang stehen sich zwei *lale*
zu, die Tulpe der Iznik-Kacheln, und unter dem Termin liegt ein Girih-Band
aus zwei gegenlaeufigen Zickzacklinien. Am Ende der Karte steht als
Horizont eine Moschee mit Kuppel, Halbkuppeln und zwei Minaretten samt
Serefe — kein Ort, ein Gruss. Das Monogramm im Fuss sitzt in einem
Medaillon *ohne* Stern darin: ein Muster unter Buchstaben, und beides
verlaere.

Jede Figur zeichnet sich selbst, sobald ihr Abschnitt ins Bild kommt.
Moeglich ist das, weil `stroke-dasharray` und `stroke-dashoffset` vererbte
Eigenschaften sind und deshalb auch in den Schattenbaum wirken, den ein
`use` erzeugt — ein Selektor kaeme dort nicht hinein. `pathLength="1"`
normiert dabei jede Laenge auf eins, sodass ein einziger Wert fuer alle
Striche genuegt, egal wie lang sie wirklich sind.

Zwei Fallen dabei: Der Bogen braucht sein Seitenverhaeltnis als eigene
Angabe. Steht er mit `top` *und* `bottom` zugleich, haengt seine Groesse an
der Hoehe des Satzes darin — und dann wird er schmaler als die Namen, die
er tragen soll. Und das Girih-Band steht in einem eigenen Feld statt direkt
im Satz: als direktes Kind bekaeme es den Auftritt der Textzeilen statt
seinen Strichzug, zwei Ablaeufe auf demselben Element, von denen der
spaetere gewinnt — der Strich bliebe leer.

Der Countdown steht ohne Kacheln frei, nur durch duenne Goldstriche
getrennt — ein Kasten waere ein zweites Motiv neben der Ornamentik. Und
genau eine Taste auf der ganzen Seite ist gefuellt: die, um die es geht.

Der Auftakt dauert dreieinhalb Sekunden, ist ab dem Bruch ueberspringbar
(Knopf oder Esc) und laeuft beim zweiten Besuch in derselben Sitzung
doppelt so schnell — wer nur das Datum nachsieht, will keinen Film noch
einmal. Wer Bewegung reduziert hat, bekommt gar keinen. Und weil der
Bildtakt in einem Hintergrundreiter stehen bleibt, steht die Karte nach
neun Sekunden auch ohne Auftakt da: der Kniff ist huebsch, aber er darf
niemanden aussperren.

### Bewegung

Beide Stile stehen nie still. Wo etwas gezeichnet ist, bewegt es sich auch:

| Was | Wie |
|---|---|
| Tauben | Koerper und Schwinge sind getrennte Elemente, die Schwinge schlaegt in Dauerschleife; die Himmelstaube zieht dazu in einem Bogen ueber die Wolken |
| Rosenblaetter | 16 Stueck, jedes mit eigenem Weg, Tempo und Anfang — sonst fallen sie im Gleichschritt und das sieht sofort gemacht aus |
| Glitzerspaene | Springen beim Rubbeln weg und fallen weiter, bis sie unter dem Bildrand sind; danach werden sie entfernt. In der Luft stehenzubleiben waere der eine Moment, in dem man der Karte ansieht, dass sie gerechnet ist |
| Anreise-Posten | Kommen abwechselnd von links und rechts — ein Wechsel im Takt haelt die Aufmerksamkeit besser als fuenfmal dieselbe Bewegung |
| Schloss | Zeichnet sich Strich fuer Strich, wenn der Abschnitt ins Bild kommt |
| Fortschrittslinie | Duenne Linie am oberen Rand, haengt am Bildlauf selbst |
| Schleife | Die Baender wiegen, bis jemand tippt; danach uebernimmt der Uebergang des Knotens |
| Praegung | Ein Lichtstreifen wandert alle sieben Sekunden ueber die Fluegel |
| Zierrat | Schnoerkel und Paar-Skizze zeichnen sich Strich fuer Strich, sobald der Bogen ins Bild kommt |
| Zeitleiste | Die Linie waechst von oben, die Rauten springen nacheinander auf |
| Countdown | Kacheln kippen gestaffelt herein, Ziffern rollen beim Wechsel |
| Kalligrafie | Wird geschrieben, nicht eingeblendet: der Anschnitt laeuft von links auf, ein Federpunkt zieht an der Kante mit. Bei verbundener Schreibschrift traegt schon der reine Vorschub die Illusion |
| Wachssiegel | Atmet, und ein Glanzstreif laeuft durch — beschnitten auf die Wachsform, nicht auf ein Rechteck darum |
| Riss (Funke) | Waechst vom Beruehrungspunkt, folgt dem Finger beim Ziehen, wird vom Halten getrieben |
| Auftakt (Funke) | Splitter aus der Wachsform, das Wachs faellt, das Licht sammelt sich zu den Namen |
| Goldstaub (Funke) | Vierundzwanzig Koerner treiben hinter der Schrift durch das Bild — vor ihr waeren es Flecken auf der Seite |
| Zierrat (Funke) | Bogen, Medaillon, Stern, Tulpe, Girih und Moschee zeichnen sich Strich fuer Strich, sobald ihr Abschnitt ins Bild kommt |
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

Wo der Browser **scroll-getriebene Animationen** kann (`animation-timeline`),
haengen Fortschrittslinie und Federzug direkt am Bildlauf: die Schrift entsteht
genau so schnell, wie der Gast weiterliest. Kann er es nicht, laeuft derselbe
Auftritt beim Erreichen des Abschnitts ab. Beides sieht richtig aus — nur eines
davon folgt dem Daumen.

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
