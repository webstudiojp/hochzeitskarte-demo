/* =========================================================
   DIGITALE HOCHZEITSKARTE — INHALTE
   Pro Paar wird ausschliesslich diese Datei angefasst.
   Demo-Datensatz: Furkan & Dilara, 01.01.2027 (frei erfunden)
   ========================================================= */
window.HOCHZEIT = {

  /* ---------- Das Paar ---------- */
  braut:        'Dilara',
  braeutigam:   'Furkan',
  namen:        'Furkan & Dilara',
  datumLang:    'Freitag, 1. Januar 2027',
  datumKurz:    '01.01.2027',
  datumISO:     '2027-01-01',
  beginnISO:    '2027-01-01T14:30:00',
  endeISO:      '2027-01-02T02:00:00',

  /* ---------- Hero-Animation ---------- */
  hero: {
    schriftzug:   '',              // leer => nutzt `namen`
    ausrichtung:  'strasse',        // 'strasse' = Spur des Wagens, laengs der Fahrbahn
                                     // 'gestapelt' = Zeilen untereinander | 'quer' = waagerecht
    trenner:      'herz',          // 'herz' | 'zeichen'
    herzZeigen:   true,
    tempo:        1.0,
    ueberspringbar: true,
  },

  /* ---------- Anrede ---------- */
  anrede: {
    zeile:  'Wir heiraten',
    text:   'Am ersten Tag des neuen Jahres geben wir uns das Ja-Wort. '
          + 'Wir würden uns freuen, wenn ihr dabei seid – zur Trauung, '
          + 'zum Essen und danach so lange, wie ihr mögt.',
    gruss:  'Dilara und Furkan',
  },

  /* ---------- Ablauf des Tages ---------- */
  ablauf: [
    { zeit: '14:30', titel: 'Freie Trauung',      ort: 'Orangerie im Schlosspark',
      notiz: 'Bitte seid 15 Minuten vorher da.' },
    { zeit: '15:30', titel: 'Sektempfang',        ort: 'Terrasse vor der Orangerie',
      notiz: 'Bei Regen drinnen im Foyer.' },
    { zeit: '17:00', titel: 'Abendessen',         ort: 'Festsaal' },
    { zeit: '19:30', titel: 'Eröffnungstanz',     ort: 'Festsaal' },
    { zeit: '20:00', titel: 'Torte und Feier',    ort: 'Festsaal' },
    { zeit: '02:00', titel: 'Ende',               ort: '',
      notiz: 'Taxistand liegt direkt am Parkeingang.' },
  ],

  /* ---------- Ort ---------- */
  ort: {
    name:    'Schloss Benrath, Orangerie',
    strasse: 'Benrather Schloßallee 104',
    plz:     '40597',
    stadt:   'Düsseldorf',
    hinweis: 'Parkplätze gibt es am Westflügel. Vom Bahnhof Benrath sind es acht Minuten zu Fuß.',
    lat: 51.163, lon: 6.871,
  },

  /* ---------- Familien ---------- */
  familien: {
    brautseite:     { rolle: 'Eltern der Braut',      namen: ['Nilüfer und Hamdi Sarıca'] },
    braeutigamseite:{ rolle: 'Eltern des Bräutigams', namen: ['Oya und Etem Zarga'] },
    trauzeugen:     { rolle: 'Trauzeugen',            namen: ['Elif Sarıca', 'Mehmet Zarga'] },
  },

  /* ---------- Dresscode ---------- */
  dresscode: {
    titel: 'Festlich, gerne lang',
    text:  'Die Trauung ist draußen in der Orangerie – flache Absätze sind auf dem Kiesweg '
         + 'die klügere Wahl. Weiß bleibt der Braut vorbehalten.',
    farben: [
      { hex: '#6d7a63', name: 'Salbei' },
      { hex: '#8a6f5c', name: 'Nussbraun' },
      { hex: '#3f4a55', name: 'Rauchblau' },
      { hex: '#a8894e', name: 'Altgold' },
    ],
  },

  /* ---------- Geschenke ---------- */
  geschenk: {
    text: 'Ihr müsst nichts mitbringen. Wer uns trotzdem etwas schenken möchte: '
        + 'Wir sparen auf die Hochzeitsreise nach Kappadokien.',
    kontoinhaber: 'Dilara Sarıca',
    iban: 'DE89 3704 0044 0532 0130 00',   // Beispiel-IBAN, kein echtes Konto
  },

  /* ---------- Rueckmeldung ---------- */
  rsvp: {
    frist:      '1. November 2026',
    frist_iso:  '2026-11-01',
    hinweis:    'Danach steht die Bestellung beim Caterer fest.',
  },

  /* ---------- Galerie (Platzhalter bis echte Fotos da sind) ---------- */
  galerie: [
    { datei: 'assets/img/g1-strauss.webp',  alt: 'Dilaras Brautstrauß aus weißen Rosen und Eukalyptus auf der Fensterbank' },
    { datei: 'assets/img/g2-ringe.webp',    alt: 'Die beiden Trauringe auf hellem Stoff, umgeben von Rosenblättern' },
    { datei: 'assets/img/g3-bogen.webp',    alt: 'Blumenbogen aus weißen Rosen vor der Orangerie, dahinter die Stuhlreihen' },
    { datei: 'assets/img/g4-tafel.webp',    alt: 'Die gedeckte Festtafel mit Kerzen und Eukalyptusgirlande im Abendlicht' },
    { datei: 'assets/img/g5-lichter.webp',  alt: 'Lichterketten und Lampions über der Tanzfläche zur blauen Stunde' },
  ],

  /* ---------- Rechtliches (Pflicht in DE) ---------- */
  recht: {
    verantwortlich: 'Dilara Sarıca und Furkan Zarga',
    kontakt:        'hallo@dilara-und-furkan.de',
    hosterHinweis:  'Diese Seite läuft auf einem Server in Deutschland. '
                  + 'Es werden keine Cookies gesetzt und keine Dienste von Dritten geladen.',
  },

  /* ---------- Texte der Oberflaeche ---------- */
  texte: {
    umschlagKicker: 'Eine Einladung für dich',
    umschlagHinweis:'Tippe auf den Umschlag',
    heroZeile:      'wir heiraten',
    ueberspringen:  'Überspringen',
    weiter:         'Weiter',
  },
};
