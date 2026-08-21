#!/usr/bin/env python3
"""Holt die Schriften einmal als woff2 zu uns ins Haus.

Google Fonts wird nicht verlinkt, sondern abgeholt: ein Link dorthin
schickt bei jedem Aufruf die IP des Gastes an einen Dritten, und dafuer
gibt es bei einer Einladung keine Einwilligung.
"""
import re, os, sys, subprocess, pathlib

ZIEL = pathlib.Path(sys.argv[1])
ZIEL.mkdir(parents=True, exist_ok=True)
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")

# (Dateiname-Stamm, css2-Angabe)
FAMILIEN = [
    ("EBGaramond",     "EB+Garamond:ital,wght@0,400..700;1,400..600"),
    ("Karla",          "Karla:wght@300..700"),
    ("LaBelleAurore",  "La+Belle+Aurore"),
    ("BodoniModa",     "Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..500"),
    ("Jost",           "Jost:wght@200..600"),
    ("Italianno",      "Italianno"),
    ("Cinzel",         "Cinzel:wght@400..700"),
    ("PinyonScript",   "Pinyon+Script"),
    ("Italiana",       "Italiana"),
    ("Archivo",        "Archivo:wght@200..700"),
    ("Marcellus",      "Marcellus"),
    ("WorkSans",       "Work+Sans:wght@200..600"),
    ("Allura",         "Allura"),
    ("Fraunces",       "Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..500"),
    ("Outfit",         "Outfit:wght@200..700"),
    ("Parisienne",     "Parisienne"),
    ("PlayfairDisplay","Playfair+Display:ital,wght@0,400..800;1,400..600"),
    ("SpaceGrotesk",   "Space+Grotesk:wght@300..700"),
    ("SpecialElite",   "Special+Elite"),
    ("Lora",           "Lora:ital,wght@0,400..700;1,400..600"),
    ("JosefinSans",    "Josefin+Sans:wght@200..600"),
    ("Sacramento",     "Sacramento"),
    ("TenorSans",      "Tenor+Sans"),
    ("Spectral",       "Spectral:ital,wght@0,300;0,400;1,300"),
]

def hole(url):
    return subprocess.run(["curl", "-sL", "--max-time", "60", "-A", UA, url],
                          capture_output=True, check=True).stdout

BLOCK = re.compile(r"@font-face\s*\{(.*?)\}", re.S)
def feld(block, name):
    m = re.search(name + r":\s*([^;]+);", block)
    return m.group(1).strip() if m else ""

zeilen = []
for stamm, angabe in FAMILIEN:
    css = hole("https://fonts.googleapis.com/css2?family=%s&display=swap" % angabe).decode()
    genommen = set()
    for block in BLOCK.findall(css):
        bereich = feld(block, "unicode-range")
        # Nur die Grundfassung latin: sie deckt U+00C0-00FF und damit
        # aeoeue und ss ab. latin-ext waere ein zweiter Download fuer
        # Zeichen, die in keiner dieser Karten vorkommen.
        if "U+0000" not in bereich:
            continue
        stil = "italic" if "italic" in feld(block, "font-style") else "normal"
        if stil in genommen:
            continue
        genommen.add(stil)
        m = re.search(r"url\((https://[^)]+\.woff2)\)", block)
        if not m:
            continue
        datei = "%s%s-latin.woff2" % (stamm, "-italic" if stil == "italic" else "")
        (ZIEL / datei).write_bytes(hole(m.group(1)))
        gew = feld(block, "font-weight") or "400"
        zeilen.append("%-28s %-7s %-10s %6d B" % (datei, stil, gew, (ZIEL / datei).stat().st_size))
    print("ok  " + stamm, flush=True)

print()
print("\n".join(sorted(zeilen)))
