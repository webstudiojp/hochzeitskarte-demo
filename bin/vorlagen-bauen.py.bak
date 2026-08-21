#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut die neun Karten unter vorlagen/ aus einer Vorlage und neun Datensaetzen.

Die Vorbilder sind eine einzige React-Anwendung, die je Thema anders
konfiguriert wird. Genau das macht dieses Skript - nur schreibt es
fertiges HTML heraus statt es im Browser zusammenzusetzen. Der Gast
bekommt damit die Seite auch dann vollstaendig, wenn kein Skript laeuft.

    python3 bin/vorlagen-bauen.py
"""
import html, pathlib, sys

WURZEL = pathlib.Path(__file__).resolve().parent.parent


SPRACHE = 'de'   # wird beim Bauen umgestellt


def vor():
    """Vorsatz zu den gemeinsamen Dateien. Die englische Fassung liegt
    in einem Unterordner und muss eine Ebene weiter hinauf."""
    return '../../' if SPRACHE == 'en' else '../'


def med():
    """Vorsatz zu den Medien der Karte."""
    return '../' if SPRACHE == 'en' else ''


def w(wert):
    """Waehlt aus einem Paar (deutsch, englisch) die gebaute Fassung.

    Einzelne Zeichenketten bleiben, wie sie sind - Namen, Uhrzeiten und
    Adressen werden nicht uebersetzt."""
    if isinstance(wert, (tuple, list)) and len(wert) == 2:
        return wert[1] if SPRACHE == 'en' else wert[0]
    return wert


def e(t):
    return html.escape(str(w(t)), quote=True)


# =========================================================
#  BAUSTEINE
# =========================================================

WORT = {
    'name':        ('Name', 'Full name'),
    'mail':        ('E-Mail', 'Email'),
    'kommst':      ('Kommst du?', 'Will you be attending?'),
    'ja':          ('Ich komme gern', 'Joyfully accept'),
    'nein':        ('Leider nicht', 'Regretfully decline'),
    'essen':       ('Was isst du?', 'Meal choice'),
    'waehlen':     ('Bitte wählen', 'Please choose'),
    'begleitung':  ('Begleitung', 'Guests'),
    'mehr':        ('+ Begleitung', '+ Add guest'),
    'allergien':   ('Allergien', 'Allergies'),
    'allergienbsp':('z. B. Nüsse, Laktose', 'e.g. nuts, lactose'),
    'gruss':       ('Ein Wort an uns', 'A message for us'),
    'senden':      ('Rückmeldung senden', 'Send RSVP'),
    'hinweis':     ('Öffnet eine fertige E-Mail an uns — abschicken müsst ihr sie selbst.',
                    'Opens a prepared email to us — you send it yourself.'),
    'danke':       ('Danke,', 'Thank you,'),
    'dankezwei':   ('Die E-Mail sollte offen sein. Falls nicht:',
                    'The email should have opened. If not:'),
    'hierentlang': ('hier entlang', 'here'),
    'route_g':     ('Route bei Google', 'Open in Google Maps'),
    'route_a':     ('Route bei Apple', 'Open in Apple Maps'),
    'kalender':    ('In den Kalender', 'Add to calendar'),
    'iban_zeigen': ('Bankverbindung zeigen', 'Show bank details'),
    'iban_kopie':  ('IBAN kopieren', 'Copy IBAN'),
    'rueckmeldung':('Rückmeldung', 'RSVP'),
    'geschenke':   ('Geschenke', 'Gifts'),
    'fragen':      ('Häufige Fragen', 'Frequently asked questions'),
    'zusagen':     ('Zusagen', 'Confirm attendance'),
    'siegel':      ('Siegel drücken', 'Press the seal'),
    'erfunden':    ('%s und %s, Termin, Ort und Bankverbindung sind frei erfunden.',
                    '%s and %s, the date, venue and bank details are fictional.'),
    'heuteist':    ('Heute ist der Tag.', 'Today is the day.'),
    'tage':        ('Tage', 'Days'),
    'stunden':     ('Stunden', 'Hours'),
    'minuten':     ('Minuten', 'Minutes'),
    'sekunden':    ('Sekunden', 'Seconds'),
    'ton':         ('Musik an oder aus', 'Music on or off'),
    'oeffnen':     ('Siegel drücken und die Einladung öffnen',
                    'Press the seal to open the invitation'),
}


def kopf(ueber, titel, unter=None, zierlinie=True):
    s = ['<div class="kopf" data-auftritt>']
    if ueber:
        s.append('<p class="kopf-ueber">%s</p>' % e(ueber))
    s.append('<h2>%s</h2>' % e(titel))
    if zierlinie:
        s.append('<div class="zierlinie"><i></i>'
                 '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'
                 '<path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/></svg>'
                 '<i></i></div>')
    if unter:
        s.append('<p class="kopf-unter">%s</p>' % e(unter))
    s.append('</div>')
    return '\n'.join(s)


def abschnitt_geschichte(t):
    st = []
    for jahr, titel, text in t['geschichte']:
        st.append(
            '<li class="station" data-auftritt>'
            '<span class="station-punkt"></span>'
            '<div class="station-feld">'
            '<span class="station-jahr">%s</span>'
            '<h3>%s</h3><p>%s</p></div></li>' % (e(jahr), e(titel), e(text)))
    return (
        '<section class="abschnitt abschnitt--creme">\n<div class="huelle">\n%s\n'
        '<div class="geschichte"><div class="geschichte-achse"></div>'
        '<ol class="stationen">%s</ol></div>\n</div>\n</section>'
        % (kopf(t['geschichte_ueber'], t['geschichte_titel']), '\n'.join(st)))


def abschnitt_countdown(t):
    teile = [(k, WORT[k]) for k in ('tage', 'stunden', 'minuten', 'sekunden')]
    u = ''.join('<div class="uhr-teil"><b data-zaehler="%s">–</b><i>%s</i></div>' % (k, e(n))
                for k, n in teile)
    return ('<section class="abschnitt abschnitt--papier">\n<div class="huelle">\n%s\n'
            '<div class="uhr" data-auftritt>%s</div>\n'
            '<p class="kopf-unter" style="text-align:center;margin-top:24px" '
            'data-countdown-vorbei hidden>%s</p>\n</div>\n</section>'
            % (kopf(t['countdown_ueber'], t['countdown_titel'], t.get('countdown_unter')),
               u, e(WORT['heuteist'])))


UHR_SVG = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" '
           'aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>')


def abschnitt_programm(t):
    p = []
    for zeit, titel, text in t['programm']:
        p.append('<li class="programm-punkt" data-auftritt>'
                 '<span class="programm-kreis">%s</span>'
                 '<div class="programm-text"><div class="programm-zeile">'
                 '<span class="programm-zeit">%s</span><h3>%s</h3></div>'
                 '<p>%s</p></div></li>' % (UHR_SVG, e(zeit), e(titel), e(text)))
    return ('<section class="abschnitt abschnitt--oliv">\n<div class="huelle huelle--eng">\n%s\n'
            '<div class="programm"><div class="programm-achse"></div>'
            '<ol class="programm-liste">%s</ol></div>\n</div>\n</section>'
            % (kopf(None, t['programm_titel'], t['programm_unter']), '\n'.join(p)))


def abschnitt_band(t):
    if not t.get('band'):
        return ''
    bilder = ''.join('<figure class="band-bild"><img src="%s%s" alt="" width="600" height="800" '
                     'loading="lazy" decoding="async"></figure>' % (med(), e(b))
                     for b in t['band'] * 2)
    return ('<section class="abschnitt abschnitt--creme">\n%s\n'
            '<div class="band" data-auftritt><div class="band-lauf">%s</div></div>\n</section>'
            % ('<div class="huelle">%s</div>' % kopf(t['band_ueber'], t['band_titel']), bilder))


def abschnitt_ort(t):
    o = t['ort']
    return ('<section class="abschnitt abschnitt--weiss">\n<div class="huelle huelle--eng">\n%s\n'
            '<div class="karte" data-auftritt>'
            '<h3>%s</h3><p class="zeit">%s</p><p>%s</p>'
            '<p class="adresse">%s<br>%s</p>'
            '<div class="tasten">'
            '<a class="taste" data-route="google" href="#">%s</a>'
            '<a class="taste" data-route="apple" href="#">%s</a>'
            '<button class="taste taste--voll" type="button" data-kalender>%s</button>'
            '</div></div>\n</div>\n</section>'
            % (kopf(t['ort_ueber'], t['ort_titel'], t.get('ort_unter')),
               e(o['name']), e(o['zeit']), e(o['text']), e(o['strasse']), e(o['stadt']),
               e(WORT['route_g']), e(WORT['route_a']), e(WORT['kalender'])))


def abschnitt_kleider(t):
    f = ''.join('<i style="--f:%s"></i>' % c for c in t['kleider_farben'])
    return ('<section class="abschnitt abschnitt--papier">\n<div class="huelle huelle--eng">\n%s\n'
            '<div class="karte" data-auftritt><p>%s</p>'
            '<div class="farbfelder">%s</div></div>\n</div>\n</section>'
            % (kopf(t['kleider_ueber'], t['kleider_titel']), e(t['kleider_text']), f))


def abschnitt_rsvp(t):
    speisen = ''.join('<option>%s</option>' % e(s) for s in t['speisen'])
    return ('<section class="abschnitt abschnitt--creme" id="rueckmeldung">\n'
            '<div class="huelle huelle--eng">\n%s\n'
            '<form class="formular" data-rsvp novalidate data-auftritt>'
            '<label class="feld"><span>%s</span>'
            '<input type="text" name="name" autocomplete="name" required></label>'
            '<label class="feld"><span>%s</span>'
            '<input type="email" name="email" autocomplete="email" required></label>'
            '<fieldset class="wahl">'
            '<label><input type="radio" name="antwort" value="zusage" checked>'
            '<span>%s</span></label>'
            '<label><input type="radio" name="antwort" value="absage">'
            '<span>%s</span></label></fieldset>'
            '<div data-nur-zusage>'
            '<label class="feld"><span>%s</span><select name="essen0" required>'
            '<option value="">%s</option>%s</select></label>'
            '<div class="begleiter" style="margin-top:20px">'
            '<span class="feld"><span>%s</span></span>'
            '<div data-begleiter></div>'
            '<button class="taste" type="button" data-begleiter-mehr>%s</button></div>'
            '<label class="feld" style="margin-top:20px"><span>%s</span>'
            '<input type="text" name="allergien" placeholder="%s"></label>'
            '</div>'
            '<label class="feld"><span>%s</span>'
            '<textarea name="gruss" rows="3"></textarea></label>'
            '<button class="taste taste--voll" type="submit">%s</button>'
            '<p class="klein">%s</p>'
            '</form>'
            '<div class="karte" data-danke hidden><h3>%s <span data-danke-name></span>.</h3>'
            '<p>%s '
            '<a data-danke-post href="#" style="text-decoration:underline">%s</a>.</p></div>'
            '\n</div>\n</section>'
            % (kopf(t['rsvp_ueber'], WORT['rueckmeldung'], t['rsvp_unter']),
               e(WORT['name']), e(WORT['mail']), e(WORT['ja']), e(WORT['nein']),
               e(WORT['essen']), e(WORT['waehlen']), speisen,
               e(WORT['begleitung']), e(WORT['mehr']),
               e(WORT['allergien']), e(WORT['allergienbsp']), e(WORT['gruss']),
               e(WORT['senden']), e(WORT['hinweis']),
               e(WORT['danke']), e(WORT['dankezwei']), e(WORT['hierentlang'])))


def abschnitt_geschenke(t):
    return ('<section class="abschnitt abschnitt--papier">\n<div class="huelle huelle--eng">\n%s\n'
            '<div class="karte" data-auftritt><p>%s</p>'
            '<div class="tasten"><button class="taste" type="button" data-iban-zeigen>'
            '%s</button></div>'
            '<div class="iban" data-iban hidden><b>%s</b><span class="nr">%s</span>'
            '<div class="tasten"><button class="taste" type="button" data-iban-kopieren>'
            '%s</button></div></div></div>\n</div>\n</section>'
            % (kopf(t['geschenke_ueber'], WORT['geschenke']), e(t['geschenke_text']),
               e(WORT['iban_zeigen']), e(t['iban_name']), e(t['iban']),
               e(WORT['iban_kopie'])))


def abschnitt_anreise(t):
    h = ''.join('<div class="haus"><h4>%s</h4><p class="stern">%s</p><p>%s</p><p>%s</p></div>'
                % (e(n), e(s), e(w), e(x)) for n, s, w, x in t['haeuser'])
    m = ''.join('<li>%s</li>' % e(x) for x in t['merk'])
    return ('<section class="abschnitt abschnitt--creme">\n<div class="huelle">\n%s\n'
            '<div class="raster raster--drei" data-auftritt>%s</div>\n'
            '<p class="kopf-unter" style="text-align:center;margin-top:48px" data-auftritt>%s</p>'
            '<ul class="merkliste" data-auftritt>%s</ul>\n</div>\n</section>'
            % (kopf(t['anreise_ueber'], t['anreise_titel'], t['anreise_unter']),
               h, e(t['merk_titel']), m))


def abschnitt_fragen(t):
    f = ''.join('<details data-frage><summary>%s</summary>'
                '<div class="fragen-antwort"><div><p>%s</p></div></div></details>'
                % (e(q), e(a)) for q, a in t['fragen'])
    return ('<section class="abschnitt abschnitt--papier">\n<div class="huelle huelle--eng">\n%s\n'
            '<div class="fragen" data-auftritt>%s</div>\n</div>\n</section>'
            % (kopf(t['fragen_ueber'], WORT['fragen']), f))


# =========================================================
#  DIE SEITE
# =========================================================

WELT_SVG = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">'
            '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/></svg>')
TON_SVG = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" '
           'stroke-linecap="round" stroke-linejoin="round">'
           '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>'
           '<path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>')
PFEIL_SVG = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" '
             'stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>')


def flug_json(f):
    """Die Flugstuecke als JSON. Ohne Angabe treibt nichts."""
    if not f:
        return 'null'
    return ('{"form":"%s","toene":[%s],"gross":[%s,%s],"wehen":%s,'
            '"klar":[%s,%s],"dauer":[%s,%s]}'
            % (f['form'], ','.join('"%s"' % x for x in f['toene']),
               f['gross'][0], f['gross'][1], f['wehen'],
               f['klar'][0], f['klar'][1], f['dauer'][0], f['dauer'][1]))


def seite(t):
    alle = dict(t['farben'])
    # Die Auftakt-Farben haengen an der Szene, nicht an der Palette:
    # helle Aquarelle brauchen dunkle Schrift, dunkle Szenen helle.
    alle.update({'auftakt-' + k: v for k, v in t.get('auftakt', {}).items()})
    farben = '\n'.join('  --%s:%s;' % (k, v) for k, v in alle.items())
    v1, v2 = t['vornamen']
    umschlag = ''
    if t.get('umschlag'):
        u = t.get('umschlag_farben', {})
        stil = ''.join('--umschlag-%s:%s;' % (k, v) for k, v in u.items())
        umschlag = (
            '<!-- Der Vorspann: ein geschlossenes Kuvert. Gedrueckt wird\n'
            '     das Siegel, aufgebrochen wird beim Loslassen. -->\n'
            '<div class="umschlag" data-umschlag role="button" tabindex="0"\n'
            '     aria-label="%s"%s>\n'
            '  <img src="%s" alt="" width="1200" height="2150" fetchpriority="high" decoding="async">\n'
            '  <span class="umschlag-blitz" aria-hidden="true"></span>\n'
            '  <span class="umschlag-ring" aria-hidden="true"></span>\n'
            '  <div class="umschlag-satz"><p class="umschlag-tippen">%s</p></div>\n'
            '</div>\n' % (e(WORT['oeffnen']), (' style="%s"' % stil) if stil else '',
                          med() + e(t['umschlag']),
                          e(t.get('umschlag_text', WORT['siegel']))))

    return """<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{namen} — {datum_text}</title>
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="{theme_color}">
<meta name="description" content="{beschreibung}">
<meta property="og:type" content="website">
<meta property="og:title" content="{namen} — {datum_text}">
<meta property="og:description" content="{beschreibung}">
<meta property="og:url" content="{basis}{kennung}/{unter}">
<meta property="og:image" content="{basis}{kennung}/vorschau.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="de_DE">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="{vor}gemeinsam/vorlage.css">
<style>
:root{{
{farben}
}}
</style>
</head>
<body>

{umschlag}<a class="pille pille--sprache" href="{andere}" hreflang="{andere_lang}"
   aria-label="{andere_titel}">{welt_svg}<span>{andere_kurz}</span></a>

<button class="pille pille--ton" type="button" data-ton aria-pressed="false">
  <span class="nur-schirmleser">{wort_ton}</span>{ton_svg}
</button>

<!-- =========================================================
     AUFTAKT — die bewegte Szene
     Das Vorbild legt die Schrift nicht auf ein Bild, sondern
     mitten in einen Ort. Deshalb laeuft hier ein Video im
     Vollbild und der Schleier darueber ist sehr duenn.
     ========================================================= -->
<section class="auftakt">
  <div class="auftakt-szene">
    <video autoplay muted loop playsinline poster="{med}{poster}" aria-hidden="true">
      <source src="{med}{szene}" type="video/mp4">
    </video>
    <img src="{med}{poster}" alt="" width="1200" height="2150" fetchpriority="high" hidden>
  </div>
  <div class="auftakt-schleier"></div>

  <div class="auftakt-satz auftritt">
    <p class="auftakt-ueber">{ueberschrift}</p>
    <h1 class="auftakt-namen{gestapelt}">{v1}<span class="und">&amp;</span>{v2}</h1>
    <div class="auftakt-teiler"><i></i><b>&#10022;</b><i></i></div>
    <p class="auftakt-datum">{datum_text}</p>
  </div>

  <div class="auftakt-unten auftritt">
    <a class="auftakt-ruf" href="#rueckmeldung">{zusagen}</a>
    <div class="auftakt-pfeil">{pfeil_svg}</div>
  </div>
</section>

{countdown}

{geschichte}

{band}

{programm}

{ort}

{kleider}

{rsvp}

{geschenke}

{anreise}

{fragen}

<footer class="fuss">
  <p class="fuss-namen">{v1} &amp; {v2}</p>
  <p class="fuss-datum">{datum_lang}</p>
  <p class="fuss-marke">{marke}</p>
  <p class="fuss-klein">{erfunden}</p>
</footer>

<script>window.KARTE = {karte};</script>
<script src="{vor}gemeinsam/vorlage.js"></script>
</body>
</html>
""".format(
        basis='https://webstudiojp.github.io/hochzeitskarte-demo/vorlagen/',
        kennung=t['kennung'], unter=('en/' if SPRACHE == 'en' else ''),
        vor=vor(), med=med(), lang=SPRACHE,
        andere=('../' if SPRACHE == 'en' else 'en/'),
        andere_lang=('de' if SPRACHE == 'en' else 'en'),
        andere_kurz=('DE' if SPRACHE == 'en' else 'EN'),
        andere_titel=('Auf Deutsch ansehen' if SPRACHE == 'en' else 'View in English'),
        welt_svg=WELT_SVG, wort_ton=e(WORT['ton']),
        zusagen=e(WORT['zusagen']),
        erfunden=e(w(WORT['erfunden']) % (w(t['vornamen'][0]), w(t['vornamen'][1]))),
        namen=e(t['namen']), datum_text=e(t['datum_text']), datum_lang=e(t['datum_lang']),
        beschreibung=e(t['beschreibung']), theme_color=t['farben']['cream'],
        farben=farben, umschlag=umschlag, ton_svg=TON_SVG, pfeil_svg=PFEIL_SVG,
        szene=e(t['szene']), poster=e(t['poster']),
        ueberschrift=e(t.get('ueberschrift', 'Wir heiraten')),
        v1=e(v1), v2=e(v2), marke=e(t.get('marke', '')),
        gestapelt=(' auftakt-namen--gestapelt' if len(v1) + len(v2) > 15 else '')
                   + (' auftakt-namen--schimmer' if t.get('schimmer') else ''),
        countdown=abschnitt_countdown(t), geschichte=abschnitt_geschichte(t),
        band=abschnitt_band(t), programm=abschnitt_programm(t), ort=abschnitt_ort(t),
        kleider=abschnitt_kleider(t), rsvp=abschnitt_rsvp(t),
        geschenke=abschnitt_geschenke(t), anreise=abschnitt_anreise(t),
        fragen=abschnitt_fragen(t),
        karte=('{"kennung":"%s","namen":"%s","beginnISO":"%s","endeISO":"%s","ort":"%s",'
               '"anlass":"%s","kalendertext":"%s","email":"%s","iban":"%s","musik":%s,'
               '"speisen":[%s],"begleiterMax":6,"flug":%s}'
               % (t['kennung'], w(t['namen']), t['beginnISO'], t['endeISO'],
                  w(t['ort']['name']) + ', ' + w(t['ort']['strasse']) + ', ' + w(t['ort']['stadt']),
                  w(t['anlass']), w(t['kalendertext']), t['email'], t['iban'],
                  ('"%s"' % t['musik']) if t.get('musik') else 'null',
                  ','.join('"%s"' % w(s) for s in t['speisen']),
                  flug_json(t.get('flug')))),
    )


def bauen(themen):
    global SPRACHE
    for sprache in ('de', 'en'):
        SPRACHE = sprache
        print('  [%s]' % sprache)
        for t in themen:
            ordner = WURZEL / 'vorlagen' / t['kennung']
            if sprache == 'en':
                ordner = ordner / 'en'
            ordner.mkdir(parents=True, exist_ok=True)
            (ordner / 'index.html').write_text(seite(t), encoding='utf-8')
            print('    %-14s %6d B' % (t['kennung'], (ordner / 'index.html').stat().st_size))
    SPRACHE = 'de'


if __name__ == '__main__':
    sys.path.insert(0, str(WURZEL / 'bin'))
    from vorlagen_daten import THEMEN
    print('vorlagen/')
    bauen(THEMEN)
