/* =========================================================
   STIL "FUNKE" — Ablauf der Seite
   Siegel aufbrechen, Auftakt, dann die Karte.

   Der Auftakt laeuft vollstaendig im Browser. Ein Video
   koennte den Riss nicht dorthin legen, wo gedrueckt wurde -
   und ein Paar mit anderen Namen braeuchte einen neuen Dreh
   statt einer geaenderten Zeile in DATEN.
   ========================================================= */
(() => {
  'use strict';

  const DATEN = {
    namen:      'Furkan & Dilara',
    beginnISO:  '2027-01-01T14:30:00',
    endeISO:    '2027-01-02T02:00:00',
    ortName:    'Schloss Benrath',
    adresse:    'Benrather Schloßallee 104, 40597 Düsseldorf',
    anlass:     'Save the Date · Furkan & Dilara',
  };
  // Vollstaendige Angabe fuer Kalender und Route - an einer Stelle
  // zusammengesetzt, damit der Name nicht zweimal im Ziel landet.
  DATEN.ort = DATEN.ortName + ', ' + DATEN.adresse;

  const $ = id => document.getElementById(id);
  const sanft = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     1. SIEGEL UND AUFTAKT
     Das Siegel ist kein Startknopf, sondern der Anfang der
     Geschichte: der Sprung waechst dort, wo der Finger liegt,
     das Wachs faellt weg, und aus dem Licht darin setzen sich
     die Namen zusammen.
     ========================================================= */
  const buehne = $('buehne');
  const siegel = $('siegel');
  const auftakt = $('auftakt');
  const staub = $('staub');
  const ueberspringen = $('ueberspringen');

  /* Beim zweiten Besuch in derselben Sitzung laeuft alles doppelt so
     schnell. Wer nur das Datum nachsieht, will keinen Film noch
     einmal sehen - eine Geste reicht dann. */
  let tempo = 1;
  try { if (sessionStorage.getItem('funke-auftakt')) tempo = .5; } catch {}

  const RISS_MS   = 800;   // bis das Wachs von allein bricht
  const SPRUNG_MS = 780;   // die Splitter fliegen
  const SAMMEL_MS = 1150;  // das Licht zieht sich zu den Namen
  const HALT_MS   = 700;   // die Namen stehen

  /* Der Auftakt haengt am Bildtakt, und der steht still, solange die
     Seite in einem Hintergrundreiter liegt. Wer dann zurueckkommt,
     saehe ein dunkles Bild. Nach dieser Frist gibt es die Karte auch
     ohne Auftakt: der Kniff ist huebsch, aber er darf niemanden
     aussperren. */
  const NOTAUS_MS = 9000;

  let zustand = 'zu';      // zu | riss | staub | fertig
  let rissLauf = 0, staubLauf = 0, notaus = null;

  /* Die Schrift der Namen wird spaeter Punkt fuer Punkt abgetastet.
     Ist sie dann noch nicht da, misst der Browser die Ersatzschrift
     und die Namen stehen im falschen Schnitt. */
  if (document.fonts) document.fonts.load('300 64px Cormorant').catch(() => {});

  /* ---------------------------------------------------------
     1a. Der Riss
     --------------------------------------------------------- */
  const rissGlut  = $('rissglut');
  const rissLinie = $('risslinie');
  const rissKern  = $('risskern');
  const glutPunkt = $('rissglut-punkt');

  let aeste = [], spur = null;
  let fortschritt = 0, gedrueckt = false, letzteZeit = 0;

  /* Das Siegel-SVG steht auf 0..200, der Finger auf Bildschirmpunkten. */
  function inSiegel(e) {
    const r = siegel.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) / r.width  * 200,
      y: (e.clientY - r.top)  / r.height * 200,
    };
  }

  /* Vier bis fuenf Aeste vom Beruehrungspunkt nach aussen, jeder mit
     eigenem Zickzack und eigenem Einsatz. Ein Riss laeuft nicht
     gerade, und zwei Risse laufen nie gleich - deshalb wird die Form
     bei jedem Druck neu gewuerfelt statt einmal gezeichnet. */
  function aesteBauen(px, py) {
    const liste = [];
    const zahl = 4 + Math.floor(Math.random() * 2);
    const dreh = Math.random() * Math.PI * 2;

    for (let i = 0; i < zahl; i++) {
      let w = dreh + i / zahl * Math.PI * 2 + (Math.random() - .5) * .7;
      let x = px, y = py;
      const punkte = [{ x, y }];
      for (let s = 0; s < 7; s++) {
        w += (Math.random() - .5) * .9;
        const laenge = 11 + Math.random() * 13;
        x += Math.cos(w) * laenge;
        y += Math.sin(w) * laenge;
        punkte.push({ x, y });
        if (Math.hypot(x - 100, y - 100) > 94) break;   // aus dem Wachs heraus
      }
      liste.push({ punkte, start: Math.random() * .16, spanne: .6 + Math.random() * .3 });

      // Eine Gabel pro Ast, ab der Mitte. Ohne sie sieht der Bruch
      // aus wie ein Stern, nicht wie gesprungenes Wachs.
      if (punkte.length > 3 && Math.random() < .72) {
        const ab = punkte[2 + Math.floor(Math.random() * (punkte.length - 3))];
        let gw = Math.atan2(ab.y - py, ab.x - px) +
                 (Math.random() < .5 ? -1 : 1) * (.5 + Math.random() * .55);
        let gx = ab.x, gy = ab.y;
        const gpunkte = [{ x: gx, y: gy }];
        for (let s = 0; s < 3; s++) {
          gw += (Math.random() - .5) * .8;
          const laenge = 8 + Math.random() * 9;
          gx += Math.cos(gw) * laenge;
          gy += Math.sin(gw) * laenge;
          gpunkte.push({ x: gx, y: gy });
        }
        liste.push({ punkte: gpunkte, start: .34 + Math.random() * .26, spanne: .4 + Math.random() * .3 });
      }
    }
    return liste;
  }

  /* Ein Ast wird nicht ueber `stroke-dasharray` aufgedeckt, sondern
     Stueck fuer Stueck gebaut: die Spur des Fingers waechst waehrend
     des Zeichnens weiter, und dafuer taugt keine feste Laenge. */
  const zahl1 = v => v.toFixed(1);
  function astPfad(ast, anteil) {
    const p = ast.punkte;
    if (anteil <= 0 || p.length < 2) return '';
    const ganz = (p.length - 1) * Math.min(anteil, 1);
    const voll = Math.floor(ganz);
    let d = 'M' + zahl1(p[0].x) + ' ' + zahl1(p[0].y);
    for (let i = 1; i <= Math.min(voll, p.length - 1); i++) {
      d += 'L' + zahl1(p[i].x) + ' ' + zahl1(p[i].y);
    }
    const rest = ganz - voll;
    if (rest > 0 && voll < p.length - 1) {
      const a = p[voll], b = p[voll + 1];
      d += 'L' + zahl1(a.x + (b.x - a.x) * rest) + ' ' + zahl1(a.y + (b.y - a.y) * rest);
    }
    return d;
  }

  function rissZeichnen() {
    let d = '';
    for (const ast of aeste) d += astPfad(ast, (fortschritt - ast.start) / ast.spanne);
    if (spur && spur.punkte.length > 1) d += astPfad(spur, 1);
    rissGlut.setAttribute('d', d);
    rissLinie.setAttribute('d', d);
    rissKern.setAttribute('d', d);
  }

  function rissRahmen(zeit) {
    if (zustand !== 'riss') return;
    // Ein Sprung nach einem Reiterwechsel darf den Riss nicht vollenden.
    const dt = Math.min(zeit - letzteZeit, 50);
    letzteZeit = zeit;
    // Gedrueckt halten treibt den Bruch, loslassen nicht - so hat das
    // Halten eine Wirkung, ohne dass ein Antippen jemanden aussperrt.
    fortschritt += dt / (RISS_MS * tempo) * (gedrueckt ? 1.75 : 1);
    rissZeichnen();
    glutPunkt.setAttribute('r', zahl1(9 + fortschritt * 30));
    glutPunkt.setAttribute('opacity', Math.min(1, .3 + fortschritt).toFixed(2));
    // Je weiter der Bruch, desto heller steht das Licht im Spalt.
    rissGlut.style.opacity = (.4 + fortschritt * .6).toFixed(2);

    if (fortschritt >= 1) { zerspringen(); return; }
    rissLauf = requestAnimationFrame(rissRahmen);
  }

  function rissStarten(px, py, zeiger) {
    if (zustand !== 'zu') return;
    // Ohne Leinwand und bei reduzierter Bewegung gibt es keinen Auftakt.
    // Die Karte ist die Sache, der Auftakt ist Zierrat.
    if (sanft || !staub.getContext) { seiteZeigen(); return; }

    zustand = 'riss';
    aeste = aesteBauen(px, py);
    spur = { punkte: [{ x: px, y: py }] };
    gedrueckt = zeiger !== null;
    glutPunkt.setAttribute('cx', zahl1(px));
    glutPunkt.setAttribute('cy', zahl1(py));
    buehne.classList.add('bricht');
    auftakt.hidden = false;
    if (zeiger !== null) { try { siegel.setPointerCapture(zeiger); } catch {} }
    letzteZeit = performance.now();
    notaus = setTimeout(seiteZeigen, NOTAUS_MS);
    rissLauf = requestAnimationFrame(rissRahmen);
  }

  siegel.addEventListener('pointerdown', e => {
    const p = inSiegel(e);
    rissStarten(p.x, p.y, e.pointerId);
  });

  siegel.addEventListener('pointermove', e => {
    if (zustand !== 'riss' || !gedrueckt) return;
    const p = inSiegel(e);
    const letzt = spur.punkte[spur.punkte.length - 1];
    const weit = Math.hypot(p.x - letzt.x, p.y - letzt.y);
    if (weit < 7) return;

    // Der Riss laeuft dem Finger nach, aber nicht schnurgerade: die
    // Zwischenpunkte sitzen versetzt, sonst zieht man einen Strich
    // statt eines Sprungs.
    const stufen = Math.min(3, Math.max(1, Math.floor(weit / 7)));
    for (let i = 1; i <= stufen; i++) {
      const t = i / stufen;
      spur.punkte.push({
        x: letzt.x + (p.x - letzt.x) * t + (Math.random() - .5) * 5,
        y: letzt.y + (p.y - letzt.y) * t + (Math.random() - .5) * 5,
      });
    }
    glutPunkt.setAttribute('cx', zahl1(p.x));
    glutPunkt.setAttribute('cy', zahl1(p.y));
    fortschritt += .035;   // Ziehen bringt den Bruch naeher
  });

  const loslassen = () => { gedrueckt = false; };
  siegel.addEventListener('pointerup', loslassen);
  siegel.addEventListener('pointercancel', loslassen);

  /* Mit der Tastatur gibt es keinen Beruehrungspunkt. Dann bricht das
     Wachs in der Mitte - dieselbe Handlung, nur ohne Finger. */
  siegel.addEventListener('click', () => rissStarten(100, 100, null));
  buehne.addEventListener('click', () => rissStarten(100, 100, null));

  ueberspringen.addEventListener('click', seiteZeigen);
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && (zustand === 'riss' || zustand === 'staub')) seiteZeigen();
  });

  /* ---------------------------------------------------------
     1b. Der Auftakt
     Ein Teilchensystem, drei Zustaende: Splitter, Flug, Namen.
     --------------------------------------------------------- */
  const TON_LICHT = ['rgba(255,241,210,', 'rgba(245,210,150,', 'rgba(220,174,109,', 'rgba(192,141,78,'];
  const TON_WACHS = ['rgba(184,57,76,',   'rgba(117,22,42,',   'rgba(74,12,28,'];

  const weich = e => e < .5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2;

  /* Die Namen werden nicht geschrieben, sondern getroffen: der Text
     kommt einmal auf eine unsichtbare Leinwand, danach sind nur noch
     seine Bildpunkte das Ziel der Teilchen. Fuer ein anderes Paar
     aendert sich damit nichts ausser DATEN.namen. */
  function textZiele(text) {
    const breite = Math.max(320, Math.round(innerWidth));
    const hoehe  = 220;
    const leinen = document.createElement('canvas');
    leinen.width = breite; leinen.height = hoehe;
    const stift = leinen.getContext('2d');
    if (!stift) return [];

    let gr = Math.min(breite * .125, 108);
    stift.textAlign = 'center';
    stift.textBaseline = 'middle';
    const setzen = () => { stift.font = '300 ' + gr + 'px Cormorant, Georgia, serif'; };
    setzen();
    while (stift.measureText(text).width > breite * .78 && gr > 15) { gr -= 2; setzen(); }
    stift.fillStyle = '#fff';
    stift.fillText(text, breite / 2, hoehe / 2);

    const daten = stift.getImageData(0, 0, breite, hoehe).data;
    const hoch = innerHeight / 2 - hoehe / 2;
    const ziele = [];
    // Jeder zweite Bildpunkt reicht: mehr Ziele liest niemand, sie
    // kosten aber jede Bildrate.
    for (let y = 0; y < hoehe; y += 2) {
      for (let x = 0; x < breite; x += 2) {
        if (daten[(y * breite + x) * 4 + 3] > 128) ziele.push({ x, y: y + hoch });
      }
    }
    return ziele;
  }

  function staubStarten(rahmen) {
    // Ohne messbare Flaeche gibt es nichts zu treffen: die Namen
    // laegen ausserhalb des Bildes. Dann lieber gleich die Karte.
    if (innerWidth < 2 || innerHeight < 2) { seiteZeigen(); return; }
    const stift = staub.getContext('2d');
    let ziele = textZiele(DATEN.namen);
    if (!stift || !ziele.length) { seiteZeigen(); return; }

    const dpr = Math.min(devicePixelRatio || 1, 2);
    staub.width  = Math.round(innerWidth  * dpr);
    staub.height = Math.round(innerHeight * dpr);
    stift.setTransform(dpr, 0, 0, dpr, 0, 0);

    const MAX = 1900;
    if (ziele.length > MAX) {
      const schritt = ziele.length / MAX;
      const gesiebt = [];
      for (let i = 0; i < ziele.length; i += schritt) gesiebt.push(ziele[Math.floor(i)]);
      ziele = gesiebt;
    }

    /* Ausgangspunkte im Wachs, nicht im Rechteck darum - geprueft
       gegen dieselbe Form, aus der auch das Siegel gezeichnet ist. */
    const form  = new Path2D(document.getElementById('wachsform').getAttribute('d'));
    const pruef = document.createElement('canvas').getContext('2d');
    const mitteX = rahmen.left + rahmen.width  / 2;
    const mitteY = rahmen.top  + rahmen.height / 2;

    function ausWachs() {
      for (let i = 0; i < 40; i++) {
        const vx = Math.random() * 200, vy = Math.random() * 200;
        if (!pruef.isPointInPath(form, vx, vy)) continue;
        return {
          x: rahmen.left + vx / 200 * rahmen.width,
          y: rahmen.top  + vy / 200 * rahmen.height,
        };
      }
      return { x: mitteX, y: mitteY };
    }

    const start = [];
    for (let i = 0; i < ziele.length; i++) start.push(ausWachs());
    // Links bleibt links. Ohne das kreuzen sich beim Sammeln alle Wege
    // und aus dem Flug wird ein Knaeuel.
    start.sort((a, b) => a.x - b.x);
    ziele.sort((a, b) => a.x - b.x);

    const teilchen = [];
    function werfen(a, ton, wucht) {
      const w = Math.atan2(a.y - mitteY, a.x - mitteX) + (Math.random() - .5) * .85;
      const kraft = wucht * (.5 + Math.random());
      return {
        x: a.x, y: a.y,
        vx: Math.cos(w) * kraft,
        vy: Math.sin(w) * kraft - 1,
        ton, gr: .9 + Math.random() * 1.5, takt: Math.random() * 6.3,
      };
    }

    for (let i = 0; i < ziele.length; i++) {
      const t = werfen(start[i], (Math.random() * TON_LICHT.length) | 0, 3.6);
      t.zx = ziele[i].x; t.zy = ziele[i].y;
      t.ax = 0; t.ay = 0;
      t.verz  = Math.random() * 300 * tempo;
      t.dauer = SAMMEL_MS * tempo * (.72 + Math.random() * .3);
      t.bogen = (Math.random() - .5) * 90;
      teilchen.push(t);
    }

    /* Das Wachs sammelt sich nicht mit: es faellt. Genau das ist der
       Satz, den der Auftakt erzaehlt - das Wachs geht weg, das Licht
       darin wird zu den Namen. */
    const wachsZahl = Math.round(ziele.length * .17);
    for (let i = 0; i < wachsZahl; i++) {
      const t = werfen(ausWachs(), (Math.random() * TON_WACHS.length) | 0, 4.4);
      t.zx = null;
      t.gr = 1.2 + Math.random() * 2.4;
      t.wachs = true;
      teilchen.push(t);
    }

    // Nach Farbton sortiert: so wechselt der Pinsel siebenmal je Bild
    // statt zweitausendmal.
    teilchen.sort((a, b) => (a.wachs ? 1 : 0) - (b.wachs ? 1 : 0) || a.ton - b.ton);

    const sprung = SPRUNG_MS * tempo;
    const ende   = sprung + 300 * tempo + SAMMEL_MS * tempo + HALT_MS * tempo;
    const beginn = performance.now();
    let gesammelt = false;

    function staubRahmen(zeit) {
      if (zustand !== 'staub') return;
      const t = zeit - beginn;
      stift.clearRect(0, 0, innerWidth, innerHeight);
      stift.globalCompositeOperation = 'lighter';

      // Der Aufschlag: ein kurzer Schein an der Stelle des Siegels.
      if (t < 260) {
        const rest = 1 - t / 260;
        const schein = stift.createRadialGradient(mitteX, mitteY, 0, mitteX, mitteY, 60 + t * 1.5);
        schein.addColorStop(0,   'rgba(255,238,206,' + (.5 * rest).toFixed(3) + ')');
        schein.addColorStop(.45, 'rgba(246,196,116,' + (.26 * rest).toFixed(3) + ')');
        schein.addColorStop(1,   'rgba(237,164,73,0)');
        stift.fillStyle = schein;
        stift.fillRect(0, 0, innerWidth, innerHeight);
      }

      if (t >= sprung && !gesammelt) {
        gesammelt = true;
        for (const p of teilchen) { p.ax = p.x; p.ay = p.y; }
      }

      let letzterTon = -1, letzteArt = -1;
      for (const p of teilchen) {
        let gr = p.gr;

        if (p.zx === null) {
          p.x += p.vx; p.y += p.vy;
          p.vx *= .975; p.vy = p.vy * .975 + .16;   // Wachs faellt
          // Es verschwindet ueber die Groesse, nicht ueber die Deckung:
          // eine Deckung je Teilchen waere ein Pinselwechsel je Teilchen.
          if (t > sprung) gr = p.gr * Math.max(0, 1 - (t - sprung) / (420 * tempo));
        } else if (!gesammelt) {
          p.x += p.vx; p.y += p.vy;
          p.vx *= .962; p.vy = p.vy * .962 - .02;   // Licht steigt
        } else {
          const e = weich(Math.min(1, Math.max(0, (t - sprung - p.verz) / p.dauer)));
          p.x = p.ax + (p.zx - p.ax) * e;
          p.y = p.ay + (p.zy - p.ay) * e + Math.sin(e * Math.PI) * p.bogen;
          // Am Ziel wird geflimmert, vorher nicht - unterwegs waere es
          // nur Unruhe.
          if (e > .96) gr = p.gr * (.75 + .55 * Math.sin(t / 190 + p.takt));
        }

        if (gr <= 0) continue;
        const art = p.wachs ? 1 : 0;
        if (p.ton !== letzterTon || art !== letzteArt) {
          stift.fillStyle = (art ? TON_WACHS : TON_LICHT)[p.ton] + (art ? '.75)' : '.9)');
          letzterTon = p.ton; letzteArt = art;
        }
        stift.fillRect(p.x, p.y, gr, gr);
      }

      if (t < ende) { staubLauf = requestAnimationFrame(staubRahmen); return; }
      seiteZeigen();
    }

    staubLauf = requestAnimationFrame(staubRahmen);
  }

  function zerspringen() {
    if (zustand !== 'riss') return;
    zustand = 'staub';
    cancelAnimationFrame(rissLauf);
    // Vor dem Ausblenden gemessen: danach hat das Siegel keine Groesse
    // mehr, und die Splitter kaemen aus einem Punkt.
    const rahmen = siegel.getBoundingClientRect();
    buehne.classList.add('zerbricht');
    auftakt.classList.add('an');
    ueberspringen.hidden = false;
    setTimeout(() => {
      buehne.classList.add('weg');
      buehne.setAttribute('aria-hidden', 'true');
    }, 600);
    staubStarten(rahmen);
  }

  /* ---------------------------------------------------------
     1c. Die Seite
     Ein Weg fuer alle Wege dorthin: durchgespielt, uebersprungen
     oder ohne Auftakt.
     --------------------------------------------------------- */
  function seiteZeigen() {
    if (zustand === 'fertig') return;
    zustand = 'fertig';
    cancelAnimationFrame(rissLauf);
    cancelAnimationFrame(staubLauf);
    clearTimeout(notaus);
    try { sessionStorage.setItem('funke-auftakt', '1'); } catch {}

    ueberspringen.hidden = true;
    auftakt.classList.remove('an');
    // Erst wenn der Grund weg ist, verschwindet die Leinwand - sonst
    // springt der Auftakt weg, statt zu verklingen.
    setTimeout(() => { auftakt.hidden = true; }, 700);

    document.body.classList.add('offen');
    document.body.classList.remove('zu');
    buehne.classList.add('weg');
    setTimeout(() => { buehne.setAttribute('aria-hidden', 'true'); }, 600);

    // Der Wink nach unten kommt erst, wenn oben nichts mehr zu tun ist.
    setTimeout(() => { $('scrollwink').hidden = false; }, sanft ? 300 : 1600);
    goldstaub();
    einblenden();
    if (countdown()) setInterval(countdown, 1000);
  }

  /* =========================================================
     2. Goldstaub
     Vierundzwanzig Koerner reichen fuer den Eindruck eines
     Raums. Jedes bekommt eigenen Weg, eigenes Tempo und eigenen
     Anfang, sonst fallen sie im Gleichschritt und das sieht
     sofort gemacht aus.
     ========================================================= */
  function goldstaub() {
    if (sanft) return;
    const teile = [];
    for (let i = 0; i < 24; i++) {
      const gr = (.8 + Math.random() * 1.5).toFixed(1);
      teile.push(
        '<i class="korn" style="' +
        'left:' + (Math.random() * 100).toFixed(1) + '%;' +
        'width:' + gr + 'px;height:' + gr + 'px;' +
        '--weg:' + ((Math.random() * 2 - 1) * 14).toFixed(1) + 'vw;' +
        '--deck:' + (.16 + Math.random() * .3).toFixed(2) + ';' +
        'animation-duration:' + (16 + Math.random() * 20).toFixed(1) + 's;' +
        'animation-delay:-' + (Math.random() * 30).toFixed(1) + 's"></i>'
      );
    }
    $('staubfall').innerHTML = teile.join('');
  }

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
    if (rollen === false || sanft) return;
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
    const t = Math.floor(rest / 1000);
    ziffer('cd-t', Math.floor(t / 86400));
    ziffer('cd-s', zwei(Math.floor(t / 3600) % 24));
    ziffer('cd-m', zwei(Math.floor(t / 60) % 60));
    ziffer('cd-k', zwei(t % 60), false);   // Sekunden ruhig lassen
    return true;
  }

  /* =========================================================
     4. Der Weg dorthin
     Zwei Ziele statt eines Kompromisses: wer ein iPhone hat, will
     Apple Karten, alle anderen Google. Beides sind Links - eine
     eingebettete Karte wuerde schon beim Oeffnen der Seite Daten
     zum Anbieter schicken, ein Link erst beim Antippen.
     ========================================================= */
  $('weg-google').href = 'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent(DATEN.ort) + '&travelmode=driving';
  $('weg-apple').href = 'https://maps.apple.com/?daddr=' +
    encodeURIComponent(DATEN.ort) + '&dirflg=d';

  // Auf einem Apple-Geraet steht Apple Karten zuerst.
  if (/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)) {
    const w = $('weg-apple');
    w.parentNode.prepend(w);
  }

  const kopierText = $('kopier-text');
  $('adresse-kopieren').addEventListener('click', async () => {
    let gut = false;
    try {
      await navigator.clipboard.writeText(DATEN.ort);
      gut = true;
    } catch {
      const t = document.createElement('textarea');
      t.value = DATEN.ort;
      t.setAttribute('readonly', '');
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      try { gut = document.execCommand('copy'); } catch { gut = false; }
      t.remove();
    }
    kopierText.textContent = gut ? 'Kopiert' : 'Bitte von Hand';
    setTimeout(() => { kopierText.textContent = 'Adresse kopieren'; }, 2400);
  });

  /* =========================================================
     5. Einblenden der Abschnitte
     ========================================================= */
  const halte = document.querySelectorAll('.halt, .fuss');
  const alleZeigen = () => halte.forEach(h => h.classList.add('da'));

  function einblenden() {
    if (!('IntersectionObserver' in window)) { alleZeigen(); return; }
    let gemeldet = false;
    const beobachter = new IntersectionObserver((eintraege, selbst) => {
      gemeldet = true;
      for (const e of eintraege) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('da');
        selbst.unobserve(e.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    halte.forEach(h => beobachter.observe(h));

    // Sicherung. Der Auftritt ist Zierrat, der Inhalt nicht: meldet sich
    // der Beobachter nicht - etwa weil die Seite in einem Hintergrund-
    // reiter geoeffnet wurde -, steht trotzdem alles da.
    setTimeout(() => { if (!gemeldet) alleZeigen(); }, 1800);
    addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !gemeldet) {
        setTimeout(() => { if (!gemeldet) alleZeigen(); }, 600);
      }
    });
  }

  /* =========================================================
     6. Kalenderdatei — komplett im Browser erzeugt
     ========================================================= */
  const icsZeit = iso => iso.replace(/[-:]/g, '').replace(/\.\d+/, '');
  $('kalender').addEventListener('click', () => {
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//JP Webstudio//Save the Date//DE',
      'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      'UID:2027-01-01-furkan-dilara-funke@einladung',
      'DTSTAMP:' + icsZeit(new Date().toISOString()).replace(/\.\d+Z$/, 'Z'),
      'DTSTART:' + icsZeit(DATEN.beginnISO),
      'DTEND:'   + icsZeit(DATEN.endeISO),
      'SUMMARY:' + DATEN.anlass,
      'LOCATION:' + DATEN.ort.replace(/,/g, '\\,'),
      'DESCRIPTION:Bitte den Termin freihalten. Die vollständige Einladung folgt.',
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Furkan-Dilara-Save-the-Date.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
