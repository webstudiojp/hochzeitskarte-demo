/* =========================================================
   REIN — die Borte

   Die einzige der neun Karten, die nichts verlangt. Kein
   Griff, kein Knopf, keine Geste: die Spitze webt sich,
   waehrend gelesen wird. Wer stehenbleibt, sieht sie
   stehenbleiben.

   Deshalb gibt es hier auch keinen Notausgang - es gibt
   nichts, wovor jemand ausgesperrt werden koennte. Wer nach
   unten scrollt, kommt weiter, und das tut jeder.
   ========================================================= */
(() => {
  'use strict';

  const DATEN = {
    namen:       'Sophie & Elias',
    kennung:     'sophie-und-elias',
    beginnISO:   '2027-03-20T15:00:00',
    endeISO:     '2027-03-21T01:00:00',
    ortName:     'Kapelle am Hang',
    adresse:     'Bergstraße 40, 53639 Königswinter',
    anlass:      'Hochzeit von Sophie & Elias',
    kalendertext:'Ankommen ab 14:30 Uhr vor der Kapelle, Trauung um 15 Uhr.',
    email:       'sophie.und.elias@example.de',
    iban:        'DE00 0000 0000 0000 0000 00',
    speisen:     ['Fleisch', 'Fisch', 'Vegetarisch', 'Vegan'],
    musik:       null,
  };

  const sanft = Kern.sanft;
  const auftakt = document.getElementById('auftakt');

  /* =========================================================
     1. DIE BORTE
     Eine Chantilly-Borte besteht aus drei Lagen: dem Netzgrund,
     den Bogen darunter und den Picots an ihrer Kante. Alle
     drei aus Bogen zu zeichnen genuegt - eine echte Masche
     waere bei dieser Groesse nicht mehr zu sehen und wuerde
     nur die Datei aufblaehen.

     Erzeugt statt gezeichnet, weil die Zahl der Bogen von der
     Breite abhaengt und weil derselbe Zug dreimal auf der
     Seite steht.
     ========================================================= */
  function borteBauen(svg, bogen) {
    const B = 1000, H = 130;
    const w = B / bogen;                 // Breite eines Bogens
    const stuecke = [];

    // Die Kante, an der die Spitze angesetzt ist.
    stuecke.push('M0 6 H' + B);

    // Das Netz darueber: zwei gegenlaeufige Zickzacklinien
    // ergeben Rauten, ohne dass eine Raute gezeichnet wird.
    for (const [y, h, ver] of [[16, 13, 0], [16, 13, w / 2]]) {
      let d = 'M' + (-ver).toFixed(1) + ' ' + y;
      for (let i = 0; i <= bogen * 2 + 2; i++) {
        d += ' L' + (i * w / 2 - ver).toFixed(1) + ' ' + (y + (i % 2 ? h : 0));
      }
      stuecke.push(d);
    }

    for (let i = 0; i < bogen; i++) {
      const x = i * w, m = x + w / 2;

      // Der grosse Bogen.
      stuecke.push(
        'M' + x.toFixed(1) + ' 32 C' + (x + w * 0.18).toFixed(1) + ' 96 ' +
        (x + w * 0.82).toFixed(1) + ' 96 ' + (x + w).toFixed(1) + ' 32');

      // Ein zweiter, engerer darin - eine einzelne Linie waere
      // eine Girlande, keine Spitze.
      stuecke.push(
        'M' + (x + w * 0.14).toFixed(1) + ' 34 C' + (x + w * 0.28).toFixed(1) + ' 80 ' +
        (x + w * 0.72).toFixed(1) + ' 80 ' + (x + w * 0.86).toFixed(1) + ' 34');

      // Die Bluete im Bogen: fuenf Blaetter um einen Punkt.
      const by = 58;
      for (let k = 0; k < 5; k++) {
        const a = -Math.PI / 2 + (k - 2) * 0.62;
        const ex = m + Math.cos(a) * 13, ey = by + Math.sin(a) * 13;
        stuecke.push(
          'M' + m.toFixed(1) + ' ' + by +
          ' Q' + (m + Math.cos(a - .35) * 12).toFixed(1) + ' ' + (by + Math.sin(a - .35) * 12).toFixed(1) +
          ' '  + ex.toFixed(1) + ' ' + ey.toFixed(1) +
          ' Q' + (m + Math.cos(a + .35) * 12).toFixed(1) + ' ' + (by + Math.sin(a + .35) * 12).toFixed(1) +
          ' '  + m.toFixed(1) + ' ' + by);
      }

      // Die Picots: kleine Schlaufen an der Unterkante des
      // Bogens. Sie sind der Unterschied zwischen Spitze und
      // Ornament.
      for (let k = 1; k <= 5; k++) {
        const t = k / 6;
        const px = x + w * t;
        const py = 32 + Math.sin(t * Math.PI) * 48;
        stuecke.push(
          'M' + (px - 3.4).toFixed(1) + ' ' + py.toFixed(1) +
          ' a3.4 3.4 0 1 0 6.8 0 a3.4 3.4 0 1 0 -6.8 0');
      }
    }

    svg.innerHTML = stuecke.map(d => '<path d="' + d + '" pathLength="1"/>').join('');
    svg.setAttribute('viewBox', '0 0 ' + B + ' ' + H);
  }

  const bogenZahl = () => Math.max(4, Math.round(innerWidth / 78));
  const oben = document.getElementById('borte-oben');
  const unten = document.getElementById('borte-unten');
  const fuss = document.getElementById('borte-fuss');

  function borten() {
    const n = bogenZahl();
    if (oben) borteBauen(oben, n);
    if (unten) borteBauen(unten, n);
    if (fuss) borteBauen(fuss, n);
  }
  borten();
  let messung = 0;
  addEventListener('resize', () => {
    clearTimeout(messung);
    messung = setTimeout(borten, 220);
  }, { passive: true });

  /* =========================================================
     2. DAS WEBEN
     --webe kommt aus dem Bildlauf im Auftakt selbst. Wo der
     Browser scrollgetriebene Animationen kann, uebernimmt das
     CSS; sonst rechnet der Kern denselben Wert im rAF-Takt.
     ========================================================= */
  if (auftakt) {
    if (sanft || Kern.sofort) {
      auftakt.style.setProperty('--webe', '1');
      auftakt.style.height = '100svh';
    } else {
      let wartet = false, vonAllein = 0, hatGescrollt = false;
      const rechnen = () => {
        wartet = false;
        const r = auftakt.getBoundingClientRect();
        const weg = auftakt.offsetHeight - innerHeight;
        const anteil = weg > 0 ? Math.min(1, Math.max(0, -r.top / weg)) : 1;
        // Fertig gewebt ist sie schon bei drei Vierteln des
        // Wegs. Das letzte Viertel gehoert den Namen - sonst
        // stehen sie erst da, wenn der Auftakt schon
        // hinausgescrollt ist.
        //
        // Der groessere der beiden Werte gewinnt: sonst wuerde
        // die Borte zurueckspringen, sobald jemand nach dem
        // Selbstweben doch noch scrollt.
        const w = Math.max(Math.min(1, anteil / 0.75), vonAllein);
        auftakt.style.setProperty('--webe', w.toFixed(4));
      };
      addEventListener('scroll', () => {
        hatGescrollt = true;
        if (wartet) return;
        wartet = true;
        requestAnimationFrame(rechnen);
      }, { passive: true });
      addEventListener('resize', rechnen, { passive: true });
      rechnen();

      /* Wer die Karte oeffnet und nichts tut, sieht sonst nie,
         wie sie heisst. Nach fuenf Sekunden ohne Bildlauf webt
         sich die Borte deshalb von selbst zu Ende - langsam
         genug, dass es nicht wie ein Sprung aussieht. */
      setTimeout(() => {
        if (hatGescrollt) return;
        const start = performance.now();
        (function weben(jetzt) {
          const t = Math.min(1, (jetzt - start) / 2600);
          vonAllein = t * t * (3 - 2 * t);
          rechnen();
          if (t < 1 && !hatGescrollt) requestAnimationFrame(weben);
        })(start);
      }, 5000);
    }
  }

  Kern.start(DATEN);
})();
