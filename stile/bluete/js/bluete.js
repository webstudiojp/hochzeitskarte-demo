/* =========================================================
   BLUETE — die Knospe

   Sie geht nicht auf Knopfdruck auf, sondern solange jemand
   haelt. Das ist der ganze Kniff: eine Bluete oeffnet sich
   nicht in einem Augenblick, und wer loslaesst, sieht sie
   zurueckfallen - nicht springen, sondern sinken.

   Die Bluete ist gezeichnet, nicht fotografiert, weil sie
   sonst nicht auf den Finger reagieren koennte.
   ========================================================= */
(() => {
  'use strict';

  const DATEN = {
    namen:       'Clara & Felix',
    kennung:     'clara-und-felix',
    beginnISO:   '2027-05-08T15:00:00',
    endeISO:     '2027-05-09T03:00:00',
    ortName:     'Glashaus Marienburg',
    adresse:     'Am Glashaus 2, 41363 Jüchen',
    anlass:      'Hochzeit von Clara & Felix',
    kalendertext:'Ankommen ab 14 Uhr im Glashaus, Trauung um 15 Uhr.',
    email:       'clara.und.felix@example.de',
    iban:        'DE00 0000 0000 0000 0000 00',
    speisen:     ['Fleisch', 'Fisch', 'Vegetarisch', 'Vegan'],
    musik:       null,
  };

  const sanft = Kern.sanft;
  const auftakt = document.getElementById('auftakt');
  const griff = document.getElementById('halten');
  const hinweis = document.getElementById('hinweis');


  /* =========================================================
     2. HALTEN
     ========================================================= */
  let offen = 0, haelt = false, fertig = false, lauf = 0, letzte = 0;

  const setz = w => {
    offen = Math.max(0, Math.min(1, w));
    auftakt.style.setProperty('--offen', offen.toFixed(4));
  };

  function takt(jetzt) {
    const dt = Math.min(50, jetzt - (letzte || jetzt));
    letzte = jetzt;

    if (haelt) {
      setz(offen + dt / 1600);                 // gut anderthalb Sekunden bis ganz auf
    } else if (offen > 0 && !fertig) {
      // Zurueck faellt sie langsamer, als sie aufgeht. Eine
      // Bluete schnappt nicht zu.
      setz(offen - dt / 2600);
    }

    if (offen >= 1 && !fertig) aufgegangen();
    if (haelt || (offen > 0 && !fertig)) lauf = requestAnimationFrame(takt);
    else { lauf = 0; letzte = 0; }
  }

  function starten() {
    if (lauf) return;
    letzte = 0;
    lauf = requestAnimationFrame(takt);
  }

  function aufgegangen() {
    if (fertig) return;
    fertig = true;
    setz(1);
    griff.disabled = true;
    document.documentElement.removeAttribute('data-zu');
    if (hinweis) hinweis.remove();
    pollenStreuen();
    Kern.musikStarten();
    try { sessionStorage.setItem('bluete-offen', '1'); } catch {}
  }

  /* Achtzehn Koerner, jedes mit eigenem Weg, Tempo und
     Einsatz. Im Gleichschritt saehe man ihnen sofort an,
     dass sie gerechnet sind. */
  function pollenStreuen() {
    if (sanft) return;
    const feld = document.createElement('div');
    feld.className = 'pollen';
    feld.setAttribute('aria-hidden', 'true');
    let s = '';
    for (let i = 0; i < 18; i++) {
      s += '<i style="left:' + (28 + Math.random() * 44).toFixed(1) + '%;' +
           '--x:' + ((Math.random() - .5) * 130).toFixed(0) + 'px;' +
           '--d:' + (5.5 + Math.random() * 6).toFixed(1) + 's;' +
           '--v:' + (Math.random() * 6).toFixed(1) + 's"></i>';
    }
    feld.innerHTML = s;
    auftakt.appendChild(feld);
  }

  if (griff) {
    document.documentElement.setAttribute('data-zu', '');

    const an = e => { if (fertig) return; e.preventDefault(); haelt = true; starten(); };
    const aus = () => { haelt = false; starten(); };
    griff.addEventListener('pointerdown', an);
    griff.addEventListener('pointerup', aus);
    griff.addEventListener('pointercancel', aus);
    griff.addEventListener('pointerleave', aus);

    // Mit der Tastatur wird nicht gehalten, sondern ausgeloest.
    griff.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      haelt = true; starten();
    });
    griff.addEventListener('keyup', aus);

    /* Nach neun Sekunden geht sie von allein auf. Wer nicht
       ahnt, dass hier gehalten werden will, soll trotzdem die
       Einladung sehen. */
    setTimeout(() => { if (!fertig) { haelt = true; starten(); } }, 9000);

    let schonDa = false;
    try { schonDa = sessionStorage.getItem('bluete-offen') === '1'; } catch {}
    if (schonDa || sanft || Kern.sofort) {
      setz(1); aufgegangen();
    }
  }

  Kern.start(DATEN);
})();
