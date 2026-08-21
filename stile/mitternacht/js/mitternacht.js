/* =========================================================
   MITTERNACHT — das Licht

   Der Auftakt versteckt nichts: das Bild liegt vollstaendig
   da. Nur zu sehen ist es dort, wo Licht faellt - und das
   Licht liegt, wo der Finger liegt.

   Wer keinen Zeiger hat und nicht tippt, bekommt trotzdem
   etwas zu sehen: dann wandert das Licht von allein.
   ========================================================= */
(() => {
  'use strict';

  const DATEN = {
    namen:       'Alexandra & Jonathan',
    kennung:     'alexandra-und-jonathan',
    beginnISO:   '2027-11-06T16:00:00',
    endeISO:     '2027-11-07T03:00:00',
    ortName:     'Burg Steinbach',
    adresse:     'Burgweg 1, 53518 Adenau',
    anlass:      'Hochzeit von Alexandra & Jonathan',
    kalendertext:'Ankommen ab 15:30 Uhr im Innenhof, Trauung um 16 Uhr in der Halle.',
    email:       'alexandra.und.jonathan@example.de',
    iban:        'DE00 0000 0000 0000 0000 00',
    speisen:     ['Fleisch', 'Fisch', 'Vegetarisch', 'Vegan'],
    musik:       null,
  };

  const sanft = Kern.sanft;
  const auftakt = document.getElementById('auftakt');
  const flaeche = document.getElementById('tastflaeche');
  const hinweis = document.getElementById('hinweis');

  let offen = false, lauf = 0, flackerLauf = 0;

  const setz = (name, wert) => auftakt.style.setProperty(name, wert);

  /* =========================================================
     1. DAS FLACKERN
     Eine Kerze flackert nicht nach einem Takt. Zwei Sinus mit
     unrunden Perioden ueberlagern sich zu etwas, das keine
     erkennbare Wiederholung hat - und genau das ist der
     Unterschied zwischen Kerze und Blinklicht.
     ========================================================= */
  function flackern(jetzt) {
    const f = (Math.sin(jetzt / 190) * 0.5 + Math.sin(jetzt / 71) * 0.3
             + Math.sin(jetzt / 37) * 0.2) * 0.5 + 0.5;
    setz('--flack', f.toFixed(3));
    flackerLauf = requestAnimationFrame(flackern);
  }

  /* =========================================================
     2. DAS LICHT
     Es folgt dem Zeiger, aber nicht sofort: es zieht nach.
     Ein Licht, das genau auf dem Cursor klebt, wirkt wie eine
     Taschenlampe, eines das nachlaeuft wie eine Flamme.
     ========================================================= */
  let zielX = 50, zielX2 = 50, zielY = 52, zielY2 = 52;
  let wandert = true, wanderZeit = 0;

  function ziehen(jetzt) {
    if (offen) return;

    if (wandert) {
      // Ohne Zeiger sucht das Licht selbst. Sonst saehe
      // jemand auf einem Telefon nur einen schwarzen Schirm.
      wanderZeit = jetzt / 1000;
      zielX = 50 + Math.sin(wanderZeit * 0.31) * 22;
      zielY = 50 + Math.cos(wanderZeit * 0.24) * 20;
    }
    zielX2 += (zielX - zielX2) * 0.09;
    zielY2 += (zielY - zielY2) * 0.09;
    setz('--mx', zielX2.toFixed(2) + '%');
    setz('--my', zielY2.toFixed(2) + '%');
    lauf = requestAnimationFrame(ziehen);
  }

  function anzuenden() {
    if (offen) return;
    offen = true;
    cancelAnimationFrame(lauf);
    flaeche.disabled = true;
    document.documentElement.removeAttribute('data-zu');
    if (hinweis) hinweis.remove();

    if (sanft) {
      setz('--r', '260vmax'); setz('--auf', '1');
      Kern.musikStarten();
      return;
    }

    // Das Licht laeuft nicht gleichmaessig auf: es zoegert,
    // dann greift es um sich. So faengt Feuer an.
    const start = performance.now(), von = 34, bis = 260;
    (function wachsen(jetzt) {
      const t = Math.min(1, (jetzt - start) / 1900);
      const e = t * t * (3 - 2 * t);
      setz('--r', (von + (bis - von) * e * e) + 'vmax');
      setz('--auf', Math.min(1, t * 1.4).toFixed(3));
      if (t < 1) requestAnimationFrame(wachsen);
      else Kern.musikStarten();
    })(start);

    try { sessionStorage.setItem('mitternacht-offen', '1'); } catch {}
  }

  if (flaeche) {
    document.documentElement.setAttribute('data-zu', '');

    flaeche.addEventListener('pointermove', e => {
      if (offen) return;
      wandert = false;
      const r = auftakt.getBoundingClientRect();
      zielX = (e.clientX - r.left) / r.width * 100;
      zielY = (e.clientY - r.top) / r.height * 100;
    });
    // Verlaesst der Zeiger die Flaeche, sucht das Licht wieder
    // von allein weiter - stehenbleiben waere tot.
    flaeche.addEventListener('pointerleave', () => { wandert = true; });
    flaeche.addEventListener('click', anzuenden);
    flaeche.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault(); anzuenden();
    });

    /* Nach neun Sekunden geht das Licht von selbst an. Ein
       schwarzer Bildschirm ist der schlechteste Ort, um jemanden
       raten zu lassen. */
    setTimeout(anzuenden, 9000);

    let schonDa = false;
    try { schonDa = sessionStorage.getItem('mitternacht-offen') === '1'; } catch {}
    if (schonDa || Kern.sofort) {
      offen = true;
      setz('--r', '260vmax'); setz('--auf', '1');
      flaeche.disabled = true;
      document.documentElement.removeAttribute('data-zu');
      if (hinweis) hinweis.remove();
    }

    /* Nur wenn die Karte noch zu ist. Stand sie beim zweiten
       Besuch schon offen, wuerde der kleine Anfangsradius das
       Licht wieder ausblasen. */
    if (!sanft && !offen) {
      setz('--r', '34vmin');
      requestAnimationFrame(ziehen);
      requestAnimationFrame(flackern);
      // Nur rechnen, solange die Nacht auch im Bild ist.
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(e => {
          if (e[0].isIntersecting) {
            if (!flackerLauf) flackerLauf = requestAnimationFrame(flackern);
          } else {
            cancelAnimationFrame(flackerLauf); flackerLauf = 0;
          }
        }, { threshold: .02 }).observe(auftakt);
      }
    } else if (!offen) {
      setz('--r', '260vmax'); setz('--auf', '1');
    }
  }

  Kern.start(DATEN);
})();
