/* =========================================================
   HERKUNFT — die Karte wird gezogen

   Ein Tippen waere ein Schalter. Gezogen wird sie, weil eine
   Einladung aus einem Umschlag gezogen wird: der Weg folgt
   dem Finger, das Kuvert weicht nach hinten, und wer loslaesst,
   bevor sie draussen ist, sieht sie zurueckrutschen.

   Ein blosses Antippen genuegt trotzdem. Der Kniff darf
   niemanden aussperren, der nicht ahnt, dass er ziehen soll.
   ========================================================= */
(() => {
  'use strict';

  const DATEN = {
    namen:       'Amelie & David',
    kennung:     'amelie-und-david',
    beginnISO:   '2027-06-12T15:00:00',
    endeISO:     '2027-06-13T03:00:00',
    ortName:     'Gut Lindenhof',
    adresse:     'Lindenhofweg 4, 51519 Odenthal',
    anlass:      'Hochzeit von Amelie & David',
    kalendertext:'Trauung um 15 Uhr unter der Linde. Festlich, aber wiesentauglich.',
    email:       'amelie.und.david@example.de',
    iban:        'DE00 0000 0000 0000 0000 00',
    speisen:     ['Fleisch', 'Fisch', 'Vegetarisch', 'Vegan'],
    musik:       null,     // liegt keine Datei, verschwindet der Knopf
  };

  const sanft = Kern.sanft;
  const auftakt = document.getElementById('auftakt');
  const karte   = document.getElementById('karte');
  const hinweis = document.getElementById('hinweis');

  /* =========================================================
     1. DER FARN
     Vierzehn Fiederpaare, nach oben kuerzer werdend. Erzeugt
     statt gezeichnet, weil der Farn dann fuer jede Stelle,
     an der er steht, eine andere Neigung bekommen kann - und
     weil vierzig fast gleiche Pfade im HTML niemand liest.
     ========================================================= */
  function farnBauen(svg, keim) {
    let z = keim;
    const zufall = () => (z = (z * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;

    const stuecke = [];
    const PAARE = 14;

    // Der Wedel biegt sich, statt gerade zu stehen.
    const stammX = t => 60 + Math.sin(t * 2.1) * 11 * t * t;
    const stammY = t => 194 - t * 176;

    let d = 'M' + stammX(0).toFixed(1) + ',' + stammY(0).toFixed(1);
    for (let i = 1; i <= 20; i++) {
      const t = i / 20;
      d += ' L' + stammX(t).toFixed(1) + ',' + stammY(t).toFixed(1);
    }
    stuecke.push(d);

    for (let i = 0; i < PAARE; i++) {
      const t = 0.07 + (i / (PAARE - 1)) * 0.86;
      const x = stammX(t), y = stammY(t);
      // Nach oben werden die Fiedern kuerzer, sonst wird aus
      // dem Wedel ein Kamm.
      const laenge = (1 - t) ** 0.62 * 50 + 4 + zufall() * 3;
      const heben = laenge * (0.46 + zufall() * 0.14);

      for (const seite of [-1, 1]) {
        const ex = x + seite * laenge, ey = y - heben;
        // Zwei Boegen hin und zurueck ergeben ein Blatt, ein
        // einzelner Bogen nur einen Strich.
        stuecke.push(
          'M' + x.toFixed(1) + ',' + y.toFixed(1) +
          ' Q' + (x + seite * laenge * 0.5).toFixed(1) + ',' + (y - heben * 1.5).toFixed(1) +
          ' '  + ex.toFixed(1) + ',' + ey.toFixed(1) +
          ' Q' + (x + seite * laenge * 0.55).toFixed(1) + ',' + (y + heben * 0.18).toFixed(1) +
          ' '  + x.toFixed(1) + ',' + y.toFixed(1)
        );
      }
    }

    svg.innerHTML = stuecke.map((d, i) =>
      '<path d="' + d + '" pathLength="1" style="--i:' + i + '"/>'
    ).join('');
  }

  const farn = document.getElementById('farn');
  const farnFuss = document.getElementById('farn-fuss');
  if (farn) farnBauen(farn, 20270612);
  if (farnFuss) farnBauen(farnFuss, 12061947);

  /* Der Farn im Fuss zeichnet sich, sobald er ins Bild kommt. */
  if (farnFuss && !sanft && 'IntersectionObserver' in window) {
    const b = new IntersectionObserver((e, selbst) => {
      if (!e[0].isIntersecting) return;
      farnFuss.classList.add('zeichnet');
      selbst.disconnect();
    }, { threshold: .3 });
    b.observe(farnFuss);
  } else if (farnFuss) {
    farnFuss.classList.add('zeichnet');
  }

  /* =========================================================
     2. DAS ZIEHEN
     --zug laeuft von 0 bis 1. Karte und Kuvert haengen beide
     daran, damit sich ihre Wege nicht auseinanderrechnen.
     ========================================================= */
  let zug = 0, offen = false, zieht = false;
  let griffY = 0, griffZug = 0, letzteY = 0, letzteZeit = 0, tempo = 0;

  const WEG = () => Math.min(innerHeight * 0.62, 460);   // wie weit gezogen werden muss

  function setzen(w) {
    zug = Math.max(0, Math.min(1, w));
    auftakt.style.setProperty('--zug', zug.toFixed(4));
  }

  /* Zurueck oder durch - immer mit demselben Ablauf, nur mit
     anderem Ziel. Ein eigener Zweig fuer jede Richtung waere
     zweimal dieselbe Rechnung. */
  let lauf = 0;
  function fahrenNach(ziel, dauer) {
    cancelAnimationFrame(lauf);
    if (sanft) { setzen(ziel); if (ziel === 1) fertig(); return; }
    const von = zug, start = performance.now();
    (function schritt(jetzt) {
      const t = Math.min(1, (jetzt - start) / dauer);
      // Weiches Auslaufen, kein Nachfedern: eine Karte, die
      // aus Papier ist, schwingt nicht.
      const e = 1 - Math.pow(1 - t, 3);
      setzen(von + (ziel - von) * e);
      if (t < 1) lauf = requestAnimationFrame(schritt);
      else if (ziel === 1) fertig();
    })(start);
  }

  function fertig() {
    if (offen) return;
    offen = true;
    document.documentElement.removeAttribute('data-zu');
    karte.removeAttribute('role');
    karte.removeAttribute('tabindex');
    karte.style.cursor = 'default';
    if (farn) farn.classList.add('zeichnet');
    if (hinweis) hinweis.remove();
    Kern.musikStarten();
    try { sessionStorage.setItem('herkunft-offen', '1'); } catch {}
  }

  function greifen(e) {
    if (offen) return;
    zieht = true;
    griffY = e.clientY; griffZug = zug;
    letzteY = e.clientY; letzteZeit = performance.now(); tempo = 0;
    karte.setPointerCapture?.(e.pointerId);
    cancelAnimationFrame(lauf);
  }

  function ziehen(e) {
    if (!zieht) return;
    e.preventDefault();
    setzen(griffZug + (griffY - e.clientY) / WEG());

    const jetzt = performance.now(), dt = jetzt - letzteZeit;
    if (dt > 8) {
      tempo = (letzteY - e.clientY) / dt;    // Punkte je Millisekunde, nach oben positiv
      letzteY = e.clientY; letzteZeit = jetzt;
    }
  }

  function loslassen() {
    if (!zieht) return;
    zieht = false;
    // Ein kurzer Ruck nach oben zaehlt so viel wie ein langer
    // Weg - sonst muesste man die Karte muehsam hochschieben.
    const durch = zug > 0.34 || tempo > 0.55;
    fahrenNach(durch ? 1 : 0, durch ? 420 : 340);
  }

  if (karte) {
    document.documentElement.setAttribute('data-zu', '');

    karte.addEventListener('pointerdown', greifen);
    karte.addEventListener('pointermove', ziehen);
    karte.addEventListener('pointerup', loslassen);
    karte.addEventListener('pointercancel', loslassen);

    // Antippen ohne Ziehen. Der Zeiger hat sich dann kaum
    // bewegt, und genau das ist hier das Signal.
    karte.addEventListener('click', () => {
      if (!offen && zug < 0.05) fahrenNach(1, 620);
    });
    karte.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      fahrenNach(1, 620);
    });

    /* Der Bildtakt steht in einem Hintergrundreiter still, und
       nicht jeder ahnt, dass hier gezogen werden will. Nach
       neun Sekunden liegt die Karte deshalb auch ungefragt
       draussen - der Kniff ist huebsch, aber er darf niemanden
       aussperren. */
    setTimeout(() => { if (!offen && !zieht) fahrenNach(1, 900); }, 9000);

    /* Beim zweiten Besuch in derselben Sitzung liegt die Karte
       schon draussen. Wer nur die Adresse nachsieht, will den
       Umschlag nicht noch einmal aufziehen. */
    let schonDa = false;
    try { schonDa = sessionStorage.getItem('herkunft-offen') === '1'; } catch {}
    if (schonDa || Kern.sofort) { setzen(1); fertig(); }
  }

  Kern.start(DATEN);
})();
