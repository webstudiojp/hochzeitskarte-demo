/* =========================================================
   GOLDENE STUNDE — Vorhang, Zierstuecke, Bienen

   Der Vorhang geht nicht auf Knopfdruck auf. Er wird
   auseinandergezogen, und zwar quer: wer nach links wischt,
   zieht das linke Band mit. Das ist die einzige Bewegung,
   die ein Vorhang kennt.
   ========================================================= */
(() => {
  'use strict';

  const DATEN = {
    namen:       'Charlotte & Anton',
    kennung:     'charlotte-und-anton',
    beginnISO:   '2027-09-25T17:00:00',
    endeISO:     '2027-09-26T04:00:00',
    ortName:     'Schloss Eichenau',
    adresse:     'Schlossallee 1, 53902 Bad Münstereifel',
    anlass:      'Hochzeit von Charlotte & Anton',
    kalendertext:'Empfang ab 16 Uhr, Trauung um 17 Uhr in der Kapelle. Grosser Abend.',
    email:       'charlotte.und.anton@example.de',
    iban:        'DE00 0000 0000 0000 0000 00',
    speisen:     ['Fleisch', 'Fisch', 'Vegetarisch', 'Vegan'],
    musik:       null,
  };

  const sanft = Kern.sanft;
  const auftakt = document.getElementById('auftakt');
  const griff = document.getElementById('griff');
  const hinweis = document.getElementById('hinweis');

  /* =========================================================
     1. DER VORHANG
     ========================================================= */
  let auf = 0, offen = false, zieht = false;
  let griffX = 0, griffAuf = 0, letzteX = 0, letzteZeit = 0, tempo = 0, lauf = 0;

  const WEG = () => Math.min(innerWidth * 0.42, 260);

  function setzen(w) {
    auf = Math.max(0, Math.min(1, w));
    auftakt.style.setProperty('--auf', auf.toFixed(4));
  }

  function fahrenNach(ziel, dauer) {
    cancelAnimationFrame(lauf);
    if (sanft) { setzen(ziel); if (ziel === 1) fertig(); return; }
    const von = auf, start = performance.now();
    (function schritt(jetzt) {
      const t = Math.min(1, (jetzt - start) / dauer);
      // Schwerer Stoff laeuft langsam an und lange aus.
      const e = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setzen(von + (ziel - von) * e);
      if (t < 1) lauf = requestAnimationFrame(schritt);
      else if (ziel === 1) fertig();
    })(start);
  }

  function fertig() {
    if (offen) return;
    offen = true;
    document.documentElement.removeAttribute('data-zu');
    griff.disabled = true;
    if (hinweis) hinweis.remove();
    Kern.musikStarten();
    try { sessionStorage.setItem('goldstunde-offen', '1'); } catch {}
  }

  if (griff) {
    document.documentElement.setAttribute('data-zu', '');

    griff.addEventListener('pointerdown', e => {
      if (offen) return;
      zieht = true;
      griffX = e.clientX; griffAuf = auf;
      letzteX = e.clientX; letzteZeit = performance.now(); tempo = 0;
      griff.setPointerCapture?.(e.pointerId);
      cancelAnimationFrame(lauf);
    });
    griff.addEventListener('pointermove', e => {
      if (!zieht) return;
      e.preventDefault();
      // Der Betrag zaehlt, nicht die Richtung: man kann nach
      // links oder nach rechts ziehen, beides oeffnet.
      setzen(griffAuf + Math.abs(e.clientX - griffX) / WEG());
      const jetzt = performance.now(), dt = jetzt - letzteZeit;
      if (dt > 8) {
        tempo = Math.abs(e.clientX - letzteX) / dt;
        letzteX = e.clientX; letzteZeit = jetzt;
      }
    });
    const los = () => {
      if (!zieht) return;
      zieht = false;
      const durch = auf > 0.3 || tempo > 0.5;
      fahrenNach(durch ? 1 : 0, durch ? 900 : 480);
    };
    griff.addEventListener('pointerup', los);
    griff.addEventListener('pointercancel', los);

    griff.addEventListener('click', () => { if (!offen && auf < 0.05) fahrenNach(1, 1500); });
    griff.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault(); fahrenNach(1, 1500);
    });

    /* Wer nicht ahnt, dass hier gezogen werden will, sitzt sonst
       vor einem gruenen Bildschirm. Nach neun Sekunden geht der
       Vorhang von selbst auf. */
    setTimeout(() => { if (!offen && !zieht) fahrenNach(1, 1800); }, 9000);

    let schonDa = false;
    try { schonDa = sessionStorage.getItem('goldstunde-offen') === '1'; } catch {}
    if (schonDa || Kern.sofort) { setzen(1); fertig(); }
  }

  /* =========================================================
     2. DAS ZIERSTUECK
     Eine Raute zwischen zwei Voluten. Zehnmal dieselbe Figur
     im HTML zu wiederholen waere zehnmal derselbe Pfad; hier
     steht er einmal.
     ========================================================= */
  const FLEURON = [
    'M30 4 L38 14 L30 24 L22 14 Z',                       // Raute
    'M22 14 C15 14 12 9 7 11 C2 13 3 20 9 19 C14 18 16 14 22 14',   // linke Volute
    'M38 14 C45 14 48 9 53 11 C58 13 57 20 51 19 C46 18 44 14 38 14', // rechte Volute
    'M30 24 L30 27',
  ];
  for (const feld of document.querySelectorAll('.fleuron')) {
    feld.insertAdjacentHTML('afterbegin',
      '<svg viewBox="0 0 60 28" aria-hidden="true" fill="none" stroke="currentColor" ' +
      'stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" ' +
      'vector-effect="non-scaling-stroke">' +
      FLEURON.map((d, i) => '<path d="' + d + '" pathLength="1" style="--i:' + i +
        ';vector-effect:non-scaling-stroke"/>').join('') +
      '</svg>');
  }

  if (!sanft && 'IntersectionObserver' in window) {
    const b = new IntersectionObserver((e, selbst) => {
      for (const t of e) {
        if (!t.isIntersecting) continue;
        t.target.classList.add('zeichnet');
        selbst.unobserve(t.target);
      }
    }, { threshold: .6 });
    document.querySelectorAll('.fleuron').forEach(f => b.observe(f));
  } else {
    document.querySelectorAll('.fleuron').forEach(f => f.classList.add('zeichnet'));
  }

  /* =========================================================
     3. DIE BIENEN
     Sie gehoeren zum Motiv, nicht zum Vorspann - also ziehen
     sie ueber die ganze Seite. Drei genuegen: bei fuenf wird
     aus einem Einfall ein Insektenbefall.
     ========================================================= */
  if (!sanft) {
    const BIENE =
      '<svg viewBox="0 0 18 14" fill="none" stroke="currentColor" stroke-width="1.1" ' +
      'stroke-linecap="round">' +
      '<ellipse cx="9" cy="9" rx="4.2" ry="3" fill="currentColor" fill-opacity=".22"/>' +
      '<path d="M6.4 7.4h5.2M6.9 10.2h4.2"/>' +
      '<path class="fluegel" d="M9 6.6C7 3.6 4 3 3.4 4.6c-.5 1.5 2 2.7 5.6 2"/>' +
      '<path class="fluegel-r" d="M9 6.6c2-3 5-3.6 5.6-2 .5 1.5-2 2.7-5.6 2"/>' +
      '<path d="M13 8.6l1.8-1M13 9.8l1.9.3"/></svg>';

    for (let i = 0; i < 3; i++) {
      const b = document.createElement('div');
      b.className = 'biene';
      b.innerHTML = BIENE;
      document.body.appendChild(b);

      // Jede Biene bekommt ihre eigene Bahn, ihr eigenes Tempo
      // und ihren eigenen Einsatz. Drei gleiche Flugbahnen
      // sehen aus wie eine Formation.
      const hoehe0 = 0.18 + Math.random() * 0.6;
      const spanne = 0.1 + Math.random() * 0.22;
      const dauer = 17000 + Math.random() * 12000;
      const versatz = Math.random() * dauer;
      const richtung = Math.random() < .5 ? 1 : -1;
      const wellen = 1.6 + Math.random() * 1.8;

      (function fliegen(jetzt) {
        const t = (((jetzt + versatz) % dauer) / dauer);
        const x = richtung > 0 ? t : 1 - t;
        const y = hoehe0 + Math.sin(t * Math.PI * 2 * wellen) * spanne;
        b.style.transform =
          'translate(' + (x * (innerWidth + 60) - 30).toFixed(1) + 'px,' +
                         (y * innerHeight).toFixed(1) + 'px)' +
          ' scaleX(' + richtung + ')';
        requestAnimationFrame(fliegen);
      })(0);
    }
  }

  Kern.start(DATEN);
})();
