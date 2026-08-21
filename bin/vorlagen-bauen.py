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


def e(t):
    return html.escape(str(t), quote=True)


# =========================================================
#  BAUSTEINE
# =========================================================

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
    teile = [('tage', 'Tage'), ('stunden', 'Stunden'),
             ('minuten', 'Minuten'), ('sekunden', 'Sekunden')]
    u = ''.join('<div class="uhr-teil"><b data-zaehler="%s">–</b><i>%s</i></div>' % (k, n)
                for k, n in teile)
    return ('<section class="abschnitt abschnitt--papier">\n<div class="huelle">\n%s\n'
            '<div class="uhr" data-auftritt>%s</div>\n'
            '<p class="kopf-unter" style="text-align:center;margin-top:24px" '
            'data-countdown-vorbei hidden>Heute ist der Tag.</p>\n</div>\n</section>'
            % (kopf(t['countdown_ueber'], t['countdown_titel'], t.get('countdown_unter')), u))


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
    bilder = ''.join('<figure class="band-bild"><img src="%s" alt="" width="600" height="800" '
                     'loading="lazy" decoding="async"></figure>' % e(b) for b in t['band'] * 2)
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
            '<a class="taste" data-route="google" href="#">Route bei Google</a>'
            '<a class="taste" data-route="apple" href="#">Route bei Apple</a>'
            '<button class="taste taste--voll" type="button" data-kalender>In den Kalender</button>'
            '</div></div>\n</div>\n</section>'
            % (kopf(t['ort_ueber'], t['ort_titel'], t.get('ort_unter')),
               e(o['name']), e(o['zeit']), e(o['text']), e(o['strasse']), e(o['stadt'])))


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
            '<label class="feld"><span>Name</span>'
            '<input type="text" name="name" autocomplete="name" required></label>'
            '<label class="feld"><span>E-Mail</span>'
            '<input type="email" name="email" autocomplete="email" required></label>'
            '<fieldset class="wahl">'
            '<label><input type="radio" name="antwort" value="zusage" checked>'
            '<span>Ich komme gern</span></label>'
            '<label><input type="radio" name="antwort" value="absage">'
            '<span>Leider nicht</span></label></fieldset>'
            '<div data-nur-zusage>'
            '<label class="feld"><span>Was isst du?</span><select name="essen0" required>'
            '<option value="">Bitte wählen</option>%s</select></label>'
            '<div class="begleiter" style="margin-top:20px">'
            '<span class="feld"><span>Begleitung</span></span>'
            '<div data-begleiter></div>'
            '<button class="taste" type="button" data-begleiter-mehr>+ Begleitung</button></div>'
            '<label class="feld" style="margin-top:20px"><span>Allergien</span>'
            '<input type="text" name="allergien" placeholder="z. B. Nüsse, Laktose"></label>'
            '</div>'
            '<label class="feld"><span>Ein Wort an uns</span>'
            '<textarea name="gruss" rows="3"></textarea></label>'
            '<button class="taste taste--voll" type="submit">Rückmeldung senden</button>'
            '<p class="klein">Öffnet eine fertige E-Mail an uns — abschicken müsst ihr sie selbst.</p>'
            '</form>'
            '<div class="karte" data-danke hidden><h3>Danke, <span data-danke-name></span>.</h3>'
            '<p>Die E-Mail sollte offen sein. Falls nicht: '
            '<a data-danke-post href="#" style="text-decoration:underline">hier entlang</a>.</p></div>'
            '\n</div>\n</section>'
            % (kopf(t['rsvp_ueber'], 'Rückmeldung', t['rsvp_unter']), speisen))


def abschnitt_geschenke(t):
    return ('<section class="abschnitt abschnitt--papier">\n<div class="huelle huelle--eng">\n%s\n'
            '<div class="karte" data-auftritt><p>%s</p>'
            '<div class="tasten"><button class="taste" type="button" data-iban-zeigen>'
            'Bankverbindung zeigen</button></div>'
            '<div class="iban" data-iban hidden><b>%s</b><span class="nr">%s</span>'
            '<div class="tasten"><button class="taste" type="button" data-iban-kopieren>'
            'IBAN kopieren</button></div></div></div>\n</div>\n</section>'
            % (kopf(t['geschenke_ueber'], 'Geschenke'), e(t['geschenke_text']),
               e(t['iban_name']), e(t['iban'])))


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
            % (kopf(t['fragen_ueber'], 'Häufige Fragen'), f))


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
            '     aria-label="Siegel drücken und die Einladung öffnen"%s>\n'
            '  <img src="%s" alt="" width="1200" height="2150" fetchpriority="high" decoding="async">\n'
            '  <span class="umschlag-blitz" aria-hidden="true"></span>\n'
            '  <span class="umschlag-ring" aria-hidden="true"></span>\n'
            '  <div class="umschlag-satz"><p class="umschlag-tippen">%s</p></div>\n'
            '</div>\n' % ((' style="%s"' % stil) if stil else '',
                          e(t['umschlag']),
                          e(t.get('umschlag_text', 'Siegel drücken'))))

    return """<!doctype html>
<html lang="de">
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
<meta property="og:url" content="{basis}{kennung}/">
<meta property="og:image" content="{basis}{kennung}/vorschau.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="de_DE">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="../gemeinsam/vorlage.css">
<style>
:root{{
{farben}
}}
</style>
</head>
<body>

{umschlag}<button class="pille pille--ton" type="button" data-ton aria-pressed="false">
  <span class="nur-schirmleser">Musik an oder aus</span>{ton_svg}
</button>

<!-- =========================================================
     AUFTAKT — die bewegte Szene
     Das Vorbild legt die Schrift nicht auf ein Bild, sondern
     mitten in einen Ort. Deshalb laeuft hier ein Video im
     Vollbild und der Schleier darueber ist sehr duenn.
     ========================================================= -->
<section class="auftakt">
  <div class="auftakt-szene">
    <video autoplay muted loop playsinline poster="{poster}" aria-hidden="true">
      <source src="{szene}" type="video/mp4">
    </video>
    <img src="{poster}" alt="" width="1200" height="2150" fetchpriority="high" hidden>
  </div>
  <div class="auftakt-schleier"></div>

  <div class="auftakt-satz auftritt">
    <p class="auftakt-ueber">{ueberschrift}</p>
    <h1 class="auftakt-namen{gestapelt}">{v1}<span class="und">&amp;</span>{v2}</h1>
    <div class="auftakt-teiler"><i></i><b>&#10022;</b><i></i></div>
    <p class="auftakt-datum">{datum_text}</p>
  </div>

  <div class="auftakt-unten auftritt">
    <a class="auftakt-ruf" href="#rueckmeldung">Zusagen</a>
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
  <p class="fuss-klein">{v1} und {v2}, Termin, Ort und Bankverbindung sind frei erfunden.</p>
</footer>

<script>window.KARTE = {karte};</script>
<script src="../gemeinsam/vorlage.js"></script>
</body>
</html>
""".format(
        basis='https://webstudiojp.github.io/hochzeitskarte-demo/vorlagen/', kennung=t['kennung'],
        namen=e(t['namen']), datum_text=e(t['datum_text']), datum_lang=e(t['datum_lang']),
        beschreibung=e(t['beschreibung']), theme_color=t['farben']['cream'],
        farben=farben, umschlag=umschlag, ton_svg=TON_SVG, pfeil_svg=PFEIL_SVG,
        szene=e(t['szene']), poster=e(t['poster']),
        ueberschrift=e(t.get('ueberschrift', 'Wir heiraten')),
        v1=e(v1), v2=e(v2), marke=e(t.get('marke', '')),
        gestapelt=(' auftakt-namen--gestapelt' if len(v1) + len(v2) > 15 else ''),
        countdown=abschnitt_countdown(t), geschichte=abschnitt_geschichte(t),
        band=abschnitt_band(t), programm=abschnitt_programm(t), ort=abschnitt_ort(t),
        kleider=abschnitt_kleider(t), rsvp=abschnitt_rsvp(t),
        geschenke=abschnitt_geschenke(t), anreise=abschnitt_anreise(t),
        fragen=abschnitt_fragen(t),
        karte=('{"kennung":"%s","namen":"%s","beginnISO":"%s","endeISO":"%s","ort":"%s",'
               '"anlass":"%s","kalendertext":"%s","email":"%s","iban":"%s","musik":%s,'
               '"speisen":[%s],"begleiterMax":6}'
               % (t['kennung'], t['namen'], t['beginnISO'], t['endeISO'],
                  t['ort']['name'] + ', ' + t['ort']['strasse'] + ', ' + t['ort']['stadt'],
                  t['anlass'], t['kalendertext'], t['email'], t['iban'],
                  ('"%s"' % t['musik']) if t.get('musik') else 'null',
                  ','.join('"%s"' % s for s in t['speisen']))),
    )


def bauen(themen):
    for t in themen:
        ordner = WURZEL / 'vorlagen' / t['kennung']
        ordner.mkdir(parents=True, exist_ok=True)
        (ordner / 'index.html').write_text(seite(t), encoding='utf-8')
        print('  %-14s %6d B' % (t['kennung'], (ordner / 'index.html').stat().st_size))


if __name__ == '__main__':
    sys.path.insert(0, str(WURZEL / 'bin'))
    from vorlagen_daten import THEMEN
    print('vorlagen/')
    bauen(THEMEN)
