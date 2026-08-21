/* =========================================================
   KERN — was jede der neun Karten gleich macht

   Nicht wie sie aussieht: was sie kann. Countdown, Kalender-
   datei, Route, Rueckmeldung, Geschenke, Fragen, Musik,
   Auftritt beim Scrollen, Parallaxe.

   Neunmal dieselben zweihundert Zeilen zu kopieren waere die
   Sorte Arbeit, die beim ersten Fehler neunmal nachgezogen
   werden muss. Das Aussehen dagegen steht bewusst *nicht*
   hier drin - sonst wuerden die neun Karten einander im
   Detail aehnlich, und genau das sollen sie nicht.

   Angesprochen wird alles ueber data-Attribute. Eine Karte,
   die einen Baustein nicht hat, laesst ihn einfach weg; der
   Kern sucht, findet nichts und schweigt.
   ========================================================= */
window.Kern = (() => {
  'use strict';

  /* Als Allererstes, noch vor jeder Rechnung: die Seite weiss ab
     jetzt, dass ein Skript laeuft. Alles, was etwas versteckt und
     spaeter wieder hervorholt, haengt daran - laedt dieses Skript
     nicht, bleibt die Karte vollstaendig sichtbar statt leer.
     Unsichtbarer Text darf nie der Ruhezustand sein. */
  document.documentElement.setAttribute('data-js', '');

  const $  = (w, e = document) => e.querySelector(w);
  const $$ = (w, e = document) => [...e.querySelectorAll(w)];
  const sanft = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ?offen in der Adresse laesst den Auftakt aus. Gedacht fuer
     Vorschaubilder und zum Pruefen - sonst muesste jede Aufnahme
     neun Sekunden auf den Notausgang warten. Fuer Gaeste aendert
     sich nichts: ohne den Zusatz laeuft alles wie gebaut. */
  const sofort = /(^|[?&])offen(=|&|$)/.test(location.search);

  const zwei = n => String(n).padStart(2, '0');

  /* =========================================================
     1. AUFTRITT
     Abschnitte blenden ein, wenn sie ins Bild kommen.

     Mit Notausgang: der Beobachter meldet sich nicht, solange
     die Seite in einem Hintergrundreiter liegt. Wer dann
     zurueckkommt, saehe eine leere Seite. Nach 1,8 Sekunden
     steht deshalb alles da, auch ohne Auftritt. Der Auftritt
     ist Zierrat, der Inhalt nicht.
     ========================================================= */
  function auftritt() {
    const teile = $$('[data-auftritt]');
    if (!teile.length) return;

    const zeigen = el => el.classList.add('da');
    /* Wer Bewegung reduziert hat, bekommt die Karte vollstaendig und
       ruhig. Dasselbe gilt fuer die Vorschau-Adresse: ?offen soll die
       ganze Karte zeigen, nicht eine, die erst beim Scrollen entsteht. */
    if (sanft || sofort || !('IntersectionObserver' in window)) {
      teile.forEach(zeigen);
      return;
    }

    /* Kinder mit data-folge treten gestaffelt auf. Die Verzoegerung
       steht als eigene Variable im CSS, damit jede Karte selbst
       entscheidet, wie weit sie die Staffel auseinanderzieht. */
    teile.forEach(el => {
      const folge = $$('[data-folge]', el);
      folge.forEach((k, i) => k.style.setProperty('--folge', i));
    });

    let gemeldet = false;
    const beobachter = new IntersectionObserver((eintraege, selbst) => {
      gemeldet = true;
      for (const e of eintraege) {
        if (!e.isIntersecting) continue;
        zeigen(e.target);
        selbst.unobserve(e.target);          // einmal reicht
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    teile.forEach(el => beobachter.observe(el));

    /* Die Sicherung greift nur, wenn sich der Beobachter ueberhaupt
       nicht gemeldet hat. Ohne diese Bedingung stuende nach 1,8
       Sekunden die ganze Seite offen da - und der Auftritt waere
       kein Auftritt mehr, sondern ein Blitz beim Laden. */
    const alleZeigen = () => { if (!gemeldet) teile.forEach(zeigen); };
    setTimeout(alleZeigen, 1800);
    addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !gemeldet) {
        setTimeout(alleZeigen, 600);
      }
    });
  }

  /* =========================================================
     2. FORTSCHRITT UND PARALLAXE
     Beides haengt am Bildlauf, also auch am selben Takt.
     ========================================================= */
  function bewegung() {
    const linie  = $('[data-fortschritt]');
    const bilder = $$('[data-px]');
    if (!linie && !bilder.length) return;
    if (sanft) return;

    /* Wo der Browser scrollgetriebene Animationen kann, haengt die
       Fortschrittslinie direkt am Bildlauf - ohne Skript, ohne Takt.
       Dann uebernimmt das CSS und wir ruehren sie hier nicht an. */
    const csSelbst = CSS.supports?.('animation-timeline: scroll()');
    if (linie && csSelbst) linie.dataset.selbst = '';

    /* Die Wege werden auf schmalen Schirmen gekuerzt: dort sind die
       Bilder knapper aufgeloest, und jeder Prozentpunkt Ueberstand
       kostet Schaerfe. */
    const kurz = innerWidth < 700 ? 0.62 : 1;
    bilder.forEach(b => {
      const weg = parseFloat(b.dataset.px) * kurz;
      b.style.setProperty('--px-weg', weg + '%');
    });

    let laeuft = false;
    const rechnen = () => {
      laeuft = false;

      if (linie && !csSelbst) {
        const hoehe = document.documentElement.scrollHeight - innerHeight;
        linie.style.setProperty('--fort', hoehe > 0 ? scrollY / hoehe : 0);
      }

      for (const b of bilder) {
        const r = b.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) continue;
        // -1 wenn der Rahmen gerade unten hereinkommt, +1 wenn er
        // oben herausgeht. Weg und Ueberstand kommen zwingend aus
        // derselben Zahl, sonst klafft am Rand eine Luecke.
        const mitte = (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2 + r.height / 2);
        const wert = Math.max(-1, Math.min(1, mitte)).toFixed(4);
        if (b.dataset.pxWert !== wert) {
          b.dataset.pxWert = wert;
          b.style.setProperty('--px', wert);
        }
      }
    };

    const takt = () => { if (!laeuft) { laeuft = true; requestAnimationFrame(rechnen); } };
    addEventListener('scroll', takt, { passive: true });
    addEventListener('resize', takt, { passive: true });
    rechnen();
  }

  /* =========================================================
     3. COUNTDOWN
     ========================================================= */
  function countdown(daten) {
    const felder = {
      tage:     $$('[data-zaehler="tage"]'),
      stunden:  $$('[data-zaehler="stunden"]'),
      minuten:  $$('[data-zaehler="minuten"]'),
      sekunden: $$('[data-zaehler="sekunden"]'),
    };
    if (!Object.values(felder).some(l => l.length)) return;

    const ziel = new Date(daten.beginnISO).getTime();
    const vorbei = $('[data-countdown-vorbei]');

    function setzen(liste, wert) {
      for (const el of liste) {
        if (el.textContent === wert) continue;
        el.textContent = wert;
        // Kurz eine Klasse setzen, damit jede Karte den Wechsel
        // selbst gestalten kann - rollen, kippen oder gar nicht.
        el.classList.remove('rollt');
        void el.offsetWidth;                 // Neustart erzwingen
        if (!sanft) el.classList.add('rollt');
      }
    }

    function tick() {
      const rest = ziel - Date.now();
      if (rest <= 0) {
        setzen(felder.tage, '0'); setzen(felder.stunden, '00');
        setzen(felder.minuten, '00'); setzen(felder.sekunden, '00');
        if (vorbei) vorbei.hidden = false;
        return;
      }
      const s = Math.floor(rest / 1000);
      setzen(felder.tage,     String(Math.floor(s / 86400)));
      setzen(felder.stunden,  zwei(Math.floor(s / 3600) % 24));
      setzen(felder.minuten,  zwei(Math.floor(s / 60) % 60));
      setzen(felder.sekunden, zwei(s % 60));
      setTimeout(tick, 1000 - (Date.now() % 1000));
    }
    tick();
  }

  /* =========================================================
     4. KALENDERDATEI
     Entsteht im Browser, ohne Server.
     ========================================================= */
  function kalender(daten) {
    const knoepfe = $$('[data-kalender]');
    if (!knoepfe.length) return;

    const zeit = iso => iso.replace(/[-:]/g, '').replace(/\.\d+/, '');
    const frei = t => String(t).replace(/([,;\\])/g, '\\$1').replace(/\r?\n/g, '\\n');

    /* iCalendar erlaubt 75 Oktett je Zeile. Laengere Zeilen werden
       umgebrochen und mit einem Leerzeichen fortgesetzt; ohne das
       verweigern strenge Kalender die ganze Datei. */
    function falten(zeile) {
      const bytes = new TextEncoder().encode(zeile);
      if (bytes.length <= 75) return zeile;
      const teile = [];
      let stueck = '', laenge = 0;
      for (const zeichen of zeile) {
        const n = new TextEncoder().encode(zeichen).length;
        if (laenge + n > (teile.length ? 74 : 75)) {
          teile.push(stueck); stueck = ''; laenge = 0;
        }
        stueck += zeichen; laenge += n;
      }
      teile.push(stueck);
      return teile.join('\r\n ');
    }

    function datei() {
      const jetzt = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//JP Webstudio//Digitale Hochzeitskarte//DE',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        'UID:' + daten.beginnISO.slice(0, 10) + '-' + daten.kennung + '@einladung',
        'DTSTAMP:' + jetzt,
        'DTSTART:' + zeit(daten.beginnISO),
        'DTEND:'   + zeit(daten.endeISO),
        'SUMMARY:' + frei(daten.anlass),
        'LOCATION:' + frei(daten.ort),
        'DESCRIPTION:' + frei(daten.kalendertext || 'Wir freuen uns auf euch.'),
        'END:VEVENT',
        'END:VCALENDAR',
      ].map(falten).join('\r\n');

      const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = daten.kennung + '.ics';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    knoepfe.forEach(k => k.addEventListener('click', datei));
  }

  /* =========================================================
     5. DER WEG DORTHIN
     Verlinkt, nicht eingebettet: eine Karte im Rahmen laedt
     schon beim Oeffnen der Seite Daten zum Anbieter, ein Link
     erst, wenn jemand ihn antippt.
     ========================================================= */
  function route(daten) {
    const ziel = encodeURIComponent(daten.ort);
    for (const a of $$('[data-route="google"]')) {
      a.href = 'https://www.google.com/maps/search/?api=1&query=' + ziel;
      a.rel = 'noopener'; a.target = '_blank';
    }
    for (const a of $$('[data-route="apple"]')) {
      a.href = 'https://maps.apple.com/?q=' + ziel;
      a.rel = 'noopener'; a.target = '_blank';
    }

    /* Wer ein iPhone hat, will Apple Karten; alle anderen Google.
       Auf einem Apple-Geraet wandert Apple deshalb nach vorn. */
    const apfel = /iPhone|iPad|iPod|Macintosh/.test(navigator.platform || navigator.userAgent);
    if (!apfel) return;
    for (const a of $$('[data-route="apple"]')) {
      const gruppe = a.parentElement;
      if (gruppe && gruppe.firstElementChild !== a) gruppe.prepend(a);
    }
  }

  /* =========================================================
     6. RUECKMELDUNG
     Ohne Server. Damit die Antwort trotzdem ankommt, setzt das
     Formular eine fertige E-Mail auf - das ist der einzige Weg,
     der auf einer rein statischen Seite wirklich funktioniert,
     statt so zu tun als ob.
     ========================================================= */
  function rueckmeldung(daten) {
    const form = $('[data-rueckmeldung]');
    if (!form) return;

    const liste  = $('[data-begleitung]', form);
    const mehr   = $('[data-begleitung-mehr]', form);
    const danke  = $('[data-danke]');
    const zahl   = $('[data-begleitung-zahl]', form);
    const speisen = daten.speisen || [];

    let laufend = 0;
    function zeileBauen() {
      const i = ++laufend;
      const zeile = document.createElement('div');
      zeile.className = 'begleitung-zeile';
      zeile.innerHTML =
        '<label class="feld">' +
          '<span class="feld-name">Name der Begleitung</span>' +
          '<input type="text" name="begleitung' + i + '" autocomplete="off" required>' +
        '</label>' +
        (speisen.length
          ? '<label class="feld">' +
              '<span class="feld-name">Essen</span>' +
              '<select name="essen' + i + '" required>' +
                '<option value="">Bitte wählen</option>' +
                speisen.map(s => '<option>' + s + '</option>').join('') +
              '</select>' +
            '</label>'
          : '') +
        '<button type="button" class="begleitung-weg" aria-label="Diese Begleitung entfernen">Entfernen</button>';
      zeile.querySelector('.begleitung-weg').addEventListener('click', () => {
        zeile.remove(); zaehlen();
      });
      liste.appendChild(zeile);
      zeile.querySelector('input').focus();
      zaehlen();
    }

    function zaehlen() {
      const n = liste ? liste.children.length : 0;
      if (zahl) zahl.textContent = n === 0 ? 'nur ich' : (n === 1 ? 'ich und eine Begleitung' : 'ich und ' + n + ' Begleitungen');
      if (mehr) mehr.disabled = n >= (daten.begleitungMax || 6);
    }

    if (mehr) mehr.addEventListener('click', zeileBauen);
    zaehlen();

    /* Bei einer Absage sind Begleitung, Essen und Allergien gegen-
       standslos. Sie stehenzulassen ist keine Hoeflichkeit, sondern
       eine Frage, die niemand beantworten will. */
    const nurBeiZusage = $$('[data-nur-zusage]', form);
    function umschalten() {
      const zu = form.elements.antwort && form.elements.antwort.value === 'zusage';
      for (const t of nurBeiZusage) {
        t.hidden = !zu;
        for (const f of $$('input,select,textarea', t)) f.disabled = !zu;
      }
    }
    $$('input[name="antwort"]', form).forEach(r => r.addEventListener('change', umschalten));
    umschalten();

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const d = new FormData(form);
      const zeilen = ['Rückmeldung zur Einladung von ' + daten.namen, ''];
      zeilen.push('Name: ' + (d.get('name') || ''));
      zeilen.push('E-Mail: ' + (d.get('email') || ''));
      zeilen.push('Antwort: ' + (d.get('antwort') === 'zusage' ? 'Ich komme gern' : 'Ich kann leider nicht'));
      if (d.get('antwort') === 'zusage') {
        if (d.get('essen0')) zeilen.push('Essen: ' + d.get('essen0'));
        for (let i = 1; i <= laufend; i++) {
          if (!d.get('begleitung' + i)) continue;
          zeilen.push('Begleitung: ' + d.get('begleitung' + i) +
                      (d.get('essen' + i) ? ' — ' + d.get('essen' + i) : ''));
        }
        if (d.get('allergien')) zeilen.push('Allergien: ' + d.get('allergien'));
      }
      if (d.get('gruss')) zeilen.push('', 'Gruß: ' + d.get('gruss'));

      const betreff = 'Rückmeldung — ' + daten.namen + ' — ' + (d.get('name') || '');
      const post = 'mailto:' + daten.email +
                   '?subject=' + encodeURIComponent(betreff) +
                   '&body=' + encodeURIComponent(zeilen.join('\n'));

      if (danke) {
        $('[data-danke-name]', danke) && ($('[data-danke-name]', danke).textContent = d.get('name') || '');
        const post_ = $('[data-danke-post]', danke);
        if (post_) post_.href = post;
        danke.hidden = false;
        form.hidden = true;
        danke.scrollIntoView({ behavior: sanft ? 'auto' : 'smooth', block: 'center' });
      }
      location.href = post;
    });
  }

  /* =========================================================
     7. GESCHENKE
     Die Bankverbindung steht nicht offen auf der Seite. Nicht
     aus Geheimniskraemerei - sie ist einfach das Letzte, was
     jemand beim Oeffnen einer Einladung sehen soll.
     ========================================================= */
  function geschenke(daten) {
    const knopf = $('[data-iban-zeigen]');
    const feld  = $('[data-iban]');
    if (!knopf || !feld) return;

    knopf.addEventListener('click', () => {
      feld.hidden = false;
      knopf.hidden = true;
    });

    const kopie = $('[data-iban-kopieren]');
    if (!kopie || !navigator.clipboard) { kopie && (kopie.hidden = true); return; }
    kopie.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText((daten.iban || '').replace(/\s+/g, ''));
        const alt = kopie.textContent;
        kopie.textContent = 'Kopiert';
        setTimeout(() => { kopie.textContent = alt; }, 2000);
      } catch { /* Verweigert der Browser, bleibt die IBAN ja lesbar. */ }
    });
  }

  /* =========================================================
     8. FRAGEN
     <details> kann das von Haus aus. Animiert wird nur die
     Hoehe des Inhalts, und zwar ueber grid-template-rows -
     auf 'height: auto' laesst sich kein Uebergang legen.
     ========================================================= */
  function fragen() {
    for (const d of $$('[data-frage]')) {
      const knopf = d.querySelector('summary');
      if (!knopf) continue;
      // Immer nur eine offen: zwei aufgeklappte Antworten
      // nebeneinander liest ohnehin niemand.
      d.addEventListener('toggle', () => {
        if (!d.open) return;
        for (const andere of $$('[data-frage]')) {
          if (andere !== d) andere.open = false;
        }
      });
    }
  }

  /* =========================================================
     9. MUSIK
     Startet nie von allein - vorher laesst kein Browser Ton zu,
     und selbst wenn er es liesse, waere es die falsche
     Entscheidung. Die Wahl wird gemerkt.
     ========================================================= */
  function musik(daten) {
    const knopf = $('[data-musik]');
    if (!knopf) return;
    if (!daten.musik) { knopf.hidden = true; return; }

    const ton = new Audio(daten.musik);
    ton.loop = true; ton.preload = 'none'; ton.volume = 0;
    let laeuft = false, blende = null;

    function ueberblenden(nach, fertig) {
      clearInterval(blende);
      const von = ton.volume, schritte = 24;
      let i = 0;
      blende = setInterval(() => {
        i++;
        ton.volume = Math.max(0, Math.min(1, von + (nach - von) * i / schritte));
        if (i >= schritte) { clearInterval(blende); fertig && fertig(); }
      }, 40);
    }

    function an() {
      ton.play().then(() => {
        laeuft = true;
        knopf.setAttribute('aria-pressed', 'true');
        knopf.dataset.an = '';
        ueberblenden(daten.musikLaut ?? 0.45);
        try { localStorage.setItem('musik-' + daten.kennung, 'an'); } catch {}
      }).catch(() => { /* Der Browser darf nein sagen. */ });
    }
    function aus() {
      laeuft = false;
      knopf.setAttribute('aria-pressed', 'false');
      delete knopf.dataset.an;
      ueberblenden(0, () => ton.pause());
      try { localStorage.setItem('musik-' + daten.kennung, 'aus'); } catch {}
    }

    knopf.addEventListener('click', () => laeuft ? aus() : an());

    // Nach dem Auftakt anbieten - aber nur, wenn der Gast sie beim
    // letzten Mal auch anhatte.
    Kern.musikStarten = () => {
      let gemerkt = null;
      try { gemerkt = localStorage.getItem('musik-' + daten.kennung); } catch {}
      if (gemerkt !== 'aus') an();
    };
  }

  /* =========================================================
     10. START
     ========================================================= */
  function start(daten) {
    // Ort und Adresse stehen getrennt und werden an genau einer
    // Stelle verkettet - sonst steht der Name zweimal im Routenziel.
    daten.ort = daten.ortName + ', ' + daten.adresse;

    auftritt();
    bewegung();
    countdown(daten);
    kalender(daten);
    route(daten);
    rueckmeldung(daten);
    geschenke(daten);
    fragen();
    musik(daten);

    document.documentElement.dataset.bereit = '';
  }

  return { start, sanft, sofort, $, $$, zwei, musikStarten: () => {} };
})();
