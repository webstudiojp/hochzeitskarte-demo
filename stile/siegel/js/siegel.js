/* =========================================================
   STIL "SIEGEL" — Ablauf der Seite
   Umschlag oeffnen, Glitzerherz freirubbeln, Kalenderdatei.
   ========================================================= */
(() => {
  'use strict';

  const DATEN = {
    namen:      'Furkan & Dilara',
    beginnISO:  '2027-01-01T14:30:00',
    endeISO:    '2027-01-02T02:00:00',
    ortName:    'Schloss Benrath',
    adresse:    'Benrather Schloßallee 104, 40597 Düsseldorf',
    anlass:     'Save the Date · Furkan & Dilara',
  };
  // Vollstaendige Angabe fuer Kalender und Route - an einer Stelle
  // zusammengesetzt, damit der Name nicht zweimal im Ziel landet.
  DATEN.ort = DATEN.ortName + ', ' + DATEN.adresse;

  /* Ab hier gilt das Herz als freigelegt und der Rest springt weg. */
  const SCHWELLE = .52;
  /* Wer nicht rubbelt, bekommt den Termin trotzdem zu sehen. Der Kniff
     ist huebsch, aber er darf niemanden aussperren. */
  const GEDULD_MS = 9000;
  /* Mehr Spaene bringen kein Bild, kosten aber Bildrate. */
  const SPAENE_MAX = 150;

  const $ = id => document.getElementById(id);
  const sanft = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     1. Umschlag
     ========================================================= */
  const umschlag = $('umschlag');
  let geoeffnet = false;

  function oeffnen() {
    if (geoeffnet) return;
    geoeffnet = true;
    umschlag.classList.add('offen');
    document.body.classList.add('offen');
    document.body.classList.remove('zu');
    setTimeout(() => {
      umschlag.classList.add('weg');
      umschlag.setAttribute('aria-hidden', 'true');
    }, 900);
    setTimeout(glitzerStarten, sanft ? 250 : 1200);
    // Der Wink nach unten kommt erst, wenn oben nichts mehr zu tun ist.
    setTimeout(() => { $('scrollwink').hidden = false; }, sanft ? 400 : 2600);
    einblenden();
    if (countdown()) setInterval(countdown, 1000);
  }
  $('siegel').addEventListener('click', oeffnen);
  umschlag.addEventListener('click', oeffnen);

  /* =========================================================
     2. Das Glitzerherz
     ========================================================= */
  const feld   = $('herzfeld');
  const leinen = $('glitzer');
  const seite  = $('seite');
  const stift  = leinen.getContext('2d', { willReadFrequently: true });

  let breite = 0, hoehe = 0, dpr = 1;
  let deckungStart = 0;
  let aufgedeckt = false, laeuft = false;
  let letzterPunkt = null, gerubbelt = false;
  let geduld = null, spaene = 0;

  /* Dieselbe Form wie der Umriss darunter, nur gefuellt. Beide stammen
     aus demselben Kaestchen 260x244, damit sie deckungsgleich liegen. */
  function herzPfad(w, h) {
    const p = new Path2D();
    const x = v => v / 260 * w, y = v => v / 244 * h;
    p.moveTo(x(130), y(220));
    p.bezierCurveTo(x(86),  y(186), x(30),  y(151), x(22),  y(105));
    p.bezierCurveTo(x(16),  y(69),  x(42),  y(37),  x(75),  y(39));
    p.bezierCurveTo(x(99),  y(40),  x(120), y(56),  x(131), y(76));
    p.bezierCurveTo(x(143), y(55),  x(163), y(38),  x(187), y(41));
    p.bezierCurveTo(x(219), y(44),  x(243), y(74),  x(235), y(110));
    p.bezierCurveTo(x(226), y(155), x(174), y(187), x(130), y(220));
    p.closePath();
    return p;
  }

  function herzMalen() {
    const w = leinen.width, h = leinen.height;
    const pfad = herzPfad(w, h);

    stift.globalCompositeOperation = 'source-over';
    stift.clearRect(0, 0, w, h);
    stift.save();
    stift.clip(pfad);

    const grund = stift.createLinearGradient(0, 0, w * .7, h);
    grund.addColorStop(0,   '#4a5fd8');
    grund.addColorStop(.45, '#3245c0');
    grund.addColorStop(1,   '#1f2f96');
    stift.fillStyle = grund;
    stift.fillRect(0, 0, w, h);

    // Glitzer: viele kleine Splitter in wechselndem Blau, dazwischen
    // ein paar helle Funken. Einmal gestreut, danach unveraendert.
    const zahl = Math.round((w * h) / (11 * dpr));
    for (let i = 0; i < zahl; i++) {
      const gx = Math.random() * w, gy = Math.random() * h;
      const gr = (.45 + Math.random() * 1.15) * dpr;
      const t = Math.random();
      if (t > .93)      stift.fillStyle = 'rgba(255,255,255,' + (.55 + Math.random() * .45) + ')';
      else if (t > .74) stift.fillStyle = 'rgba(168,186,255,' + (.4 + Math.random() * .4) + ')';
      else if (t > .42) stift.fillStyle = 'rgba(96,120,232,' + (.35 + Math.random() * .4) + ')';
      else              stift.fillStyle = 'rgba(20,32,120,' + (.25 + Math.random() * .35) + ')';
      stift.beginPath();
      stift.arc(gx, gy, gr, 0, Math.PI * 2);
      stift.fill();
    }

    // Licht von oben links, damit die Flaeche gewoelbt wirkt.
    const licht = stift.createRadialGradient(w * .34, h * .26, 0, w * .34, h * .26, w * .9);
    licht.addColorStop(0,   'rgba(255,255,255,.24)');
    licht.addColorStop(.55, 'rgba(255,255,255,.04)');
    licht.addColorStop(1,   'rgba(10,18,80,.22)');
    stift.fillStyle = licht;
    stift.fillRect(0, 0, w, h);

    stift.restore();
    stift.globalCompositeOperation = 'destination-out';
  }

  function messen() {
    const r = feld.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    breite = r.width; hoehe = r.height;
    leinen.width  = Math.round(breite * dpr);
    leinen.height = Math.round(hoehe * dpr);
  }

  /* Zaehlt die noch gedeckten Bildpunkte. Nur jeder achte wird angesehen -
     der Fehler liegt weit unter einem Prozent, der Aufwand bei einem Achtel. */
  function deckung() {
    const daten = stift.getImageData(0, 0, leinen.width, leinen.height).data;
    let voll = 0;
    for (let i = 3; i < daten.length; i += 4 * 8) if (daten[i] > 40) voll++;
    return voll;
  }

  function glitzerStarten() {
    if (laeuft || aufgedeckt) return;
    laeuft = true;
    messen();
    herzMalen();
    deckungStart = deckung();
    funkenSetzen();
    geduld = setTimeout(aufdecken, GEDULD_MS);
  }

  function kratzen(x, y) {
    const r = 21 * dpr;
    stift.lineWidth = r * 2;
    stift.lineCap = 'round';
    stift.lineJoin = 'round';
    stift.beginPath();
    if (letzterPunkt) stift.moveTo(letzterPunkt.x, letzterPunkt.y);
    else stift.moveTo(x - .1, y);
    stift.lineTo(x, y);
    stift.stroke();

    // Ein paar Tupfen neben der Spur. Ohne sie bleibt eine glatte Wurst
    // stehen; echtes Rubbeln franst aus.
    for (let i = 0; i < 4; i++) {
      const w = Math.random() * Math.PI * 2;
      const d = r * (.8 + Math.random() * .5);
      stift.beginPath();
      stift.arc(x + Math.cos(w) * d, y + Math.sin(w) * d, r * (.22 + Math.random() * .3), 0, Math.PI * 2);
      stift.fill();
    }
    letzterPunkt = { x, y };
  }

  /* Die Spaene springen weg und fallen danach weiter, bis sie unten aus
     dem Bild sind. In der Luft stehenzubleiben waere der eine Moment, in
     dem man der Karte ansieht, dass sie gerechnet ist. */
  function spaeneWerfen(sx, sy) {
    if (sanft || spaene >= SPAENE_MAX) return;
    const feldRahmen = feld.getBoundingClientRect();
    const seiteRahmen = seite.getBoundingClientRect();
    const x0 = feldRahmen.left - seiteRahmen.left + sx;
    const y0 = feldRahmen.top  - seiteRahmen.top  + sy;
    // Wie weit ist es von hier bis unter den Bildrand?
    const bisRaus = innerHeight - (feldRahmen.top + sy) + 90;

    for (let i = 0; i < 3 && spaene < SPAENE_MAX; i++) {
      spaene++;
      const s = document.createElement('i');
      s.className = 'span';
      const lang = 3 + Math.random() * 7;
      const dick = 1.5 + Math.random() * 2.5;
      const t = Math.random();
      const deck = (.6 + Math.random() * .4).toFixed(2);
      s.style.cssText =
        'width:' + lang + 'px;height:' + dick + 'px;left:' + x0 + 'px;top:' + y0 + 'px;' +
        'background:' + (t > .8 ? '#8ea0f5' : t > .45 ? '#3245c0' : '#1c2a8e') + ';' +
        'opacity:' + deck;
      seite.appendChild(s);

      // Nach allen Seiten, nur mit leichtem Zug nach oben - sonst
      // sammelt sich alles ueber dem Herz und daneben bleibt es leer.
      const winkel = Math.random() * Math.PI * 2;
      const weite  = 40 + Math.random() * 190;
      const zx = Math.cos(winkel) * weite * 1.15;
      const zy = Math.sin(winkel) * weite - 40;
      const dreh = Math.random() * 900 - 450;
      const quer = (Math.random() - .5) * 130;
      const dauer = 3000 + Math.random() * 2400;

      // Der Sprung nimmt das erste Viertel, der Rest ist Fall.
      const lauf = s.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: deck, offset: 0 },
        { transform: 'translate(' + (zx * .7) + 'px,' + zy + 'px) rotate(' + (dreh * .5) + 'deg)', offset: .15 },
        { transform: 'translate(' + zx + 'px,' + (zy + 28) + 'px) rotate(' + (dreh * .7) + 'deg)', offset: .25 },
        { transform: 'translate(' + (zx + quer * .5) + 'px,' + (zy + bisRaus * .55) + 'px) rotate(' + (dreh + 220) + 'deg)', opacity: deck, offset: .72 },
        { transform: 'translate(' + (zx + quer) + 'px,' + (zy + bisRaus) + 'px) rotate(' + (dreh + 430) + 'deg)', opacity: 0, offset: 1 },
      ], { duration: dauer, easing: 'cubic-bezier(.16,.6,.5,1)' });

      // Aufgeraeumt wird sofort: der Zaehler zaehlt, was gerade fliegt,
      // nicht was jemals geworfen wurde.
      lauf.onfinish = () => { s.remove(); spaene--; };
    }
  }

  let pruefTakt = 0;
  function zeichnen(e) {
    if (aufgedeckt) return;
    // Anteilig umrechnen statt ueber dpr: die Leinwand kann skaliert
    // sein, und dann laege der Kratzer neben dem Finger.
    const r = leinen.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const sx = e.clientX - r.left, sy = e.clientY - r.top;
    kratzen(sx / r.width * leinen.width, sy / r.height * leinen.height);
    spaeneWerfen(sx / r.width * breite, sy / r.height * hoehe);

    if (!gerubbelt) {
      gerubbelt = true;
      // Der Schlag hoert auf, sobald jemand rubbelt - ein Ziel, das
      // unter dem Finger wegatmet, ist kein gutes Ziel.
      feld.classList.add('ruhig');
      $('funkeln').classList.add('weg');   // auf abgetragenem Glitzer blitzt nichts mehr
    }
    clearTimeout(geduld);
    geduld = setTimeout(aufdecken, GEDULD_MS);

    if (++pruefTakt % 10) return;
    if (deckungStart && 1 - deckung() / deckungStart >= SCHWELLE) aufdecken();
  }

  leinen.addEventListener('pointerdown', e => {
    if (aufgedeckt) return;
    leinen.setPointerCapture(e.pointerId);
    letzterPunkt = null;
    zeichnen(e);
  });
  leinen.addEventListener('pointermove', e => {
    if (aufgedeckt || e.buttons === 0) return;
    zeichnen(e);
  });
  leinen.addEventListener('pointerup',     () => { letzterPunkt = null; });
  leinen.addEventListener('pointercancel', () => { letzterPunkt = null; });

  function aufdecken() {
    if (aufgedeckt) return;
    aufgedeckt = true;
    clearTimeout(geduld);
    leinen.classList.add('weg');
    $('funkeln').classList.add('weg');
    $('wink').classList.add('weg');
    // Der Hinweis raeumt das Feld erst, wenn er ausgeblendet ist -
    // sonst rutscht der Satz um seine Zeilenhoehe nach oben.
    setTimeout(() => {
      $('wink').hidden = true;
      $('kalender').hidden = false;
    }, sanft ? 0 : 420);
  }

  let messTakt;
  addEventListener('resize', () => {
    if (!laeuft || aufgedeckt) return;
    clearTimeout(messTakt);
    messTakt = setTimeout(() => {
      const r = feld.getBoundingClientRect();
      if (Math.abs(r.width - breite) < 4 && Math.abs(r.height - hoehe) < 4) return;
      if (gerubbelt) { aufdecken(); return; }
      messen();
      herzMalen();
      deckungStart = deckung();
    }, 220);
  });

  /* =========================================================
     3. Funken und Rosenblaetter
     ========================================================= */
  /* Die Funken sitzen nur dort, wo auch Glitzer liegt. Geprueft wird
     gegen dieselbe Herzform, aus der die Fuellung entsteht. */
  function funkenSetzen() {
    if (sanft) return;
    const feld = $('funkeln');
    const pruef = document.createElement('canvas').getContext('2d');
    const pfad = herzPfad(1000, 1000);
    const stern = 'M6 0 7.1 4.9 12 6 7.1 7.1 6 12 4.9 7.1 0 6 4.9 4.9z';
    const teile = [];
    let versuche = 0;
    while (teile.length < 14 && versuche++ < 400) {
      const x = Math.random(), y = Math.random();
      if (!pruef.isPointInPath(pfad, x * 1000, y * 1000)) continue;
      const gr = 6 + Math.random() * 9;
      teile.push(
        '<span class="funke" style="' +
        'left:' + (x * 100).toFixed(1) + '%;top:' + (y * 100).toFixed(1) + '%;' +
        'width:' + gr.toFixed(0) + 'px;' +
        'animation-duration:' + (2.4 + Math.random() * 2.6).toFixed(1) + 's;' +
        'animation-delay:-' + (Math.random() * 4).toFixed(1) + 's">' +
        '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="' + stern + '"/></svg></span>'
      );
    }
    feld.innerHTML = teile.join('');
  }

  /* Sechzehn Blaetter reichen fuer den Eindruck eines Windes. Jedes
     bekommt eigenen Weg, eigenes Tempo und eigenen Anfang, sonst fallen
     sie im Gleichschritt und das sieht sofort gemacht aus. */
  const BLATT = 'M10 1C3 7 1 14 3 19c2 5 12 6 15 1 3-5 0-13-8-19z';
  const TOENE = ['#e9bcb6', '#f2d4cf', '#dda8a2', '#f7e4e0', '#e5c4bd', '#efd0c6'];

  function blaetterStreuen() {
    if (sanft) return;
    const teile = [];
    for (let i = 0; i < 16; i++) {
      const gr = 13 + Math.random() * 18;
      const weg = (Math.random() * 2 - 1) * (18 + Math.random() * 26);
      teile.push(
        '<span class="blatt" style="' +
        'left:' + (Math.random() * 100).toFixed(1) + '%;' +
        'width:' + gr.toFixed(0) + 'px;' +
        '--weg:' + weg.toFixed(0) + 'vw;' +
        'animation-duration:' + (13 + Math.random() * 13).toFixed(1) + 's;' +
        'animation-delay:-' + (Math.random() * 20).toFixed(1) + 's;' +
        'opacity:' + (.5 + Math.random() * .4).toFixed(2) + '">' +
        '<i style="animation-duration:' + (3.5 + Math.random() * 4).toFixed(1) + 's">' +
        '<svg viewBox="0 0 20 26" aria-hidden="true"><path d="' + BLATT + '" fill="' +
        TOENE[i % TOENE.length] + '"/></svg></i></span>'
      );
    }
    $('blattfall').innerHTML = teile.join('');
  }
  blaetterStreuen();

  /* =========================================================
     4. Countdown
     ========================================================= */
  const ziel = new Date(DATEN.beginnISO).getTime();
  const zwei = n => String(n).padStart(2, '0');

  /* Rollt nur, wenn sich der Wert geaendert hat - sonst zappelt die
     Sekundenanzeige und alles andere ruckelt sinnlos mit. */
  function ziffer(id, wert, rollen) {
    const n = $(id);
    if (!n || n.textContent === String(wert)) return;
    n.textContent = wert;
    if (rollen === false || sanft) return;
    n.classList.remove('rollt');
    void n.offsetWidth;
    n.classList.add('rollt');
  }
  function countdown() {
    const rest = ziel - Date.now();
    if (rest <= 0) {
      $('zaehler').hidden = true;
      $('cd-fuss').textContent = 'Heute ist es so weit.';
      return false;
    }
    const t = Math.floor(rest / 1000);
    ziffer('cd-t', Math.floor(t / 86400));
    ziffer('cd-s', zwei(Math.floor(t / 3600) % 24));
    ziffer('cd-m', zwei(Math.floor(t / 60) % 60));
    ziffer('cd-k', zwei(t % 60), false);   // Sekunden ruhig lassen
    return true;
  }

  /* =========================================================
     5. Der Weg dorthin
     Zwei Ziele statt eines Kompromisses: wer ein iPhone hat, will
     Apple Karten, alle anderen Google. Beides sind Links - eine
     eingebettete Karte wuerde schon beim Oeffnen der Seite Daten
     zum Anbieter schicken, ein Link erst beim Antippen.
     ========================================================= */
  const ZIEL = DATEN.ort;
  $('weg-google').href = 'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent(ZIEL) + '&travelmode=driving';
  $('weg-apple').href = 'https://maps.apple.com/?daddr=' +
    encodeURIComponent(ZIEL) + '&dirflg=d';

  // Auf einem Apple-Geraet steht Apple Karten zuerst.
  if (/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)) {
    const w = $('weg-apple');
    w.parentNode.prepend(w);
  }

  const kopierKnopf = $('adresse-kopieren');
  const kopierText  = $('kopier-text');
  kopierKnopf.addEventListener('click', async () => {
    let gut = false;
    try {
      await navigator.clipboard.writeText(DATEN.ort);
      gut = true;
    } catch {
      const t = document.createElement('textarea');
      t.value = DATEN.ort;
      t.setAttribute('readonly', '');
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      try { gut = document.execCommand('copy'); } catch { gut = false; }
      t.remove();
    }
    kopierText.textContent = gut ? 'Kopiert' : 'Bitte von Hand';
    setTimeout(() => { kopierText.textContent = 'Adresse kopieren'; }, 2400);
  });

  /* =========================================================
     6. Einblenden der Abschnitte
     ========================================================= */
  const boegen = document.querySelectorAll('.bogen, .fuss');
  const alleZeigen = () => boegen.forEach(b => b.classList.add('da'));

  function einblenden() {
    if (!('IntersectionObserver' in window)) { alleZeigen(); return; }
    let gemeldet = false;
    const beobachter = new IntersectionObserver((eintraege, selbst) => {
      gemeldet = true;
      for (const e of eintraege) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('da');
        selbst.unobserve(e.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    boegen.forEach(b => beobachter.observe(b));

    // Sicherung. Der Auftritt ist Zierrat, der Inhalt nicht: meldet sich
    // der Beobachter nicht - etwa weil die Seite in einem Hintergrund-
    // reiter geoeffnet wurde -, steht trotzdem alles da.
    setTimeout(() => { if (!gemeldet) alleZeigen(); }, 1800);
    addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !gemeldet) {
        setTimeout(() => { if (!gemeldet) alleZeigen(); }, 600);
      }
    });
  }

  /* =========================================================
     7. Kalenderdatei — komplett im Browser erzeugt
     ========================================================= */
  const icsZeit = iso => iso.replace(/[-:]/g, '').replace(/\.\d+/, '');
  function kalenderDatei() {
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//JP Webstudio//Save the Date//DE',
      'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      'UID:2027-01-01-furkan-dilara@einladung',
      'DTSTAMP:' + icsZeit(new Date().toISOString()).replace(/\.\d+Z$/, 'Z'),
      'DTSTART:' + icsZeit(DATEN.beginnISO),
      'DTEND:'   + icsZeit(DATEN.endeISO),
      'SUMMARY:' + DATEN.anlass,
      'LOCATION:' + DATEN.ort.replace(/,/g, '\\,'),
      'DESCRIPTION:Bitte den Termin freihalten. Die vollständige Einladung folgt.',
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Furkan-Dilara-Save-the-Date.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  // Oben nach dem Aufrubbeln, unten am Ende der Seite - derselbe Knopf.
  for (const id of ['kalender', 'kalender-unten']) {
    const k = $(id);
    if (k) k.addEventListener('click', kalenderDatei);
  }
})();
