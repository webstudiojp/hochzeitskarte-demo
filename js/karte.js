(() => {
  'use strict';
  const C = window.HOCHZEIT;
  const $ = id => document.getElementById(id);
  const SVGNS = 'http://www.w3.org/2000/svg';

  /* =========================================================
     1. Sprache bestimmen
     Reihenfolge: ausdrueckliche Wahl > Adresszeile > Browser > Standard
     ========================================================= */
  const VERFUEGBAR = C.sprachfolge;
  function spracheErmitteln() {
    const ausUrl = new URLSearchParams(location.search).get('lang');
    if (VERFUEGBAR.includes(ausUrl)) return ausUrl;
    try {
      const gemerkt = localStorage.getItem('sprache');
      if (VERFUEGBAR.includes(gemerkt)) return gemerkt;
    } catch { /* privater Modus */ }
    const browser = (navigator.language || '').slice(0, 2).toLowerCase();
    if (VERFUEGBAR.includes(browser)) return browser;
    return C.standardsprache;
  }
  let sprache = spracheErmitteln();
  let S = C.sprachen[sprache];
  window.HOCHZEIT_SPRACHE = () => C.sprachen[sprache];

  const mitVersion = pfad => pfad + (C.version && C.version !== '0' ? '?v=' + C.version : '');
  const setzen = (id, wert) => { const n = $(id); if (n) n.textContent = wert; };
  const el = (tag, klasse, text) => {
    const n = document.createElement(tag);
    if (klasse) n.className = klasse;
    if (text != null) n.textContent = text;
    return n;
  };

  /* =========================================================
     2. Vögel am Himmel über der Einladung
     Im Vorbild sind es winzige Silhouetten weit hinten. Genau deshalb
     wirken sie natürlich: man sieht keine Details, nur Bewegung.
     ========================================================= */
  (function voegel() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const feld = $('tauben');
    if (!feld) return;
    const GLEIT  = 'M-23 -4 C-16 -7 -8 -7 0 1 C8 -7 16 -7 23 -4';
    const SCHLAG = 'M-17 -13 C-13 -10 -6 -6 0 1 C6 -6 13 -10 17 -13';
    const schwarm = [
      { bahn: 'z1', breite: 32, oben: '13%', verzug: -6,  deckung: .62, schlag: 3.8 },
      { bahn: 'z1', breite: 25, oben: '17%', verzug: -3,  deckung: .52, schlag: 4.3 },
      { bahn: 'z2', breite: 22, oben: '20%', verzug: -1,  deckung: .44, schlag: 3.3 },
      { bahn: 'z3', breite: 27, oben: '9%',  verzug: -24, deckung: .55, schlag: 4.7 },
      { bahn: 'z4', breite: 18, oben: '25%', verzug: -38, deckung: .38, schlag: 3.6 },
      { bahn: 'z2', breite: 34, oben: '6%',  verzug: -51, deckung: .6,  schlag: 4.1 },
    ];
    schwarm.forEach(v => {
      const svg = document.createElementNS(SVGNS, 'svg');
      svg.setAttribute('class', 'vogel ' + v.bahn);
      svg.setAttribute('viewBox', '-26 -14 52 28');
      svg.setAttribute('aria-hidden', 'true');
      svg.style.cssText = 'width:' + v.breite + 'px;top:' + v.oben + ';left:0;'
        + 'opacity:' + v.deckung + ';animation-delay:' + v.verzug + 's;';
      const gleit = document.createElementNS(SVGNS, 'path');
      gleit.setAttribute('d', GLEIT);
      const schlag = document.createElementNS(SVGNS, 'path');
      schlag.setAttribute('d', SCHLAG);
      schlag.setAttribute('class', 'v-schlag');
      schlag.style.animationDuration = v.schlag + 's';
      schlag.style.animationDelay = (v.verzug * 0.7) + 's';
      svg.append(gleit, schlag);
      feld.appendChild(svg);
    });
  })();

  /* =========================================================
     3. Stilisierte Lageskizze
     Selbst gezeichnet: kein Kartendienst heisst keine Einwilligung
     und keine Lizenzfrage an fremdem Kartenmaterial.
     ========================================================= */
  function kartenbild() {
    const halter = $('kartenbild');
    halter.innerHTML = '';
    const s = document.createElementNS(SVGNS, 'svg');
    s.setAttribute('viewBox', '0 0 320 200');
    s.setAttribute('role', 'img');
    s.setAttribute('aria-label', S.kartenAlt(S.ortName));
    s.innerHTML =
      '<defs>'
      + '<linearGradient id="k-park" x1="0" y1="0" x2="0" y2="1">'
      +   '<stop offset="0%" stop-color="#dfe7d6"/><stop offset="100%" stop-color="#cddbc6"/>'
      + '</linearGradient>'
      + '<linearGradient id="k-wasser" x1="0" y1="0" x2="1" y2="0">'
      +   '<stop offset="0%" stop-color="#c3d6dd"/><stop offset="100%" stop-color="#a9c4ce"/>'
      + '</linearGradient>'
      + '</defs>'
      + '<rect width="320" height="200" fill="#f2ece0"/>'
      + '<path d="M0 104 C54 92 92 122 148 118 C210 113 248 142 320 132 L320 200 L0 200 Z" fill="url(#k-park)"/>'
      + '<path d="M0 118 C52 108 96 134 150 130 C214 126 252 152 320 144" fill="none" stroke="#bccdb4" stroke-width="1.2"/>'
      + '<g fill="#b9cdb0" opacity=".75">'
      +   '<circle cx="42" cy="150" r="9"/><circle cx="56" cy="158" r="7"/><circle cx="30" cy="162" r="6.5"/>'
      +   '<circle cx="268" cy="160" r="8.5"/><circle cx="283" cy="168" r="6.5"/><circle cx="118" cy="170" r="7"/>'
      + '</g>'
      + '<path d="M234 0 C246 44 226 78 238 118 C248 152 234 178 246 200" fill="none" stroke="url(#k-wasser)" stroke-width="10" stroke-linecap="round"/>'
      + '<path d="M0 58 L320 42" stroke="#e6dbc6" stroke-width="8" fill="none" stroke-linecap="round"/>'
      + '<path d="M0 58 L320 42" stroke="#d5c7ac" stroke-width="1" fill="none" stroke-dasharray="7 7"/>'
      + '<path d="M72 200 L96 104 L188 88" stroke="#e6dbc6" stroke-width="5.5" fill="none" stroke-linecap="round"/>'
      + '<path d="M96 104 L58 50" stroke="#ece3d2" stroke-width="3" fill="none" stroke-linecap="round"/>'
      + '<g>'
      +   '<rect x="150" y="72" width="48" height="30" rx="1.5" fill="#e0d3ba" stroke="#c9b795" stroke-width="1"/>'
      +   '<rect x="164" y="63" width="20" height="10" rx="1.5" fill="#e0d3ba" stroke="#c9b795" stroke-width="1"/>'
      +   '<path d="M150 82 h48" stroke="#c9b795" stroke-width=".8"/>'
      + '</g>'
      + '<path d="M174 40 a12 12 0 1 1 .01 0 M174 40 L174 62" fill="none" stroke="#a8894e" stroke-width="2.4" stroke-linecap="round"/>'
      + '<circle cx="174" cy="28" r="4.6" fill="#a8894e"/>';
    halter.appendChild(s);
  }

  /* =========================================================
     4. Alle Texte und Listen in der aktiven Sprache aufbauen
     ========================================================= */
  function aufbauen() {
    S = C.sprachen[sprache];
    const d = new Date(C.datumISO + 'T12:00:00');
    const frist = new Date(C.rsvp.frist_iso + 'T12:00:00');
    const fristText = frist.getDate() + '. ' + S.monate[frist.getMonth()] + ' ' + frist.getFullYear();

    document.documentElement.lang = S.htmlLang;
    document.title = S.seitentitel(C.namen);

    // Kopf
    setzen('k-namen', C.namen);
    setzen('k-zeile', S.heroZeile);
    setzen('kopf-ueber', S.kopfUeberzeile);
    setzen('d-monat', S.monate[d.getMonth()]);
    setzen('d-tag', d.getDate());
    setzen('d-jahr', d.getFullYear());
    setzen('d-wochentag', S.wochentage[d.getDay()]);
    setzen('merken-text', S.merken);
    setzen('btn-kalender-text', S.kalenderApple);
    setzen('btn-google-cal-text', S.kalenderGoogle);

    // Anrede
    setzen('a-text', S.anredeText);
    setzen('a-gruss', S.anredeGruss);

    // Bildmomente
    setzen('zitat-gross', S.zitat);
    setzen('zitat-klein', S.zitatKlein);
    setzen('abschied-gross', S.abschiedGross);
    setzen('abschied-text', S.abschiedText);

    // Countdown
    setzen('cd-ueber', S.countdownUeber);
    setzen('cd-l-tage', S.cdTage); setzen('cd-l-stunden', S.cdStunden);
    setzen('cd-l-minuten', S.cdMinuten); setzen('cd-l-sekunden', S.cdSekunden);
    setzen('cd-fuss', S.countdownFuss(S.datumLang.replace(/^\w+,\s*/, '')));

    // Ablauf
    setzen('ablauf-titel', S.ablaufTitel);
    const zl = $('zeitleiste');
    zl.innerHTML = '';
    S.ablauf.forEach((p, i) => {
      const li = el('li', 'zl-punkt rv da');
      li.dataset.rv = String(i + 1);
      li.appendChild(el('span', 'zl-zeit', C.zeiten[i]));
      const rechts = el('div');
      rechts.appendChild(el('h3', 'zl-titel', p.titel));
      if (p.ort)   rechts.appendChild(el('p', 'zl-ort', p.ort));
      if (p.notiz) rechts.appendChild(el('p', 'zl-notiz', p.notiz));
      li.appendChild(rechts);
      zl.appendChild(li);
    });

    // Ort
    setzen('ort-titel', S.ortTitel);
    setzen('o-name', S.ortName);
    setzen('o-hinweis', S.ortHinweis);
    setzen('btn-google-text', S.routeGoogle);
    setzen('btn-apple-text', S.routeApple);
    const adr = $('o-adresse');
    adr.innerHTML = '';
    [C.ort.strasse, C.ort.plz + ' ' + C.ort.stadt].forEach((z, i) => {
      if (i) adr.appendChild(document.createElement('br'));
      adr.appendChild(document.createTextNode(z));
    });
    kartenbild();

    // Familien
    setzen('familien-titel', S.familienTitel);
    const fam = $('fam-liste');
    fam.innerHTML = '';
    C.familien.forEach((gruppe, i) => {
      const div = el('div', 'fam-zeile rv da');
      div.dataset.rv = String(i + 1);
      div.appendChild(el('p', 'fam-rolle', S.rollen[gruppe.schluessel]));
      div.appendChild(el('p', 'fam-namen', gruppe.namen.join(' · ')));
      fam.appendChild(div);
    });

    // Dresscode
    setzen('dresscode-titel', S.dresscodeTitel);
    setzen('dc-titel', S.dresscodeKopf);
    setzen('dc-text', S.dresscodeText);
    const dcf = $('dc-farben');
    dcf.innerHTML = '';
    C.farben.forEach(f => {
      const li = el('li', 'dc-farbe');
      const feld = el('span', 'dc-feld');
      feld.style.background = f.hex;
      li.appendChild(feld);
      li.appendChild(el('span', 'dc-name', S.farbnamen[f.schluessel]));
      dcf.appendChild(li);
    });

    // Galerie
    setzen('galerie-titel', S.galerieTitel);
    const gal = $('gal-band');
    gal.innerHTML = '';
    C.galerie.slice(0, 4).forEach((b, i) => {
      const fig = el('figure', 'gal-bild rv da');
      fig.dataset.rv = String(i + 1);
      const img = document.createElement('img');
      img.src = mitVersion(b.datei);
      img.alt = S.bildtexte[b.schluessel] || '';
      img.loading = i === 0 ? 'eager' : 'lazy';
      img.decoding = 'async';
      fig.appendChild(img);
      gal.appendChild(fig);
    });

    // Album
    setzen('album-titel', S.albumTitel);
    setzen('album-text', S.albumText);
    setzen('upload-text', S.albumWaehlen);
    setzen('upload-klein', S.albumArten);

    // Geschenk
    setzen('geschenk-titel', S.geschenkTitel);
    setzen('g-text', S.geschenkText);
    setzen('g-inhaber', C.geschenk.kontoinhaber);
    setzen('g-iban', C.geschenk.iban);
    setzen('btn-iban', S.kopieren);

    // Rueckmeldung
    setzen('rsvp-titel', S.rsvpTitel);
    setzen('r-hinweis', S.rsvpHinweis(fristText));
    setzen('l-name', S.fName);
    $('f-name').placeholder = S.fNamePlatz;
    setzen('e-name', S.fNameFehler);
    setzen('l-kommt', S.fKommt);
    setzen('l-ja', S.fJa);
    setzen('l-nein', S.fNein);
    setzen('e-zusage', S.fZusageFehler);
    setzen('l-anzahl', S.fAnzahl);
    setzen('l-essen', S.fEssen);
    $('f-essen').placeholder = S.fEssenPlatz;
    setzen('l-gruss', S.fGruss);
    $('f-gruss').placeholder = S.fGrussPlatz;
    document.querySelectorAll('.feld-optional').forEach(n => { n.textContent = S.fOptional; });
    setzen('l-einwilligung', S.fEinwilligung);
    setzen('e-dsgvo', S.fDsgvoFehler);
    setzen('btn-senden', S.fSenden);

    // Teilen
    setzen('teilen-frage', S.teilenFrage);
    setzen('btn-whatsapp-text', S.teilenKnopf);
    $('btn-whatsapp').href = 'https://wa.me/?text='
      + encodeURIComponent(S.teilenText(C.namen, C.datumKurz, location.origin + location.pathname));

    // Fuss
    setzen('f-namen', C.namen);
    setzen('f-datum', C.datumKurz);
    setzen('f-recht', S.verantwortlich);
    setzen('f-hoster', S.datenschutz);
    setzen('f-demo', S.demoHinweis);

    // Links
    const adresse = S.ortName + ', ' + C.ort.strasse + ', ' + C.ort.plz + ' ' + C.ort.stadt;
    const ziel = encodeURIComponent(adresse);
    $('btn-google').href = 'https://www.google.com/maps/dir/?api=1&destination=' + ziel;
    $('btn-apple').href  = 'https://maps.apple.com/?daddr=' + ziel + '&dirflg=d';
    $('btn-google-cal').href = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
      + '&text=' + encodeURIComponent(S.seitentitel(C.namen).split(' — ')[0] + ' · ' + S.heroZeile)
      + '&dates=' + C.beginnISO.replace(/[-:]/g, '') + '/' + C.endeISO.replace(/[-:]/g, '')
      + '&location=' + ziel;

    // Sprachumschalter: aktive Flagge farbig, die andere zurueckgenommen
    document.querySelectorAll('.flagge').forEach(f => {
      const ist = f.dataset.lang === sprache;
      f.classList.toggle('aktiv', ist);
      f.title = C.sprachen[f.dataset.lang].name;
    });

    // Musikknopf
    musikKnopfBeschriften();
  }

  /* =========================================================
     5. Countdown
     ========================================================= */
  const ziel = new Date(C.beginnISO).getTime();
  const zwei = n => String(n).padStart(2, '0');
  // Rollt nur, wenn sich der Wert geaendert hat - sonst zappelt die
  // Sekundenanzeige und alles andere ruckelt sinnlos mit.
  function ziffer(id, wert) {
    const n = $(id);
    if (!n || n.textContent === String(wert)) return;
    n.textContent = wert;
    n.classList.remove('rollt');
    void n.offsetWidth;
    n.classList.add('rollt');
  }
  function countdown() {
    const rest = ziel - Date.now();
    if (rest <= 0) {
      $('cd-reihe').hidden = true;
      setzen('cd-fuss', S.countdownHeute);
      return false;
    }
    const s = Math.floor(rest / 1000);
    ziffer('cd-t', Math.floor(s / 86400));
    ziffer('cd-s', zwei(Math.floor(s / 3600) % 24));
    ziffer('cd-m', zwei(Math.floor(s / 60) % 60));
    ziffer('cd-k', zwei(s % 60));
    return true;
  }

  /* =========================================================
     6. Kalenderdatei — komplett im Browser erzeugt
     ========================================================= */
  const icsZeit = iso => iso.replace(/[-:]/g, '').replace(/\.\d+/, '');
  $('btn-kalender').addEventListener('click', () => {
    const adresse = S.ortName + ', ' + C.ort.strasse + ', ' + C.ort.plz + ' ' + C.ort.stadt;
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//JP Webstudio//Hochzeitskarte//DE',
      'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      'UID:' + C.datumISO + '-' + C.braut.toLowerCase() + '-' + C.braeutigam.toLowerCase() + '@einladung',
      'DTSTAMP:' + icsZeit(new Date().toISOString()).replace(/\.\d+Z$/, 'Z'),
      'DTSTART:' + icsZeit(C.beginnISO),
      'DTEND:'   + icsZeit(C.endeISO),
      'SUMMARY:' + C.namen + ' · ' + S.heroZeile,
      'LOCATION:' + adresse.replace(/,/g, '\\,'),
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = C.braeutigam + '-' + C.braut + '.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  /* =========================================================
     7. IBAN kopieren
     ========================================================= */
  const btnIban = $('btn-iban');
  btnIban.addEventListener('click', async () => {
    const rein = C.geschenk.iban.replace(/\s+/g, '');
    try {
      await navigator.clipboard.writeText(rein);
      btnIban.textContent = S.kopiert;
    } catch {
      const t = document.createElement('textarea');
      t.value = rein; document.body.appendChild(t); t.select();
      btnIban.textContent = document.execCommand('copy') ? S.kopiert : S.kopierenHand;
      t.remove();
    }
    setTimeout(() => { btnIban.textContent = S.kopieren; }, 2400);
  });

  /* =========================================================
     8. Album — Auswahl funktioniert, Ablage braucht den Server
     ========================================================= */
  const eingabe = $('upload-input'), liste = $('upload-liste'), uHinweis = $('upload-hinweis');
  const groesse = b => b < 1048576 ? Math.round(b / 1024) + ' KB'
                                   : (b / 1048576).toFixed(1).replace('.', ',') + ' MB';
  eingabe.addEventListener('change', () => {
    const dateien = [...eingabe.files];
    liste.innerHTML = '';
    liste.hidden = dateien.length === 0;
    dateien.forEach(d => {
      const li = document.createElement('li');
      li.appendChild(el('span', null, d.name));
      li.appendChild(el('span', 'upload-groesse', groesse(d.size)));
      liste.appendChild(li);
    });
    if (dateien.length) {
      uHinweis.hidden = false;
      uHinweis.textContent = dateien.length === 1 ? S.albumEine : S.albumMehrere(dateien.length);
    }
  });

  /* =========================================================
     9. Rueckmeldung — Prüfung läuft, Versand braucht den Server
     ========================================================= */
  const form = $('rsvp-form'), rHinweis = $('rsvp-hinweis');
  form.addEventListener('change', e => {
    if (e.target.name !== 'zusage') return;
    const kommt = e.target.value === 'ja';
    [$('feld-anzahl'), $('feld-essen')].forEach(f => { f.style.display = kommt ? '' : 'none'; });
  });
  const fehler = (id, feld, an) => {
    $(id).hidden = !an;
    if (feld) feld.setAttribute('aria-invalid', an ? 'true' : 'false');
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('f-name');
    const zusage = form.querySelector('input[name=zusage]:checked');
    const dsgvo = $('f-dsgvo');
    const fehltName = name.value.trim().length < 2;
    fehler('e-name', name, fehltName);
    fehler('e-zusage', null, !zusage);
    fehler('e-dsgvo', null, !dsgvo.checked);
    const erstes = fehltName ? name : (!zusage ? form.querySelector('input[name=zusage]')
                                               : (!dsgvo.checked ? dsgvo : null));
    if (erstes) { erstes.focus(); return; }
    rHinweis.hidden = false;
    rHinweis.textContent = zusage.value === 'ja' ? S.rsvpJa : S.rsvpNein;
    rHinweis.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (zusage.value === 'ja') bluetenregen();
  });

  /* =========================================================
     10. Musik
     Autoplay mit Ton ist überall gesperrt. Der Umschlag ist der
     erste Fingertipp des Gastes — und damit die einzige Stelle,
     an der Musik überhaupt starten darf.
     ========================================================= */
  const klang = $('musik');
  const musikKnopf = $('btn-musik');
  let musikAn = false;

  function musikKnopfBeschriften() {
    if (!musikKnopf) return;
    musikKnopf.setAttribute('aria-label', musikAn ? S.musikAn : S.musikAus);
    musikKnopf.classList.toggle('laeuft', musikAn);
  }
  // Quelle aus der Konfiguration. Fehlt die Datei, schlaegt play() fehl und
  // der Knopf bleibt verborgen - niemand sieht einen toten Schalter.
  if (klang && C.musik && C.musik.datei) klang.src = mitVersion(C.musik.datei);
  function musikVorhanden() { return klang && klang.getAttribute('src'); }
  window.HOCHZEIT_MUSIK_START = () => {
    if (!musikVorhanden() || !C.musik.starten) return;
    try { if (localStorage.getItem('musik') === 'aus') return; } catch { /* egal */ }
    klang.volume = 0;
    klang.play().then(() => {
      musikAn = true;
      musikKnopf.hidden = false;
      musikKnopfBeschriften();
      // sanft einblenden statt hereinplatzen
      const ziel = C.musik.lautstaerke, schritt = ziel / 40;
      const auf = setInterval(() => {
        klang.volume = Math.min(ziel, klang.volume + schritt);
        if (klang.volume >= ziel - 0.001) clearInterval(auf);
      }, 50);
    }).catch(() => { /* Browser hat abgelehnt - kein Drama */ });
  };
  if (musikKnopf) {
    musikKnopf.addEventListener('click', () => {
      if (!musikVorhanden()) return;
      if (musikAn) { klang.pause(); musikAn = false; }
      else { klang.volume = C.musik.lautstaerke; klang.play().catch(() => {}); musikAn = true; }
      try { localStorage.setItem('musik', musikAn ? 'an' : 'aus'); } catch { /* egal */ }
      musikKnopfBeschriften();
    });
  }

  /* =========================================================
     11. Sprache umschalten
     ========================================================= */
  $('sprachwahl').addEventListener('click', () => {
    sprache = VERFUEGBAR.find(x => x !== sprache) || C.standardsprache;
    try { localStorage.setItem('sprache', sprache); } catch { /* egal */ }
    aufbauen();
    if (window.HOCHZEIT_HERO_TEXTE) window.HOCHZEIT_HERO_TEXTE();
  });

  /* =========================================================
     12. Choreografie: Eintritt in Leserichtung, gestaffelt
     ========================================================= */
  function reveals() {
    const leise = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const offen = [...document.querySelectorAll('.rv:not(.da)')];
    if (leise) { offen.forEach(n => n.classList.add('da')); return; }
    const beobachter = new IntersectionObserver((eintraege, o) => {
      eintraege.forEach(e => {
        if (!e.isIntersecting) return;
        const stufe = parseInt(e.target.dataset.rv || '1', 10);
        e.target.style.transitionDelay = Math.min(stufe * 62 + (stufe % 2) * 26, 460) + 'ms';
        e.target.classList.add('da');
        o.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    offen.forEach(n => beobachter.observe(n));
  }

  // Die Knoepfe stehen fest oben. Ueber der dunklen Allee hell, auf der
  // hellen Karte dunkel - sonst verschwinden sie im Untergrund.
  (function knopffarbe() {
    const hero = $('hero');
    if (!hero || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(([e]) => {
      document.body.classList.toggle('hell-oben', !e.isIntersecting);
    }, { threshold: 0, rootMargin: '-56px 0px 0px 0px' }).observe(hero);
  })();

  // Kleine Belohnung fuer die Zusage - nur dann, eine Absage mit
  // Konfetti zu feiern waere taktlos.
  function bluetenregen() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const feld = document.createElement('div');
    feld.className = 'regen';
    feld.setAttribute('aria-hidden', 'true');
    const toene = ['#f3ddd0', '#e7ecdc', '#f6e7cf', '#dde7ee', '#f0d9cd'];
    let z = 4711;
    const rnd = () => (z = (z * 1103515245 + 12345) % 2147483648) / 2147483648;
    for (let i = 0; i < 34; i++) {
      const b = document.createElement('span');
      const gr = 8 + rnd() * 12;
      b.style.cssText =
        'left:' + (rnd() * 100).toFixed(1) + '%;' +
        'width:' + gr.toFixed(1) + 'px;height:' + (gr * 0.7).toFixed(1) + 'px;' +
        'background:' + toene[i % toene.length] + ';' +
        'animation-duration:' + (2.6 + rnd() * 2.4).toFixed(1) + 's;' +
        'animation-delay:' + (rnd() * 0.9).toFixed(2) + 's;' +
        '--drift:' + (rnd() * 120 - 60).toFixed(0) + 'px;' +
        '--dreh:' + (rnd() * 540 - 270).toFixed(0) + 'deg;';
      feld.appendChild(b);
    }
    document.body.appendChild(feld);
    setTimeout(() => feld.remove(), 6000);
  }

  /* =========================================================
     Bewegung, die an den Bildlauf gekoppelt ist
     Alles laeuft in einem einzigen rAF-Takt: zwei getrennte
     Scroll-Listener sind auf dem Handy sofort spuerbar.
     ========================================================= */
  (function scrollEffekte() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const kulisse = document.querySelector('.kulisse-grund');
    const kopf = $('sek-kopf');
    const leiste = $('zeitleiste');
    const flaechen = [...document.querySelectorAll('.gb-bild,.cd-grund')];
    let offen = false;

    function takt() {
      offen = false;
      // Kulisse zieht langsamer mit als der Text darueber
      if (kulisse && kopf) {
        const r = kopf.getBoundingClientRect();
        if (r.bottom > -200 && r.top < innerHeight + 200) {
          const weg = Math.max(-1, Math.min(1, -r.top / Math.max(1, r.height)));
          kulisse.style.transform = 'translate3d(0,' + (weg * 7).toFixed(2) + '%,0) scale(1.14)';
        }
      }
      // Bildflaechen ziehen langsamer als die Seite - das erzeugt Tiefe
      flaechen.forEach(b => {
        const r = b.parentElement.getBoundingClientRect();
        if (r.bottom < -120 || r.top > innerHeight + 120) return;
        const mitte = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        const versatz = Math.max(-1, Math.min(1, mitte)) * -5.5;
        b.style.transform = 'translate3d(0,' + versatz.toFixed(2) + '%,0) scale(1.16)';
      });

      // Die Linie der Zeitleiste waechst mit dem Lesen
      if (leiste) {
        const r = leiste.getBoundingClientRect();
        const p = (innerHeight * 0.72 - r.top) / Math.max(1, r.height);
        leiste.style.setProperty('--zl-fortschritt', Math.max(0, Math.min(1, p)).toFixed(3));
      }
    }
    addEventListener('scroll', () => {
      if (offen) return;
      offen = true;
      requestAnimationFrame(takt);
    }, { passive: true });
    addEventListener('resize', takt, { passive: true });
    takt();
  })();

  /* =========================================================
     Galerie in gross, mit Wischen
     ========================================================= */
  (function lupe() {
    const kasten = $('lupe'), bild = $('lupe-bild'), text = $('lupe-text');
    if (!kasten) return;
    let stelle = 0;
    const LEER = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

    function zeige(i) {
      const bilder = C.galerie.slice(0, 4);
      stelle = (i + bilder.length) % bilder.length;
      const b = bilder[stelle];
      bild.src = mitVersion(b.datei);
      bild.alt = S.bildtexte[b.schluessel] || '';
      text.textContent = bild.alt;
    }
    function auf(i) {
      zeige(i);
      kasten.classList.add('auf');
      requestAnimationFrame(() => kasten.classList.add('sichtbar'));
      document.body.style.overflow = 'hidden';
      $('lupe-zu').focus();
    }
    function zu() {
      kasten.classList.remove('sichtbar');
      setTimeout(() => { kasten.classList.remove('auf'); bild.src = LEER; }, 320);
      document.body.style.overflow = '';
    }
    document.addEventListener('click', e => {
      const fig = e.target.closest('.gal-bild');
      if (!fig) return;
      auf([...document.querySelectorAll('.gal-bild')].indexOf(fig));
    });
    $('lupe-zu').addEventListener('click', zu);
    $('lupe-vor').addEventListener('click', () => zeige(stelle + 1));
    $('lupe-zurueck').addEventListener('click', () => zeige(stelle - 1));
    kasten.addEventListener('click', e => { if (e.target === kasten) zu(); });
    addEventListener('keydown', e => {
      if (!kasten.classList.contains('auf')) return;
      if (e.key === 'Escape') zu();
      if (e.key === 'ArrowRight') zeige(stelle + 1);
      if (e.key === 'ArrowLeft') zeige(stelle - 1);
    });
    // Wischen
    let startX = 0, startY = 0;
    kasten.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    }, { passive: true });
    kasten.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy)) zeige(stelle + (dx < 0 ? 1 : -1));
      else if (dy > 90) zu();
    }, { passive: true });
  })();

  /* ---------- Start ---------- */
  aufbauen();
  // hero.js laeuft vorher und kannte die Sprachwahl noch nicht
  if (window.HOCHZEIT_HERO_TEXTE) window.HOCHZEIT_HERO_TEXTE();
  if (countdown()) setInterval(countdown, 1000);
  reveals();
})();
