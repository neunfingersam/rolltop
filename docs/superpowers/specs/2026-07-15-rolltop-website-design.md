# Rolltop Website — Design Spec
**Date:** 2026-07-15
**Project:** RollTop Insektenschutzsysteme GmbH — Neue Website
**Stack:** Next.js 14, TypeScript, Tailwind CSS, next-intl, Vercel

---

## 1. Ziel & Kontext

Rolltop Insektenschutzsysteme GmbH ist ein Schweizer Familienunternehmen (gegründet 2010, Heinz & Dario Hermann, Rotkreuz ZG), das Insektenschutzsysteme berät, montiert und repariert. Die bestehende Website rolltop.ch wird durch einen modernen, professionellen Auftritt ersetzt.

**Primäres Ziel:** Besucher zur Beratungsanfrage führen (Kontaktformular).
**Sekundäres Ziel:** Vertrauen aufbauen durch Produktpräsentation und Firmengeschichte.

---

## 2. Sprachen

- Deutsch (Standard, Locale: `de`)
- Englisch (Locale: `en`)
- Implementiert via `next-intl`, Locale-Prefix im URL-Pfad: `/de/...`, `/en/...`

---

## 3. Seitenstruktur

| Route | Beschreibung |
|-------|-------------|
| `/[locale]/` | Homepage mit allen Haupt-Sections |
| `/[locale]/produkte/spannrahmen` | Produktdetail: Spannrahmen |
| `/[locale]/produkte/fensterrollo` | Produktdetail: Fensterrollo |
| `/[locale]/produkte/tuerrollo` | Produktdetail: Türrollo |
| `/[locale]/produkte/drehtuer` | Produktdetail: Drehtür |
| `/[locale]/produkte/schiebetuer` | Produktdetail: Schiebetür |
| `/[locale]/produkte/lichtschachtabdeckung` | Produktdetail: Lichtschachtabdeckung |
| `/[locale]/ueber-uns` | Über Uns — Firmengeschichte & Team |
| `/[locale]/kontakt` | Kontaktformular + Kontaktdaten |

---

## 4. Visuelles Design

### 4.1 Farbpalette

| Token | Hex | Verwendung |
|-------|-----|------------|
| `primary` | `#4A7C59` | Buttons, Akzente, Icons, aktive Links |
| `primary-dark` | `#2E5C3E` | Hover-States auf Buttons |
| `primary-light` | `#EAF2EC` | Helle Hintergründe, Highlights |
| `background` | `#F8F5F0` | Seitenhintergrund (Cremeweiß) |
| `surface` | `#FFFFFF` | Cards, Navbar, Footer |
| `text` | `#1C1C1C` | Haupttext |
| `text-muted` | `#6B6B6B` | Subtext, Labels |
| `border` | `#E5E0D8` | Card-Borders, Divider |

### 4.2 Typografie

- **Headlines (h1–h3):** Fraunces (Google Fonts, serif) — warm, charaktervoll
- **Body & UI:** Inter (Google Fonts, sans-serif) — klar, modern
- **Schriftgrössen:** Tailwind-Standard (text-sm / text-base / text-xl / text-3xl / text-5xl)

### 4.3 Komponenten-Stil

- Rounded Cards: `rounded-2xl`
- Schatten: `shadow-sm` auf Cards, `shadow-md` on hover
- Hover-Effekt Cards: `translateY(-4px)` + verstärkter Schatten + grüner Akzentbalken oben
- Buttons: `rounded-full`, primary grün mit weissem Text
- Section-Abstände: `py-20` (80px)
- Navbar: Sticky, startet transparent, wird bei Scroll weiss mit `shadow-sm`

### 4.4 Bestehende Assets

- **Logo:** `https://www.rolltop.ch/images/21-04-07-Autologo-Normal.jpg`
- **Banner:** `https://www.rolltop.ch/images/banners/bannerkorrekt.png`
- **Produktbilder:** `https://www.rolltop.ch/images/[dateiname]` (siehe Produktliste)
- **Farbmuster:** weiss-ral.jpg, braun-ral.jpg, silber-ral.jpg, bronze.png, dunkelgrau.png

---

## 5. Homepage Sections

### Section 1 — Hero
- Hintergrundbild: Banner von rolltop.ch (`bannerkorrekt.png`) — lokal gespeichert in `public/images/`
- Overlay: sanftes dunkelgrünes Gradient
- Headline (Fraunces, xl): "Ihr Zuhause — ungestört geniessen"
- Subheadline: "Professioneller Insektenschutz für Fenster, Türen & mehr. Beratung, Montage und Reparatur seit 2010."
- CTA-Buttons: [Beratung anfragen →] (primär, grün) + [Produkte entdecken ↓] (sekundär, outline)

### Section 2 — USPs (3 Kacheln)
- Salbeigrüner Hintergrund (`primary-light`)
- Kachel 1: "Umweltfreundlich" — ohne Chemie, schützt Insekten im Ökosystem
- Kachel 2: "Fachgerechte Montage" — jahrelange Erfahrung, hohe Qualitätsstandards
- Kachel 3: "Seit 2010" — Familienunternehmen, vertrauenswürdig

### Section 3 — Produkte (Grid)
- 6 Produkt-Cards in 2×3 Grid (mobile: 1 Spalte, tablet: 2, desktop: 3)
- Jede Card: Produktbild, Name, Kurzbeschreibung, [Mehr erfahren →]
- Link zu jeweiliger Produktdetailseite

### Section 4 — Über Uns (Split Layout)
- Links: Fliesstext über Heinz & Dario Hermann, Gründung 2010, Werte
- Rechts: Firmen-Bild oder Logo
- CTA: [Mehr über uns →]

### Section 5 — Farben & Gewebe
- Headline: "5 Standardfarben, Sonderlackierungen auf Anfrage"
- Visuelle Farbmuster-Swatches mit Namen (Weiß RAL 9016, Braun RAL 8014, etc.)
- Hinweis auf Sondergewebe (Antipoll) und Sonderformen

### Section 6 — Kontakt / CTA
- Zweiteilig: Links Formular, rechts Kontaktdaten
- Formularfelder: Name, E-Mail, Telefon (optional), Produkt (Dropdown), Nachricht
- Kontaktdaten: Adresse, Telefon Dario & Heinz, Email, Öffnungszeiten
- Formular-Submit: Server Action → Bestätigungsmail an info@rolltop.ch

---

## 6. Produktdetailseiten (`/[locale]/produkte/[slug]`)

Jede Produktseite enthält:
1. **Hero:** Produktbild gross, Produktname, Kurzbeschreibung
2. **Details:** Alle Varianten (z.B. Türrollo Uno / Duo / Comfort / Plissee) mit Bild, Text, Masse
3. **Farben:** Farbswatches
4. **Gewebe:** Beschreibung Standardgewebe (Fiberglas grau/schwarz, weichmacherfrei)
5. **CTA:** "Jetzt Beratung anfragen" → Link zur Kontaktseite mit vorausgefülltem Produkt

**Produktdaten (statisch in `lib/products.ts`):**

| Slug | Name | Varianten | Bilder |
|------|------|-----------|--------|
| spannrahmen | Spannrahmen | Clipfix, Vario | clipfix.jpg, vario.jpg |
| fensterrollo | Fensterrollo | Manuell, Elektro | fensterrollo.jpg, fensterrollo-elektro.jpg |
| tuerrollo | Türrollo | Uno, Duo, Comfort, Plissee | trrollouno.jpg, rrrollodue.jpg, confort.jpg, plissee.jpg |
| drehtuer | Drehtür | Max, Slim, Pendel | max.jpg, slim.jpg, pendel.jpg |
| schiebetuer | Schiebetür | Standard | schiebetr.jpg |
| lichtschachtabdeckung | Lichtschachtabdeckung | Standard | lichtschacht.jpg |

---

## 7. Über Uns Seite

- Firmengeschichte (Gründung 2010, Heinz Hermann, Rollfix-Hintergrund)
- Team-Section: Heinz Hermann (Gründer/GF) + Dario Hermann (seit 2017, Sanitärinstallateur)
- Werte: Professionelle Beratung, fachgerechte Montage, fairer Preis, schneller Service
- CTA am Ende: [Jetzt Beratung anfragen →]

---

## 8. Kontaktseite

- Kontaktformular (same as Homepage Section 6, standalone)
- Google Maps Embed: Holzhäusernstrasse 32B, 6343 Rotkreuz
- Kontaktdaten:
  - Dario Hermann: +41 76 388 60 70
  - Heinz Hermann: +41 76 572 06 07
  - info@rolltop.ch
  - Mo–Fr 07:30–12:00 | 13:00–17:30

---

## 9. Navbar & Footer

**Navbar:**
- Links: Logo (Bild + Text "Rolltop")
- Mitte: Home · Produkte (Dropdown) · Über Uns · Kontakt
- Rechts: [DE | EN] Sprach-Switcher + [Beratung anfragen] Button
- Mobile: Hamburger-Menu mit Slide-In

**Footer:**
- Logo + Tagline
- Navigation-Links
- Kontaktdaten
- Copyright: "© 2026 Rolltop Insektenschutzsysteme GmbH"

---

## 10. Tech-Architektur

### Dateistruktur

```
app/
  [locale]/
    layout.tsx            ← Navbar + Footer
    page.tsx              ← Homepage
    produkte/
      [slug]/
        page.tsx          ← Produktdetail (generateStaticParams)
    ueber-uns/
      page.tsx
    kontakt/
      page.tsx
components/
  Navbar.tsx
  Footer.tsx
  Hero.tsx
  UspSection.tsx
  ProductGrid.tsx
  ProductCard.tsx
  AboutSection.tsx
  ColorSwatches.tsx
  ContactSection.tsx
  ContactForm.tsx
lib/
  products.ts             ← Statische Produktdaten
messages/
  de.json
  en.json
public/
  images/                 ← Lokale Kopien der rolltop.ch Bilder
```

### Abhängigkeiten

- `next-intl` — i18n
- `next/image` — optimierte Bilder (externer Hostname rolltop.ch konfiguriert)
- Server Actions — Kontaktformular (kein separates Backend nötig)
- E-Mail: `resend` (via `@resend/node`) für Formularversand an info@rolltop.ch

### Bilder-Strategie

Produktbilder werden lokal in `public/images/` gespeichert (von rolltop.ch heruntergeladen), damit sie via `next/image` optimiert werden können.

---

## 11. i18n Content-Übersicht

Alle UI-Strings in `messages/de.json` und `messages/en.json`. Produktinhalte werden in `lib/products.ts` bilingual gespeichert (Objekt mit `de` und `en` Keys).

---

## 12. Nicht im Scope

- CMS / Admin-Backend
- Online-Shop / Preisrechner
- Buchungssystem
- Blog
