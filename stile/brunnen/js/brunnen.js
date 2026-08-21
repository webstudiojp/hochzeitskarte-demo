/* =========================================================
   BRUNNEN — das Wasser

   Der Auftakt ist keine Schaltflaeche mit einem Bild dahinter,
   sondern eine Oberflaeche: sie bewegt sich, bevor jemand sie
   anfasst, sie antwortet dort, wo der Finger sitzt, und sie
   beruhigt sich von allein.

   Die Ringe werden gerechnet, nicht abgespielt. Ein Video
   koennte den Ring nicht dorthin legen, wo getippt wurde.
   ========================================================= */
(() => {
  'use strict';

  const DATEN = {
    namen:       'Rosa & Nikolas',
    kennung:     'rosa-und-nikolas',
    beginnISO:   '2027-05-22T16:30:00',
    endeISO:     '2027-05-23T04:00:00',
    ortName:     'Villa Rosenau',
    adresse:     'Rosenauer Weg 12, 53604 Bad Honnef',
    anlass:      'Hochzeit von Rosa & Nikolas',
    kalendertext:'Trauung um 16:30 Uhr am Brunnen. Ankommen ab 16 Uhr.',
    email:       'rosa.und.nikolas@example.de',
    iban:        'DE00 0000 0000 0000 0000 00',
    speisen:     ['Fleisch', 'Fisch', 'Vegetarisch', 'Vegan'],
    musik:       null,
  };

  const sanft = Kern.sanft;
  const auftakt = document.getElementById('auftakt');
  const leinwand = document.getElementById('wasser');
  const flaeche = document.getElementById('flaeche');
  const hinweis = document.getElementById('hinweis');
  const versatz = document.getElementById('wellenversatz');

  /* =========================================================
     1. DIE RINGE
     Ein Ring ist kein Kreis, sondern eine gestauchte Ellipse:
     die Kamera schaut schraeg aufs Wasser, und ein runder
     Ring wuerde sofort verraten, dass hier gerechnet wird.
     ========================================================= */
  const ctx = leinwand.getContext('2d');
  let dpr = 1, breite = 0, hoehe = 0;
  const ringe = [];

  function messen() {
    const r = leinwand.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    breite = r.width; hoehe = r.height;
    leinwand.width = Math.round(breite * dpr);
    leinwand.height = Math.round(hoehe * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function tropfen(x, y, kraft = 1) {
    if (ringe.length > 26) ringe.shift();
    ringe.push({ x, y, t: 0, kraft });
  }

  function zeichnen(dt) {
    ctx.clearRect(0, 0, breite, hoehe);

    for (let i = ringe.length - 1; i >= 0; i--) {
      const r = ringe[i];
      r.t += dt;
      const alter = r.t / 2600;                 // 0 bis 1 ueber 2,6 Sekunden
      if (alter >= 1) { ringe.splice(i, 1); continue; }

      // Die Front laeuft schnell los und wird langsamer, die
      // Hoehe faellt dabei ab. Beides aus derselben Zahl -
      // sonst laeuft ein Ring weiter, als er noch zu sehen ist.
      const front = Math.pow(alter, 0.62) * Math.max(breite, hoehe) * 0.9;
      const hoehe0 = (1 - alter) * (1 - alter) * r.kraft;

      // Drei Kaemme hintereinander: ein einzelner Ring sieht
      // aus wie ein Reifen, drei sehen aus wie Wasser.
      for (let k = 0; k < 3; k++) {
        const rad = front - k * 13;
        if (rad <= 1) continue;
        const a = hoehe0 * (1 - k * 0.3) * 0.5;
        ctx.lineWidth = 1.6 - k * 0.35;

        ctx.beginPath();
        ctx.ellipse(r.x, r.y, rad, rad * 0.6, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,246,238,' + (a * 0.9).toFixed(3) + ')';
        ctx.stroke();

        // Der dunkle Strich dahinter ist das Wellental. Ohne
        // ihn leuchtet die Flaeche nur, statt sich zu wellen.
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, rad + 3.5, (rad + 3.5) * 0.6, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0,24,22,' + (a * 0.7).toFixed(3) + ')';
        ctx.stroke();
      }
    }
  }

  /* =========================================================
     2. DER AUFTAKT
     --auf laeuft von 0 bis 1: solange es klein ist, steht die
     Schrift tief im Wasser und ist stark gebrochen.
     ========================================================= */
  let auf = 0, offen = false, laeuft = false, letzte = 0, naechsterTropfen = 900;

  function brechung(staerke) {
    if (!versatz) return;
    versatz.setAttribute('scale', staerke.toFixed(1));
  }

  function takt(jetzt) {
    if (!laeuft) return;
    const dt = Math.min(60, jetzt - (letzte || jetzt));
    letzte = jetzt;

    // Auch ohne Beruehrung faellt hin und wieder etwas ins
    // Wasser. Eine Oberflaeche, die vollkommen still steht,
    // ist keine.
    naechsterTropfen -= dt;
    if (naechsterTropfen <= 0) {
      tropfen(breite * (0.15 + Math.random() * 0.7),
              hoehe  * (0.2  + Math.random() * 0.6),
              offen ? 0.32 : 0.62);
      naechsterTropfen = 2200 + Math.random() * 2600;
    }

    if (offen && auf < 1) {
      auf = Math.min(1, auf + dt / 2200);
      auftakt.style.setProperty('--auf', auf.toFixed(3));
      // Von tief im Wasser bis an die Oberflaeche.
      brechung(26 * (1 - auf));
      if (auf === 1) fertig();
    } else if (!offen) {
      // Ein langsames Atmen, damit die Schrift schon vor dem
      // ersten Tippen als etwas *unter* Wasser zu lesen ist.
      brechung(20 + Math.sin(jetzt / 1400) * 6);
    }

    zeichnen(dt);
    requestAnimationFrame(takt);
  }

  function starten() {
    if (laeuft || sanft) return;
    laeuft = true; letzte = 0;
    requestAnimationFrame(takt);
  }
  function anhalten() { laeuft = false; }

  function oeffnen(x, y) {
    if (offen) return;
    offen = true;
    if (typeof x === 'number') tropfen(x, y, 1.4);
    flaeche.disabled = true;
    document.documentElement.removeAttribute('data-zu');
    if (hinweis) hinweis.remove();
    if (sanft) { auf = 1; auftakt.style.setProperty('--auf', '1'); brechung(0); fertig(); }
    try { sessionStorage.setItem('brunnen-offen', '1'); } catch {}
  }

  let fertigSchon = false;
  function fertig() {
    if (fertigSchon) return;
    fertigSchon = true;
    Kern.musikStarten();
  }

  if (leinwand && flaeche) {
    document.documentElement.setAttribute('data-zu', '');
    messen();
    addEventListener('resize', messen);

    const punkt = e => {
      const r = leinwand.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };

    flaeche.addEventListener('pointerdown', e => {
      const [x, y] = punkt(e);
      tropfen(x, y, 1.1);
      oeffnen(x, y);
    });
    // Wer den Finger ueber das Wasser zieht, zieht eine Spur
    // hinter sich her. Kostet nichts und ist der halbe Reiz.
    flaeche.addEventListener('pointermove', e => {
      if (e.buttons === 0 && e.pointerType === 'mouse') {
        if (Math.random() > 0.06) return;
      }
      const [x, y] = punkt(e);
      tropfen(x, y, 0.3);
    });
    flaeche.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      oeffnen(breite / 2, hoehe / 2);
    });

    /* Der Bildtakt steht in einem Hintergrundreiter still. Wer
       dann zurueckkommt, saehe eine Karte, die nie aufgeht -
       deshalb gibt es sie nach neun Sekunden auch ungefragt. */
    setTimeout(() => oeffnen(), 9000);

    let schonDa = false;
    try { schonDa = sessionStorage.getItem('brunnen-offen') === '1'; } catch {}
    if (schonDa || Kern.sofort) {
      offen = true; auf = 1; fertigSchon = true;
      auftakt.style.setProperty('--auf', '1');
      brechung(0);
      flaeche.disabled = true;
      if (hinweis) hinweis.remove();
    } else {
      document.documentElement.setAttribute('data-zu', '');
      brechung(20);
    }

    // Nur rechnen, solange das Wasser auch zu sehen ist.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(e => e[0].isIntersecting ? starten() : anhalten(),
        { threshold: 0.02 }).observe(auftakt);
    } else starten();
  }

  /* =========================================================
     3. DIE SPIEGELUNGEN
     Jedes Bild liegt ueber seinem eigenen Abbild. Die Quelle
     dafuer steht nicht ein zweites Mal im HTML - sie wird vom
     Bild selbst genommen, sonst laedt der Gast alles doppelt.
     ========================================================= */
  for (const figur of document.querySelectorAll('.bild')) {
    const bild = figur.querySelector('img');
    if (bild) figur.style.setProperty('--sp', 'url("' + bild.getAttribute('src') + '")');
  }

  Kern.start(DATEN);
})();
