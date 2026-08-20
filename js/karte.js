(() => {
  'use strict';
  const C = window.HOCHZEIT;
  const $ = id => document.getElementById(id);
  const SVGNS = 'http://www.w3.org/2000/svg';
  const setzen = (id, wert) => { const n = $(id); if (n) n.textContent = wert; };

  /* =========================================================
     1. Texte aus der Konfiguration
     ========================================================= */
  setzen('k-namen', C.namen);
  setzen('k-zeile', C.anrede.zeile);
  setzen('k-datum', C.datumLang);
  setzen('a-text',  C.anrede.text);
  setzen('a-gruss', C.anrede.gruss);
  setzen('o-name',    C.ort.name);
  setzen('o-hinweis', C.ort.hinweis);
  setzen('dc-titel',  C.dresscode.titel);
  setzen('dc-text',   C.dresscode.text);
  setzen('g-text',    C.geschenk.text);
  setzen('g-inhaber', C.geschenk.kontoinhaber);
  setzen('g-iban',    C.geschenk.iban);
  setzen('r-hinweis', 'Bitte bis zum ' + C.rsvp.frist + '. ' + C.rsvp.hinweis);
  setzen('f-namen',   C.namen);
  setzen('f-datum',   C.datumKurz);
  setzen('f-recht',   'Verantwortlich für den Inhalt: ' + C.recht.verantwortlich
                      + ' · ' + C.recht.kontakt);
  setzen('f-hoster',  C.recht.hosterHinweis);

  $('o-adresse').innerHTML = '';
  [C.ort.strasse, C.ort.plz + ' ' + C.ort.stadt].forEach((z, i) => {
    if (i) $('o-adresse').appendChild(document.createElement('br'));
    $('o-adresse').appendChild(document.createTextNode(z));
  });

  /* =========================================================
     2. Ablauf, Familien, Dresscode-Farben, Galerie
     ========================================================= */
  const el = (tag, klasse, text) => {
    const n = document.createElement(tag);
    if (klasse) n.className = klasse;
    if (text != null) n.textContent = text;
    return n;
  };

  const zl = $('zeitleiste');
  C.ablauf.forEach((p, i) => {
    const li = el('li', 'zl-punkt rv');
    li.dataset.rv = String(i + 1);
    li.appendChild(el('span', 'zl-zeit', p.zeit));
    const rechts = el('div');
    rechts.appendChild(el('h3', 'zl-titel', p.titel));
    if (p.ort)   rechts.appendChild(el('p', 'zl-ort', p.ort));
    if (p.notiz) rechts.appendChild(el('p', 'zl-notiz', p.notiz));
    li.appendChild(rechts);
    zl.appendChild(li);
  });

  const fam = $('fam-liste');
  Object.values(C.familien).forEach((gruppe, i) => {
    const d = el('div', 'fam-zeile rv');
    d.dataset.rv = String(i + 1);
    d.appendChild(el('p', 'fam-rolle', gruppe.rolle));
    d.appendChild(el('p', 'fam-namen', gruppe.namen.join(' · ')));
    fam.appendChild(d);
  });

  const dcf = $('dc-farben');
  C.dresscode.farben.forEach(f => {
    const li = el('li', 'dc-farbe');
    const feld = el('span', 'dc-feld');
    feld.style.background = f.hex;
    li.appendChild(feld);
    li.appendChild(el('span', 'dc-name', f.name));
    dcf.appendChild(li);
  });

  const gal = $('gal-band');
  C.galerie.slice(0, 5).forEach((b, i) => {
    const fig = el('figure', 'gal-bild rv');
    fig.dataset.rv = String(i + 1);
    if (b.datei) {
      const img = document.createElement('img');
      img.src = b.datei;
      img.alt = b.alt;
      img.loading = i === 0 ? 'eager' : 'lazy';
      img.decoding = 'async';
      fig.appendChild(img);
    } else {
      fig.appendChild(el('figcaption', 'gal-platzhalter', b.alt));   // Leerzustand
    }
    gal.appendChild(fig);
  });

  /* =========================================================
     2b. Blueten, die ueber den Kartenkopf treiben
     ========================================================= */
  (function blueten() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const feld = document.createElement('div');
    feld.className = 'blueten';
    feld.setAttribute('aria-hidden', 'true');
    const toene = ['#e8c7b4', '#dfe6d2', '#f0dcc4', '#cfdde7', '#efd6cc'];
    let z = 7301;
    const zufall = () => (z = (z * 1103515245 + 12345) % 2147483648) / 2147483648;
    for (let i = 0; i < 14; i++) {
      const b = document.createElement('span');
      const gr = 7 + zufall() * 13;
      b.className = 'bluete';
      b.style.cssText =
        'left:' + (zufall() * 100).toFixed(1) + '%;' +
        'width:' + gr.toFixed(1) + 'px;height:' + (gr * 0.72).toFixed(1) + 'px;' +
        'background:' + toene[i % toene.length] + ';' +
        'animation-duration:' + (17 + zufall() * 16).toFixed(1) + 's;' +
        'animation-delay:-' + (zufall() * 22).toFixed(1) + 's;' +
        '--drift:' + (zufall() * 90 - 45).toFixed(0) + 'px;' +
        '--dreh:' + (zufall() * 420 - 210).toFixed(0) + 'deg;' +
        'opacity:' + (0.3 + zufall() * 0.34).toFixed(2) + ';';
      feld.appendChild(b);
    }
    document.getElementById('sek-kopf').prepend(feld);
  })();

  /* =========================================================
     3. Countdown
     ========================================================= */
  const ziel = new Date(C.beginnISO).getTime();
  const zwei = n => String(n).padStart(2, '0');

  function countdown() {
    const rest = ziel - Date.now();
    if (rest <= 0) {
      $('cd-reihe').hidden = true;
      setzen('cd-fuss', 'Heute ist es so weit.');
      return false;
    }
    const s = Math.floor(rest / 1000);
    setzen('cd-t', Math.floor(s / 86400));
    setzen('cd-s', zwei(Math.floor(s / 3600) % 24));
    setzen('cd-m', zwei(Math.floor(s / 60) % 60));
    setzen('cd-k', zwei(s % 60));
    return true;
  }
  setzen('cd-fuss', 'bis zum ' + C.datumLang.replace(/^\w+,\s*/, ''));
  if (countdown()) setInterval(countdown, 1000);

  /* =========================================================
     4. Kalendereintrag — komplett im Browser erzeugt
     ========================================================= */
  const icsZeit = iso => iso.replace(/[-:]/g, '').replace(/\.\d+/, '');
  $('btn-kalender').addEventListener('click', () => {
    const adresse = C.ort.name + ', ' + C.ort.strasse + ', ' + C.ort.plz + ' ' + C.ort.stadt;
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//JP Webstudio//Hochzeitskarte//DE',
      'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      'UID:' + C.datumISO + '-' + C.braut.toLowerCase() + '-' + C.braeutigam.toLowerCase() + '@einladung',
      'DTSTAMP:' + icsZeit(new Date().toISOString()).replace(/\.\d+Z$/, 'Z'),
      'DTSTART:' + icsZeit(C.beginnISO),
      'DTEND:'   + icsZeit(C.endeISO),
      'SUMMARY:Hochzeit von ' + C.namen,
      'LOCATION:' + adresse.replace(/,/g, '\\,'),
      'DESCRIPTION:' + ('Trauung um ' + C.ablauf[0].zeit + ' Uhr. Rückmeldung bis '
        + C.rsvp.frist + '.').replace(/,/g, '\\,'),
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');

    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Hochzeit-' + C.braeutigam + '-und-' + C.braut + '.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  /* =========================================================
     5. Route — Links statt eingebetteter Karte.
        Ein Maps-iframe wuerde ohne Einwilligung Daten an Google senden.
     ========================================================= */
  const adr = encodeURIComponent(C.ort.name + ', ' + C.ort.strasse + ', '
              + C.ort.plz + ' ' + C.ort.stadt);
  $('btn-google').href = 'https://www.google.com/maps/dir/?api=1&destination=' + adr;
  $('btn-apple').href  = 'https://maps.apple.com/?daddr=' + adr + '&dirflg=d';

  // Stilisierte Karte: gezeichnet, kein Kartendienst, keine Lizenzfrage
  (function kartenbild() {
    const s = document.createElementNS(SVGNS, 'svg');
    s.setAttribute('viewBox', '0 0 320 200');
    s.setAttribute('role', 'img');
    s.setAttribute('aria-label', 'Schematische Lage: ' + C.ort.name + ' im Park, '
      + 'Zufahrt von Norden, Bahnhof im Osten');
    s.innerHTML =
      '<rect width="320" height="200" fill="#ece4d5"/>' +
      '<path d="M0 118 C60 104 96 132 150 128 C214 123 250 150 320 140 L320 200 L0 200 Z" fill="#dfe0cf"/>' +
      '<path d="M232 0 C244 44 224 78 236 118 C246 152 232 178 244 200" fill="none" stroke="#c3cdc4" stroke-width="9"/>' +
      '<path d="M0 62 L320 46" stroke="#d9cfba" stroke-width="7" fill="none"/>' +
      '<path d="M74 200 L96 108 L188 92" stroke="#d9cfba" stroke-width="5" fill="none"/>' +
      '<path d="M96 108 L60 54" stroke="#e2d9c6" stroke-width="3" fill="none"/>' +
      '<rect x="150" y="76" width="46" height="30" fill="#cbbda3"/>' +
      '<circle cx="173" cy="91" r="4.5" fill="#a8894e"/>' +
      '<path d="M173 60 a11 11 0 1 1 0.01 0 M173 60 L173 76" fill="none" stroke="#a8894e" stroke-width="2.4"/>' +
      '<circle cx="173" cy="49" r="4" fill="#a8894e"/>';
    $('kartenbild').appendChild(s);
  })();

  /* =========================================================
     6. IBAN kopieren
     ========================================================= */
  const btnIban = $('btn-iban');
  btnIban.addEventListener('click', async () => {
    const rein = C.geschenk.iban.replace(/\s+/g, '');
    try {
      await navigator.clipboard.writeText(rein);
      btnIban.textContent = 'Kopiert';
    } catch {
      const t = document.createElement('textarea');
      t.value = rein; document.body.appendChild(t); t.select();
      btnIban.textContent = document.execCommand('copy') ? 'Kopiert' : 'Bitte von Hand kopieren';
      t.remove();
    }
    setTimeout(() => { btnIban.textContent = 'Kopieren'; }, 2400);
  });

  /* =========================================================
     7. Upload — Auswahl funktioniert, Ablage braucht den Server
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
      uHinweis.textContent = dateien.length === 1
        ? 'Eine Datei ausgewählt. In dieser Vorschau wird noch nichts hochgeladen – dafür fehlt die Serveranbindung.'
        : dateien.length + ' Dateien ausgewählt. In dieser Vorschau wird noch nichts hochgeladen – dafür fehlt die Serveranbindung.';
    }
  });

  /* =========================================================
     8. Rueckmeldung — Validierung laeuft, Versand braucht den Server
     ========================================================= */
  const form = $('rsvp-form'), rHinweis = $('rsvp-hinweis');
  const feldAnzahl = $('feld-anzahl'), feldEssen = $('feld-essen');

  // Wer absagt, muss weder Personenzahl noch Essenswunsch ausfuellen
  form.addEventListener('change', e => {
    if (e.target.name !== 'zusage') return;
    const kommt = e.target.value === 'ja';
    [feldAnzahl, feldEssen].forEach(f => { f.style.display = kommt ? '' : 'none'; });
  });

  const fehler = (id, feld, an) => {
    $(id).hidden = !an;
    if (feld) feld.setAttribute('aria-invalid', an ? 'true' : 'false');
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name   = $('f-name');
    const zusage = form.querySelector('input[name=zusage]:checked');
    const dsgvo  = $('f-dsgvo');

    const fehltName = name.value.trim().length < 2;
    fehler('e-name',   name,  fehltName);
    fehler('e-zusage', null, !zusage);
    fehler('e-dsgvo',  null, !dsgvo.checked);

    const erstes = fehltName ? name : (!zusage ? form.querySelector('input[name=zusage]')
                                               : (!dsgvo.checked ? dsgvo : null));
    if (erstes) { erstes.focus(); return; }

    rHinweis.hidden = false;
    rHinweis.textContent = zusage.value === 'ja'
      ? 'Die Eingaben sind vollständig. In dieser Vorschau geht noch nichts raus – '
        + 'für den Versand und die Gästeliste fehlt die Serveranbindung.'
      : 'Schade. Die Eingaben sind vollständig – in dieser Vorschau wird noch nichts versendet.';
    rHinweis.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* =========================================================
     9. Weiterleiten
     ========================================================= */
  $('btn-whatsapp').href = 'https://wa.me/?text=' + encodeURIComponent(
    C.namen + ' heiraten am ' + C.datumKurz + '. Hier ist die Einladung: ' + location.href);

  /* =========================================================
     10. Choreografie: Eintritt in Leserichtung, gestaffelt
     ========================================================= */
  const leise = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const zuZeigen = [...document.querySelectorAll('.rv')];
  if (leise) {
    zuZeigen.forEach(n => n.classList.add('da'));
  } else {
    const beobachter = new IntersectionObserver((eintraege, o) => {
      eintraege.forEach(e => {
        if (!e.isIntersecting) return;
        const stufe = parseInt(e.target.dataset.rv || '1', 10);
        // Varianz statt gleichmaessigem Takt
        e.target.style.transitionDelay = Math.min(stufe * 62 + (stufe % 2) * 26, 460) + 'ms';
        e.target.classList.add('da');
        o.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    zuZeigen.forEach(n => beobachter.observe(n));
  }
})();
