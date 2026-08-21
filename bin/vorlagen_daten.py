# -*- coding: utf-8 -*-
"""Die neun Datensaetze. Nur hier wird angefasst, was sich je Karte
unterscheidet: Farben, Szene, Namen, Termine, Texte.

Die Farbnamen sind dieselben wie in vorlage.css. Wer eine zehnte Karte
will, kopiert einen Block und aendert ihn."""

SPEISEN = ['Fleisch', 'Fisch', 'Vegetarisch', 'Vegan']


def grund(kennung, szene='medien/szene.mp4', poster='medien/szene.webp'):
    return dict(kennung=kennung, szene=szene, poster=poster,
                umschlag='medien/kuvert.webp', umschlag_text='Siegel drücken',
                speisen=SPEISEN, musik=None,
                countdown_ueber='Wir zählen die Tage',
                countdown_titel='Bis dahin',
                geschichte_ueber='Unser Weg',
                geschichte_titel='Wie es dazu kam',
                band_ueber='Ein Blick auf uns', band_titel='Momente',
                programm_titel='Der Tag', programm_unter='Was wir vorbereitet haben',
                ort_ueber='Seid dabei', ort_titel='Der Ort',
                kleider_ueber='Eine Bitte', kleider_titel='Kleiderordnung',
                rsvp_ueber='Wir freuen uns auf euch',
                geschenke_ueber='In eigener Sache',
                anreise_ueber='Plant euren Besuch',
                anreise_titel='Anreise & Übernachtung',
                anreise_unter='Damit euer Besuch so bequem wie möglich wird.',
                merk_titel='Wenn ihr länger bleibt, lohnen sich diese Orte:',
                fragen_ueber='Ihr fragt')


THEMEN = []

# ---------------------------------------------------------------- 1
t = grund('heritage'); t.update(
    band=['medien/g1.webp','medien/g2.webp','medien/g3.webp','medien/g4.webp'],
    flug=dict(form='korn', toene=['#fff0cf','#ffe2b0','#fffaf0'], gross=(2.5,6), wehen=120, klar=(.25,.6), dauer=(16,30)),
    umschlag_farben=dict(grund='#8a9a80', ring='rgba(255,247,235,.7)', schrift='#fff', blitz='rgba(255,238,214,.95)'),
    auftakt=dict(namen='#3d4c2f', schrift='#3d4c2f', linie='#3d4c2f', ruf='#6b5b4a', stern='#e0a94b', schleier='rgba(250,246,233,.16)'),
    namen='Amelie & David', vornamen=('Amelie', 'David'),
    datum_text='12. Juni 2027', datum_lang='12. Juni 2027 · Riad Al Karam, Marrakesch',
    beschreibung='Einladung zur Hochzeit von Amelie und David am 12. Juni 2027 in Marrakesch.',
    beginnISO='2027-06-12T17:00:00', endeISO='2027-06-13T03:00:00',
    anlass='Hochzeit von Amelie & David',
    kalendertext='Empfang ab 16:30 Uhr im Riadgarten, Trauung um 17 Uhr.',
    email='amelie.und.david@example.de', iban='DE00 0000 0000 0000 0000 00',
    iban_name='Amelie Brandt & David Reuter', marke='A & D',
    farben=dict(cream='#faf6e9', paper='#f7f2ec', blush='#f4e4dc', sage='#c3cdb6',
                accent='#d3905a', text='#2c2421', olive='#3d4c2f', gold='#e6c4a2', muted='#746158'),
    countdown_unter='Bis wir im Garten stehen.',
    geschichte=[
        ('2016', 'Ein Regenschirm zu wenig', 'Botanischer Garten, Aprilschauer, ein Schirm für zwei. Amelie behauptet bis heute, sie habe ihn zuerst gehabt.'),
        ('2019', 'Der erste Sommer im Süden', 'Drei Wochen Marokko, ein Mietwagen ohne Klimaanlage und die Erkenntnis, dass wir gut zusammen reisen.'),
        ('2022', 'Das Haus mit dem schiefen Boden', 'Wir zogen in ein Haus, in dem jede Murmel nach Westen rollt. Wir blieben trotzdem. Oder deswegen.'),
        ('2026', 'Die Frage', 'Gestellt an einem Dienstag, ohne Anlass, in der Küche, während der Reis anbrannte. Die Antwort kam vorher.')],
    programm=[('16:30', 'Ankommen', 'Im Garten. Es gibt Minztee.'),
              ('17:00', 'Trauung', 'Unter den Palmen am Wasserbecken.'),
              ('18:00', 'Aperitif', 'Auf der Terrasse, solange die Sonne dort steht.'),
              ('20:00', 'Abendessen', 'An einer langen Tafel, ohne Sitzordnung.'),
              ('22:30', 'Der erste Tanz', 'Kurz. Versprochen.'),
              ('23:00', 'Feiern', 'Bis die Musik aufhört.'),
              ('03:00', 'Schluss', 'Die letzten Wagen fahren.')],
    ort=dict(name='Riad Al Karam', zeit='Trauung 17:00 Uhr', strasse='Derb Sidi Bouloukat 12',
             stadt='40000 Marrakesch, Marokko',
             text='Ein alter Stadtpalast mit einem Garten, den man von der Gasse aus nicht vermutet. Kommt lieber zehn Minuten zu früh — das Tor ist leicht zu übersehen.'),
    ort_unter='Alles, was ihr wissen müsst.',
    kleider_text='Festlich und leicht. Es hat abends noch um die achtundzwanzig Grad, der Boden ist Kies und Mosaik — dünne hohe Absätze werden den Abend nicht überstehen. Für die späte Stunde lohnt sich etwas für über die Schultern.',
    kleider_farben=['#3d4c2f', '#d3905a', '#e6c4a2', '#f4e4dc'],
    rsvp_unter='Bitte bis zum 1. April 2027, damit wir planen können.',
    geschenke_text='Wir haben zwei von allem und brauchen nichts. Wer trotzdem etwas dalassen möchte: Wir sparen auf ein Dach, das dicht ist.',
    haeuser=[('Riad Al Karam', 'Vor Ort', 'Acht Zimmer', 'Kontingent bis 1. Mai'),
             ('Hotel Les Jardins', '5 Minuten', 'Vier Sterne', 'Sonderpreis für unsere Gäste'),
             ('Dar Selma', '10 Minuten', 'Klein und ruhig', 'Gutes Frühstück auf dem Dach')],
    merk=['Jardin Majorelle', 'Die Souks', 'Palmeraie', 'Ein Hammam'],
    fragen=[('Darf ich jemanden mitbringen?', 'Wenn auf eurer Einladung eine Begleitung steht: sehr gern. Tragt sie einfach oben mit ein.'),
            ('Sind Kinder dabei?', 'Ja. Es gibt eine Betreuung ab 17 Uhr und Essen, das Kinder auch essen.'),
            ('Fotos während der Trauung?', 'Bitte nicht. Eine halbe Stunde ohne Telefone — danach gern und viel.'),
            ('Wie kommen wir hin?', 'Vom Flughafen sind es zwanzig Minuten. Wer uns bis Ostern Bescheid gibt, bekommt einen Platz im Sammeltransfer.'),
            ('Ich schaffe es nicht.', 'Sagt uns rechtzeitig Bescheid, das ist alles. Wir sind nicht beleidigt, nur traurig.')])
THEMEN.append(t)

# ---------------------------------------------------------------- 2
t = grund('rosenbrunnen'); t.update(
    band=['medien/g1.webp','medien/g2.webp','medien/g3.webp','medien/g4.webp'],
    flug=dict(form='blatt', toene=['#f8cfd9','#f4b9c9','#fde7ee','#efa9bd'], gross=(9,17), wehen=170, klar=(.55,.95), dauer=(9,17)),
    umschlag_farben=dict(grund='#e8c6cf', ring='rgba(90,50,60,.5)', schrift='#5a323c', blitz='rgba(255,235,240,.95)', schatten='0 1px 12px rgba(255,255,255,.85)'),
    auftakt=dict(namen='#ffffff', schrift='#ffffff', linie='rgba(255,255,255,.75)', ruf='rgba(255,255,255,.9)', schatten='0 2px 18px rgba(20,20,30,.55)', schleier='rgba(20,20,30,.18)', stern='#ffd9e4'),
    namen='Rosa & Nikolas', vornamen=('Rosa', 'Nikolas'),
    datum_text='22. Mai 2027', datum_lang='22. Mai 2027 · Villa Rosenau, Bad Honnef',
    beschreibung='Einladung zur Hochzeit von Rosa und Nikolas am 22. Mai 2027 in Bad Honnef.',
    beginnISO='2027-05-22T16:30:00', endeISO='2027-05-23T04:00:00',
    anlass='Hochzeit von Rosa & Nikolas',
    kalendertext='Ankommen ab 16 Uhr im Rosengarten, Trauung um 16:30 Uhr am Brunnen.',
    email='rosa.und.nikolas@example.de', iban='DE00 0000 0000 0000 0000 00',
    iban_name='Rosa Winter & Nikolas Alberti', marke='R & N',
    farben=dict(cream='#fffafc', paper='#fdf2f6', blush='#f8dfe7', sage='#c4d0b6',
                accent='#c9748f', text='#33262c', olive='#768b4f', gold='#f3d9e4', muted='#8a7280'),
    countdown_unter='Bis der Brunnen läuft.',
    geschichte=[
        ('2019', 'Eine falsche Adresse', 'Nikolas stand vor der falschen Haustür. Rosa machte auf. Beide behaupten, sie hätten es sofort gewusst; beide lügen.'),
        ('2021', 'Der Brunnen', 'In einem Innenhof in Verona, nachts, mit nassen Schuhen. Von da an war es kein Zufall mehr.'),
        ('2024', 'Zwei Schlüssel', 'Eine Wohnung mit schlechtem Licht und einer guten Küche. Es reichte vollkommen.'),
        ('2026', 'Ohne Kniefall', 'Gefragt haben wir uns gegenseitig, im Auto, an einer roten Ampel. Es hat länger gedauert als die Ampel.')],
    programm=[('16:00', 'Ankommen', 'Im Rosengarten. Es gibt kalten Wermut.'),
              ('16:30', 'Trauung', 'Am Brunnen. Bitte pünktlich, es dauert nur zwanzig Minuten.'),
              ('17:30', 'Aperitivo', 'Auf der Terrasse, solange die Sonne dort steht.'),
              ('19:30', 'Abendessen', 'Vier Gänge, italienisch, an einer langen Tafel.'),
              ('22:00', 'Der erste Tanz', 'Und danach alle anderen.'),
              ('02:00', 'Mitternachtssuppe', 'Für alle, die noch stehen.'),
              ('04:00', 'Schluss', 'Die Taxis warten am Tor.')],
    ort=dict(name='Villa Rosenau', zeit='Trauung 16:30 Uhr', strasse='Rosenauer Weg 12',
             stadt='53604 Bad Honnef',
             text='Ein Haus mit einem Garten, der im Mai vollständig überwuchert ist. Das Tor sieht geschlossen aus. Ist es nicht.'),
    ort_unter='Alles, was ihr wissen müsst.',
    kleider_text='Sommerlich festlich. Der Innenhof ist gepflastert, die Terrasse aus Kies — bringt Schuhe mit, in denen ihr auch tanzen könnt. Nach Sonnenuntergang wird es am Wasser empfindlich kühl.',
    kleider_farben=['#c9748f', '#768b4f', '#f3d9e4', '#33262c'],
    rsvp_unter='Bitte bis zum 15. März 2027.',
    geschenke_text='Der Haushalt ist voll und die Regale sind es auch. Wer etwas dalassen möchte: Wir legen für eine Reise zusammen, die schon dreimal verschoben wurde.',
    haeuser=[('Zimmer in der Villa', 'Vor Ort', 'Acht Zimmer', 'Wer zuerst kommt'),
             ('Hotel Rheinblick', '1,5 km', 'Vier Sterne', 'Kontingent „Rosa & Nikolas“'),
             ('Gasthaus Am Turm', '3 km', 'Klein und gut', 'Laut am Morgen, ehrlich gesagt')],
    merk=['Drachenfels', 'Rheinpromenade', 'Schloss Drachenburg', 'Die Fähre nach Bonn'],
    fragen=[('Darf ich jemanden mitbringen?', 'Wenn auf der Einladung eine Begleitung steht: ja, und tragt sie bitte oben ein. Sonst ist der Hof leider zu klein.'),
            ('Kommen Kinder mit?', 'Bis 22 Uhr sehr gern. Es gibt eine Betreuung im Gartenhaus und Essen, das auch Kinder mögen.'),
            ('Fotos während der Trauung?', 'Bitte nicht. Zwanzig Minuten ohne Telefone — danach so viel ihr wollt.'),
            ('Es regnet. Und dann?', 'Dann heiraten wir in der Orangerie. Sie ist überdacht, beheizt und ehrlich gesagt fast schöner.'),
            ('Ich schaffe es doch nicht.', 'Sagt es uns früh, dann ist alles gut. Wir trinken trotzdem einen auf euch.')])
THEMEN.append(t)

# ---------------------------------------------------------------- 3
t = grund('goldstunde'); t.update(
    band=['medien/g1.webp','medien/g2.webp','medien/g3.webp','medien/g4.webp'],
    flug=dict(form='korn', toene=['#f0d79a','#e8c47a','#fff3d6'], gross=(2.5,6), wehen=110, klar=(.3,.7), dauer=(15,28)),
    schimmer=True,
    umschlag_farben=dict(grund='#e8dcc2', ring='rgba(120,90,40,.55)', schrift='#6b5228', blitz='rgba(255,240,205,.95)', schatten='0 1px 12px rgba(255,255,255,.85)'),
    auftakt=dict(namen='#96702f', schrift='#96702f', linie='#b8944e', ruf='#8a7355', stern='#c9922f', schleier='rgba(242,234,216,.12)', glanz='#fff6dd'),
    namen='Charlotte & Anton', vornamen=('Charlotte', 'Anton'),
    datum_text='25. September 2027', datum_lang='25. September 2027 · Schloss Eichenau',
    beschreibung='Einladung zur Hochzeit von Charlotte und Anton am 25. September 2027 auf Schloss Eichenau.',
    beginnISO='2027-09-25T17:00:00', endeISO='2027-09-26T04:00:00',
    anlass='Hochzeit von Charlotte & Anton',
    kalendertext='Empfang ab 16 Uhr im Vorsaal, Trauung um 17 Uhr in der Kapelle.',
    email='charlotte.und.anton@example.de', iban='DE00 0000 0000 0000 0000 00',
    iban_name='Charlotte Falk & Anton Berger', marke='C & A',
    farben=dict(cream='#f2ead8', paper='#f0e8dc', blush='#eddfd2', sage='#ded3c4',
                accent='#b8944e', text='#3b332a', olive='#7a5a2e', gold='#e4cb9a', muted='#7d6f5c'),
    countdown_unter='Bis zum großen Abend.',
    geschichte=[
        ('2018', 'Ein zu langer Blick', 'Auf einem Ball, den beide nur aus Höflichkeit besuchten. Es wurde nicht getanzt, aber sehr lange gesprochen.'),
        ('2020', 'Ein Briefwechsel', 'Vierhundert Nachrichten in elf Wochen. Der Anstand verlangt, den Inhalt zu verschweigen.'),
        ('2023', 'Ein gemeinsames Haus', 'Mit zu vielen Büchern und zu wenig Regalen. Daran hat sich bis heute nichts geändert.'),
        ('2026', 'Der Antrag', 'Ohne Zeugen, ohne Musik, ohne Kniefall — und trotzdem vollkommen ausreichend.')],
    programm=[('16:00', 'Empfang', 'Im Vorsaal. Es wird Champagner gereicht.'),
              ('17:00', 'Trauung', 'In der Kapelle. Dreißig Minuten, keine länger.'),
              ('18:00', 'Gratulation', 'Im Park, sofern das Wetter es erlaubt.'),
              ('19:30', 'Diner', 'Fünf Gänge an der langen Tafel.'),
              ('22:00', 'Eröffnungstanz', 'Danach übernimmt die Kapelle.'),
              ('01:00', 'Souper', 'Für die Ausdauernden.'),
              ('04:00', 'Ende', 'Die Wagen warten.')],
    ort=dict(name='Schloss Eichenau', zeit='Trauung 17:00 Uhr', strasse='Schlossallee 1',
             stadt='53902 Bad Münstereifel',
             text='Ein Haus mit Parkettböden, Kronleuchtern und einem Park, der im September golden wird. Die Auffahrt ist die zweite, nicht die erste.'),
    ort_unter='Alles, was ihr wissen müsst.',
    kleider_text='Großer Abend. Lange Kleider, dunkle Anzüge. Der Saal ist kühl, der Park nach Mitternacht noch kühler — nehmt etwas für über die Schultern mit.',
    kleider_farben=['#7a5a2e', '#b8944e', '#f2ead8', '#3b332a'],
    rsvp_unter='Erbeten bis zum 1. August 2027.',
    geschenke_text='Das Haus ist voll und die Vitrine erst recht. Wer dennoch etwas beitragen möchte: Wir sammeln für ein Klavier, das seit Jahren in einem Schaufenster steht und angesehen wird.',
    haeuser=[('Schlosshotel Eichenau', 'Vor Ort', 'Vierzehn Zimmer', 'Kontingent bis 1. Juli'),
             ('Hotel Weißer Hirsch', '2 km', 'Vier Sterne', 'Kontingent „Charlotte & Anton“'),
             ('Gasthof Zur Linde', '5 km', 'Einfach', 'Freundlich und günstig')],
    merk=['Die Altstadt', 'Der Schlosspark', 'Das Kurviertel', 'Ein Konzert in der Kapelle'],
    fragen=[('Darf ich jemanden mitbringen?', 'Steht auf eurer Karte eine Begleitung, dann sehr gern — bitte oben eintragen. Andernfalls reicht der Saal nicht.'),
            ('Sind Kinder willkommen?', 'Bis zum Diner ja, mit Betreuung im Grünen Salon. Danach wird es spät und laut.'),
            ('Darf ich fotografieren?', 'In der Kapelle nicht. Überall sonst so viel ihr mögt — und schickt uns bitte alles.'),
            ('Gibt es eine Sitzordnung?', 'Ja, beim Diner. Sie hängt im Vorsaal aus.'),
            ('Ich kann doch nicht kommen.', 'Dann sagt früh ab, und wir trinken einen auf euch. Verübelt wird nichts.')])
THEMEN.append(t)

# ---------------------------------------------------------------- 4
t = grund('mitternacht'); t.update(
    band=['medien/g1.webp','medien/g2.webp','medien/g3.webp','medien/g4.webp'],
    flug=dict(form='korn', toene=['#e8e3d6','#cfcabb'], gross=(2,4.5), wehen=90, klar=(.14,.34), dauer=(20,36)),
    umschlag_farben=dict(grund='#1c1c1a', ring='rgba(240,235,225,.5)', schrift='#f0ebe1', blitz='rgba(245,240,228,.9)'),
    auftakt=dict(namen='#2f2f2d', schrift='#3f3f3c', linie='#6b6b66', ruf='#6b6b66', stern='#8a8a80', schleier='rgba(247,245,240,.1)'),
    namen='Alexandra & Jonathan', vornamen=('Alexandra', 'Jonathan'),
    datum_text='6. November 2027', datum_lang='6. November 2027 · Burg Steinbach',
    beschreibung='Einladung zur Hochzeit von Alexandra und Jonathan am 6. November 2027 auf Burg Steinbach.',
    beginnISO='2027-11-06T16:00:00', endeISO='2027-11-07T03:00:00',
    anlass='Hochzeit von Alexandra & Jonathan',
    kalendertext='Ankommen ab 15:30 Uhr im Innenhof, Trauung um 16 Uhr in der Halle.',
    email='alexandra.und.jonathan@example.de', iban='DE00 0000 0000 0000 0000 00',
    iban_name='Alexandra Roth & Jonathan Steiner', marke='A & J',
    farben=dict(cream='#f7f5f0', paper='#f0eae0', blush='#e6ddd0', sage='#a8b193',
                accent='#6b7758', text='#1c1c1c', olive='#3b4530', gold='#e8e1d4', muted='#6f6a63'),
    countdown_unter='Bis die Kerzen brennen.',
    geschichte=[
        ('2017', 'Ein Abend, der nicht enden wollte', 'Eine Küche in Lissabon, zu wenig Stühle, zu viel Wein. Um vier Uhr morgens standen nur noch wir.'),
        ('2020', 'Zwei Jahre am Telefon', 'Zwischen zwei Städten, zwei Zeitzonen und einer Pandemie. Wir haben nie ernsthaft daran gedacht aufzuhören.'),
        ('2023', 'Eine Adresse', 'Endlich dieselbe. Der Umzug dauerte drei Tage, das Auspacken zwei Jahre.'),
        ('2026', 'Der Antrag', 'Im Dunkeln, auf einer Treppe, ohne Ring — der lag zu Hause in einer Schublade. Es hat trotzdem gereicht.')],
    programm=[('15:30', 'Ankommen', 'Im Innenhof. Es gibt Glühwein, ernsthaft.'),
              ('16:00', 'Trauung', 'In der Halle. Dann ist es draußen schon dunkel.'),
              ('17:00', 'Feuer und Wein', 'Am Kamin, solange alle noch reden können.'),
              ('19:00', 'Abendessen', 'An einer Tafel, alle an einer.'),
              ('22:00', 'Tanz', 'Unter den Kronleuchtern.'),
              ('01:00', 'Suppe', 'Für die, die bleiben.'),
              ('03:00', 'Ende', 'Das Tor wird zugemacht.')],
    ort=dict(name='Burg Steinbach', zeit='Trauung 16:00 Uhr', strasse='Burgweg 1',
             stadt='53518 Adenau',
             text='Ein Haus aus Stein mit einer Halle, die nicht wirklich warm wird. Die letzten zwei Kilometer sind Waldweg und im November oft nass — fahrt langsam, es lohnt sich.'),
    ort_unter='Alles, was ihr wissen müsst.',
    kleider_text='Schwarz, dunkelgrün, tiefes Blau — festlich und ernst. Die Halle ist aus Stein, der Innenhof gar nicht geheizt. Bringt etwas zum Überziehen und Schuhe für Kopfsteinpflaster mit.',
    kleider_farben=['#1c1c1c', '#3b4530', '#6b7758', '#e8e1d4'],
    rsvp_unter='Bitte bis zum 1. September 2027.',
    geschenke_text='Wir haben zusammen zwei Haushalte und brauchen wirklich nichts. Wer trotzdem möchte: Wir legen für den Wintergarten zusammen, den das Haus dringend hätte haben sollen.',
    haeuser=[('Burghotel Steinbach', 'Vor Ort', 'Zwölf Zimmer', 'Kontingent bis 1. September'),
             ('Landhaus Ahrtal', '8 km', 'Vier Sterne', 'Kontingent „Alexandra & Jonathan“'),
             ('Gasthof Zur Post', '12 km', 'Einfach und warm', 'Gutes Frühstück')],
    merk=['Das Ahrtal', 'Die Nürburg', 'Weinproben in Mayschoß', 'Wandern am Rotweinwanderweg'],
    fragen=[('Darf ich jemanden mitbringen?', 'Steht auf eurer Karte eine Begleitung: sehr gern, bitte oben eintragen. Sonst wird die Halle zu voll.'),
            ('Sind Kinder dabei?', 'Bis zum Abendessen ja. Danach wird es spät und dunkel, und die Treppen sind steil.'),
            ('Fotos während der Trauung?', 'Bitte nicht. Es ist ohnehin zu dunkel — und ein Blitz in dieser Halle wäre ein Verbrechen.'),
            ('Wie kalt wird es?', 'Im Innenhof um die fünf Grad, in der Halle etwa achtzehn. Es gibt Decken, aber nicht genug für alle.'),
            ('Ich schaffe es nicht.', 'Sagt früh Bescheid. Wir sind nicht beleidigt, nur traurig, und trinken einen auf euch.')])
THEMEN.append(t)

# ---------------------------------------------------------------- 5
t = grund('azur'); t.update(
    band=['medien/g1.webp','medien/g2.webp','medien/g3.webp','medien/g4.webp'],
    flug=dict(form='blatt', toene=['#ffffff','#f6f1e4','#eae3d2'], gross=(7,13), wehen=140, klar=(.4,.8), dauer=(11,20)),
    umschlag_farben=dict(grund='#e6ded0', ring='rgba(30,60,100,.5)', schrift='#20406b', blitz='rgba(235,244,255,.95)', schatten='0 1px 12px rgba(255,255,255,.85)'),
    auftakt=dict(namen='#20406b', schrift='#20406b', linie='#20406b', ruf='#4a5f78', stern='#c9a24a', schleier='rgba(250,248,242,.1)'),
    namen='Lina & Matteo', vornamen=('Lina', 'Matteo'),
    datum_text='5. Juni 2027', datum_lang='5. Juni 2027 · Cala Bianca, Sizilien',
    beschreibung='Einladung zur Hochzeit von Lina und Matteo am 5. Juni 2027 in der Cala Bianca.',
    beginnISO='2027-06-05T12:00:00', endeISO='2027-06-06T03:00:00',
    anlass='Hochzeit von Lina & Matteo',
    kalendertext='Ankommen ab 11 Uhr am Hafen, Trauung um 12 Uhr in der Kapelle.',
    email='lina.und.matteo@example.de', iban='DE00 0000 0000 0000 0000 00',
    iban_name='Lina Hartmann & Matteo Rizzo', marke='L & M',
    farben=dict(cream='#faf8f2', paper='#f4f1e8', blush='#e8ddd0', sage='#b8c8cc',
                accent='#c47a4a', text='#23262b', olive='#2c4a6b', gold='#e3c98a', muted='#6f7681'),
    countdown_unter='Bis wir am Wasser stehen.',
    geschichte=[
        ('2019', 'Ein Fahrrad zu wenig', 'Rotterdam, Regen, ein geplatzter Reifen. Matteo bot an zu schieben. Es waren vier Kilometer.'),
        ('2021', 'Der erste Sommer in Sizilien', 'Vierzig Grad, kein Schatten, und Linas erstes Gespräch mit einer Großmutter, die kein Wort Deutsch spricht.'),
        ('2024', 'Ein Haus mit blauen Fensterläden', 'Gekauft in einer Nacht, in der beide zu müde waren, um vernünftig zu sein. Wir bereuen nichts.'),
        ('2026', 'Auf dem Dach', 'Zwischen den Tomaten, ohne Ring, mit einem Glas Wein. Die Nachbarn haben applaudiert, bevor wir etwas sagen konnten.')],
    programm=[('11:00', 'Ankommen', 'Am Hafen. Es gibt Granita und Schatten.'),
              ('12:00', 'Trauung', 'In der Kapelle über der Bucht.'),
              ('13:00', 'Pranzo', 'Vier Stunden Mittagessen. Ja, vier.'),
              ('17:00', 'Riposo', 'Siesta, Meer, wer will schläft.'),
              ('20:00', 'Cena', 'Noch einmal Essen, diesmal am Wasser.'),
              ('22:30', 'Tanz', 'Auf dem Platz vor der Kirche.'),
              ('03:00', 'Schluss', 'Oder wann immer die Musik aufhört.')],
    ort=dict(name='Cala Bianca', zeit='Trauung 12:00 Uhr', strasse='Via della Cala 3',
             stadt='96017 Noto, Sizilien',
             text='Eine weiß gekalkte Kapelle über einer Bucht, mit einem Pavillon am Wasser. Der letzte Weg ist Schotter — nehmt keine Absätze mit.'),
    ort_unter='Alles, was ihr wissen müsst.',
    kleider_text='Leinen, Baumwolle, helle Farben. Es hat mittags um die dreißig Grad und es gibt kaum Schatten — denkt an Hüte. Der Boden ist überall Stein oder Sand.',
    kleider_farben=['#2c4a6b', '#faf8f2', '#c47a4a', '#e3c98a'],
    rsvp_unter='Bitte bis zum 1. März 2027 — wegen der Flüge.',
    geschenke_text='Ihr fliegt für uns nach Sizilien — das ist mehr als genug. Wer trotzdem etwas dalassen möchte: Das Dach des Hauses ist noch dasselbe wie 1961.',
    haeuser=[('Masseria Cala Bianca', 'Vor Ort', 'Zehn Zimmer', 'Kontingent bis Ostern'),
             ('Palazzo Noto', '12 km', 'Vier Sterne', 'Kontingent „Lina & Matteo“'),
             ('B&B Santa Lucia', '15 km', 'Familiär', 'Günstig und herzlich')],
    merk=['Noto und sein Barock', 'Die Badebuchten', 'Der Markt in Avola', 'Ein Boot nach Vendicari'],
    fragen=[('Darf ich jemanden mitbringen?', 'Wenn auf eurer Karte eine Begleitung steht: sehr gern, bitte oben eintragen. Sonst wird die Bucht zu voll.'),
            ('Kinder?', 'Unbedingt. Es gibt Meer, Sand und eine Großtante, die seit vierzig Jahren nichts lieber tut als aufpassen.'),
            ('Wie heiß wird es?', 'Mittags um dreißig Grad, abends um zweiundzwanzig. Wasser gibt es überall, Schatten nur an der Laube.'),
            ('Muss ich Italienisch können?', 'Nein. Aber „grazie“ und „un altro bicchiere“ bringen euch weiter, als ihr denkt.'),
            ('Ich schaffe es nicht.', 'Sagt früh Bescheid, dann ist alles gut. Wir bringen euch Zitronen mit.')])
THEMEN.append(t)

# ---------------------------------------------------------------- 6
t = grund('zuckerguss'); t.update(
    band=['medien/g1.webp','medien/g2.webp','medien/g3.webp','medien/g4.webp'],
    flug=dict(form='korn', toene=['#ffffff','#f8dde3','#f2d7b8'], gross=(2.5,6), wehen=130, klar=(.3,.7), dauer=(13,24)),
    umschlag_farben=dict(grund='#f2e4dc', ring='rgba(150,60,75,.5)', schrift='#8a4050', blitz='rgba(255,238,238,.95)', schatten='0 1px 12px rgba(255,255,255,.85)'),
    auftakt=dict(namen='#4a3a33', schrift='#6b5a50', linie='#8a7268', ruf='#8a7268', stern='#cf7f8e', schleier='rgba(251,248,244,.14)'),
    namen='Emma & Ben', vornamen=('Emma', 'Ben'),
    datum_text='17. Juli 2027', datum_lang='17. Juli 2027 · Gut Kaltenbach',
    beschreibung='Einladung zur Hochzeit von Emma und Ben am 17. Juli 2027 in der Orangerie Gut Kaltenbach.',
    beginnISO='2027-07-17T14:00:00', endeISO='2027-07-18T03:00:00',
    anlass='Hochzeit von Emma & Ben',
    kalendertext='Ankommen ab 13 Uhr, Trauung um 14 Uhr im Rosengarten.',
    email='emma.und.ben@example.de', iban='DE00 0000 0000 0000 0000 00',
    iban_name='Emma Sander & Ben Kraus', marke='E & B',
    farben=dict(cream='#fbf8f4', paper='#f6efe8', blush='#f3ddd9', sage='#cdd6c2',
                accent='#cf7f8e', text='#2c2421', olive='#8a5f52', gold='#eccfae', muted='#7e6f68'),
    countdown_unter='Bis der Kuchen angeschnitten wird.',
    geschichte=[
        ('2020', 'Zwei Meter Abstand', 'Kennengelernt im Treppenhaus, weil sonst nichts offen war. Ben hat Emma zwei Wochen lang Brot vor die Tür gestellt.'),
        ('2022', 'Der erste Kuchen', 'Emma backte, Ben aß. An dieser Aufgabenteilung hat sich seither nichts geändert.'),
        ('2024', 'Ein Hund namens Keks', 'Sollte eine Woche bleiben. Ist noch da. Kommt mit.'),
        ('2026', 'Im Supermarkt', 'Zwischen Mehl und Backpulver, ohne Ring, ohne Plan. Die Kassiererin hat mitgeklatscht.')],
    programm=[('13:00', 'Ankommen', 'Limonade, Schatten, Hallo sagen.'),
              ('14:00', 'Trauung', 'Im Rosengarten. Taschentücher liegen bereit.'),
              ('15:00', 'Sekt und Kuchen', 'Elf Sorten. Wir haben nachgezählt.'),
              ('18:00', 'Abendessen', 'Draußen, wenn es das Wetter zulässt.'),
              ('20:30', 'Erster Tanz', 'Danach alle. Wirklich alle.'),
              ('00:00', 'Mitternachtssnack', 'Pommes. Nichts Feineres.'),
              ('03:00', 'Schluss', 'Und Frühstück um zehn für alle, die bleiben.')],
    ort=dict(name='Orangerie Gut Kaltenbach', zeit='Trauung 14:00 Uhr',
             strasse='Kaltenbacher Allee 5', stadt='53343 Wachtberg',
             text='Eine weiße Orangerie mit Rosen an den Fenstern und einem Rosengarten davor. Einfahrt neben der großen Kastanie.'),
    ort_unter='Alles, was ihr wissen müsst.',
    kleider_text='Bunt, hell, sommerlich — was auch immer euch Freude macht. Wir feiern draußen auf Rasen und Kies, es wird warm, und getanzt wird bis in die Nacht.',
    kleider_farben=['#cf7f8e', '#eccfae', '#cdd6c2', '#8a5f52'],
    rsvp_unter='Sagt uns bitte bis zum 15. Mai 2027 Bescheid.',
    geschenke_text='Unsere Küche ist voll und der Keller auch. Wenn ihr trotzdem etwas schenken möchtet: Wir sparen auf eine Woche irgendwo, wo niemand unsere Telefonnummer hat.',
    haeuser=[('Gutshaus Kaltenbach', 'Vor Ort', 'Neun Zimmer', 'Kontingent bis 1. Mai'),
             ('Hotel Rheinaue Bonn', '14 km', 'Vier Sterne', 'Kontingent „Emma & Ben“'),
             ('Pension Am Berg', '6 km', 'Klein', 'Herzlich und günstig')],
    merk=['Der Rheinauenpark', 'Das Siebengebirge', 'Bonner Altstadt', 'Ein Tag am Wasser'],
    fragen=[('Darf ich jemanden mitbringen?', 'Wenn auf eurer Karte eine Begleitung steht: klar! Bitte oben eintragen, damit wir mitzählen können.'),
            ('Kinder?', 'Ja bitte. Es gibt eine Hüpfburg, Eis und ab 16 Uhr zwei Betreuerinnen im Gartenhaus.'),
            ('Darf mein Hund mit?', 'Keks kommt auch, also ja — solange er sich mit anderen Hunden verträgt. Sagt uns kurz Bescheid.'),
            ('Und wenn es regnet?', 'Dann rücken wir in die Orangerie. Sie ist groß genug und viel schöner, als der Name klingt.'),
            ('Ich kann nicht kommen.', 'Schade, aber sagt früh Bescheid. Wir heben euch ein Stück Kuchen auf.')])
THEMEN.append(t)

# ---------------------------------------------------------------- 7
t = grund('fernweh'); t.update(
    band=['medien/g1.webp','medien/g2.webp','medien/g3.webp','medien/g4.webp'],
    flug=dict(form='dunst', toene=['rgba(255,232,200,.45)','rgba(255,215,190,.4)','rgba(240,225,255,.35)'], gross=(90,220), wehen=200, klar=(.3,.6), dauer=(26,46)),
    schimmer=True,
    umschlag_farben=dict(grund='#d8c8a8', ring='rgba(90,70,35,.55)', schrift='#5a4a28', blitz='rgba(255,242,210,.95)', schatten='0 1px 12px rgba(255,255,255,.85)'),
    auftakt=dict(namen='#ffffff', schrift='#ffffff', linie='rgba(255,255,255,.75)', ruf='rgba(255,255,255,.9)', schatten='0 2px 18px rgba(20,20,30,.55)', schleier='rgba(20,20,30,.18)', stern='#f2d489', und='#f2d489', glanz='#fff0c6'),
    namen='Nora & Julius', vornamen=('Nora', 'Julius'),
    datum_text='4. September 2027', datum_lang='4. September 2027 · Alte Werft, Hamburg',
    beschreibung='Einladung zur Hochzeit von Nora und Julius am 4. September 2027 in der Alten Werft, Hamburg.',
    beginnISO='2027-09-04T16:00:00', endeISO='2027-09-05T04:00:00',
    anlass='Hochzeit von Nora & Julius',
    kalendertext='Ankunft ab 15 Uhr, Trauung um 16 Uhr am Wasser. Eingang Sued.',
    email='nora.und.julius@example.de', iban='DE00 0000 0000 0000 0000 00',
    iban_name='Nora Beckmann & Julius Voigt', marke='N & J',
    farben=dict(cream='#faf7f1', paper='#f4ece0', blush='#f0dcc8', sage='#c9c3d8',
                accent='#e0a94b', text='#2f2a3d', olive='#3a3560', gold='#f2d489', muted='#736d84'),
    countdown_unter='Bis wir angekommen sind.',
    geschichte=[
        ('2018', 'Derselbe Nachtbus', 'Zwei gebuchte Plätze, ein Sitz. Nora hat gewonnen. Julius hat elf Stunden im Gang gestanden und trotzdem seine Nummer dagelassen.'),
        ('2020', 'Drei Monate zu lang geblieben', 'Aus zwei Wochen in Porto wurden zwei Jahreszeiten. Wir haben Portugiesisch gelernt und beides wieder vergessen.'),
        ('2023', 'Ein Schlüssel für zwei', 'Zurückgekommen nach Hamburg, weil das Meer hier zwar kälter ist, aber die Leute näher.'),
        ('2026', 'Die Frage', 'An einem schwarzen Strand in Island, im Regen, mit einem Ring aus der Manteltasche. Es hat niemand zugesehen.')],
    programm=[('15:00', 'Ankunft', 'An der Halle. Es gibt Franzbrötchen.'),
              ('16:00', 'Trauung', 'Am Wasser, mit Blick auf die Kräne.'),
              ('17:00', 'Anstoßen', 'Auf dem Kai, solange die Sonne steht.'),
              ('19:00', 'Essen', 'An langen Tischen, alles zum Weiterreichen.'),
              ('21:30', 'Tanz', 'In der Halle. Es hallt, das ist Absicht.'),
              ('01:00', 'Currywurst', 'Vom Wagen draußen.'),
              ('04:00', 'Endstation', 'Die letzten Taxis fahren vom Sandtorkai.')],
    ort=dict(name='Alte Werft', zeit='Trauung 16:00 Uhr', strasse='Am Sandtorkai 30',
             stadt='20457 Hamburg',
             text='Eine alte Werfthalle am Wasser, mit Blick auf die Kräne. Eingang Süd, nicht der große am Wasser.'),
    ort_unter='Alles, was ihr wissen müsst.',
    kleider_text='Festlich, aber hafentauglich. Der Boden ist Beton, draußen weht es immer, und abends wird es am Wasser kühl. Bringt etwas Windfestes mit — Hüte fliegen hier weg.',
    kleider_farben=['#3a3560', '#e0a94b', '#f0dcc8', '#2f2a3d'],
    rsvp_unter='Bitte bis zum 1. Juli 2027.',
    geschenke_text='Wir besitzen wenig und wollen es dabei belassen. Wenn ihr etwas beitragen möchtet: Wir sparen auf eine lange Reise, von der wir schon zu oft erzählt haben.',
    haeuser=[('Hotel Speicher am Kai', '300 m', 'Vier Sterne', 'Kontingent „Nora & Julius“'),
             ('Pension Elbblick', '1,2 km', 'Klein und günstig', 'Laut, aber ehrlich'),
             ('Hafenhotel Süd', '2 km', 'Familienfreundlich', 'Gutes Frühstück')],
    merk=['Die Elbphilharmonie', 'Ein Hafenrundfahrt', 'Die Speicherstadt bei Nacht', 'Fischmarkt am Sonntag'],
    fragen=[('Darf ich jemanden mitbringen?', 'Wenn auf eurer Karte eine Begleitung steht: gern, bitte oben eintragen. Sonst wird die Halle zu voll.'),
            ('Kinder?', 'Ja. Es gibt einen abgetrennten Bereich mit Betreuung ab 17 Uhr und Betten für die Kleinen ab 21 Uhr.'),
            ('Wie kalt wird es abends?', 'Am Wasser um die vierzehn Grad, drinnen zwanzig. Der Wind macht den Unterschied, nicht die Temperatur.'),
            ('Gibt es Parkplätze?', 'Nur im Parkhaus nebenan, kostenpflichtig. Kommt mit der U4, das ist schneller und billiger.'),
            ('Ich schaffe es nicht.', 'Sagt früh Bescheid. Wir schicken euch eine Postkarte von dem Tag.')])
THEMEN.append(t)

# ---------------------------------------------------------------- 8
t = grund('bluete'); t.update(
    band=['medien/g1.webp','medien/g2.webp','medien/g3.webp','medien/g4.webp'],
    flug=dict(form='blatt', toene=['#e6c9f0','#f2d489','#cbb0e8','#ffffff'], gross=(7,14), wehen=150, klar=(.4,.85), dauer=(10,19)),
    schimmer=True,
    umschlag_farben=dict(grund='#4a3a6b', ring='rgba(245,225,160,.65)', schrift='#f2e8d8', blitz='rgba(255,240,200,.95)'),
    auftakt=dict(namen='#ffffff', schrift='#ffffff', linie='rgba(255,255,255,.75)', ruf='rgba(255,255,255,.9)', schatten='0 2px 18px rgba(20,20,30,.55)', schleier='rgba(20,20,30,.18)', stern='#f2d489', und='#f2d489', glanz='#fff4c8'),
    namen='Clara & Felix', vornamen=('Clara', 'Felix'),
    datum_text='8. Mai 2027', datum_lang='8. Mai 2027 · Glashaus Marienburg',
    beschreibung='Einladung zur Hochzeit von Clara und Felix am 8. Mai 2027 im Glashaus Marienburg.',
    beginnISO='2027-05-08T15:00:00', endeISO='2027-05-09T03:00:00',
    anlass='Hochzeit von Clara & Felix',
    kalendertext='Ankommen ab 14 Uhr im Glashaus, Trauung um 15 Uhr.',
    email='clara.und.felix@example.de', iban='DE00 0000 0000 0000 0000 00',
    iban_name='Clara Wendt & Felix Bergmann', marke='C & F',
    farben=dict(cream='#faf7f1', paper='#f3eee5', blush='#e9dced', sage='#b6c9a8',
                accent='#e0a94b', text='#2e2733', olive='#4a3a6b', gold='#f2d489', muted='#736b7d'),
    countdown_unter='Bis alles blüht.',
    geschichte=[
        ('2016', 'Ein Blumenladen', 'Clara arbeitete dort, Felix kaufte elf Wochen lang jeden Freitag einen Strauß für eine Tante, die es nicht gibt.'),
        ('2019', 'Der erste Garten', 'Vier Quadratmeter Schrebergarten, drei tote Tomatenpflanzen und ein Rosenstock, der bis heute steht.'),
        ('2022', 'Das Gewächshaus', 'Selbst gebaut, zweimal umgestürzt, beim dritten Mal verschraubt. Es steht immer noch.'),
        ('2026', 'Zwischen den Pfingstrosen', 'Gefragt wurde im Knien, aber nur, weil gerade gejätet wurde. Die Antwort kam mit Erde an den Händen.')],
    programm=[('14:00', 'Ankommen', 'Im Glashaus. Es riecht wie im Juni.'),
              ('15:00', 'Trauung', 'Unter den Palmen, ganz hinten.'),
              ('16:00', 'Kuchen', 'Von Claras Mutter, alle sieben Sorten.'),
              ('18:30', 'Abendessen', 'An einer Tafel mitten zwischen den Beeten.'),
              ('21:00', 'Erster Tanz', 'Barfuß, der Boden ist Ziegel.'),
              ('00:30', 'Suppe', 'Und wer will, geht in den Park.'),
              ('03:00', 'Schluss', 'Das Tor schließt, die Blumen bleiben.')],
    ort=dict(name='Glashaus Marienburg', zeit='Trauung 15:00 Uhr', strasse='Am Glashaus 2',
             stadt='41363 Jüchen',
             text='Ein viktorianisches Gewächshaus, in dem im Mai alles gleichzeitig blüht. Durch das kleine Tor, nicht durch die Auffahrt.'),
    ort_unter='Alles, was ihr wissen müsst.',
    kleider_text='Sommerlich festlich, gern mit Farbe. Im Glashaus ist es warm und feucht — Leinen ist eine bessere Idee als Wolle. Der Boden ist Ziegel und Kies, denkt an flache Schuhe.',
    kleider_farben=['#4a3a6b', '#e0a94b', '#b6c9a8', '#e9dced'],
    rsvp_unter='Bitte bis zum 1. März 2027.',
    geschenke_text='Bringt bitte nichts mit, was in Papier eingewickelt ist. Wenn ihr etwas beitragen wollt: Das Gewächshaus im Garten braucht neue Scheiben, und zwar alle.',
    haeuser=[('Gutshof Marienburg', 'Vor Ort', 'Sieben Zimmer', 'Kontingent bis 1. März'),
             ('Hotel Park Jüchen', '4 km', 'Vier Sterne', 'Kontingent „Clara & Felix“'),
             ('Landgasthaus Bell', '9 km', 'Einfach', 'Gutes Frühstück')],
    merk=['Schloss Dyck', 'Der Rosengarten', 'Die Erftaue', 'Ein Markttag in Grevenbroich'],
    fragen=[('Darf ich jemanden mitbringen?', 'Wenn auf eurer Karte eine Begleitung steht: sehr gern, bitte oben eintragen. Sonst wird das Glashaus zu eng.'),
            ('Kinder?', 'Sehr gern. Es gibt einen Park, eine Betreuung ab 16 Uhr und Beete, in denen ausdrücklich gebuddelt werden darf.'),
            ('Ich habe Heuschnupfen.', 'Das ist ernst gemeint eine gute Frage. Die Trauung ist drinnen, aber alles blüht. Nehmt eure Tabletten mit.'),
            ('Und bei Regen?', 'Dann ist es im Glashaus besonders schön. Nur der Weg vom Parkplatz wird matschig — feste Schuhe.'),
            ('Ich schaffe es nicht.', 'Sagt früh Bescheid, dann ist alles gut. Wir schicken euch Blumen.')])
THEMEN.append(t)

# ---------------------------------------------------------------- 9
t = grund('rein'); t.update(
    band=['medien/g1.webp','medien/g2.webp','medien/g3.webp','medien/g4.webp'],
    flug=dict(form='dunst', toene=['rgba(255,255,255,.5)','rgba(240,235,255,.4)'], gross=(110,250), wehen=180, klar=(.25,.5), dauer=(30,52)),
    schimmer=True,
    umschlag_farben=dict(grund='#f2f0ea', ring='rgba(120,110,80,.45)', schrift='#5f5a4a', blitz='rgba(255,252,240,.95)', schatten='0 1px 12px rgba(255,255,255,.85)'),
    auftakt=dict(namen='#ffffff', schrift='#ffffff', linie='rgba(255,255,255,.75)', ruf='rgba(255,255,255,.9)', schatten='0 2px 18px rgba(20,20,30,.55)', schleier='rgba(20,20,30,.18)', stern='#f2d489', und='#f2d489', glanz='#fffbe8'),
    namen='Sophie & Elias', vornamen=('Sophie', 'Elias'),
    datum_text='20. März 2027', datum_lang='20. März 2027 · Kapelle am Hang, Königswinter',
    beschreibung='Einladung zur Hochzeit von Sophie und Elias am 20. März 2027 in der Kapelle am Hang.',
    beginnISO='2027-03-20T15:00:00', endeISO='2027-03-21T01:00:00',
    anlass='Hochzeit von Sophie & Elias',
    kalendertext='Ankommen ab 14:30 Uhr vor der Kapelle, Trauung um 15 Uhr.',
    email='sophie.und.elias@example.de', iban='DE00 0000 0000 0000 0000 00',
    iban_name='Förderverein Kapelle am Hang', marke='S & E',
    farben=dict(cream='#faf8f3', paper='#f2eee6', blush='#e8e2ee', sage='#c2c6d4',
                accent='#a58411', text='#2f2b3a', olive='#33304f', gold='#e8d9a0', muted='#726e80'),
    countdown_unter='Bis die Orgel einsetzt.',
    geschichte=[
        ('2015', 'Ein Chor', 'Zweiter Sopran, erster Bass. Wir haben ein halbes Jahr nebeneinander gesungen, bevor jemand etwas gesagt hat.'),
        ('2018', 'Eine Wohnung ohne Möbel', 'Drei Monate lang nur eine Matratze und ein Klavier. Es war die beste Zeit, sagen wir heute.'),
        ('2022', 'Ein Jahr Pause', 'Wir waren getrennt, elf Monate lang. Es gehört dazu, und ohne das wäre der Rest nicht wahr.'),
        ('2026', 'Ohne viele Worte', 'An einem Sonntagmorgen, in der Küche, halb angezogen. Es hat keine drei Minuten gedauert.')],
    programm=[('14:30', 'Ankommen', 'Vor der Kapelle.'),
              ('15:00', 'Trauung', 'Mit Orgel. Sie ist von 1904.'),
              ('16:00', 'Kaffee', 'Im Garten hinter dem Pfarrhaus.'),
              ('18:00', 'Abendessen', 'An einer Tafel für vierzig.'),
              ('20:30', 'Musik', 'Kein DJ. Ein Klavier und wer mag.'),
              ('01:00', 'Ende', 'Wir sind früh dran. Absichtlich.')],
    ort=dict(name='Kapelle am Hang', zeit='Trauung 15:00 Uhr', strasse='Bergstraße 40',
             stadt='53639 Königswinter',
             text='Eine kleine Kapelle über dem Rhein mit vierzig Plätzen. Der Weg hinauf ist steil und gepflastert — wer nicht gut zu Fuß ist, sagt uns Bescheid, wir holen euch oben ab.'),
    ort_unter='Alles, was ihr wissen müsst.',
    kleider_text='Schlicht und hell. Wir haben keine Regeln, aber wenn ihr eine wollt: möglichst wenig Muster. Im März ist es oben am Hang windig und die Kapelle wird nicht warm.',
    kleider_farben=['#faf8f3', '#e8e2ee', '#c2c6d4', '#a58411'],
    rsvp_unter='Bitte bis zum 15. Januar 2027.',
    geschenke_text='Wir wünschen uns nichts. Das ist keine Floskel — wir haben alles, was wir brauchen. Wer trotzdem etwas geben möchte: Die Orgel der Kapelle wird seit Jahren repariert und sammelt dafür.',
    haeuser=[('Hotel Am Drachenfels', '1 km', 'Vier Sterne', 'Kontingent „Sophie & Elias“'),
             ('Gästehaus Rheinblick', '2 km', 'Sechs Zimmer', 'Ruhig gelegen'),
             ('Pension Talstation', '3 km', 'Einfach', 'Günstig und freundlich')],
    merk=['Der Drachenfels', 'Schloss Drachenburg', 'Die Zahnradbahn', 'Ein Spaziergang am Rhein'],
    fragen=[('Darf ich jemanden mitbringen?', 'Nur wenn auf eurer Karte eine Begleitung steht. Die Kapelle hat vierzig Plätze, mehr geht wirklich nicht.'),
            ('Kinder?', 'Sehr gern, aber sagt uns Bescheid. Es gibt keinen eigenen Bereich — sie sind einfach dabei.'),
            ('Fotos?', 'Während der Trauung bitte nicht. Danach gern, aber stellt euch nicht in den Weg der Fotografin.'),
            ('Wie kalt ist die Kapelle?', 'Um die vierzehn Grad. Sie wird nicht geheizt, und eine Stunde darin merkt man.'),
            ('Ich schaffe es nicht.', 'Dann sagt es früh, damit jemand anderes den Platz bekommt. Wir sind euch nicht böse.')])
THEMEN.append(t)


# =========================================================
#  ENGLISCH
#  Nur die Texte. Namen, Uhrzeiten, Strassen und Orte bleiben
#  stehen - eine Adresse uebersetzt man nicht.
#  Der Generator sucht jede Zeichenkette hier; was nicht
#  drinsteht, bleibt deutsch.
# =========================================================
EN = {
    # --- Was auf allen neun Karten gleich heisst ---
    'Wir zählen die Tage': 'Counting the days',
    'Bis dahin': 'Until then',
    'Unser Weg': 'Our journey',
    'Wie es dazu kam': 'How it happened',
    'Ein Blick auf uns': 'A glimpse of us',
    'Momente': 'Moments',
    'Der Tag': 'The day',
    'Was wir vorbereitet haben': 'What we have prepared for you',
    'Seid dabei': 'Join us',
    'Der Ort': 'The venue',
    'Eine Bitte': 'One request',
    'Kleiderordnung': 'Dress code',
    'Wir freuen uns auf euch': 'We would love to see you',
    'In eigener Sache': 'On our own behalf',
    'Plant euren Besuch': 'Plan your visit',
    'Anreise & Übernachtung': 'Travel & accommodation',
    'Damit euer Besuch so bequem wie möglich wird.':
        'So your visit is as comfortable as it can be.',
    'Wenn ihr länger bleibt, lohnen sich diese Orte:':
        'If you are staying on, these places are worth your time:',
    'Ihr fragt': 'You asked',
    'Siegel drücken': 'Press the seal',
    'Alles, was ihr wissen müsst.': 'Everything you need to know.',
    'Fleisch': 'Meat', 'Fisch': 'Fish',
    'Vegetarisch': 'Vegetarian', 'Vegan': 'Vegan',

    # --- Amelie & David ---
    '12. Juni 2027': '12 June 2027',
    '12. Juni 2027 · Riad Al Karam, Marrakesch': '12 June 2027 · Riad Al Karam, Marrakesh',
    'Einladung zur Hochzeit von Amelie und David am 12. Juni 2027 in Marrakesch.':
        'Invitation to the wedding of Amelie and David on 12 June 2027 in Marrakesh.',
    'Hochzeit von Amelie & David': 'Wedding of Amelie & David',
    'Empfang ab 16:30 Uhr im Riadgarten, Trauung um 17 Uhr.':
        'Reception from 4:30 pm in the riad garden, ceremony at 5 pm.',
    'Bis wir im Garten stehen.': 'Until we stand in that garden.',
    'Ein Regenschirm zu wenig': 'One umbrella short',
    'Botanischer Garten, Aprilschauer, ein Schirm für zwei. Amelie behauptet bis heute, sie habe ihn zuerst gehabt.':
        'A botanical garden, an April downpour, one umbrella between two. Amelie still insists it was hers first.',
    'Der erste Sommer im Süden': 'The first southern summer',
    'Drei Wochen Marokko, ein Mietwagen ohne Klimaanlage und die Erkenntnis, dass wir gut zusammen reisen.':
        'Three weeks in Morocco, a rental car without air conditioning, and the discovery that we travel well together.',
    'Das Haus mit dem schiefen Boden': 'The house with the crooked floor',
    'Wir zogen in ein Haus, in dem jede Murmel nach Westen rollt. Wir blieben trotzdem. Oder deswegen.':
        'We moved into a house where every marble rolls west. We stayed anyway. Or because of it.',
    'Die Frage': 'The question',
    'Gestellt an einem Dienstag, ohne Anlass, in der Küche, während der Reis anbrannte. Die Antwort kam vorher.':
        'Asked on a Tuesday, for no reason, in the kitchen, while the rice burned. The answer came first.',
    'Ankommen': 'Arrival', 'Im Garten. Es gibt Minztee.': 'In the garden. There will be mint tea.',
    'Trauung': 'Ceremony', 'Unter den Palmen am Wasserbecken.': 'Under the palms by the pool.',
    'Aperitif': 'Aperitif',
    'Auf der Terrasse, solange die Sonne dort steht.': 'On the terrace, while the sun is still on it.',
    'Abendessen': 'Dinner',
    'An einer langen Tafel, ohne Sitzordnung.': 'At one long table, no seating plan.',
    'Der erste Tanz': 'First dance', 'Kurz. Versprochen.': 'Short. We promise.',
    'Feiern': 'Dancing', 'Bis die Musik aufhört.': 'Until the music stops.',
    'Schluss': 'End', 'Die letzten Wagen fahren.': 'The last cars leave.',
    'Trauung 17:00 Uhr': 'Ceremony at 5:00 pm',
    'Ein alter Stadtpalast mit einem Garten, den man von der Gasse aus nicht vermutet. Kommt lieber zehn Minuten zu früh — das Tor ist leicht zu übersehen.':
        'An old town palace with a garden you would never guess at from the lane. Come ten minutes early — the gate is easy to miss.',
    'Festlich und leicht. Es hat abends noch um die achtundzwanzig Grad, der Boden ist Kies und Mosaik — dünne hohe Absätze werden den Abend nicht überstehen. Für die späte Stunde lohnt sich etwas für über die Schultern.':
        'Festive and light. It is still around 28 degrees in the evening, and the ground is gravel and mosaic — thin high heels will not survive the night. Bring something for your shoulders for the late hours.',
    'Bitte bis zum 1. April 2027, damit wir planen können.':
        'Please reply by 1 April 2027 so we can plan.',
    'Wir haben zwei von allem und brauchen nichts. Wer trotzdem etwas dalassen möchte: Wir sparen auf ein Dach, das dicht ist.':
        'We have two of everything and need nothing. If you would still like to leave something: we are saving for a roof that does not leak.',
    'Vor Ort': 'On site', 'Acht Zimmer': 'Eight rooms',
    'Kontingent bis 1. Mai': 'Rooms held until 1 May',
    '5 Minuten': '5 minutes', 'Vier Sterne': 'Four stars',
    'Sonderpreis für unsere Gäste': 'Special rate for our guests',
    '10 Minuten': '10 minutes', 'Klein und ruhig': 'Small and quiet',
    'Gutes Frühstück auf dem Dach': 'Good breakfast on the roof',
    'Die Souks': 'The souks', 'Ein Hammam': 'A hammam',
    'Darf ich jemanden mitbringen?': 'May I bring someone?',
    'Wenn auf eurer Einladung eine Begleitung steht: sehr gern. Tragt sie einfach oben mit ein.':
        'If your invitation names a guest, absolutely. Just add them above.',
    'Sind Kinder dabei?': 'Are children welcome?',
    'Ja. Es gibt eine Betreuung ab 17 Uhr und Essen, das Kinder auch essen.':
        'Yes. There is childcare from 5 pm and food that children will actually eat.',
    'Fotos während der Trauung?': 'Photos during the ceremony?',
    'Bitte nicht. Eine halbe Stunde ohne Telefone — danach gern und viel.':
        'Please not. Half an hour without phones — after that, as many as you like.',
    'Wie kommen wir hin?': 'How do we get there?',
    'Vom Flughafen sind es zwanzig Minuten. Wer uns bis Ostern Bescheid gibt, bekommt einen Platz im Sammeltransfer.':
        'Twenty minutes from the airport. Tell us by Easter and we will save you a seat in the shared transfer.',
    'Ich schaffe es nicht.': 'I cannot make it.',
    'Sagt uns rechtzeitig Bescheid, das ist alles. Wir sind nicht beleidigt, nur traurig.':
        'Just let us know in good time. We will not be offended, only sad.',
}

EN.update({
    # --- Rosa & Nikolas ---
    '22. Mai 2027': '22 May 2027',
    '22. Mai 2027 · Villa Rosenau, Bad Honnef': '22 May 2027 · Villa Rosenau, Bad Honnef',
    'Einladung zur Hochzeit von Rosa und Nikolas am 22. Mai 2027 in Bad Honnef.':
        'Invitation to the wedding of Rosa and Nikolas on 22 May 2027 in Bad Honnef.',
    'Hochzeit von Rosa & Nikolas': 'Wedding of Rosa & Nikolas',
    'Ankommen ab 16 Uhr im Rosengarten, Trauung um 16:30 Uhr am Brunnen.':
        'Arrive from 4 pm in the rose garden, ceremony at 4:30 pm by the fountain.',
    'Bis der Brunnen läuft.': 'Until the fountain runs.',
    'Eine falsche Adresse': 'The wrong address',
    'Nikolas stand vor der falschen Haustür. Rosa machte auf. Beide behaupten, sie hätten es sofort gewusst; beide lügen.':
        'Nikolas rang the wrong doorbell. Rosa answered. Both claim they knew at once; both are lying.',
    'Der Brunnen': 'The fountain',
    'In einem Innenhof in Verona, nachts, mit nassen Schuhen. Von da an war es kein Zufall mehr.':
        'In a courtyard in Verona, at night, with wet shoes. After that it stopped being coincidence.',
    'Zwei Schlüssel': 'Two keys',
    'Eine Wohnung mit schlechtem Licht und einer guten Küche. Es reichte vollkommen.':
        'A flat with bad light and a good kitchen. It was entirely enough.',
    'Ohne Kniefall': 'No one knelt',
    'Gefragt haben wir uns gegenseitig, im Auto, an einer roten Ampel. Es hat länger gedauert als die Ampel.':
        'We asked each other, in the car, at a red light. It took longer than the light did.',
    'Im Rosengarten. Es gibt kalten Wermut.': 'In the rose garden. There will be cold vermouth.',
    'Am Brunnen. Bitte pünktlich, es dauert nur zwanzig Minuten.':
        'By the fountain. Please be on time; it only takes twenty minutes.',
    'Aperitivo': 'Aperitivo',
    'Vier Gänge, italienisch, an einer langen Tafel.':
        'Four courses, Italian, at one long table.',
    'Und danach alle anderen.': 'And after that, everyone else.',
    'Mitternachtssuppe': 'Midnight soup',
    'Für alle, die noch stehen.': 'For everyone still standing.',
    'Die Taxis warten am Tor.': 'The taxis are waiting at the gate.',
    'Trauung 16:30 Uhr': 'Ceremony at 4:30 pm',
    'Ein Haus mit einem Garten, der im Mai vollständig überwuchert ist. Das Tor sieht geschlossen aus. Ist es nicht.':
        'A house with a garden that is completely overgrown by May. The gate looks shut. It is not.',
    'Sommerlich festlich. Der Innenhof ist gepflastert, die Terrasse aus Kies — bringt Schuhe mit, in denen ihr auch tanzen könnt. Nach Sonnenuntergang wird es am Wasser empfindlich kühl.':
        'Summer festive. The courtyard is cobbled and the terrace is gravel — bring shoes you can also dance in. After sunset it gets properly cool by the water.',
    'Bitte bis zum 15. März 2027.': 'Please reply by 15 March 2027.',
    'Der Haushalt ist voll und die Regale sind es auch. Wer etwas dalassen möchte: Wir legen für eine Reise zusammen, die schon dreimal verschoben wurde.':
        'The cupboards are full and so are the shelves. If you would like to leave something: we are pooling for a trip that has been postponed three times already.',
    'Wer zuerst kommt': 'First come, first served',
    '1,5 km': '1.5 km', 'Kontingent „Rosa & Nikolas“': 'Rooms held under "Rosa & Nikolas"',
    '3 km': '3 km', 'Klein und gut': 'Small and good',
    'Laut am Morgen, ehrlich gesagt': 'Loud in the morning, honestly',
    'Rheinpromenade': 'The Rhine promenade',
    'Die Fähre nach Bonn': 'The ferry to Bonn',
    'Wenn auf der Einladung eine Begleitung steht: ja, und tragt sie bitte oben ein. Sonst ist der Hof leider zu klein.':
        'If your invitation names a guest, yes — please add them above. Otherwise the courtyard is simply too small.',
    'Kommen Kinder mit?': 'Can children come?',
    'Bis 22 Uhr sehr gern. Es gibt eine Betreuung im Gartenhaus und Essen, das auch Kinder mögen.':
        'Until 10 pm, gladly. There is childcare in the garden house and food children actually like.',
    'Bitte nicht. Zwanzig Minuten ohne Telefone — danach so viel ihr wollt.':
        'Please not. Twenty minutes without phones — after that, as much as you like.',
    'Es regnet. Und dann?': 'What if it rains?',
    'Dann heiraten wir in der Orangerie. Sie ist überdacht, beheizt und ehrlich gesagt fast schöner.':
        'Then we marry in the orangery. It is covered, heated and honestly almost nicer.',
    'Ich schaffe es doch nicht.': 'I cannot come after all.',
    'Sagt es uns früh, dann ist alles gut. Wir trinken trotzdem einen auf euch.':
        'Tell us early and all is well. We will raise a glass to you anyway.',

    # --- Charlotte & Anton ---
    '25. September 2027': '25 September 2027',
    '25. September 2027 · Schloss Eichenau': '25 September 2027 · Eichenau Castle',
    'Einladung zur Hochzeit von Charlotte und Anton am 25. September 2027 auf Schloss Eichenau.':
        'Invitation to the wedding of Charlotte and Anton on 25 September 2027 at Eichenau Castle.',
    'Hochzeit von Charlotte & Anton': 'Wedding of Charlotte & Anton',
    'Empfang ab 16 Uhr im Vorsaal, Trauung um 17 Uhr in der Kapelle.':
        'Reception from 4 pm in the antechamber, ceremony at 5 pm in the chapel.',
    'Bis zum großen Abend.': 'Until the great evening.',
    'Ein zu langer Blick': 'One look too long',
    'Auf einem Ball, den beide nur aus Höflichkeit besuchten. Es wurde nicht getanzt, aber sehr lange gesprochen.':
        'At a ball both attended only out of politeness. There was no dancing, but a very long conversation.',
    'Ein Briefwechsel': 'A correspondence',
    'Vierhundert Nachrichten in elf Wochen. Der Anstand verlangt, den Inhalt zu verschweigen.':
        'Four hundred messages in eleven weeks. Decency requires us to withhold the contents.',
    'Ein gemeinsames Haus': 'A shared house',
    'Mit zu vielen Büchern und zu wenig Regalen. Daran hat sich bis heute nichts geändert.':
        'With too many books and not enough shelves. Nothing has changed since.',
    'Der Antrag': 'The proposal',
    'Ohne Zeugen, ohne Musik, ohne Kniefall — und trotzdem vollkommen ausreichend.':
        'No witnesses, no music, no one on one knee — and entirely sufficient all the same.',
    'Empfang': 'Reception', 'Im Vorsaal. Es wird Champagner gereicht.':
        'In the antechamber. Champagne will be served.',
    'In der Kapelle. Dreißig Minuten, keine länger.':
        'In the chapel. Thirty minutes, not one more.',
    'Gratulation': 'Congratulations',
    'Im Park, sofern das Wetter es erlaubt.': 'In the park, weather permitting.',
    'Diner': 'Dinner', 'Fünf Gänge an der langen Tafel.': 'Five courses at the long table.',
    'Eröffnungstanz': 'Opening dance', 'Danach übernimmt die Kapelle.':
        'After that the band takes over.',
    'Souper': 'Supper', 'Für die Ausdauernden.': 'For those who last.',
    'Ende': 'End', 'Die Wagen warten.': 'The cars are waiting.',
    'Ein Haus mit Parkettböden, Kronleuchtern und einem Park, der im September golden wird. Die Auffahrt ist die zweite, nicht die erste.':
        'A house of parquet floors, chandeliers and a park that turns gold in September. Take the second drive, not the first.',
    'Großer Abend. Lange Kleider, dunkle Anzüge. Der Saal ist kühl, der Park nach Mitternacht noch kühler — nehmt etwas für über die Schultern mit.':
        'Black tie. Long dresses, dark suits. The hall is cool and the park after midnight cooler still — bring something for your shoulders.',
    'Erbeten bis zum 1. August 2027.': 'Kindly reply by 1 August 2027.',
    'Das Haus ist voll und die Vitrine erst recht. Wer dennoch etwas beitragen möchte: Wir sammeln für ein Klavier, das seit Jahren in einem Schaufenster steht und angesehen wird.':
        'The house is full and the cabinet fuller. If you would still like to contribute: we are saving for a piano that has stood in a shop window for years, being looked at.',
    'Vierzehn Zimmer': 'Fourteen rooms', 'Kontingent bis 1. Juli': 'Rooms held until 1 July',
    '2 km': '2 km', 'Kontingent „Charlotte & Anton“': 'Rooms held under "Charlotte & Anton"',
    '5 km': '5 km', 'Einfach': 'Simple', 'Freundlich und günstig': 'Friendly and affordable',
    'Die Altstadt': 'The old town', 'Der Schlosspark': 'The castle park',
    'Das Kurviertel': 'The spa quarter', 'Ein Konzert in der Kapelle': 'A concert in the chapel',
    'Steht auf eurer Karte eine Begleitung, dann sehr gern — bitte oben eintragen. Andernfalls reicht der Saal nicht.':
        'If your card names a guest, gladly — please enter them above. Otherwise the hall will not hold us.',
    'Sind Kinder willkommen?': 'Are children welcome?',
    'Bis zum Diner ja, mit Betreuung im Grünen Salon. Danach wird es spät und laut.':
        'Until dinner, yes, with childcare in the Green Salon. After that it gets late and loud.',
    'Darf ich fotografieren?': 'May I take photos?',
    'In der Kapelle nicht. Überall sonst so viel ihr mögt — und schickt uns bitte alles.':
        'Not in the chapel. Everywhere else as much as you like — and please send us everything.',
    'Gibt es eine Sitzordnung?': 'Is there a seating plan?',
    'Ja, beim Diner. Sie hängt im Vorsaal aus.': 'Yes, for dinner. It is posted in the antechamber.',
    'Ich kann doch nicht kommen.': 'I cannot come after all.',
    'Dann sagt früh ab, und wir trinken einen auf euch. Verübelt wird nichts.':
        'Then decline early and we will drink to you. Nothing will be held against you.',
})

EN.update({
    # --- Alexandra & Jonathan ---
    '6. November 2027': '6 November 2027',
    '6. November 2027 · Burg Steinbach': '6 November 2027 · Steinbach Castle',
    'Einladung zur Hochzeit von Alexandra und Jonathan am 6. November 2027 auf Burg Steinbach.':
        'Invitation to the wedding of Alexandra and Jonathan on 6 November 2027 at Steinbach Castle.',
    'Hochzeit von Alexandra & Jonathan': 'Wedding of Alexandra & Jonathan',
    'Ankommen ab 15:30 Uhr im Innenhof, Trauung um 16 Uhr in der Halle.':
        'Arrive from 3:30 pm in the courtyard, ceremony at 4 pm in the hall.',
    'Bis die Kerzen brennen.': 'Until the candles are lit.',
    'Ein Abend, der nicht enden wollte': 'An evening that would not end',
    'Eine Küche in Lissabon, zu wenig Stühle, zu viel Wein. Um vier Uhr morgens standen nur noch wir.':
        'A kitchen in Lisbon, too few chairs, too much wine. At four in the morning only we were left.',
    'Zwei Jahre am Telefon': 'Two years on the phone',
    'Zwischen zwei Städten, zwei Zeitzonen und einer Pandemie. Wir haben nie ernsthaft daran gedacht aufzuhören.':
        'Between two cities, two time zones and a pandemic. We never seriously considered stopping.',
    'Eine Adresse': 'One address',
    'Endlich dieselbe. Der Umzug dauerte drei Tage, das Auspacken zwei Jahre.':
        'The same one at last. The move took three days, the unpacking two years.',
    'Im Dunkeln, auf einer Treppe, ohne Ring — der lag zu Hause in einer Schublade. Es hat trotzdem gereicht.':
        'In the dark, on a staircase, without a ring — it was at home in a drawer. It was enough anyway.',
    'Im Innenhof. Es gibt Glühwein, ernsthaft.': 'In the courtyard. There will be mulled wine, seriously.',
    'In der Halle. Dann ist es draußen schon dunkel.': 'In the hall. By then it is dark outside.',
    'Feuer und Wein': 'Fire and wine',
    'Am Kamin, solange alle noch reden können.': 'By the fireplace, while everyone can still talk.',
    'An einer Tafel, alle an einer.': 'At one table, all of us.',
    'Tanz': 'Dancing', 'Unter den Kronleuchtern.': 'Under the chandeliers.',
    'Suppe': 'Soup', 'Für die, die bleiben.': 'For those who stay.',
    'Das Tor wird zugemacht.': 'The gate is closed.',
    'Trauung 16:00 Uhr': 'Ceremony at 4:00 pm',
    'Ein Haus aus Stein mit einer Halle, die nicht wirklich warm wird. Die letzten zwei Kilometer sind Waldweg und im November oft nass — fahrt langsam, es lohnt sich.':
        'A house of stone with a hall that never really warms up. The last two kilometres are forest track and often wet in November — drive slowly, it is worth it.',
    'Schwarz, dunkelgrün, tiefes Blau — festlich und ernst. Die Halle ist aus Stein, der Innenhof gar nicht geheizt. Bringt etwas zum Überziehen und Schuhe für Kopfsteinpflaster mit.':
        'Black, dark green, deep blue — formal and serious. The hall is stone and the courtyard is not heated at all. Bring a layer and shoes for cobblestones.',
    'Bitte bis zum 1. September 2027.': 'Please reply by 1 September 2027.',
    'Wir haben zusammen zwei Haushalte und brauchen wirklich nichts. Wer trotzdem möchte: Wir legen für den Wintergarten zusammen, den das Haus dringend hätte haben sollen.':
        'Between us we have two households and truly need nothing. If you would like to anyway: we are pooling for the conservatory the house should have had long ago.',
    'Zwölf Zimmer': 'Twelve rooms', 'Kontingent bis 1. September': 'Rooms held until 1 September',
    '8 km': '8 km', 'Kontingent „Alexandra & Jonathan“': 'Rooms held under "Alexandra & Jonathan"',
    '12 km': '12 km', 'Einfach und warm': 'Simple and warm', 'Gutes Frühstück': 'Good breakfast',
    'Das Ahrtal': 'The Ahr valley', 'Die Nürburg': 'Nürburg castle',
    'Weinproben in Mayschoß': 'Wine tasting in Mayschoß',
    'Wandern am Rotweinwanderweg': 'The Red Wine Hiking Trail',
    'Steht auf eurer Karte eine Begleitung: sehr gern, bitte oben eintragen. Sonst wird die Halle zu voll.':
        'If your card names a guest: gladly, please enter them above. Otherwise the hall gets too full.',
    'Bis zum Abendessen ja. Danach wird es spät und dunkel, und die Treppen sind steil.':
        'Until dinner, yes. After that it gets late and dark, and the stairs are steep.',
    'Bitte nicht. Es ist ohnehin zu dunkel — und ein Blitz in dieser Halle wäre ein Verbrechen.':
        'Please not. It is far too dark anyway — and a flash in that hall would be a crime.',
    'Wie kalt wird es?': 'How cold does it get?',
    'Im Innenhof um die fünf Grad, in der Halle etwa achtzehn. Es gibt Decken, aber nicht genug für alle.':
        'Around five degrees in the courtyard, about eighteen in the hall. There are blankets, but not enough for everyone.',
    'Sagt früh Bescheid. Wir sind nicht beleidigt, nur traurig, und trinken einen auf euch.':
        'Let us know early. We will not be offended, only sad, and we will drink to you.',

    # --- Lina & Matteo ---
    '5. Juni 2027': '5 June 2027',
    '5. Juni 2027 · Cala Bianca, Sizilien': '5 June 2027 · Cala Bianca, Sicily',
    'Einladung zur Hochzeit von Lina und Matteo am 5. Juni 2027 in der Cala Bianca.':
        'Invitation to the wedding of Lina and Matteo on 5 June 2027 at Cala Bianca.',
    'Hochzeit von Lina & Matteo': 'Wedding of Lina & Matteo',
    'Ankommen ab 11 Uhr am Hafen, Trauung um 12 Uhr in der Kapelle.':
        'Arrive from 11 am at the harbour, ceremony at noon in the chapel.',
    'Bis wir am Wasser stehen.': 'Until we stand by the water.',
    'Ein Fahrrad zu wenig': 'One bicycle short',
    'Rotterdam, Regen, ein geplatzter Reifen. Matteo bot an zu schieben. Es waren vier Kilometer.':
        'Rotterdam, rain, a burst tyre. Matteo offered to push. It was four kilometres.',
    'Der erste Sommer in Sizilien': 'The first Sicilian summer',
    'Vierzig Grad, kein Schatten, und Linas erstes Gespräch mit einer Großmutter, die kein Wort Deutsch spricht.':
        'Forty degrees, no shade, and Lina\'s first conversation with a grandmother who speaks no German at all.',
    'Ein Haus mit blauen Fensterläden': 'A house with blue shutters',
    'Gekauft in einer Nacht, in der beide zu müde waren, um vernünftig zu sein. Wir bereuen nichts.':
        'Bought on a night when both of us were too tired to be sensible. We regret nothing.',
    'Auf dem Dach': 'On the roof',
    'Zwischen den Tomaten, ohne Ring, mit einem Glas Wein. Die Nachbarn haben applaudiert, bevor wir etwas sagen konnten.':
        'Among the tomatoes, without a ring, with a glass of wine. The neighbours applauded before we could say anything.',
    'Am Hafen. Es gibt Granita und Schatten.': 'At the harbour. There will be granita and shade.',
    'In der Kapelle über der Bucht.': 'In the chapel above the bay.',
    'Pranzo': 'Pranzo', 'Vier Stunden Mittagessen. Ja, vier.': 'A four-hour lunch. Yes, four.',
    'Riposo': 'Riposo', 'Siesta, Meer, wer will schläft.': 'Siesta, sea, sleep if you like.',
    'Cena': 'Cena', 'Noch einmal Essen, diesmal am Wasser.': 'Dinner again, this time by the water.',
    'Auf dem Platz vor der Kirche.': 'On the square in front of the church.',
    'Oder wann immer die Musik aufhört.': 'Or whenever the music stops.',
    'Trauung 12:00 Uhr': 'Ceremony at 12:00 noon',
    'Eine weiß gekalkte Kapelle über einer Bucht, mit einem Pavillon am Wasser. Der letzte Weg ist Schotter — nehmt keine Absätze mit.':
        'A whitewashed chapel above a bay, with a pavilion by the water. The last stretch is gravel — leave the heels at home.',
    'Leinen, Baumwolle, helle Farben. Es hat mittags um die dreißig Grad und es gibt kaum Schatten — denkt an Hüte. Der Boden ist überall Stein oder Sand.':
        'Linen, cotton, light colours. It is around thirty degrees at midday with almost no shade — bring hats. The ground is stone or sand throughout.',
    'Bitte bis zum 1. März 2027 — wegen der Flüge.':
        'Please reply by 1 March 2027 — because of the flights.',
    'Ihr fliegt für uns nach Sizilien — das ist mehr als genug. Wer trotzdem etwas dalassen möchte: Das Dach des Hauses ist noch dasselbe wie 1961.':
        'You are flying to Sicily for us — that is more than enough. If you would still like to leave something: the roof of the house is the same one it had in 1961.',
    'Zehn Zimmer': 'Ten rooms', 'Kontingent bis Ostern': 'Rooms held until Easter',
    'Kontingent „Lina & Matteo“': 'Rooms held under "Lina & Matteo"',
    '15 km': '15 km', 'Familiär': 'Family run', 'Günstig und herzlich': 'Affordable and warm',
    'Noto und sein Barock': 'Noto and its baroque',
    'Die Badebuchten': 'The swimming coves',
    'Der Markt in Avola': 'The market in Avola',
    'Ein Boot nach Vendicari': 'A boat to Vendicari',
    'Wenn auf eurer Karte eine Begleitung steht: sehr gern, bitte oben eintragen. Sonst wird die Bucht zu voll.':
        'If your card names a guest: gladly, please enter them above. Otherwise the bay gets too crowded.',
    'Kinder?': 'Children?',
    'Unbedingt. Es gibt Meer, Sand und eine Großtante, die seit vierzig Jahren nichts lieber tut als aufpassen.':
        'Absolutely. There is sea, sand and a great-aunt who has wanted nothing more than to watch them for forty years.',
    'Wie heiß wird es?': 'How hot does it get?',
    'Mittags um dreißig Grad, abends um zweiundzwanzig. Wasser gibt es überall, Schatten nur an der Laube.':
        'Around thirty degrees at midday, twenty-two in the evening. Water everywhere, shade only under the pergola.',
    'Muss ich Italienisch können?': 'Do I need Italian?',
    'Nein. Aber „grazie“ und „un altro bicchiere“ bringen euch weiter, als ihr denkt.':
        'No. But "grazie" and "un altro bicchiere" will get you further than you think.',
    'Sagt früh Bescheid, dann ist alles gut. Wir bringen euch Zitronen mit.':
        'Let us know early and all is well. We will bring you lemons.',
})

EN.update({
    # --- Emma & Ben ---
    '17. Juli 2027': '17 July 2027',
    '17. Juli 2027 · Gut Kaltenbach': '17 July 2027 · Kaltenbach Estate',
    'Einladung zur Hochzeit von Emma und Ben am 17. Juli 2027 in der Orangerie Gut Kaltenbach.':
        'Invitation to the wedding of Emma and Ben on 17 July 2027 at the Kaltenbach Estate orangery.',
    'Hochzeit von Emma & Ben': 'Wedding of Emma & Ben',
    'Ankommen ab 13 Uhr, Trauung um 14 Uhr im Rosengarten.':
        'Arrive from 1 pm, ceremony at 2 pm in the rose garden.',
    'Bis der Kuchen angeschnitten wird.': 'Until the cake is cut.',
    'Zwei Meter Abstand': 'Two metres apart',
    'Kennengelernt im Treppenhaus, weil sonst nichts offen war. Ben hat Emma zwei Wochen lang Brot vor die Tür gestellt.':
        'We met in the stairwell, because nothing else was open. Ben left bread outside Emma\'s door for two weeks.',
    'Der erste Kuchen': 'The first cake',
    'Emma backte, Ben aß. An dieser Aufgabenteilung hat sich seither nichts geändert.':
        'Emma baked, Ben ate. That division of labour has not changed since.',
    'Ein Hund namens Keks': 'A dog called Biscuit',
    'Sollte eine Woche bleiben. Ist noch da. Kommt mit.':
        'Meant to stay a week. Still here. Coming along.',
    'Im Supermarkt': 'In the supermarket',
    'Zwischen Mehl und Backpulver, ohne Ring, ohne Plan. Die Kassiererin hat mitgeklatscht.':
        'Between the flour and the baking powder, no ring, no plan. The cashier applauded too.',
    'Limonade, Schatten, Hallo sagen.': 'Lemonade, shade, hellos.',
    'Im Rosengarten. Taschentücher liegen bereit.':
        'In the rose garden. Tissues are provided.',
    'Sekt und Kuchen': 'Fizz and cake',
    'Elf Sorten. Wir haben nachgezählt.': 'Eleven kinds. We counted.',
    'Draußen, wenn es das Wetter zulässt.': 'Outside, weather permitting.',
    'Erster Tanz': 'First dance', 'Danach alle. Wirklich alle.': 'Then everyone. Really everyone.',
    'Mitternachtssnack': 'Midnight snack', 'Pommes. Nichts Feineres.': 'Chips. Nothing fancier.',
    'Und Frühstück um zehn für alle, die bleiben.':
        'And breakfast at ten for everyone who stays.',
    'Trauung 14:00 Uhr': 'Ceremony at 2:00 pm',
    'Eine weiße Orangerie mit Rosen an den Fenstern und einem Rosengarten davor. Einfahrt neben der großen Kastanie.':
        'A white orangery with roses at the windows and a rose garden in front. The entrance is beside the big chestnut tree.',
    'Bunt, hell, sommerlich — was auch immer euch Freude macht. Wir feiern draußen auf Rasen und Kies, es wird warm, und getanzt wird bis in die Nacht.':
        'Colourful, bright, summery — whatever makes you happy. We celebrate outdoors on grass and gravel, it will be warm, and there will be dancing well into the night.',
    'Sagt uns bitte bis zum 15. Mai 2027 Bescheid.': 'Please let us know by 15 May 2027.',
    'Unsere Küche ist voll und der Keller auch. Wenn ihr trotzdem etwas schenken möchtet: Wir sparen auf eine Woche irgendwo, wo niemand unsere Telefonnummer hat.':
        'Our kitchen is full and so is the cellar. If you would still like to give something: we are saving for a week somewhere nobody has our phone number.',
    'Neun Zimmer': 'Nine rooms', 'Kontingent bis 1. Mai': 'Rooms held until 1 May',
    '14 km': '14 km', 'Kontingent „Emma & Ben“': 'Rooms held under "Emma & Ben"',
    '6 km': '6 km', 'Klein': 'Small', 'Herzlich und günstig': 'Warm and affordable',
    'Der Rheinauenpark': 'The Rheinaue park', 'Das Siebengebirge': 'The Siebengebirge hills',
    'Bonner Altstadt': 'Bonn old town', 'Ein Tag am Wasser': 'A day by the water',
    'Wenn auf eurer Karte eine Begleitung steht: klar! Bitte oben eintragen, damit wir mitzählen können.':
        'If your card names a guest, of course! Please enter them above so we can count.',
    'Ja bitte. Es gibt eine Hüpfburg, Eis und ab 16 Uhr zwei Betreuerinnen im Gartenhaus.':
        'Yes please. There is a bouncy castle, ice cream and two carers in the garden house from 4 pm.',
    'Darf mein Hund mit?': 'Can I bring my dog?',
    'Keks kommt auch, also ja — solange er sich mit anderen Hunden verträgt. Sagt uns kurz Bescheid.':
        'Biscuit is coming too, so yes — as long as yours gets on with other dogs. Just let us know.',
    'Und wenn es regnet?': 'And if it rains?',
    'Dann rücken wir in die Orangerie. Sie ist groß genug und viel schöner, als der Name klingt.':
        'Then we move into the orangery. It is big enough and far nicer than the name suggests.',
    'Ich kann nicht kommen.': 'I cannot come.',
    'Schade, aber sagt früh Bescheid. Wir heben euch ein Stück Kuchen auf.':
        'A shame, but tell us early. We will save you a slice of cake.',

    # --- Nora & Julius ---
    '4. September 2027': '4 September 2027',
    '4. September 2027 · Alte Werft, Hamburg': '4 September 2027 · Old Shipyard, Hamburg',
    'Einladung zur Hochzeit von Nora und Julius am 4. September 2027 in der Alten Werft, Hamburg.':
        'Invitation to the wedding of Nora and Julius on 4 September 2027 at the Old Shipyard in Hamburg.',
    'Hochzeit von Nora & Julius': 'Wedding of Nora & Julius',
    'Ankunft ab 15 Uhr, Trauung um 16 Uhr am Wasser. Eingang Sued.':
        'Arrive from 3 pm, ceremony at 4 pm by the water. South entrance.',
    'Bis wir angekommen sind.': 'Until we have arrived.',
    'Derselbe Nachtbus': 'The same night bus',
    'Zwei gebuchte Plätze, ein Sitz. Nora hat gewonnen. Julius hat elf Stunden im Gang gestanden und trotzdem seine Nummer dagelassen.':
        'Two booked places, one seat. Nora won. Julius stood in the aisle for eleven hours and still left his number.',
    'Drei Monate zu lang geblieben': 'Three months too long',
    'Aus zwei Wochen in Porto wurden zwei Jahreszeiten. Wir haben Portugiesisch gelernt und beides wieder vergessen.':
        'Two weeks in Porto became two seasons. We learned Portuguese and forgot both.',
    'Ein Schlüssel für zwei': 'One key for two',
    'Zurückgekommen nach Hamburg, weil das Meer hier zwar kälter ist, aber die Leute näher.':
        'Back to Hamburg, because the sea here is colder but the people are closer.',
    'An einem schwarzen Strand in Island, im Regen, mit einem Ring aus der Manteltasche. Es hat niemand zugesehen.':
        'On a black beach in Iceland, in the rain, with a ring from a coat pocket. Nobody was watching.',
    'Ankunft': 'Arrival', 'An der Halle. Es gibt Franzbrötchen.':
        'At the hall. There will be Franzbrötchen.',
    'Am Wasser, mit Blick auf die Kräne.': 'By the water, looking out at the cranes.',
    'Anstoßen': 'Toasts', 'Auf dem Kai, solange die Sonne steht.':
        'On the quay, while the sun holds.',
    'Essen': 'Dinner', 'An langen Tischen, alles zum Weiterreichen.':
        'At long tables, everything passed around.',
    'In der Halle. Es hallt, das ist Absicht.': 'In the hall. It echoes, and that is the point.',
    'Currywurst': 'Currywurst', 'Vom Wagen draußen.': 'From the van outside.',
    'Endstation': 'Last stop', 'Die letzten Taxis fahren vom Sandtorkai.':
        'The last taxis leave from Sandtorkai.',
    'Eine alte Werfthalle am Wasser, mit Blick auf die Kräne. Eingang Süd, nicht der große am Wasser.':
        'An old shipyard hall on the water, looking out at the cranes. South entrance, not the big one by the water.',
    'Festlich, aber hafentauglich. Der Boden ist Beton, draußen weht es immer, und abends wird es am Wasser kühl. Bringt etwas Windfestes mit — Hüte fliegen hier weg.':
        'Formal but harbour-proof. The floor is concrete, there is always a wind outside, and it gets cool by the water in the evening. Bring something windproof — hats blow away here.',
    'Bitte bis zum 1. Juli 2027.': 'Please reply by 1 July 2027.',
    'Wir besitzen wenig und wollen es dabei belassen. Wenn ihr etwas beitragen möchtet: Wir sparen auf eine lange Reise, von der wir schon zu oft erzählt haben.':
        'We own little and intend to keep it that way. If you would like to contribute: we are saving for a long journey we have talked about far too often.',
    '300 m': '300 m', 'Kontingent „Nora & Julius“': 'Rooms held under "Nora & Julius"',
    '1,2 km': '1.2 km', 'Klein und günstig': 'Small and affordable',
    'Laut, aber ehrlich': 'Loud, but honest',
    'Familienfreundlich': 'Family friendly',
    'Die Elbphilharmonie': 'The Elbphilharmonie',
    'Ein Hafenrundfahrt': 'A harbour tour',
    'Die Speicherstadt bei Nacht': 'The Speicherstadt at night',
    'Fischmarkt am Sonntag': 'The fish market on Sunday',
    'Wenn auf eurer Karte eine Begleitung steht: gern, bitte oben eintragen. Sonst wird die Halle zu voll.':
        'If your card names a guest: gladly, please enter them above. Otherwise the hall gets too full.',
    'Ja. Es gibt einen abgetrennten Bereich mit Betreuung ab 17 Uhr und Betten für die Kleinen ab 21 Uhr.':
        'Yes. There is a separate area with childcare from 5 pm and beds for the little ones from 9 pm.',
    'Wie kalt wird es abends?': 'How cold does it get in the evening?',
    'Am Wasser um die vierzehn Grad, drinnen zwanzig. Der Wind macht den Unterschied, nicht die Temperatur.':
        'About fourteen degrees by the water, twenty inside. It is the wind that makes the difference, not the temperature.',
    'Gibt es Parkplätze?': 'Is there parking?',
    'Nur im Parkhaus nebenan, kostenpflichtig. Kommt mit der U4, das ist schneller und billiger.':
        'Only the paid car park next door. Take the U4 — it is faster and cheaper.',
    'Sagt früh Bescheid. Wir schicken euch eine Postkarte von dem Tag.':
        'Let us know early. We will send you a postcard from the day.',
})

EN.update({
    # --- Clara & Felix ---
    '8. Mai 2027': '8 May 2027',
    '8. Mai 2027 · Glashaus Marienburg': '8 May 2027 · Marienburg Glasshouse',
    'Einladung zur Hochzeit von Clara und Felix am 8. Mai 2027 im Glashaus Marienburg.':
        'Invitation to the wedding of Clara and Felix on 8 May 2027 at the Marienburg Glasshouse.',
    'Hochzeit von Clara & Felix': 'Wedding of Clara & Felix',
    'Ankommen ab 14 Uhr im Glashaus, Trauung um 15 Uhr.':
        'Arrive from 2 pm in the glasshouse, ceremony at 3 pm.',
    'Bis alles blüht.': 'Until everything is in bloom.',
    'Ein Blumenladen': 'A flower shop',
    'Clara arbeitete dort, Felix kaufte elf Wochen lang jeden Freitag einen Strauß für eine Tante, die es nicht gibt.':
        'Clara worked there. For eleven weeks Felix bought a bunch every Friday for an aunt who does not exist.',
    'Der erste Garten': 'The first garden',
    'Vier Quadratmeter Schrebergarten, drei tote Tomatenpflanzen und ein Rosenstock, der bis heute steht.':
        'Four square metres of allotment, three dead tomato plants and a rose bush that is still standing.',
    'Das Gewächshaus': 'The greenhouse',
    'Selbst gebaut, zweimal umgestürzt, beim dritten Mal verschraubt. Es steht immer noch.':
        'Built ourselves, blown over twice, bolted down on the third attempt. It is still there.',
    'Zwischen den Pfingstrosen': 'Among the peonies',
    'Gefragt wurde im Knien, aber nur, weil gerade gejätet wurde. Die Antwort kam mit Erde an den Händen.':
        'The question was asked on one knee, but only because of the weeding. The answer came with soil on both hands.',
    'Im Glashaus. Es riecht wie im Juni.': 'In the glasshouse. It smells like June.',
    'Unter den Palmen, ganz hinten.': 'Under the palms, right at the back.',
    'Kuchen': 'Cake', 'Von Claras Mutter, alle sieben Sorten.':
        'By Clara\'s mother, all seven kinds.',
    'An einer Tafel mitten zwischen den Beeten.': 'At one table right among the beds.',
    'Barfuß, der Boden ist Ziegel.': 'Barefoot; the floor is brick.',
    'Und wer will, geht in den Park.': 'And anyone who likes can walk into the park.',
    'Das Tor schließt, die Blumen bleiben.': 'The gate closes, the flowers stay.',
    'Trauung 15:00 Uhr': 'Ceremony at 3:00 pm',
    'Ein viktorianisches Gewächshaus, in dem im Mai alles gleichzeitig blüht. Durch das kleine Tor, nicht durch die Auffahrt.':
        'A Victorian glasshouse where in May everything flowers at once. Through the small gate, not up the drive.',
    'Sommerlich festlich, gern mit Farbe. Im Glashaus ist es warm und feucht — Leinen ist eine bessere Idee als Wolle. Der Boden ist Ziegel und Kies, denkt an flache Schuhe.':
        'Summer festive, colour welcome. The glasshouse is warm and humid — linen is a better idea than wool. The floor is brick and gravel, so think flat shoes.',
    'Bitte bis zum 1. März 2027.': 'Please reply by 1 March 2027.',
    'Bringt bitte nichts mit, was in Papier eingewickelt ist. Wenn ihr etwas beitragen wollt: Das Gewächshaus im Garten braucht neue Scheiben, und zwar alle.':
        'Please bring nothing wrapped in paper. If you would like to contribute: the greenhouse in the garden needs new panes — all of them.',
    'Sieben Zimmer': 'Seven rooms', 'Kontingent bis 1. März': 'Rooms held until 1 March',
    '4 km': '4 km', 'Kontingent „Clara & Felix“': 'Rooms held under "Clara & Felix"',
    '9 km': '9 km',
    'Schloss Dyck': 'Dyck Castle', 'Der Rosengarten': 'The rose garden',
    'Die Erftaue': 'The Erft meadows', 'Ein Markttag in Grevenbroich': 'Market day in Grevenbroich',
    'Wenn auf eurer Karte eine Begleitung steht: sehr gern, bitte oben eintragen. Sonst wird das Glashaus zu eng.':
        'If your card names a guest: gladly, please enter them above. Otherwise the glasshouse gets too tight.',
    'Sehr gern. Es gibt einen Park, eine Betreuung ab 16 Uhr und Beete, in denen ausdrücklich gebuddelt werden darf.':
        'Very much so. There is a park, childcare from 4 pm and beds where digging is expressly allowed.',
    'Ich habe Heuschnupfen.': 'I have hay fever.',
    'Das ist ernst gemeint eine gute Frage. Die Trauung ist drinnen, aber alles blüht. Nehmt eure Tabletten mit.':
        'That is a genuinely good question. The ceremony is indoors, but everything is in flower. Bring your tablets.',
    'Dann ist es im Glashaus besonders schön. Nur der Weg vom Parkplatz wird matschig — feste Schuhe.':
        'Then the glasshouse is especially lovely. Only the path from the car park gets muddy — sturdy shoes.',
    'Sagt früh Bescheid, dann ist alles gut. Wir schicken euch Blumen.':
        'Let us know early and all is well. We will send you flowers.',

    # --- Sophie & Elias ---
    '20. März 2027': '20 March 2027',
    '20. März 2027 · Kapelle am Hang, Königswinter': '20 March 2027 · Hillside Chapel, Königswinter',
    'Einladung zur Hochzeit von Sophie und Elias am 20. März 2027 in der Kapelle am Hang.':
        'Invitation to the wedding of Sophie and Elias on 20 March 2027 at the Hillside Chapel.',
    'Hochzeit von Sophie & Elias': 'Wedding of Sophie & Elias',
    'Ankommen ab 14:30 Uhr vor der Kapelle, Trauung um 15 Uhr.':
        'Arrive from 2:30 pm outside the chapel, ceremony at 3 pm.',
    'Bis die Orgel einsetzt.': 'Until the organ begins.',
    'Ein Chor': 'A choir',
    'Zweiter Sopran, erster Bass. Wir haben ein halbes Jahr nebeneinander gesungen, bevor jemand etwas gesagt hat.':
        'Second soprano, first bass. We sang beside each other for half a year before either of us said anything.',
    'Eine Wohnung ohne Möbel': 'A flat without furniture',
    'Drei Monate lang nur eine Matratze und ein Klavier. Es war die beste Zeit, sagen wir heute.':
        'For three months just a mattress and a piano. It was the best time, we say now.',
    'Ein Jahr Pause': 'A year apart',
    'Wir waren getrennt, elf Monate lang. Es gehört dazu, und ohne das wäre der Rest nicht wahr.':
        'We were apart for eleven months. It belongs here, and without it the rest would not be true.',
    'Ohne viele Worte': 'Without many words',
    'An einem Sonntagmorgen, in der Küche, halb angezogen. Es hat keine drei Minuten gedauert.':
        'On a Sunday morning, in the kitchen, half dressed. It took less than three minutes.',
    'Vor der Kapelle.': 'Outside the chapel.',
    'Mit Orgel. Sie ist von 1904.': 'With the organ. It dates from 1904.',
    'Kaffee': 'Coffee', 'Im Garten hinter dem Pfarrhaus.':
        'In the garden behind the parsonage.',
    'An einer Tafel für vierzig.': 'At one table for forty.',
    'Musik': 'Music', 'Kein DJ. Ein Klavier und wer mag.':
        'No DJ. A piano and whoever wants to play.',
    'Wir sind früh dran. Absichtlich.': 'We finish early. On purpose.',
    'Eine kleine Kapelle über dem Rhein mit vierzig Plätzen. Der Weg hinauf ist steil und gepflastert — wer nicht gut zu Fuß ist, sagt uns Bescheid, wir holen euch oben ab.':
        'A small chapel above the Rhine with forty seats. The way up is steep and cobbled — if walking is difficult, tell us and we will collect you at the top.',
    'Schlicht und hell. Wir haben keine Regeln, aber wenn ihr eine wollt: möglichst wenig Muster. Im März ist es oben am Hang windig und die Kapelle wird nicht warm.':
        'Plain and light. We have no rules, but if you want one: as little pattern as possible. In March it is windy up on the hillside and the chapel never warms up.',
    'Bitte bis zum 15. Januar 2027.': 'Please reply by 15 January 2027.',
    'Wir wünschen uns nichts. Das ist keine Floskel — wir haben alles, was wir brauchen. Wer trotzdem etwas geben möchte: Die Orgel der Kapelle wird seit Jahren repariert und sammelt dafür.':
        'We want nothing. That is not a polite phrase — we have everything we need. If you would still like to give something: the chapel organ has been under repair for years and is collecting for it.',
    '1 km': '1 km', 'Kontingent „Sophie & Elias“': 'Rooms held under "Sophie & Elias"',
    'Sechs Zimmer': 'Six rooms', 'Ruhig gelegen': 'Quietly situated',
    'Günstig und freundlich': 'Affordable and friendly',
    'Der Drachenfels': 'The Drachenfels', 'Schloss Drachenburg': 'Drachenburg Castle',
    'Die Zahnradbahn': 'The rack railway', 'Ein Spaziergang am Rhein': 'A walk along the Rhine',
    'Nur wenn auf eurer Karte eine Begleitung steht. Die Kapelle hat vierzig Plätze, mehr geht wirklich nicht.':
        'Only if your card names a guest. The chapel seats forty and truly no more.',
    'Sehr gern, aber sagt uns Bescheid. Es gibt keinen eigenen Bereich — sie sind einfach dabei.':
        'Very welcome, but do tell us. There is no separate area — they are simply with us.',
    'Fotos?': 'Photos?',
    'Während der Trauung bitte nicht. Danach gern, aber stellt euch nicht in den Weg der Fotografin.':
        'Not during the ceremony, please. Afterwards gladly, but do not get in the photographer\'s way.',
    'Wie kalt ist die Kapelle?': 'How cold is the chapel?',
    'Um die vierzehn Grad. Sie wird nicht geheizt, und eine Stunde darin merkt man.':
        'About fourteen degrees. It is not heated, and you feel an hour in there.',
    'Dann sagt es früh, damit jemand anderes den Platz bekommt. Wir sind euch nicht böse.':
        'Then say so early, so someone else can have the seat. We will not mind.',
})


# =========================================================
#  Aus jedem uebersetzten Text wird ein Paar (deutsch, englisch).
#  Der Generator waehlt daraus beim Bauen. Was nicht in EN steht -
#  Namen, Uhrzeiten, Strassen - bleibt eine einfache Zeichenkette
#  und damit in beiden Fassungen gleich.
# =========================================================
def _paare(x, schluessel=None):
    # vornamen ist selbst ein Paar und darf nicht angefasst werden,
    # sonst hielte der Generator den zweiten Vornamen fuer Englisch.
    if schluessel in ('vornamen', 'farben', 'auftakt', 'umschlag_farben', 'flug'):
        return x
    if isinstance(x, str):
        return (x, EN[x]) if x in EN else x
    if isinstance(x, dict):
        return {k: _paare(v, k) for k, v in x.items()}
    if isinstance(x, tuple):
        return tuple(_paare(v) for v in x)
    if isinstance(x, list):
        return [_paare(v) for v in x]
    return x


THEMEN = [_paare(t) for t in THEMEN]
