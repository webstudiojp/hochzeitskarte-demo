/* =========================================================
   VORLAGE — das Verhalten

   Ein Skript fuer alle neun Karten. Es rendert nichts: der
   Inhalt steht fertig im HTML, erzeugt von bin/vorlagen-bauen.py.
   Hier steht nur, was sich bewegt und was auf Eingaben
   antwortet.

   Angesprochen wird alles ueber data-Attribute, damit eine
   Karte einen Baustein weglassen kann, ohne dass hier etwas
   angefasst werden muss.
   ========================================================= */
(() => {
  'use strict';

  const $  = (w, e = document) => e.querySelector(w);
  const $$ = (w, e = document) => [...e.querySelectorAll(w)];
  const sanft = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sofort = /(^|[?&])offen(=|&|$)/.test(location.search);
  const zwei = n => String(n).padStart(2, '0');

  /* Sofort, noch vor jeder Rechnung: die Seite weiss ab jetzt,
     dass ein Skript laeuft. Alles, was etwas versteckt und
     spaeter hervorholt, haengt daran. */
  document.documentElement.setAttribute('data-js', '');

  const DATEN = window.KARTE || {};

  /* =========================================================
     1. DER UMSCHLAG

     Er wird bei *jedem* Aufruf gezeigt. Frueher hat er sich in
     sessionStorage gemerkt, dass er schon offen war - dann kam
     er beim Neuladen nicht wieder, und wer die Karte jemandem
     zeigen wollte, stand vor der offenen Szene. Ein Vorspann,
     der manchmal da ist und manchmal nicht, ist schlimmer als
     gar keiner.

     Geoeffnet wird er von jeder Absicht weiterzukommen: das
     Siegel druecken, Enter, oder der Versuch zu scrollen. Wer
     nicht ahnt, dass hier gedrueckt werden will, wischt - und
     genau das gilt hier als Antwort.
     ========================================================= */
  function umschlag() {
    const feld = $('[data-umschlag]');
    if (!feld) return;

    /* Nur die Vorschau-Adresse laesst ihn aus. Wer Bewegung
       reduziert hat, bekommt ihn ebenfalls - nur ohne den
       Lichtschein. Ihn dort ganz wegzulassen war falsch: die
       Einstellung heisst "weniger Bewegung", nicht "weniger
       Karte". */
    if (sofort) { feld.remove(); return; }

    let weg = false;
    const oeffnen = () => {
      if (weg) return;
      weg = true;
      feld.setAttribute('data-weg', '');
      document.documentElement.removeAttribute('data-zu');
      setTimeout(() => feld.remove(), 1300);
      ton.anbieten();
    };

    document.documentElement.setAttribute('data-zu', '');

    /* Gedrueckt wird auf pointerdown, aufgebrochen erst auf
       pointerup. Dazwischen liegt der Moment, in dem das Wachs
       nachgibt - ohne ihn waere es ein Knopf. */
    let gedrueckt = false;
    feld.addEventListener('pointerdown', e => {
      gedrueckt = true;
      feld.setPointerCapture?.(e.pointerId);
      feld.setAttribute('data-druck', '');
    });
    feld.addEventListener('pointerup', () => {
      if (!gedrueckt) return;
      gedrueckt = false;
      feld.removeAttribute('data-druck');
      oeffnen();
    });
    feld.addEventListener('pointercancel', () => {
      gedrueckt = false;
      feld.removeAttribute('data-druck');
    });
    /* Wegziehen bricht den Druck nur mit der Maus ab. Auf dem
       Telefon wandert der Finger beim Tippen fast immer ein
       paar Punkte - vorher hat das den Tipp verschluckt, und
       das Siegel reagierte scheinbar zufaellig nicht. */
    feld.addEventListener('pointerleave', e => {
      if (e.pointerType !== 'mouse') return;
      gedrueckt = false;
      feld.removeAttribute('data-druck');
    });
    // Falls ein Browser die Zeigerereignisse verschluckt.
    feld.addEventListener('click', () => oeffnen());

    feld.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      feld.setAttribute('data-druck', '');
      setTimeout(() => { feld.removeAttribute('data-druck'); oeffnen(); }, 180);
    });

    /* Der Versuch zu scrollen zaehlt als Antwort. Die Seite ist
       gesperrt, solange der Umschlag liegt - wer trotzdem
       wischt, will weiter. */
    const wischen = () => oeffnen();
    addEventListener('wheel', wischen, { passive: true, once: true });
    feld.addEventListener('touchmove', wischen, { passive: true });

    /* Ganz zuletzt eine lange Reissleine: sollte weder Tippen
       noch Wischen ankommen, geht er nach fuenfundvierzig
       Sekunden von allein auf. Frueher waren es neun - so kurz,
       dass er sich beim Hinsehen von selbst geoeffnet hat. */
    setTimeout(oeffnen, 45000);
  }

  /* =========================================================
     2. AUFTRITT
     Derselbe Auftritt wie in den Vorbildern: zwanzig Punkt von
     unten, achthundert Millisekunden. Die Sicherung greift nur,
     wenn sich der Beobachter gar nicht meldet - sonst stuende
     nach zwei Sekunden die ganze Seite offen da.
     ========================================================= */
  function auftritt() {
    const teile = $$('[data-auftritt]');
    if (!teile.length) return;
    const zeigen = el => el.classList.add('auftritt');
    if (sanft || sofort || !('IntersectionObserver' in window)) {
      teile.forEach(zeigen); return;
    }
    let gemeldet = false;
    const b = new IntersectionObserver((eintraege, selbst) => {
      gemeldet = true;
      for (const e of eintraege) {
        if (!e.isIntersecting) continue;
        zeigen(e.target); selbst.unobserve(e.target);
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    teile.forEach(el => b.observe(el));
    const alle = () => { if (!gemeldet) teile.forEach(zeigen); };
    setTimeout(alle, 1800);
    addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !gemeldet) setTimeout(alle, 600);
    });
  }

  /* =========================================================
     3. COUNTDOWN
     ========================================================= */
  function countdown() {
    const felder = {
      tage: $$('[data-zaehler="tage"]'), stunden: $$('[data-zaehler="stunden"]'),
      minuten: $$('[data-zaehler="minuten"]'), sekunden: $$('[data-zaehler="sekunden"]'),
    };
    if (!Object.values(felder).some(l => l.length) || !DATEN.beginnISO) return;
    const ziel = new Date(DATEN.beginnISO).getTime();
    const vorbei = $('[data-countdown-vorbei]');
    const setz = (liste, wert) => liste.forEach(el => {
      if (el.textContent === wert) return;
      el.textContent = wert;
      // Neustart erzwingen: ohne das laeuft der Ablauf beim
      // zweiten Wechsel derselben Ziffer nicht noch einmal.
      el.classList.remove('rollt');
      void el.offsetWidth;
      if (!sanft) el.classList.add('rollt');
    });
    (function tick() {
      const rest = ziel - Date.now();
      if (rest <= 0) {
        setz(felder.tage, '0'); setz(felder.stunden, '00');
        setz(felder.minuten, '00'); setz(felder.sekunden, '00');
        if (vorbei) vorbei.hidden = false; return;
      }
      const s = Math.floor(rest / 1000);
      setz(felder.tage, String(Math.floor(s / 86400)));
      setz(felder.stunden, zwei(Math.floor(s / 3600) % 24));
      setz(felder.minuten, zwei(Math.floor(s / 60) % 60));
      setz(felder.sekunden, zwei(s % 60));
      setTimeout(tick, 1000 - (Date.now() % 1000));
    })();
  }

  /* =========================================================
     4. KALENDER UND WEG
     Die Kalenderdatei entsteht im Browser. iCalendar erlaubt
     75 Oktett je Zeile; laengere werden umgebrochen, sonst
     verweigern strenge Kalender die ganze Datei.
     ========================================================= */
  function kalenderUndWeg() {
    const ziel = encodeURIComponent(DATEN.ort || '');
    $$('[data-route="google"]').forEach(a => {
      a.href = 'https://www.google.com/maps/search/?api=1&query=' + ziel;
      a.rel = 'noopener'; a.target = '_blank';
    });
    $$('[data-route="apple"]').forEach(a => {
      a.href = 'https://maps.apple.com/?q=' + ziel;
      a.rel = 'noopener'; a.target = '_blank';
    });
    // Wer ein iPhone hat, will Apple Karten; alle anderen Google.
    if (/iPhone|iPad|iPod|Macintosh/.test(navigator.platform || navigator.userAgent)) {
      $$('[data-route="apple"]').forEach(a => {
        const g = a.parentElement;
        if (g && g.firstElementChild !== a) g.prepend(a);
      });
    }

    const knoepfe = $$('[data-kalender]');
    if (!knoepfe.length || !DATEN.beginnISO) return;
    const zeit = iso => iso.replace(/[-:]/g, '').replace(/\.\d+/, '');
    const frei = t => String(t).replace(/([,;\\])/g, '\\$1').replace(/\r?\n/g, '\\n');
    function falten(zeile) {
      const kod = new TextEncoder();
      if (kod.encode(zeile).length <= 75) return zeile;
      const teile = []; let stueck = '', laenge = 0;
      for (const z of zeile) {
        const n = kod.encode(z).length;
        if (laenge + n > (teile.length ? 74 : 75)) { teile.push(stueck); stueck = ''; laenge = 0; }
        stueck += z; laenge += n;
      }
      teile.push(stueck);
      return teile.join('\r\n ');
    }
    knoepfe.forEach(k => k.addEventListener('click', () => {
      const jetzt = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
      const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0',
        'PRODID:-//JP Webstudio//Digitale Hochzeitskarte//DE', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
        'UID:' + DATEN.beginnISO.slice(0, 10) + '-' + DATEN.kennung + '@einladung',
        'DTSTAMP:' + jetzt, 'DTSTART:' + zeit(DATEN.beginnISO), 'DTEND:' + zeit(DATEN.endeISO),
        'SUMMARY:' + frei(DATEN.anlass), 'LOCATION:' + frei(DATEN.ort),
        'DESCRIPTION:' + frei(DATEN.kalendertext || ''), 'END:VEVENT', 'END:VCALENDAR',
      ].map(falten).join('\r\n');
      const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
      const a = document.createElement('a');
      a.href = url; a.download = DATEN.kennung + '.ics';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }));
  }

  /* =========================================================
     5. RUECKMELDUNG
     Ohne Server. Damit die Antwort trotzdem ankommt, setzt das
     Formular eine fertige E-Mail auf.
     ========================================================= */
  function rueckmeldung() {
    const form = $('[data-rsvp]');
    if (!form) return;
    const liste = $('[data-begleiter]', form);
    const mehr  = $('[data-begleiter-mehr]', form);
    const danke = $('[data-danke]');
    const speisen = DATEN.speisen || [];
    let lauf = 0;

    function zeile() {
      const i = ++lauf;
      const z = document.createElement('div');
      z.className = 'begleiter-zeile';
      z.innerHTML =
        '<label class="feld"><span>Name der Begleitung</span>' +
        '<input type="text" name="begleitung' + i + '" required></label>' +
        (speisen.length ? '<label class="feld"><span>Essen</span><select name="essen' + i + '" required>' +
          '<option value="">Bitte wählen</option>' +
          speisen.map(s => '<option>' + s + '</option>').join('') + '</select></label>' : '') +
        '<button type="button" class="weg">Entfernen</button>';
      $('.weg', z).addEventListener('click', () => { z.remove(); zaehlen(); });
      liste.appendChild(z);
      $('input', z).focus();
      zaehlen();
    }
    function zaehlen() {
      if (mehr) mehr.disabled = liste.children.length >= (DATEN.begleiterMax || 6);
    }
    if (mehr) mehr.addEventListener('click', zeile);
    zaehlen();

    /* Bei einer Absage sind Begleitung, Essen und Allergien
       gegenstandslos. Die Felder werden dabei abgeschaltet,
       sonst blockiert ihr required das Abschicken. */
    const nurZusage = $$('[data-nur-zusage]', form);
    function umschalten() {
      const ja = form.elements.antwort && form.elements.antwort.value === 'zusage';
      nurZusage.forEach(t => {
        t.hidden = !ja;
        $$('input,select,textarea', t).forEach(f => { f.disabled = !ja; });
      });
    }
    $$('input[name="antwort"]', form).forEach(r => r.addEventListener('change', umschalten));
    umschalten();

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const d = new FormData(form);
      const z = ['Rückmeldung zur Einladung von ' + DATEN.namen, '',
        'Name: ' + (d.get('name') || ''), 'E-Mail: ' + (d.get('email') || ''),
        'Antwort: ' + (d.get('antwort') === 'zusage' ? 'Kommt gern' : 'Kann leider nicht')];
      if (d.get('antwort') === 'zusage') {
        if (d.get('essen0')) z.push('Essen: ' + d.get('essen0'));
        for (let i = 1; i <= lauf; i++) {
          if (!d.get('begleitung' + i)) continue;
          z.push('Begleitung: ' + d.get('begleitung' + i) +
                 (d.get('essen' + i) ? ' — ' + d.get('essen' + i) : ''));
        }
        if (d.get('allergien')) z.push('Allergien: ' + d.get('allergien'));
      }
      if (d.get('gruss')) z.push('', 'Gruß: ' + d.get('gruss'));
      const post = 'mailto:' + DATEN.email +
        '?subject=' + encodeURIComponent('Rückmeldung — ' + DATEN.namen + ' — ' + (d.get('name') || '')) +
        '&body=' + encodeURIComponent(z.join('\n'));
      if (danke) {
        const n = $('[data-danke-name]', danke); if (n) n.textContent = d.get('name') || '';
        const p = $('[data-danke-post]', danke); if (p) p.href = post;
        danke.hidden = false; form.hidden = true;
        danke.scrollIntoView({ behavior: sanft ? 'auto' : 'smooth', block: 'center' });
      }
      location.href = post;
    });
  }

  /* =========================================================
     6. GESCHENKE UND FRAGEN
     ========================================================= */
  function kleinkram() {
    const zeigen = $('[data-iban-zeigen]'), feld = $('[data-iban]');
    if (zeigen && feld) zeigen.addEventListener('click', () => { feld.hidden = false; zeigen.hidden = true; });
    const kopie = $('[data-iban-kopieren]');
    if (kopie && navigator.clipboard) {
      kopie.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText((DATEN.iban || '').replace(/\s+/g, ''));
          const alt = kopie.textContent; kopie.textContent = 'Kopiert';
          setTimeout(() => { kopie.textContent = alt; }, 2000);
        } catch {}
      });
    } else if (kopie) kopie.hidden = true;

    // Immer nur eine Frage offen.
    $$('[data-frage]').forEach(d => d.addEventListener('toggle', () => {
      if (!d.open) return;
      $$('[data-frage]').forEach(a => { if (a !== d) a.open = false; });
    }));
  }

  /* =========================================================
     7. TON
     Startet nie von allein - vorher laesst kein Browser Ton zu.
     ========================================================= */
  const ton = (() => {
    const knopf = $('[data-ton]');
    let klang = null, laeuft = false;
    if (!knopf) return { anbieten() {} };
    if (!DATEN.musik) { knopf.hidden = true; return { anbieten() {} }; }

    klang = new Audio(DATEN.musik);
    klang.loop = true; klang.preload = 'none'; klang.volume = 0;
    let blende = null;
    const ueber = (nach, fertig) => {
      clearInterval(blende);
      const von = klang.volume; let i = 0;
      blende = setInterval(() => {
        i++; klang.volume = Math.max(0, Math.min(1, von + (nach - von) * i / 24));
        if (i >= 24) { clearInterval(blende); fertig && fertig(); }
      }, 40);
    };
    const an = () => klang.play().then(() => {
      laeuft = true; knopf.setAttribute('aria-pressed', 'true'); knopf.dataset.an = '';
      ueber(DATEN.musikLaut ?? .4);
      try { localStorage.setItem('ton-' + DATEN.kennung, 'an'); } catch {}
    }).catch(() => {});
    const aus = () => {
      laeuft = false; knopf.setAttribute('aria-pressed', 'false'); delete knopf.dataset.an;
      ueber(0, () => klang.pause());
      try { localStorage.setItem('ton-' + DATEN.kennung, 'aus'); } catch {}
    };
    knopf.addEventListener('click', () => laeuft ? aus() : an());
    return { anbieten() {
      let gemerkt = null;
      try { gemerkt = localStorage.getItem('ton-' + DATEN.kennung); } catch {}
      if (gemerkt !== 'aus') an();
    } };
  })();

  /* =========================================================
     8. WAS UEBER DER SZENE TREIBT
     Blueten, Funken oder Dunst - je nach Karte. Erzeugt statt
     gezeichnet, weil jedes Stueck seinen eigenen Weg, sein
     eigenes Tempo und seinen eigenen Einsatz braucht. Im
     Gleichschritt sieht man ihnen sofort an, dass sie gerechnet
     sind.
     ========================================================= */
  function flug() {
    const art = DATEN.flug;
    if (!art || sanft) return;
    const buehne = $('.auftakt');
    if (!buehne) return;

    // Auf schmalen Schirmen weniger Stuecke: jedes ist eine
    // eigene Ebene, und davon vertraegt ein Telefon nicht beliebig
    // viele.
    const eng = innerWidth < 600;
    const ZAHL = { blatt: eng ? 14 : 22, korn: eng ? 16 : 26, dunst: eng ? 5 : 8 }[art.form] || 14;

    const feld = document.createElement('div');
    feld.className = 'flug';
    feld.setAttribute('aria-hidden', 'true');

    let s = '';
    for (let i = 0; i < ZAHL; i++) {
      const t = art.toene[(Math.random() * art.toene.length) | 0];
      s += '<i class="' + art.form + '" style="' +
           'left:' + (Math.random() * 104 - 2).toFixed(1) + '%;' +
           '--gross:' + (art.gross[0] + Math.random() * (art.gross[1] - art.gross[0])).toFixed(1) + 'px;' +
           '--ton:' + t + ';' +
           '--wehen:' + ((Math.random() - .5) * art.wehen).toFixed(0) + 'px;' +
           '--klar:' + (art.klar[0] + Math.random() * (art.klar[1] - art.klar[0])).toFixed(2) + ';' +
           '--dauer:' + (art.dauer[0] + Math.random() * (art.dauer[1] - art.dauer[0])).toFixed(1) + 's;' +
           // Negativer Einsatz: die Stuecke sind schon unterwegs,
           // wenn die Seite aufgeht, statt gemeinsam loszufliegen.
           '--start:-' + (Math.random() * art.dauer[1]).toFixed(1) + 's"></i>';
    }
    feld.innerHTML = s;
    buehne.appendChild(feld);

    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(e => {
      const drin = e[0].isIntersecting;
      feld.toggleAttribute('data-ruht', !drin);
      buehne.toggleAttribute('data-ruht', !drin);
      // Das Video ebenfalls: ein unsichtbarer Film ist reine
      // Rechenzeit.
      const film = $('.auftakt-szene video');
      if (film) drin ? film.play().catch(() => {}) : film.pause();
    }, { threshold: 0.02 }).observe(buehne);
  }

  /* =========================================================
     9. DER AUFTAKT ZIEHT NACH
     Die Szene wandert beim Scrollen langsamer als die Seite.
     --weg ist der Anteil, um den der Auftakt schon oben heraus
     ist; Bild, Schrift und Massstab haengen alle daran.
     ========================================================= */
  function nachziehen() {
    const buehne = $('.auftakt');
    if (!buehne || sanft) return;
    let wartet = false;
    const rechnen = () => {
      wartet = false;
      const h = buehne.offsetHeight || innerHeight;
      buehne.style.setProperty('--weg', Math.min(1, Math.max(0, scrollY / h)).toFixed(4));
    };
    addEventListener('scroll', () => {
      if (wartet) return;
      wartet = true;
      requestAnimationFrame(rechnen);
    }, { passive: true });
    addEventListener('resize', rechnen, { passive: true });
    rechnen();
  }

  umschlag();
  flug();
  nachziehen();
  auftritt();
  countdown();
  kalenderUndWeg();
  rueckmeldung();
  kleinkram();
  document.documentElement.setAttribute('data-bereit', '');
})();
