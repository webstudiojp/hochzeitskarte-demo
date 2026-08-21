/* =========================================================
   FERNWEH — der Stempel

   Der Kopf faehrt herunter, schlaegt auf, die Seite ruettelt
   kurz, und dann steht der Abdruck. Wichtig ist die
   Reihenfolge und die Haerte: der Kopf braucht lange zum
   Fallen und ist in einem Bild weg. Ein Stempel, der sanft
   ausblendet, ist ein Wasserzeichen.

   Darunter zieht sich eine gestrichelte Route neben dem Text
   mit. Wo der Browser scrollgetriebene Animationen kann,
   haengt sie am Bildlauf selbst - dann waechst sie genau so
   schnell, wie der Gast weiterliest.
   ========================================================= */
(() => {
  'use strict';

  const DATEN = {
    namen:       'Nora & Julius',
    kennung:     'nora-und-julius',
    beginnISO:   '2027-09-04T16:00:00',
    endeISO:     '2027-09-05T04:00:00',
    ortName:     'Alte Werft',
    adresse:     'Am Sandtorkai 30, 20457 Hamburg',
    anlass:      'Hochzeit von Nora & Julius',
    kalendertext:'Ankunft ab 15 Uhr, Trauung um 16 Uhr am Wasser. Eingang Sued.',
    email:       'nora.und.julius@example.de',
    iban:        'DE00 0000 0000 0000 0000 00',
    speisen:     ['Fleisch', 'Fisch', 'Vegetarisch', 'Vegan'],
    musik:       null,
  };

  const sanft = Kern.sanft;
  const auftakt = document.getElementById('auftakt');
  const griff = document.getElementById('stempelgriff');
  const hinweis = document.getElementById('hinweis');

  let offen = false;

  function stempeln() {
    if (offen) return;
    offen = true;
    griff.disabled = true;
    document.documentElement.removeAttribute('data-zu');
    if (hinweis) hinweis.remove();

    const setz = (n, w) => auftakt.style.setProperty(n, w);

    if (sanft) {
      setz('--druck', '1');
      Kern.musikStarten();
      try { sessionStorage.setItem('fernweh-offen', '1'); } catch {}
      return;
    }

    const FALL = 460;
    setz('--kopfsicht', '1');
    const start = performance.now();

    (function fallen(jetzt) {
      const t = Math.min(1, (jetzt - start) / FALL);
      // Er faellt, also beschleunigt er. Gleichmaessig waere
      // eine Maschine, kein Handstempel.
      const e = t * t;
      setz('--kopf', (1.55 - e * 0.55).toFixed(3));
      if (t < 1) { requestAnimationFrame(fallen); return; }

      // Aufschlag: Kopf weg, Abdruck da, Seite ruettelt.
      setz('--kopfsicht', '0');
      setz('--druck', '1');
      auftakt.classList.add('schlag');
      setTimeout(() => auftakt.classList.remove('schlag'), 320);
      if (navigator.vibrate) { try { navigator.vibrate(14); } catch {} }
      Kern.musikStarten();
    })(start);

    try { sessionStorage.setItem('fernweh-offen', '1'); } catch {}
  }

  if (griff) {
    document.documentElement.setAttribute('data-zu', '');
    griff.addEventListener('click', stempeln);
    griff.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault(); stempeln();
    });

    /* Nach neun Sekunden stempelt es von allein. */
    setTimeout(stempeln, 9000);

    let schonDa = false;
    try { schonDa = sessionStorage.getItem('fernweh-offen') === '1'; } catch {}
    if (schonDa || Kern.sofort) {
      offen = true;
      griff.disabled = true;
      auftakt.style.setProperty('--druck', '1');
      document.documentElement.removeAttribute('data-zu');
      if (hinweis) hinweis.remove();
    }
  }

  /* =========================================================
     DIE ROUTE
     ========================================================= */
  const weg = document.getElementById('routenweg');
  const route = document.getElementById('route');
  if (weg && route && !sanft) {
    // Die Route soll die ganze Hoehe des Tagebuchs fuellen,
    // nicht 1000 Einheiten hoch sein. Ein preserveAspectRatio
    // von "none" streckt den Pfad mit.
    const strich = () => {
      const gesamt = document.documentElement.scrollHeight - innerHeight;
      const anteil = gesamt > 0 ? Math.min(1, scrollY / gesamt) : 1;
      // Gezeichnet wird ueber die Laenge, nicht ueber die
      // Deckung: eine halb sichtbare Linie ist keine halb
      // gefahrene Strecke.
      weg.style.strokeDasharray = anteil.toFixed(4) + ' 1';
    };
    let wartet = false;
    addEventListener('scroll', () => {
      if (wartet) return;
      wartet = true;
      requestAnimationFrame(() => { wartet = false; strich(); });
    }, { passive: true });
    addEventListener('resize', strich, { passive: true });
    strich();
  }

  Kern.start(DATEN);
})();
