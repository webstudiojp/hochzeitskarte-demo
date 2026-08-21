/* =========================================================
   ZUCKERGUSS — das Konfetti

   Gerechnet, nicht abgespielt: jedes Stueck hat Masse, Wind-
   widerstand und eine eigene Drehachse. Deshalb sieht der
   Wurf jedes Mal anders aus, und deshalb kommt er dort
   heraus, wo getippt wurde.

   Ein Stueck Papier faellt nicht wie ein Stein. Es taumelt,
   weil sein Luftwiderstand von seiner Lage abhaengt - genau
   das steckt in `flug` drin, und es ist der ganze
   Unterschied zwischen Konfetti und Regen.
   ========================================================= */
(() => {
  'use strict';

  const DATEN = {
    namen:       'Emma & Ben',
    kennung:     'emma-und-ben',
    beginnISO:   '2027-07-17T14:00:00',
    endeISO:     '2027-07-18T03:00:00',
    ortName:     'Orangerie Gut Kaltenbach',
    adresse:     'Kaltenbacher Allee 5, 53343 Wachtberg',
    anlass:      'Hochzeit von Emma & Ben',
    kalendertext:'Ankommen ab 13 Uhr, Trauung um 14 Uhr im Rosengarten.',
    email:       'emma.und.ben@example.de',
    iban:        'DE00 0000 0000 0000 0000 00',
    speisen:     ['Fleisch', 'Fisch', 'Vegetarisch', 'Vegan'],
    musik:       null,
  };

  const sanft = Kern.sanft;
  const auftakt = document.getElementById('auftakt');
  const leinwand = document.getElementById('konfetti');
  const knall = document.getElementById('knall');
  const hinweis = document.getElementById('hinweis');

  const FARBEN = ['#f3c9c4', '#c0334a', '#fdf7f2', '#d9b46a', '#e79f99', '#9ab08a'];

  /* =========================================================
     1. DAS KONFETTI
     ========================================================= */
  const ctx = leinwand.getContext('2d');
  let breite = 0, hoehe = 0, dpr = 1;
  const stuecke = [];
  let laeuft = false, letzte = 0;

  function messen() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    breite = innerWidth; hoehe = innerHeight;
    leinwand.width = Math.round(breite * dpr);
    leinwand.height = Math.round(hoehe * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function werfen(x, y, zahl, wucht) {
    for (let i = 0; i < zahl; i++) {
      const winkel = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
      const tempo = wucht * (0.45 + Math.random() * 0.75);
      stuecke.push({
        x, y,
        vx: Math.cos(winkel) * tempo,
        vy: Math.sin(winkel) * tempo,
        b: 5 + Math.random() * 7,          // Breite des Schnipsels
        h: 7 + Math.random() * 9,
        farbe: FARBEN[(Math.random() * FARBEN.length) | 0],
        // Drehung um zwei Achsen. Nur um eine gedreht sieht ein
        // Schnipsel aus wie ein Zeiger, nicht wie Papier.
        w: Math.random() * Math.PI * 2,
        dw: (Math.random() - 0.5) * 0.34,
        k: Math.random() * Math.PI * 2,
        dk: 0.06 + Math.random() * 0.16,
        band: Math.random() < 0.18,
      });
    }
    if (stuecke.length > 420) stuecke.splice(0, stuecke.length - 420);
    starten();
  }

  function flug(dt) {
    const s = dt / 16.67;
    for (let i = stuecke.length - 1; i >= 0; i--) {
      const p = stuecke[i];
      p.k += p.dk * s;
      // Der Luftwiderstand haengt daran, wie flach das Stueck
      // gerade liegt: flach faellt es langsam und segelt zur
      // Seite, hochkant faellt es schnell.
      const flach = Math.abs(Math.cos(p.k));
      p.vy += (0.28 - flach * 0.2) * s;
      p.vx += Math.sin(p.k) * 0.11 * s;
      p.vx *= 1 - 0.012 * s;
      p.vy *= 1 - 0.008 * s;
      p.x += p.vx * s;
      p.y += p.vy * s;
      p.w += p.dw * s;

      if (p.y > hoehe + 40 || p.x < -60 || p.x > breite + 60) stuecke.splice(i, 1);
    }
  }

  function zeichnen() {
    ctx.clearRect(0, 0, breite, hoehe);
    for (const p of stuecke) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.w);
      // Die Drehung um die Querachse wird als Stauchung
      // gezeichnet - ein echtes 3D waere hier Aufwand ohne
      // sichtbaren Unterschied.
      ctx.scale(1, Math.cos(p.k));
      ctx.fillStyle = p.farbe;
      ctx.globalAlpha = 0.55 + Math.abs(Math.cos(p.k)) * 0.45;
      if (p.band) {
        ctx.fillRect(-p.b / 4, -p.h * 1.6, p.b / 2, p.h * 3.2);
      } else {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.b / 2, p.h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function takt(jetzt) {
    const dt = Math.min(50, jetzt - (letzte || jetzt));
    letzte = jetzt;
    flug(dt);
    zeichnen();
    if (stuecke.length) requestAnimationFrame(takt);
    else { laeuft = false; ctx.clearRect(0, 0, breite, hoehe); }
  }

  function starten() {
    if (laeuft || sanft) return;
    laeuft = true; letzte = 0;
    requestAnimationFrame(takt);
  }

  /* =========================================================
     2. DER AUFTAKT
     ========================================================= */
  let offen = false;

  function oeffnen(x, y) {
    if (offen) return;
    offen = true;
    knall.disabled = true;
    document.documentElement.removeAttribute('data-zu');
    auftakt.style.setProperty('--auf', '1');
    if (hinweis) hinweis.remove();

    if (!sanft) {
      werfen(x ?? breite / 2, y ?? hoehe * 0.62, 130, 17);
      // Zwei Nachschuesse von den Seiten: ein einzelner Knall
      // aus der Mitte sieht aus wie eine Explosion, drei
      // versetzte sehen aus wie eine Feier.
      setTimeout(() => werfen(breite * 0.12, hoehe * 0.75, 55, 15), 160);
      setTimeout(() => werfen(breite * 0.88, hoehe * 0.75, 55, 15), 300);
    }
    Kern.musikStarten();
    try { sessionStorage.setItem('zuckerguss-offen', '1'); } catch {}
  }

  if (knall && leinwand) {
    document.documentElement.setAttribute('data-zu', '');
    messen();
    addEventListener('resize', messen);

    knall.addEventListener('click', e => oeffnen(e.clientX || undefined, e.clientY || undefined));
    knall.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault(); oeffnen();
    });

    /* Nach neun Sekunden knallt es von allein. */
    setTimeout(() => oeffnen(), 9000);

    let schonDa = false;
    try { schonDa = sessionStorage.getItem('zuckerguss-offen') === '1'; } catch {}
    if (schonDa || Kern.sofort) {
      offen = true;
      knall.disabled = true;
      auftakt.style.setProperty('--auf', '1');
      document.documentElement.removeAttribute('data-zu');
      if (hinweis) hinweis.remove();
    }
  }

  /* =========================================================
     3. NACHSCHLAG
     Beim Abschicken der Rueckmeldung faellt noch einmal etwas.
     Ein Formular, das nichts tut, wenn man es abschickt, ist
     eine verpasste Gelegenheit.
     ========================================================= */
  const form = document.querySelector('[data-rueckmeldung]');
  if (form && !sanft) {
    form.addEventListener('submit', () => {
      if (form.elements.antwort && form.elements.antwort.value !== 'zusage') return;
      setTimeout(() => werfen(breite / 2, hoehe * 0.55, 90, 15), 120);
    });
  }

  Kern.start(DATEN);
})();
