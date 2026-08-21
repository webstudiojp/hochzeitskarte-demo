/* =========================================================
   STIL "ELEGANZ" — Ablauf der Seite
   Cover, Menue, Countdown, Kartenlinks, IBAN, Formular,
   Einblenden der Abschnitte, aktiver Reiter.
   ========================================================= */
(() => {
  'use strict';

  /* ---------- Inhalte an einer Stelle ---------- */
  const DATEN = {
    namen:      'Furkan & Dilara',
    beginnISO:  '2027-01-01T14:30:00',
    endeISO:    '2027-01-02T02:00:00',
    datumLang:  '1. Januar 2027',
    orte: {
      trauung: { name: 'Schloss Benrath',           adresse: 'Benrather Schloßallee 104, 40597 Düsseldorf' },
      empfang: { name: 'Orangerie im Schlosspark',  adresse: 'Benrather Schloßallee 104, 40597 Düsseldorf' },
    },
    iban: 'DE89 3704 0044 0532 0130 00',
  };

  const $ = id => document.getElementById(id);

  /* =========================================================
     1. Cover
     Erst loest sich die Schleife, dann klappen die Fluegel auf.
     Beides haengt an derselben Klasse - die Verzoegerung steckt
     in den Uebergangszeiten, nicht in Zeitgebern.
     ========================================================= */
  const cover = $('cover');
  let geoeffnet = false;

  function oeffnen() {
    if (geoeffnet) return;
    geoeffnet = true;
    cover.classList.add('offen');
    document.body.classList.remove('zu');
    document.body.classList.add('offen');
    // Erst wenn die Fluegel draussen sind, verschwindet das Cover ganz.
    setTimeout(() => {
      cover.classList.add('weg');
      cover.setAttribute('aria-hidden', 'true');
    }, 1150);
    starten();
  }

  // Die Schleife ist der Knopf; wer sie verfehlt, kommt trotzdem weiter.
  // Der Riegel in oeffnen() faengt den doppelten Aufruf beim Durchreichen ab.
  $('schleife').addEventListener('click', oeffnen);
  cover.addEventListener('click', oeffnen);

  /* =========================================================
     2. Menue
     ========================================================= */
  const burger = $('burger');
  const menue  = $('menue');
  burger.addEventListener('click', () => {
    const offen = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!offen));
    burger.setAttribute('aria-label', offen ? 'Menü öffnen' : 'Menü schließen');
    menue.hidden = offen;
  });
  menue.addEventListener('click', e => {
    if (e.target.tagName !== 'A') return;
    menue.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Menü öffnen');
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || menue.hidden) return;
    menue.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.focus();
  });

  /* =========================================================
     3. Countdown
     ========================================================= */
  const ziel = new Date(DATEN.beginnISO).getTime();
  const zwei = n => String(n).padStart(2, '0');

  /* Rollt nur, wenn sich der Wert geaendert hat - sonst zappelt die
     Sekundenanzeige und alles andere ruckelt sinnlos mit. */
  function ziffer(id, wert, rollen) {
    const n = $(id);
    if (!n || n.textContent === String(wert)) return;
    n.textContent = wert;
    if (rollen === false) return;
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
    const s = Math.floor(rest / 1000);
    ziffer('cd-t', Math.floor(s / 86400));
    ziffer('cd-s', zwei(Math.floor(s / 3600) % 24));
    ziffer('cd-m', zwei(Math.floor(s / 60) % 60));
    ziffer('cd-k', zwei(s % 60), false);   // Sekunden ruhig lassen
    return true;
  }

  /* =========================================================
     4. Der Weg dorthin
     Zwei Ziele statt eines Kompromisses: wer ein iPhone hat, will
     Apple Karten, alle anderen Google. Beides sind Links - eine
     eingebettete Karte wuerde schon beim Oeffnen der Seite Daten
     zum Anbieter schicken, ein Link erst beim Antippen.
     ========================================================= */
  const apfel = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
  for (const [kennung, ort] of [['trauung', DATEN.orte.trauung], ['empfang', DATEN.orte.empfang]]) {
    const ziel = encodeURIComponent(ort.name + ', ' + ort.adresse);
    const g = $('weg-google-' + kennung);
    const a = $('weg-apple-' + kennung);
    if (g) g.href = 'https://www.google.com/maps/dir/?api=1&destination=' + ziel + '&travelmode=driving';
    if (a) a.href = 'https://maps.apple.com/?daddr=' + ziel + '&dirflg=d';
    // Auf einem Apple-Geraet steht Apple Karten zuerst.
    if (apfel && a && a.parentNode) a.parentNode.prepend(a);
  }

  /* =========================================================
     5. IBAN
     ========================================================= */
  const schalter = $('iban-schalter');
  const feld     = $('iban-feld');
  schalter.addEventListener('click', () => {
    const offen = schalter.getAttribute('aria-expanded') === 'true';
    schalter.setAttribute('aria-expanded', String(!offen));
    feld.hidden = offen;
    schalter.textContent = offen ? 'IBAN anzeigen' : 'IBAN verbergen';
  });

  const kopieren = $('iban-kopieren');
  kopieren.addEventListener('click', async () => {
    const rein = DATEN.iban.replace(/\s+/g, '');
    let gut = false;
    try {
      await navigator.clipboard.writeText(rein);
      gut = true;
    } catch {
      const t = document.createElement('textarea');
      t.value = rein;
      t.setAttribute('readonly', '');
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      try { gut = document.execCommand('copy'); } catch { gut = false; }
      t.remove();
    }
    kopieren.textContent = gut ? 'Kopiert' : 'Bitte von Hand';
    setTimeout(() => { kopieren.textContent = 'Kopieren'; }, 2400);
  });

  /* =========================================================
     6. Formular
     Ohne Server: die Eingaben werden geprueft, aber nicht
     versendet. Das gehoert vor dem Livegang angebunden.
     ========================================================= */
  const formular = $('formular');
  const echo     = $('formular-echo');
  formular.addEventListener('submit', e => {
    e.preventDefault();
    const daten = new FormData(formular);
    const name  = String(daten.get('name') || '').trim();
    if (!name) {
      echo.textContent = 'Bitte tragt euren Namen ein.';
      formular.elements.name.focus();
      return;
    }
    if (!daten.get('zusage')) {
      echo.textContent = 'Bitte sagt uns, ob ihr kommt.';
      formular.querySelector('.wahlpaar input').focus();
      return;
    }
    echo.textContent = daten.get('zusage') === 'ja'
      ? 'Danke, ' + name + '. Wir freuen uns auf euch.'
      : 'Danke für die Nachricht, ' + name + '. Wir werden euch vermissen.';
    formular.querySelector('button[type=submit]').disabled = true;
  });

  /* =========================================================
     7. Einblenden und aktiver Reiter
     ========================================================= */
  const boegen = document.querySelectorAll('.bogen, .fuss');
  const reiter = [...document.querySelectorAll('.reiter a')];
  const ziele  = reiter.map(a => $(a.dataset.ziel)).filter(Boolean);

  const alleZeigen = () => boegen.forEach(b => b.classList.add('da'));

  function einblenden() {
    if (!('IntersectionObserver' in window)) { alleZeigen(); return; }

    // Ein Bogen ist hoch; er soll schon anlaufen, wenn seine Oberkante
    // ins Bild kommt, nicht erst wenn ein Achtel sichtbar ist.
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
    // der Beobachter nicht - etwa weil die Karte in einem Hintergrund-
    // reiter geoeffnet wurde -, steht trotzdem alles da.
    setTimeout(() => { if (!gemeldet) alleZeigen(); }, 1800);
    addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !gemeldet) {
        setTimeout(() => { if (!gemeldet) alleZeigen(); }, 600);
      }
    });
  }

  function reiterVerfolgen() {
    if (!ziele.length || !('IntersectionObserver' in window)) return;
    // Der oberste sichtbare Abschnitt gewinnt. Das Fenster wird auf
    // die Mitte verengt, sonst wechselt der Reiter an jeder Kante.
    const sichtbar = new Set();
    const beobachter = new IntersectionObserver(eintraege => {
      for (const e of eintraege) {
        if (e.isIntersecting) sichtbar.add(e.target.id);
        else sichtbar.delete(e.target.id);
      }
      const aktiv = ziele.map(z => z.id).find(id => sichtbar.has(id));
      // Zwischen zwei Zielen - etwa in der Anreise - bleibt der zuletzt
      // erreichte Punkt stehen, statt dass die Leiste leer laeuft.
      if (!aktiv) return;
      reiter.forEach(a => a.classList.toggle('aktiv', a.dataset.ziel === aktiv));
    }, { rootMargin: '-45% 0px -45% 0px' });
    ziele.forEach(z => beobachter.observe(z));
  }

  /* =========================================================
     8. Rosenblaetter
     Vierzehn Stueck reichen fuer den Eindruck eines Windes. Jedes
     bekommt eigenen Weg, eigenes Tempo und eigenen Anfang, sonst
     fallen sie im Gleichschritt und das sieht sofort gemacht aus.
     ========================================================= */
  const BLATT = 'M10 1C3 7 1 14 3 19c2 5 12 6 15 1 3-5 0-13-8-19z';
  const TOENE = ['#e8c3b6', '#f0d5c8', '#dfae9e', '#f6e3d8', '#e7cbb4', '#edd6bd'];

  function blaetterStreuen() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const feld = $('blattfall');
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
        'opacity:' + (.55 + Math.random() * .4).toFixed(2) + '">' +
        '<i style="animation-duration:' + (3.5 + Math.random() * 4).toFixed(1) + 's">' +
        '<svg viewBox="0 0 20 26" aria-hidden="true"><path d="' + BLATT + '" fill="' +
        TOENE[i % TOENE.length] + '"/></svg></i></span>'
      );
    }
    feld.innerHTML = teile.join('');
  }

  /* =========================================================
     9. Start — erst nachdem das Cover geoeffnet wurde
     ========================================================= */
  let laeuft = false;
  function starten() {
    if (laeuft) return;
    laeuft = true;
    einblenden();
    reiterVerfolgen();
    blaetterStreuen();
    if (countdown()) setInterval(countdown, 1000);
  }
})();
