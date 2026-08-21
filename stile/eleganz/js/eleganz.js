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
     0. Sprache
     Deutsch steht im HTML und wird von dort einmal eingesammelt -
     so ist es nur an einer Stelle gepflegt. In dieser Tabelle
     steht ausschliesslich, was uebersetzt wird.
     ========================================================= */
  const SPRACHEN = {
    de: { htmlLang: 'de', name: 'Deutsch', t: null },   // wird aus dem HTML gefuellt
    tr: {
      htmlLang: 'tr', name: 'Türkçe',
      t: {
        'cover.hinweis': 'Açmak için dokunun',

        'menue.start': 'Başlangıç', 'menue.ort': 'Konum ve ulaşım', 'menue.tag': 'Günün akışı',
        'menue.familien': 'Aileler', 'menue.dresscode': 'Kıyafet', 'menue.geschenke': 'Hediyeler',
        'menue.rsvp': 'Geri bildirim',

        'hero.kicker': 'Tüm sevgimizle<br>sizi davet ediyoruz',
        'hero.ort': 'Benrath Sarayı ·<br>Düsseldorf',
        'hero.scroll': 'Kaydırın',

        'anrede.kicker': 'Sizin için',
        'anrede.titel': 'Sevgili ailemiz, sevgili dostlarımız',
        'anrede.text': 'Yeni yılın ilk gününde hayatımızı birleştiriyoruz. Bu özel günümüzde '
                     + 'sizi de aramızda görmek bizi çok mutlu eder — nikâhta, yemekte ve '
                     + 'sonrasında dilediğiniz kadar.',
        'anrede.gruss': 'Dilara ve Furkan',

        'cd.kicker': 'Geri sayım', 'cd.titel': 'Sonsuzluğa kalan',
        'cd.tage': 'Gün', 'cd.stunden': 'Saat', 'cd.minuten': 'Dakika', 'cd.sekunden': 'Saniye',
        'cd.fuss': '1 Ocak 2027 tarihine', 'cd.heute': 'Bugün o gün!',

        'ort.datumKicker': 'Tarih',
        'datum.lang': '1 Ocak 2027', 'datum.tag': 'Cuma',
        'ort.titel': 'Konum',
        'ort.trauung': 'Nikâh', 'ort.trauungName': 'Benrath Sarayı',
        'ort.trauungZeit': '<b>Saat 14:30</b> · Benrather Schloßallee 104, Düsseldorf',
        'ort.empfang': 'Karşılama', 'ort.empfangName': 'Saray parkındaki Orangerie',
        'ort.empfangZeit': '<b>Saat 19:30</b> · Benrather Schloßallee 104, Düsseldorf',
        'weg.google': 'Google Haritalar →', 'weg.apple': 'Apple Haritalar →',

        'anreise.titel': 'Ulaşım',
        'anreise.auto': 'Arabayla',
        'anreise.autoText': 'A59 otoyolundan Düsseldorf-Benrath çıkışı, ardından saraya giden '
                          + 'tabelaları izleyin.',
        'anreise.bahn': 'Trenle',
        'anreise.bahnText': 'S6 ile Düsseldorf-Benrath durağına, oradan saray parkı içinden '
                          + 'sekiz dakika yürüyüş.',
        'anreise.parken': 'Otopark',
        'anreise.parkenText': 'Park girişinin hemen yanındaki güney ziyaretçi otoparkı ücretsizdir.',

        'ablauf.titel': 'Günün akışı',
        'ablauf.empfang': 'Karşılama', 'ablauf.empfangText': 'Avluda kadeh kaldırıp hoş geldiniz diyoruz.',
        'ablauf.trauung': 'Nikâh töreni', 'ablauf.trauungText': 'Tören Aynalı Salon\'da gerçekleşecek.',
        'ablauf.kaffee': 'Kahve ve pasta', 'ablauf.kaffeeText': 'Saray parkında, hava güzelse açık havada.',
        'ablauf.dinner': 'Yemek ve kutlama', 'ablauf.dinnerText': 'Orangerie\'de akşam yemeği, ardından müzik.',
        'ablauf.tanz': 'İlk dans', 'ablauf.tanzText': 'Sonrasında pist herkesin.',
        'ablauf.ausklang': 'Kapanış', 'ablauf.ausklangText': 'Son dans ve kapıda vedalaşma.',

        'familien.kicker': 'Bizimle birlikte sevinenler',
        'familien.brautseite': 'Gelinin ailesi',
        'familien.braeutigamseite': 'Damadın ailesi',
        'familien.trauzeugen': 'Şahitler',

        'dress.titel': 'Kıyafet', 'dress.gross': 'Şık ve resmî',
        'dress.text': 'Takım elbise ve abiye, tercihen sakin tonlarda. Biz krem ve altın '
                    + 'giyeceğiz — beyaz lütfen geline kalsın.',

        'geschenk.titel': 'Hediyeler', 'geschenk.gross': 'Bize bir hediye',
        'geschenk.text': 'Gelmeniz yeterli. Yine de bir şey vermek isteyenler, balayımıza '
                       + 'katkıda bulunarak bizi çok sevindirir.',
        'geschenk.zeigen': 'IBAN\'ı göster', 'geschenk.verbergen': 'IBAN\'ı gizle',
        'geschenk.inhaber': 'Hesap sahibi',
        'geschenk.kopieren': 'Kopyala', 'geschenk.kopiert': 'Kopyalandı', 'geschenk.hand': 'Elle kopyalayın',

        'rsvp.titel': 'Geri bildirim', 'rsvp.kicker': 'Bize haber verin',
        'rsvp.anrede': 'Sevgili misafirler',
        'rsvp.frist': 'Lütfen <b>1 Kasım 2026</b> tarihine kadar gelip gelemeyeceğinizi bildirin.',
        'rsvp.name': 'İsim', 'rsvp.namePlatz': 'Yıldız ailesi',
        'rsvp.kommt': 'Geliyor musunuz?', 'rsvp.ja': 'Evet, geliyoruz', 'rsvp.nein': 'Maalesef gelemiyoruz',
        'rsvp.anzahl': 'Kişi sayısı',
        'rsvp.essen': 'Yemek tercihleri', 'rsvp.essenPlatz': 'Vejetaryen, glutensiz, alerjiler …',
        'rsvp.nachricht': 'Çifte mesajınız', 'rsvp.nachrichtPlatz': 'Bize birkaç satır …',
        'rsvp.senden': 'Yanıtı gönder',
        'rsvp.fehltName': 'Lütfen isminizi yazın.',
        'rsvp.fehltZusage': 'Lütfen gelip gelemeyeceğinizi belirtin.',
        'rsvp.dankeJa': n => 'Teşekkürler, ' + n + '. Sizi aramızda görmek için sabırsızlanıyoruz.',
        'rsvp.dankeNein': n => 'Haber verdiğiniz için teşekkürler, ' + n + '. Sizi özleyeceğiz.',

        'reiter.start': 'Başlangıç', 'reiter.ort': 'Konum',
        'reiter.geschenke': 'Hediyeler', 'reiter.rsvp': 'Yanıt',

        'fuss.gruss': 'Sevgiyle', 'fuss.datum': '1 OCAK · 2027', 'fuss.fragen': 'Sorularınız için',

        'kopf.menueAuf': 'Menüyü aç', 'kopf.menueZu': 'Menüyü kapat',
      },
    },
  };
  const SPRACHFOLGE = ['de', 'tr'];

  /* Reihenfolge: ausdrueckliche Wahl > Adresszeile > Browser > Standard */
  function spracheErmitteln() {
    const ausUrl = new URLSearchParams(location.search).get('lang');
    if (SPRACHFOLGE.includes(ausUrl)) return ausUrl;
    try {
      const gemerkt = localStorage.getItem('stil-sprache');
      if (SPRACHFOLGE.includes(gemerkt)) return gemerkt;
    } catch { /* privater Modus */ }
    const browser = (navigator.language || '').slice(0, 2).toLowerCase();
    if (SPRACHFOLGE.includes(browser)) return browser;
    return 'de';
  }

  // Deutsch einmal aus dem HTML einsammeln.
  SPRACHEN.de.t = {};
  for (const n of document.querySelectorAll('[data-t]')) SPRACHEN.de.t[n.dataset.t] = n.innerHTML;
  for (const n of document.querySelectorAll('[data-t-platz]')) SPRACHEN.de.t[n.dataset.tPlatz] = n.placeholder;
  Object.assign(SPRACHEN.de.t, {
    'cd.heute': 'Heute ist es so weit.',
    'geschenk.verbergen': 'IBAN verbergen',
    'geschenk.kopiert': 'Kopiert', 'geschenk.hand': 'Bitte von Hand',
    'rsvp.fehltName': 'Bitte tragt euren Namen ein.',
    'rsvp.fehltZusage': 'Bitte sagt uns, ob ihr kommt.',
    'rsvp.dankeJa': n => 'Danke, ' + n + '. Wir freuen uns auf euch.',
    'rsvp.dankeNein': n => 'Danke für die Nachricht, ' + n + '. Wir werden euch vermissen.',
    'kopf.menueAuf': 'Menü öffnen', 'kopf.menueZu': 'Menü schließen',
  });

  let sprache = spracheErmitteln();
  const T = schluessel => (SPRACHEN[sprache].t[schluessel] ?? SPRACHEN.de.t[schluessel] ?? '');

  function spracheAnwenden() {
    document.documentElement.lang = SPRACHEN[sprache].htmlLang;
    for (const n of document.querySelectorAll('[data-t]')) {
      const wert = T(n.dataset.t);
      if (typeof wert === 'string') n.innerHTML = wert;
    }
    for (const n of document.querySelectorAll('[data-t-platz]')) {
      const wert = T(n.dataset.tPlatz);
      if (typeof wert === 'string') n.placeholder = wert;
    }
    for (const f of document.querySelectorAll('.flagge')) {
      f.classList.toggle('aktiv', f.dataset.lang === sprache);
      f.title = SPRACHEN[f.dataset.lang].name;
    }
    const b = $('burger');
    if (b) b.setAttribute('aria-label',
      T(b.getAttribute('aria-expanded') === 'true' ? 'kopf.menueZu' : 'kopf.menueAuf'));
    // Zustandstexte, die gerade nicht im Grundzustand stehen, neu setzen.
    const schalter = $('iban-schalter');
    if (schalter) schalter.textContent =
      T(schalter.getAttribute('aria-expanded') === 'true' ? 'geschenk.verbergen' : 'geschenk.zeigen');
  }

  $('sprachwahl').addEventListener('click', () => {
    sprache = SPRACHFOLGE.find(x => x !== sprache) || 'de';
    try { localStorage.setItem('stil-sprache', sprache); } catch { /* egal */ }
    spracheAnwenden();
  });
  spracheAnwenden();

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
    burger.setAttribute('aria-label', T(offen ? 'kopf.menueAuf' : 'kopf.menueZu'));
    menue.hidden = offen;
  });
  menue.addEventListener('click', e => {
    if (e.target.tagName !== 'A') return;
    menue.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', T('kopf.menueAuf'));
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
      $('cd-fuss').textContent = T('cd.heute');
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
    schalter.textContent = T(offen ? 'geschenk.zeigen' : 'geschenk.verbergen');
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
    kopieren.textContent = T(gut ? 'geschenk.kopiert' : 'geschenk.hand');
    setTimeout(() => { kopieren.textContent = T('geschenk.kopieren'); }, 2400);
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
      echo.textContent = T('rsvp.fehltName');
      formular.elements.name.focus();
      return;
    }
    if (!daten.get('zusage')) {
      echo.textContent = T('rsvp.fehltZusage');
      formular.querySelector('.wahlpaar input').focus();
      return;
    }
    echo.textContent = T(daten.get('zusage') === 'ja' ? 'rsvp.dankeJa' : 'rsvp.dankeNein')(name);
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
