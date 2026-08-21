/* =========================================================
   AZUR — die Kachelwand

   Vor dem Bild liegt eine Wand aus Fliesen. Wer eine antippt,
   dreht sie um - und von dort aus laeuft eine Welle durch die
   ganze Wand, weil die Wartezeit jeder Fliese aus ihrem
   Abstand zum Beruehrungspunkt kommt.

   Deshalb sieht jeder Auftakt anders aus: wer oben links
   tippt, sieht die Welle diagonal laufen, wer in die Mitte
   tippt, sieht sie nach aussen gehen.
   ========================================================= */
(() => {
  'use strict';

  const DATEN = {
    namen:       'Lina & Matteo',
    kennung:     'lina-und-matteo',
    beginnISO:   '2027-06-05T12:00:00',
    endeISO:     '2027-06-06T03:00:00',
    ortName:     'Cala Bianca',
    adresse:     'Via della Cala 3, 96017 Noto, Sizilien',
    anlass:      'Hochzeit von Lina & Matteo',
    kalendertext:'Ankommen ab 11 Uhr am Hafen, Trauung um 12 Uhr in der Kapelle.',
    email:       'lina.und.matteo@example.de',
    iban:        'DE00 0000 0000 0000 0000 00',
    speisen:     ['Fleisch', 'Fisch', 'Vegetarisch', 'Vegan'],
    musik:       null,
  };

  const sanft = Kern.sanft;
  const auftakt = document.getElementById('auftakt');
  const wand = document.getElementById('wand');
  const griff = document.getElementById('kachelgriff');
  const hinweis = document.getElementById('hinweis');

  let offen = false, spalten = 0, zeilen = 0;

  /* Die Fliesen sollen ungefaehr quadratisch sein, egal wie
     der Schirm steht. Deshalb wird die Spaltenzahl aus der
     Breite gerechnet und die Zeilenzahl daraus - nicht beides
     fest gesetzt. */
  function wandBauen() {
    const b = auftakt.clientWidth, h = auftakt.clientHeight;
    const seite = b < 520 ? b / 5 : b / 8;
    spalten = Math.max(3, Math.round(b / seite));
    zeilen  = Math.max(4, Math.round(h / (b / spalten)));

    wand.style.gridTemplateColumns = 'repeat(' + spalten + ',1fr)';
    wand.style.gridTemplateRows    = 'repeat(' + zeilen  + ',1fr)';

    /* Jede Fliese bekommt eine leicht andere Glasur. Ohne die
       Streuung sieht die Wand aus wie eine Tapete - und der
       Unterschied zwischen bemalt und bedruckt ist genau das. */
    const stuecke = [];
    for (let i = 0; i < spalten * zeilen; i++) {
      const ton = (Math.random() * 16 - 8).toFixed(1);
      const satt = (0.88 + Math.random() * 0.24).toFixed(2);
      stuecke.push('<div class="fliese" style="--ton:' + ton + 'deg;--satt:' + satt + '"></div>');
    }
    wand.innerHTML = stuecke.join('');
  }

  function umlegen(spalte, zeile) {
    if (offen) return;
    offen = true;
    griff.disabled = true;
    document.documentElement.removeAttribute('data-zu');
    if (hinweis) hinweis.remove();

    const fliesen = wand.children;
    // Die weiteste Fliese bestimmt, wie lang die Welle
    // insgesamt braucht - sonst haengt die Dauer an der
    // Schirmgroesse statt am Entwurf.
    const weiteste = Math.hypot(Math.max(spalte, spalten - 1 - spalte),
                                Math.max(zeile,  zeilen  - 1 - zeile)) || 1;

    for (let i = 0; i < fliesen.length; i++) {
      const s = i % spalten, z = (i / spalten) | 0;
      const weg = Math.hypot(s - spalte, z - zeile) / weiteste;
      const f = fliesen[i];
      f.style.setProperty('--wart', Math.round(weg * 720) + 'ms');
      // Nicht alle in dieselbe Richtung: sonst sieht es aus
      // wie eine Jalousie, nicht wie fallende Fliesen.
      f.style.setProperty('--dreh', ((s + z) % 2 ? 92 : -92) + 'deg');
    }

    auftakt.style.setProperty('--auf', '1');
    setTimeout(() => { wand.remove(); Kern.musikStarten(); }, sanft ? 0 : 1700);
    try { sessionStorage.setItem('azur-offen', '1'); } catch {}
  }

  if (wand && griff) {
    document.documentElement.setAttribute('data-zu', '');
    wandBauen();

    let messung = 0;
    addEventListener('resize', () => {
      if (offen) return;
      clearTimeout(messung);
      messung = setTimeout(wandBauen, 200);
    });

    griff.addEventListener('click', e => {
      const r = auftakt.getBoundingClientRect();
      // Ohne Zeigerkoordinaten - etwa bei der Tastatur - faellt
      // die Welle aus der Mitte.
      const x = e.clientX ? (e.clientX - r.left) / r.width  : .5;
      const y = e.clientY ? (e.clientY - r.top)  / r.height : .5;
      umlegen(Math.min(spalten - 1, (x * spalten) | 0),
              Math.min(zeilen  - 1, (y * zeilen)  | 0));
    });

    /* Nach neun Sekunden faellt die Wand von allein. */
    setTimeout(() => umlegen((spalten / 2) | 0, (zeilen / 2) | 0), 9000);

    let schonDa = false;
    try { schonDa = sessionStorage.getItem('azur-offen') === '1'; } catch {}
    if (schonDa || Kern.sofort) {
      offen = true;
      wand.remove();
      griff.disabled = true;
      auftakt.style.setProperty('--auf', '1');
      document.documentElement.removeAttribute('data-zu');
      if (hinweis) hinweis.remove();
    }
  }

  Kern.start(DATEN);
})();
