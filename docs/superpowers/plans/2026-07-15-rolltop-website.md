# Rolltop Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a professional bilingual (DE/EN) Next.js 14 website for Rolltop Insektenschutzsysteme GmbH with homepage, 6 product detail pages, Über Uns, and a contact form.

**Architecture:** App Router with `[locale]` dynamic segment for DE/EN via next-intl. Static product data in `lib/products.ts`. Contact form uses a Server Action to send email via Resend. All images downloaded locally to `public/images/`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, next-intl v3, Resend (`@resend/node`), Vercel

## Global Constraints

- Node.js >= 18
- Next.js 14 (`next@14`)
- next-intl v3 (NOT v2 — API is different)
- Locales: `de` (default), `en`. URL prefix always present: `/de/...`, `/en/...`
- Primary color: `#4A7C59` (sage green). Background: `#F8F5F0` (cream).
- Fonts: Fraunces (serif, headlines) + Inter (sans, body) — Google Fonts via `next/font/google`
- All product images sourced from `public/images/` (downloaded in Task 1)
- Company email: `info@rolltop.ch`
- No CMS, no database, no auth, no blog

---

## File Map

```
app/
  globals.css
  layout.tsx                          ← root layout (html/body, font vars)
  [locale]/
    layout.tsx                        ← locale layout (NextIntlClientProvider, Navbar, Footer)
    page.tsx                          ← Homepage
    produkte/[slug]/page.tsx          ← Product detail (generateStaticParams)
    ueber-uns/page.tsx
    kontakt/page.tsx
  actions/
    contact.ts                        ← Server Action for contact form
components/
  Navbar.tsx                          ← sticky, scroll-aware, dropdown, lang switcher
  Footer.tsx
  Hero.tsx
  UspSection.tsx
  ProductCard.tsx
  ProductGrid.tsx
  AboutSection.tsx
  ColorSwatches.tsx
  ContactSection.tsx                  ← wraps ContactForm + contact info
  ContactForm.tsx                     ← 'use client', useFormState
lib/
  products.ts                         ← all product data, bilingual
middleware.ts                         ← next-intl routing
i18n.ts                               ← next-intl getRequestConfig
messages/
  de.json
  en.json
next.config.js
tailwind.config.ts
public/
  images/                             ← all downloaded images
```

---

### Task 1: Project Scaffold & Image Download

**Files:**
- Create: all project files via `create-next-app`
- Modify: `next.config.js`
- Create: `public/images/` with all product images

- [ ] **Step 1: Scaffold the project**

Run in `/Users/flavio/Documents/Projekte/RollTop`:
```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes --skip-install
```
Expected: Files created (package.json, app/, etc.)

- [ ] **Step 2: Install dependencies**

```bash
npm install next-intl @resend/node
npm install --save-dev @types/node
```

- [ ] **Step 3: Download all images from rolltop.ch**

```bash
mkdir -p public/images
cd public/images

# Logo & Banner
curl -O "https://www.rolltop.ch/images/21-04-07-Autologo-Normal.jpg"
curl -O "https://www.rolltop.ch/images/banners/bannerkorrekt.png"

# Product images
curl -O "https://www.rolltop.ch/images/clipfix.jpg"
curl -O "https://www.rolltop.ch/images/vario.jpg"
curl -O "https://www.rolltop.ch/images/fensterrollo.jpg"
curl -O "https://www.rolltop.ch/images/fensterrollo-elektro.jpg"
curl -O "https://www.rolltop.ch/images/trrollouno.jpg"
curl -O "https://www.rolltop.ch/images/rrrollodue.jpg"
curl -O "https://www.rolltop.ch/images/confort.jpg"
curl -O "https://www.rolltop.ch/images/plissee.jpg"
curl -O "https://www.rolltop.ch/images/max.jpg"
curl -O "https://www.rolltop.ch/images/slim.jpg"
curl -O "https://www.rolltop.ch/images/pendel.jpg"
curl -O "https://www.rolltop.ch/images/schiebetr.jpg"
curl -O "https://www.rolltop.ch/images/lichtschacht.jpg"

# Color swatches
curl -O "https://www.rolltop.ch/images/weiss-ral.jpg"
curl -O "https://www.rolltop.ch/images/braun-ral.jpg"
curl -O "https://www.rolltop.ch/images/silber-ral.jpg"
curl -O "https://www.rolltop.ch/images/bronze.png"
curl -O "https://www.rolltop.ch/images/dunkelgrau.png"
```

Expected: `ls public/images/` shows 20 files.

- [ ] **Step 4: Replace `next.config.js`**

```js
/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./i18n.ts');

const nextConfig = {
  images: {
    // images are local — no remote patterns needed
  },
};

module.exports = withNextIntl(nextConfig);
```

- [ ] **Step 5: Delete boilerplate**

```bash
rm -rf app/page.tsx app/globals.css app/layout.tsx app/favicon.ico
# We'll recreate these in later tasks
```

- [ ] **Step 6: Verify no build errors (type check only)**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: Errors only about missing files we haven't created yet — not syntax errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 project, download images"
```

---

### Task 2: Tailwind Config & Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Create: `app/globals.css`
- Create: `app/layout.tsx` (root layout with font vars)

- [ ] **Step 1: Replace `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A7C59',
        'primary-dark': '#2E5C3E',
        'primary-light': '#EAF2EC',
        background: '#F8F5F0',
        surface: '#FFFFFF',
        'text-main': '#1C1C1C',
        'text-muted': '#6B6B6B',
        border: '#E5E0D8',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #F8F5F0;
  color: #1C1C1C;
  font-family: var(--font-inter), system-ui, sans-serif;
}
```

- [ ] **Step 3: Create root `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rolltop Insektenschutzsysteme',
  description: 'Professioneller Insektenschutz für Fenster, Türen & mehr. Beratung, Montage und Reparatur seit 2010.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Type check**

```bash
npx tsc --noEmit 2>&1 | grep -v "Cannot find module" | head -20
```
Expected: No font or config errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: configure Tailwind custom theme and root layout with Google Fonts"
```

---

### Task 3: i18n Setup

**Files:**
- Create: `middleware.ts`
- Create: `i18n.ts`
- Create: `messages/de.json`
- Create: `messages/en.json`

- [ ] **Step 1: Create `middleware.ts`**

```ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['de', 'en'],
  defaultLocale: 'de',
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
```

- [ ] **Step 2: Create `i18n.ts`**

```ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));
```

- [ ] **Step 3: Create `messages/de.json`**

```json
{
  "nav": {
    "home": "Home",
    "products": "Produkte",
    "about": "Über Uns",
    "contact": "Kontakt",
    "cta": "Beratung anfragen"
  },
  "hero": {
    "headline": "Ihr Zuhause — ungestört geniessen",
    "subheadline": "Professioneller Insektenschutz für Fenster, Türen & mehr. Beratung, Montage und Reparatur seit 2010.",
    "cta_primary": "Beratung anfragen",
    "cta_secondary": "Produkte entdecken"
  },
  "usps": {
    "eco_title": "Umweltfreundlich",
    "eco_desc": "Ohne Chemie — ohne den Insekten zu schaden, die eine wichtige Rolle in unserem Ökosystem spielen.",
    "quality_title": "Fachgerechte Montage",
    "quality_desc": "Jahrelange Erfahrung und hohe Qualitätsstandards bei Beratung, Montage und Reparatur.",
    "since_title": "Seit 2010",
    "since_desc": "Familienunternehmen aus Rotkreuz — zuverlässig, fair und persönlich."
  },
  "products": {
    "section_title": "Unsere Produkte",
    "section_desc": "Massgeschneiderte Insektenschutzlösungen für jede Situation.",
    "more": "Mehr erfahren"
  },
  "about": {
    "section_title": "Über Uns",
    "text": "Die Rolltop Insektenschutzsysteme GmbH wurde 2010 von Heinz Hermann gegründet. Mit Erfahrung aus dem Bau- und Spenglereibereich und fundiertem Wissen aus seiner Zeit bei Rollfix Systeme AG bietet er gemeinsam mit Sohn Dario professionelle Lösungen für jeden Bedarf.",
    "cta": "Mehr über uns",
    "badge1": "Gegründet 2010",
    "badge2": "Familienunternehmen",
    "badge3": "Rotkreuz, Schweiz"
  },
  "colors": {
    "section_title": "5 Standardfarben",
    "section_desc": "Sonderlackierungen und Sonderformen auf Anfrage.",
    "special": "Sondergewebe wie Antipoll auf Anfrage erhältlich.",
    "white": "Weiss RAL 9016",
    "brown": "Braun RAL 8014",
    "silver": "Silber eloxiert",
    "bronze": "Bronze lackiert",
    "darkgray": "Dunkelgrau RAL 7016"
  },
  "contact": {
    "section_title": "Beratung anfragen",
    "section_desc": "Kostenlose und unverbindliche Beratung.",
    "name": "Name",
    "email": "E-Mail",
    "phone": "Telefon (optional)",
    "product": "Produkt",
    "product_placeholder": "Bitte wählen...",
    "message": "Nachricht",
    "submit": "Anfrage senden",
    "success": "Vielen Dank! Wir melden uns bald bei Ihnen.",
    "error": "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    "address_label": "Adresse",
    "phone_label": "Telefon",
    "email_label": "E-Mail",
    "hours_label": "Öffnungszeiten",
    "address": "Holzhäusernstrasse 32B, 6343 Rotkreuz",
    "hours": "Mo–Fr 07:30–12:00 | 13:00–17:30"
  },
  "footer": {
    "tagline": "Professioneller Insektenschutz seit 2010.",
    "copyright": "© 2026 Rolltop Insektenschutzsysteme GmbH"
  },
  "product_detail": {
    "variants": "Varianten",
    "dimensions": "Masse",
    "colors": "Farben",
    "fabric": "Gewebe",
    "fabric_desc": "Fiberglasgewebe grau oder schwarz — frei von gesundheitsschädlichen Weichmachern.",
    "cta": "Jetzt Beratung anfragen"
  },
  "about_page": {
    "title": "Über Uns",
    "history_title": "Unsere Geschichte",
    "history": "Die Rolltop Insektenschutzsysteme GmbH wurde 2010 von Heinz Hermann gegründet. Mit jahrelanger Erfahrung im Bau- und Spenglereibereich sowie fundiertem Fachwissen aus seiner Zeit bei Rollfix Systeme AG bringt er tiefes Produktwissen und handwerkliche Kompetenz mit.",
    "team_title": "Unser Team",
    "heinz_title": "Gründer & Geschäftsführer",
    "heinz_desc": "Jahrelange Erfahrung im Bau- und Spenglereibereich, ehemals Rollfix Systeme AG.",
    "dario_title": "Montage & Kundenservice",
    "dario_desc": "Seit 2017 im Betrieb. Gelernter Sanitärinstallateur mit handwerklichem Können.",
    "values_title": "Unsere Werte",
    "val1_title": "Persönliche Beratung",
    "val1_desc": "Wir nehmen uns Zeit für Ihre individuelle Situation.",
    "val2_title": "Fairer Preis",
    "val2_desc": "Schneller Service zu transparenten, fairen Preisen.",
    "val3_title": "Qualitätsarbeit",
    "val3_desc": "Fachgerechte Montage nach höchsten Standards.",
    "cta": "Jetzt Beratung anfragen"
  },
  "contact_page": {
    "title": "Kontakt",
    "subtitle": "Wir freuen uns auf Ihre Anfrage."
  }
}
```

- [ ] **Step 4: Create `messages/en.json`**

```json
{
  "nav": {
    "home": "Home",
    "products": "Products",
    "about": "About Us",
    "contact": "Contact",
    "cta": "Request consultation"
  },
  "hero": {
    "headline": "Enjoy your home — undisturbed",
    "subheadline": "Professional insect protection for windows, doors & more. Consulting, installation and repair since 2010.",
    "cta_primary": "Request consultation",
    "cta_secondary": "Discover products"
  },
  "usps": {
    "eco_title": "Eco-Friendly",
    "eco_desc": "No chemicals — without harming insects that play a vital role in our ecosystem.",
    "quality_title": "Professional Installation",
    "quality_desc": "Years of experience and high quality standards in consulting, installation and repair.",
    "since_title": "Since 2010",
    "since_desc": "Family business from Rotkreuz — reliable, fair and personal."
  },
  "products": {
    "section_title": "Our Products",
    "section_desc": "Tailored insect protection solutions for every situation.",
    "more": "Learn more"
  },
  "about": {
    "section_title": "About Us",
    "text": "Rolltop Insektenschutzsysteme GmbH was founded in 2010 by Heinz Hermann. With experience from the construction and sheet metal sector and in-depth knowledge from his time at Rollfix Systeme AG, he and his son Dario offer professional solutions for every need.",
    "cta": "More about us",
    "badge1": "Founded 2010",
    "badge2": "Family business",
    "badge3": "Rotkreuz, Switzerland"
  },
  "colors": {
    "section_title": "5 Standard Colors",
    "section_desc": "Special finishes and custom shapes available on request.",
    "special": "Special fabrics like Antipoll available on request.",
    "white": "White RAL 9016",
    "brown": "Brown RAL 8014",
    "silver": "Silver anodized",
    "bronze": "Bronze lacquered",
    "darkgray": "Dark gray RAL 7016"
  },
  "contact": {
    "section_title": "Request a consultation",
    "section_desc": "Free and non-binding consultation.",
    "name": "Name",
    "email": "Email",
    "phone": "Phone (optional)",
    "product": "Product",
    "product_placeholder": "Please select...",
    "message": "Message",
    "submit": "Send request",
    "success": "Thank you! We will be in touch soon.",
    "error": "Something went wrong. Please try again.",
    "address_label": "Address",
    "phone_label": "Phone",
    "email_label": "Email",
    "hours_label": "Opening hours",
    "address": "Holzhäusernstrasse 32B, 6343 Rotkreuz",
    "hours": "Mon–Fri 07:30–12:00 | 13:00–17:30"
  },
  "footer": {
    "tagline": "Professional insect protection since 2010.",
    "copyright": "© 2026 Rolltop Insektenschutzsysteme GmbH"
  },
  "product_detail": {
    "variants": "Variants",
    "dimensions": "Dimensions",
    "colors": "Colors",
    "fabric": "Fabric",
    "fabric_desc": "Fiberglass fabric in gray or black — free of harmful plasticizers.",
    "cta": "Request consultation now"
  },
  "about_page": {
    "title": "About Us",
    "history_title": "Our Story",
    "history": "Rolltop Insektenschutzsysteme GmbH was founded in 2010 by Heinz Hermann. With years of experience in construction and sheet metal work, as well as in-depth product knowledge from his time at Rollfix Systeme AG, he brings deep expertise to every project.",
    "team_title": "Our Team",
    "heinz_title": "Founder & Managing Director",
    "heinz_desc": "Years of experience in construction and sheet metal, formerly at Rollfix Systeme AG.",
    "dario_title": "Installation & Customer Service",
    "dario_desc": "Joined in 2017. Trained sanitary installer with strong technical skills.",
    "values_title": "Our Values",
    "val1_title": "Personal Consulting",
    "val1_desc": "We take the time to understand your individual situation.",
    "val2_title": "Fair Pricing",
    "val2_desc": "Fast service at transparent, fair prices.",
    "val3_title": "Quality Work",
    "val3_desc": "Professional installation to the highest standards.",
    "cta": "Request consultation now"
  },
  "contact_page": {
    "title": "Contact",
    "subtitle": "We look forward to hearing from you."
  }
}
```

- [ ] **Step 5: Type check**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: Errors only about missing app files (layout, page) — not middleware or i18n.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add next-intl i18n setup with DE/EN translations"
```

---

### Task 4: Product Data

**Files:**
- Create: `lib/products.ts`

- [ ] **Step 1: Create `lib/products.ts`**

```ts
export type ProductVariant = {
  name: { de: string; en: string }
  description: { de: string; en: string }
  image: string
  dimensions?: { de: string; en: string }
}

export type Product = {
  slug: string
  name: { de: string; en: string }
  shortDesc: { de: string; en: string }
  heroImage: string
  variants: ProductVariant[]
}

export const PRODUCTS: Product[] = [
  {
    slug: 'spannrahmen',
    name: { de: 'Spannrahmen', en: 'Tension Frame' },
    shortDesc: {
      de: 'Einfach und schnell — Fenster auf, Spannrahmen rein, Fenster zu.',
      en: 'Quick and easy — open the window, insert the frame, close the window.',
    },
    heroImage: '/images/clipfix.jpg',
    variants: [
      {
        name: { de: 'Clipfix (Kunststofffenster)', en: 'Clipfix (plastic windows)' },
        description: {
          de: 'Patentierte Einschnapp-Technologie für einfache Montage und Demontage an Kunststofffenstern.',
          en: 'Patented snap technology for easy installation and removal on plastic windows.',
        },
        image: '/images/clipfix.jpg',
        dimensions: { de: 'B: 30–180 cm | H: 30–240 cm', en: 'W: 30–180 cm | H: 30–240 cm' },
      },
      {
        name: { de: 'Vario (Holz-/Metallfenster)', en: 'Vario (wood/metal windows)' },
        description: {
          de: 'Für Holz-, Holz-Metall- oder Metallfensterrahmen. Montage durch diagonales Einsetzen.',
          en: 'For wood, wood-metal, or metal window frames. Installed by inserting diagonally.',
        },
        image: '/images/vario.jpg',
        dimensions: { de: 'B: 30–180 cm | H: 30–240 cm', en: 'W: 30–180 cm | H: 30–240 cm' },
      },
    ],
  },
  {
    slug: 'fensterrollo',
    name: { de: 'Fensterrollo', en: 'Window Roller' },
    shortDesc: {
      de: 'Der flexible Insektenschutz für jedes Fenster — manuell oder elektrisch.',
      en: 'Flexible insect protection for any window — manual or electric.',
    },
    heroImage: '/images/fensterrollo.jpg',
    variants: [
      {
        name: { de: 'Manuell', en: 'Manual' },
        description: {
          de: 'Maximal flexibel — ob offen oder geschlossen, ein Handgriff reicht. Mit Feder-Bremse und Windschutzbürsten.',
          en: 'Maximum flexibility — one handle is all it takes. With spring brake and wind protection brushes.',
        },
        image: '/images/fensterrollo.jpg',
      },
      {
        name: { de: 'Elektro-Rollo', en: 'Electric Roller' },
        description: {
          de: 'Insektenschutz auf Knopfdruck — maximaler Komfort durch motorisierte Bedienung.',
          en: 'Insect protection at the push of a button — maximum comfort through motorized operation.',
        },
        image: '/images/fensterrollo-elektro.jpg',
      },
    ],
  },
  {
    slug: 'tuerrollo',
    name: { de: 'Türrollo', en: 'Door Roller' },
    shortDesc: {
      de: 'Flexibler Insektenschutz für Flügel- und Schiebetüren.',
      en: 'Flexible insect protection for hinged and sliding doors.',
    },
    heroImage: '/images/trrollouno.jpg',
    variants: [
      {
        name: { de: 'Uno', en: 'Uno' },
        description: {
          de: 'Für Türen bis 1.6m Breite. Seitliche Bedienung, Feder-Bremse, Windschutzbürsten.',
          en: 'For doors up to 1.6m wide. Side operation, spring brake, wind protection brushes.',
        },
        image: '/images/trrollouno.jpg',
        dimensions: { de: 'B: 50–160 cm | H: 250 cm', en: 'W: 50–160 cm | H: 250 cm' },
      },
      {
        name: { de: 'Duo', en: 'Duo' },
        description: {
          de: 'Für Türen bis 3.2m Breite — ideal für breite Durchgänge.',
          en: 'For doors up to 3.2m wide — ideal for wide passages.',
        },
        image: '/images/rrrollodue.jpg',
        dimensions: { de: 'B: 120–320 cm | H: 250 cm', en: 'W: 120–320 cm | H: 250 cm' },
      },
      {
        name: { de: 'Comfort', en: 'Comfort' },
        description: {
          de: 'Höherer Komfort durch Gegengewichts-Mechanismus. Für Türen bis 1.6m Breite.',
          en: 'Higher comfort through counterweight mechanism. For doors up to 1.6m wide.',
        },
        image: '/images/confort.jpg',
        dimensions: { de: 'B: 50–160 cm | H: 250 cm', en: 'W: 50–160 cm | H: 250 cm' },
      },
      {
        name: { de: 'Plissee', en: 'Pleated' },
        description: {
          de: 'Für enge Platzverhältnisse — ultra-kompakt und platzsparend.',
          en: 'For tight spaces — ultra-compact and space-saving.',
        },
        image: '/images/plissee.jpg',
        dimensions: { de: 'B: 100–440 cm | H: 260–310 cm', en: 'W: 100–440 cm | H: 260–310 cm' },
      },
    ],
  },
  {
    slug: 'drehtuer',
    name: { de: 'Drehtür', en: 'Hinged Door' },
    shortDesc: {
      de: 'Schwellenfreier Insektenschutz für Türdurchgänge — stabil und elegant.',
      en: 'Threshold-free insect protection for doorways — sturdy and elegant.',
    },
    heroImage: '/images/max.jpg',
    variants: [
      {
        name: { de: 'Max', en: 'Max' },
        description: {
          de: 'Extra stabile Drehtür für hoch belastete Durchgänge. Schwellenfrei dank Trittschutzprofil. Öffnungsweite bis 180°.',
          en: 'Extra sturdy hinged door for high-traffic passages. Threshold-free with foot protection profile. Opens up to 180°.',
        },
        image: '/images/max.jpg',
      },
      {
        name: { de: 'Slim', en: 'Slim' },
        description: {
          de: 'Ultra schlanke Profile — montierbar auch zwischen Balkontüren bei engstem Platz.',
          en: 'Ultra-slim profiles — can be installed even between balcony doors in the tightest spaces.',
        },
        image: '/images/slim.jpg',
      },
      {
        name: { de: 'Pendeltür', en: 'Swing Door' },
        description: {
          de: 'Lässt sich nach innen und aussen öffnen und schliesst automatisch in Mittelposition. Barrierefrei.',
          en: 'Opens inward and outward, automatically closes to center position. Barrier-free.',
        },
        image: '/images/pendel.jpg',
      },
    ],
  },
  {
    slug: 'schiebetuer',
    name: { de: 'Schiebetür', en: 'Sliding Door' },
    shortDesc: {
      de: 'Für grossflächige Durchgänge — sanft, geräuschlos, optionaler Selbstschluss.',
      en: 'For large openings — smooth, silent, optional self-closing mechanism.',
    },
    heroImage: '/images/schiebetr.jpg',
    variants: [
      {
        name: { de: 'Standard', en: 'Standard' },
        description: {
          de: 'Gleitet mittels kugelgelagerten Laufrollen sanft und geräuschlos. Optional mit automatischem Selbstschliessmechanismus.',
          en: 'Glides smoothly and silently on ball-bearing rollers. Optional automatic self-closing mechanism.',
        },
        image: '/images/schiebetr.jpg',
        dimensions: { de: 'B: 50–600 cm | H: 300 cm', en: 'W: 50–600 cm | H: 300 cm' },
      },
    ],
  },
  {
    slug: 'lichtschachtabdeckung',
    name: { de: 'Lichtschachtabdeckung', en: 'Light Shaft Cover' },
    shortDesc: {
      de: 'Fertig mit Laub und Kleintieren — witterungsbeständig und begehbar.',
      en: 'No more leaves and small animals — weather-resistant and walkable.',
    },
    heroImage: '/images/lichtschacht.jpg',
    variants: [
      {
        name: { de: 'Standard', en: 'Standard' },
        description: {
          de: 'Robustes Edelstahlgewebe — begehbar, licht- und luftdurchlässig, dauerhaft rostfrei. Wird auf vorhandenen Gitterrost gelegt und mit Halteklammern verankert.',
          en: 'Robust stainless steel mesh — walkable, permeable to light and air, permanently rust-free. Placed on the existing grate and anchored with holding clamps.',
        },
        image: '/images/lichtschacht.jpg',
        dimensions: { de: 'B: 50–200 cm | H: 130 cm', en: 'W: 50–200 cm | H: 130 cm' },
      },
    ],
  },
]

export const COLOR_SWATCHES = [
  { key: 'white', image: '/images/weiss-ral.jpg' },
  { key: 'brown', image: '/images/braun-ral.jpg' },
  { key: 'silver', image: '/images/silber-ral.jpg' },
  { key: 'bronze', image: '/images/bronze.png' },
  { key: 'darkgray', image: '/images/dunkelgrau.png' },
] as const

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit 2>&1 | grep "lib/products" | head -10
```
Expected: No errors for `lib/products.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/products.ts
git commit -m "feat: add static bilingual product data"
```

---

### Task 5: Locale Layout, Navbar & Footer

**Files:**
- Create: `app/[locale]/layout.tsx`
- Create: `components/Navbar.tsx`
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create `app/[locale]/layout.tsx`**

```tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar locale={locale} />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
```

- [ ] **Step 2: Create `components/Navbar.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { PRODUCTS } from '@/lib/products'

const PRODUCT_SLUGS = PRODUCTS.map((p) => p.slug)

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const currentLocale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const otherLocale = currentLocale === 'de' ? 'en' : 'de'
  // Switch locale: replace /de/ with /en/ or vice versa
  const switchPath = pathname.replace(`/${currentLocale}`, `/${otherLocale}`)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="/images/21-04-07-Autologo-Normal.jpg"
            alt="Rolltop Logo"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href={`/${locale}`}
            className="text-sm font-medium text-text-main hover:text-primary transition-colors"
          >
            {t('home')}
          </Link>

          {/* Products dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="text-sm font-medium text-text-main hover:text-primary transition-colors flex items-center gap-1">
              {t('products')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-surface rounded-xl shadow-md border border-border py-2 min-w-[200px]">
                {PRODUCTS.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/${locale}/produkte/${product.slug}`}
                    className="block px-4 py-2 text-sm text-text-main hover:bg-primary-light hover:text-primary transition-colors"
                  >
                    {product.name[locale as 'de' | 'en']}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href={`/${locale}/ueber-uns`}
            className="text-sm font-medium text-text-main hover:text-primary transition-colors"
          >
            {t('about')}
          </Link>
          <Link
            href={`/${locale}/kontakt`}
            className="text-sm font-medium text-text-main hover:text-primary transition-colors"
          >
            {t('contact')}
          </Link>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href={switchPath}
            className="text-xs font-medium text-text-muted hover:text-primary transition-colors uppercase tracking-wide"
          >
            {otherLocale}
          </Link>
          <Link
            href={`/${locale}/kontakt`}
            className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
          >
            {t('cta')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-main"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-border px-4 py-4 flex flex-col gap-3">
          <Link href={`/${locale}`} className="text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>{t('home')}</Link>
          <p className="text-xs text-text-muted uppercase tracking-wide font-semibold">{t('products')}</p>
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/produkte/${p.slug}`}
              className="text-sm pl-2 py-1 text-text-muted hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              {p.name[locale as 'de' | 'en']}
            </Link>
          ))}
          <Link href={`/${locale}/ueber-uns`} className="text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>{t('about')}</Link>
          <Link href={`/${locale}/kontakt`} className="text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>{t('contact')}</Link>
          <Link href={switchPath} className="text-xs text-text-muted uppercase">{otherLocale}</Link>
          <Link
            href={`/${locale}/kontakt`}
            className="bg-primary text-white text-sm font-medium px-5 py-2 rounded-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            {t('cta')}
          </Link>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 3: Create `components/Footer.tsx`**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { PRODUCTS } from '@/lib/products'

export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const locale = useLocale()

  return (
    <footer className="bg-text-main text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <Image
            src="/images/21-04-07-Autologo-Normal.jpg"
            alt="Rolltop"
            width={120}
            height={40}
            className="h-10 w-auto object-contain mb-3 brightness-0 invert"
          />
          <p className="text-sm text-gray-400">{t('tagline')}</p>
        </div>

        {/* Nav */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">
            {tNav('products')}
          </p>
          <ul className="space-y-1">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${locale}/produkte/${p.slug}`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {p.name[locale as 'de' | 'en']}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">Kontakt</p>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Holzhäusernstrasse 32B</li>
            <li>6343 Rotkreuz</li>
            <li className="mt-2">
              <a href="tel:+41763886070" className="hover:text-white">+41 76 388 60 70</a>
            </li>
            <li>
              <a href="mailto:info@rolltop.ch" className="hover:text-white">info@rolltop.ch</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
        {t('copyright')}
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Type check**

```bash
npx tsc --noEmit 2>&1 | grep -E "(Navbar|Footer|layout)" | head -15
```
Expected: No type errors in these files.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add locale layout, Navbar with dropdown and Footer"
```

---

### Task 6: Homepage Components & Page

**Files:**
- Create: `components/Hero.tsx`
- Create: `components/UspSection.tsx`
- Create: `components/ProductCard.tsx`
- Create: `components/ProductGrid.tsx`
- Create: `components/AboutSection.tsx`
- Create: `components/ColorSwatches.tsx`
- Create: `app/[locale]/page.tsx`

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/bannerkorrekt.png"
        alt="Rolltop Insektenschutz"
        fill
        className="object-cover object-center"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a27]/80 via-[#2E5C3E]/60 to-[#4A7C59]/40" />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
        <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
          {t('headline')}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          {t('subheadline')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}/kontakt`}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            {t('cta_primary')} →
          </Link>
          <a
            href="#produkte"
            className="border-2 border-white/70 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-full transition-colors"
          >
            {t('cta_secondary')} ↓
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/UspSection.tsx`**

```tsx
import { useTranslations } from 'next-intl'

const USPS = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    titleKey: 'eco_title',
    descKey: 'eco_desc',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    titleKey: 'quality_title',
    descKey: 'quality_desc',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    titleKey: 'since_title',
    descKey: 'since_desc',
  },
] as const

export default function UspSection() {
  const t = useTranslations('usps')

  return (
    <section className="bg-primary-light py-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {USPS.map((usp) => (
          <div key={usp.titleKey} className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-4">
              {usp.icon}
            </div>
            <h3 className="font-serif text-xl font-semibold text-text-main mb-2">
              {t(usp.titleKey)}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">{t(usp.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `components/ProductCard.tsx`**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import type { Product } from '@/lib/products'

export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations('products')
  const locale = useLocale() as 'de' | 'en'

  return (
    <Link
      href={`/${locale}/produkte/${product.slug}`}
      className="group block bg-surface rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      {/* Green accent bar on hover */}
      <div className="h-1 bg-border group-hover:bg-primary transition-colors duration-300" />

      <div className="relative h-52 overflow-hidden">
        <Image
          src={product.heroImage}
          alt={product.name[locale]}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-text-main mb-2">
          {product.name[locale]}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed mb-4">
          {product.shortDesc[locale]}
        </p>
        <span className="text-sm font-medium text-primary group-hover:underline">
          {t('more')} →
        </span>
      </div>
    </Link>
  )
}
```

- [ ] **Step 4: Create `components/ProductGrid.tsx`**

```tsx
import { useTranslations } from 'next-intl'
import { PRODUCTS } from '@/lib/products'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  const t = useTranslations('products')

  return (
    <section id="produkte" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-main mb-3">
            {t('section_title')}
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">{t('section_desc')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create `components/AboutSection.tsx`**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function AboutSection() {
  const t = useTranslations('about')
  const locale = useLocale()

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-main mb-4">
            {t('section_title')}
          </h2>
          <p className="text-text-muted leading-relaxed mb-6">{t('text')}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {(['badge1', 'badge2', 'badge3'] as const).map((key) => (
              <span
                key={key}
                className="bg-primary-light text-primary text-sm font-medium px-3 py-1 rounded-full"
              >
                {t(key)}
              </span>
            ))}
          </div>
          <Link
            href={`/${locale}/ueber-uns`}
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
          >
            {t('cta')} →
          </Link>
        </div>

        {/* Image */}
        <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/images/bannerkorrekt.png"
            alt="Rolltop Team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/10" />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create `components/ColorSwatches.tsx`**

```tsx
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { COLOR_SWATCHES } from '@/lib/products'

export default function ColorSwatches() {
  const t = useTranslations('colors')

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-main mb-3">
          {t('section_title')}
        </h2>
        <p className="text-text-muted mb-10">{t('section_desc')}</p>

        <div className="flex flex-wrap justify-center gap-6">
          {COLOR_SWATCHES.map((swatch) => (
            <div key={swatch.key} className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-border shadow-sm">
                <Image
                  src={swatch.image}
                  alt={t(swatch.key as any)}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-text-muted text-center max-w-[80px]">
                {t(swatch.key as any)}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-text-muted italic">{t('special')}</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Create `app/[locale]/page.tsx`**

```tsx
import Hero from '@/components/Hero'
import UspSection from '@/components/UspSection'
import ProductGrid from '@/components/ProductGrid'
import AboutSection from '@/components/AboutSection'
import ColorSwatches from '@/components/ColorSwatches'
import ContactSection from '@/components/ContactSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <UspSection />
      <ProductGrid />
      <AboutSection />
      <ColorSwatches />
      <ContactSection />
    </>
  )
}
```

- [ ] **Step 8: Type check**

```bash
npx tsc --noEmit 2>&1 | head -30
```
Expected: No errors in component files (ContactSection may throw because it's not created yet — that's OK).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add homepage components (Hero, USPs, Products, About, Colors)"
```

---

### Task 7: Contact Form & Server Action

**Files:**
- Create: `app/actions/contact.ts`
- Create: `components/ContactForm.tsx`
- Create: `components/ContactSection.tsx`

**Note:** You need a Resend API key. Set it as `RESEND_API_KEY` in `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

- [ ] **Step 1: Create `app/actions/contact.ts`**

```ts
'use server'

import { Resend } from '@resend/node'

const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function sendContactEmail(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const product = formData.get('product') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { status: 'error', message: 'Bitte füllen Sie alle Pflichtfelder aus.' }
  }

  try {
    await resend.emails.send({
      from: 'Website <noreply@rolltop.ch>',
      to: 'info@rolltop.ch',
      subject: `Neue Beratungsanfrage: ${product || 'Allgemein'}`,
      html: `
        <h2>Neue Anfrage von ${name}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        ${product ? `<p><strong>Produkt:</strong> ${product}</p>` : ''}
        <p><strong>Nachricht:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    })
    return { status: 'success' }
  } catch {
    return { status: 'error' }
  }
}
```

- [ ] **Step 2: Create `components/ContactForm.tsx`**

```tsx
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { sendContactEmail, type ContactState } from '@/app/actions/contact'
import { useTranslations } from 'next-intl'
import { PRODUCTS } from '@/lib/products'

const initialState: ContactState = { status: 'idle' }

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-colors"
    >
      {pending ? '...' : label}
    </button>
  )
}

export default function ContactForm() {
  const t = useTranslations('contact')
  const locale = useLocale() as 'de' | 'en'
  const [state, formAction] = useFormState(sendContactEmail, initialState)

  if (state.status === 'success') {
    return (
      <div className="bg-primary-light border border-primary/20 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">✓</div>
        <p className="text-primary font-semibold">{t('success')}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-main mb-1">{t('name')} *</label>
          <input
            name="name"
            required
            className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-main mb-1">{t('email')} *</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-main mb-1">{t('phone')}</label>
          <input
            name="phone"
            type="tel"
            className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-main mb-1">{t('product')}</label>
          <select
            name="product"
            className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
          >
            <option value="">{t('product_placeholder')}</option>
            {PRODUCTS.map((p) => (
              <option key={p.slug} value={p.name.de}>
                {p.name[locale as 'de' | 'en']}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-main mb-1">{t('message')} *</label>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background resize-none"
        />
      </div>

      {state.status === 'error' && (
        <p className="text-red-600 text-sm">{state.message ?? t('error')}</p>
      )}

      <SubmitButton label={t('submit')} />
    </form>
  )
}
```

- [ ] **Step 3: Create `components/ContactSection.tsx`**

```tsx
import { useTranslations } from 'next-intl'
import ContactForm from './ContactForm'

export default function ContactSection() {
  const t = useTranslations('contact')

  return (
    <section id="kontakt" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-main mb-3">
            {t('section_title')}
          </h2>
          <p className="text-text-muted">{t('section_desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <ContactForm />

          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                {t('address_label')}
              </p>
              <p className="text-text-main">{t('address')}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                {t('phone_label')}
              </p>
              <p>
                <a href="tel:+41763886070" className="text-primary hover:underline">
                  Dario Hermann: +41 76 388 60 70
                </a>
              </p>
              <p>
                <a href="tel:+41765720607" className="text-primary hover:underline">
                  Heinz Hermann: +41 76 572 06 07
                </a>
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                {t('email_label')}
              </p>
              <a href="mailto:info@rolltop.ch" className="text-primary hover:underline">
                info@rolltop.ch
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                {t('hours_label')}
              </p>
              <p className="text-text-main">{t('hours')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Type check**

```bash
npx tsc --noEmit 2>&1 | head -30
```
Expected: No errors in contact files.

- [ ] **Step 5: Smoke test in dev server**

```bash
npm run dev
```
Open `http://localhost:3000` — should redirect to `/de`. Fill in the form and verify it submits (if RESEND_API_KEY is set).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add contact form with Server Action and Resend email"
```

---

### Task 8: Product Detail Pages

**Files:**
- Create: `app/[locale]/produkte/[slug]/page.tsx`

- [ ] **Step 1: Create `app/[locale]/produkte/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getProduct, PRODUCTS, COLOR_SWATCHES } from '@/lib/products'

export function generateStaticParams() {
  const locales = ['de', 'en']
  return locales.flatMap((locale) =>
    PRODUCTS.map((p) => ({ locale, slug: p.slug }))
  )
}

type Props = {
  params: { locale: string; slug: string }
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct(params.slug)
  if (!product) notFound()

  const locale = params.locale as 'de' | 'en'
  const t = await getTranslations({ locale, namespace: 'product_detail' })
  const tColors = await getTranslations({ locale, namespace: 'colors' })

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src={product.heroImage}
          alt={product.name[locale]}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a27]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="font-serif text-3xl md:text-5xl font-bold">{product.name[locale]}</h1>
          <p className="text-white/80 mt-2 max-w-xl">{product.shortDesc[locale]}</p>
        </div>
      </section>

      {/* Variants */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-text-main mb-8">{t('variants')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {product.variants.map((variant) => (
            <div
              key={variant.name[locale]}
              className="bg-surface rounded-2xl overflow-hidden border border-border shadow-sm"
            >
              <div className="relative h-52">
                <Image
                  src={variant.image}
                  alt={variant.name[locale]}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold text-text-main mb-2">
                  {variant.name[locale]}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{variant.description[locale]}</p>
                {variant.dimensions && (
                  <p className="mt-3 text-xs font-medium text-primary bg-primary-light px-3 py-1 rounded-full inline-block">
                    {t('dimensions')}: {variant.dimensions[locale]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fabric */}
      <section className="py-10 bg-primary-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-xl font-bold text-text-main mb-2">{t('fabric')}</h2>
          <p className="text-text-muted">{t('fabric_desc')}</p>
        </div>
      </section>

      {/* Colors */}
      <section className="py-16 max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-2xl font-bold text-text-main mb-8">{t('colors')}</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {COLOR_SWATCHES.map((swatch) => (
            <div key={swatch.key} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-border shadow-sm">
                <Image
                  src={swatch.image}
                  alt={tColors(swatch.key as any)}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-text-muted text-center max-w-[70px]">
                {tColors(swatch.key as any)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-text-main text-white text-center">
        <h2 className="font-serif text-2xl font-bold mb-4">{t('cta')}</h2>
        <Link
          href={`/${locale}/kontakt?produkt=${encodeURIComponent(product.name[locale])}`}
          className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          {t('cta')} →
        </Link>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: No type errors.

- [ ] **Step 3: Test in dev**

```bash
npm run dev
```
Open `http://localhost:3000/de/produkte/spannrahmen` — should show Spannrahmen page with Clipfix and Vario variants. Open `http://localhost:3000/de/produkte/drehtuer` — should show Max, Slim, Pendel.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add product detail pages with variants, colors, and CTA"
```

---

### Task 9: Über Uns Page

**Files:**
- Create: `app/[locale]/ueber-uns/page.tsx`

- [ ] **Step 1: Create `app/[locale]/ueber-uns/page.tsx`**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

type Props = { params: { locale: string } }

export default async function UeberUnsPage({ params }: Props) {
  const locale = params.locale as 'de' | 'en'
  const t = await getTranslations({ locale, namespace: 'about_page' })

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-primary-light py-16 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-text-main">{t('title')}</h1>
      </section>

      {/* History */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-text-main mb-4">{t('history_title')}</h2>
        <p className="text-text-muted leading-relaxed text-lg">{t('history')}</p>
      </section>

      {/* Team */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-2xl font-bold text-text-main mb-10 text-center">{t('team_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Heinz */}
            <div className="bg-background rounded-2xl p-6 border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold mb-4">
                H
              </div>
              <h3 className="font-serif text-xl font-semibold text-text-main">Heinz Hermann</h3>
              <p className="text-sm text-primary font-medium mb-3">{t('heinz_title')}</p>
              <p className="text-sm text-text-muted leading-relaxed">{t('heinz_desc')}</p>
            </div>
            {/* Dario */}
            <div className="bg-background rounded-2xl p-6 border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold mb-4">
                D
              </div>
              <h3 className="font-serif text-xl font-semibold text-text-main">Dario Hermann</h3>
              <p className="text-sm text-primary font-medium mb-3">{t('dario_title')}</p>
              <p className="text-sm text-text-muted leading-relaxed">{t('dario_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-text-main mb-10 text-center">{t('values_title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['1', '2', '3'] as const).map((n) => (
            <div key={n} className="text-center p-6 bg-surface rounded-2xl border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-main mb-2">
                {t(`val${n}_title` as any)}
              </h3>
              <p className="text-sm text-text-muted">{t(`val${n}_desc` as any)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <h2 className="font-serif text-2xl font-bold mb-4">{t('cta')}</h2>
        <Link
          href={`/${locale}/kontakt`}
          className="inline-block bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-full transition-colors"
        >
          {t('cta')} →
        </Link>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Type check & dev test**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Open `http://localhost:3000/de/ueber-uns` — should show history, team cards (H/D initials), values, and CTA.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Über Uns page with team and values"
```

---

### Task 10: Kontakt Page

**Files:**
- Create: `app/[locale]/kontakt/page.tsx`

- [ ] **Step 1: Create `app/[locale]/kontakt/page.tsx`**

```tsx
import { getTranslations } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'

type Props = { params: { locale: string } }

export default async function KontaktPage({ params }: Props) {
  const locale = params.locale as 'de' | 'en'
  const t = await getTranslations({ locale, namespace: 'contact_page' })
  const tContact = await getTranslations({ locale, namespace: 'contact' })

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-primary-light py-16 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-text-main mb-2">{t('title')}</h1>
        <p className="text-text-muted">{t('subtitle')}</p>
      </section>

      {/* Main content */}
      <section className="py-16 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <ContactForm />
        </div>

        {/* Info + Map */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
              {tContact('address_label')}
            </p>
            <p className="text-text-main">{tContact('address')}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
              {tContact('phone_label')}
            </p>
            <p>
              <a href="tel:+41763886070" className="text-primary hover:underline">
                Dario Hermann: +41 76 388 60 70
              </a>
            </p>
            <p>
              <a href="tel:+41765720607" className="text-primary hover:underline">
                Heinz Hermann: +41 76 572 06 07
              </a>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
              {tContact('email_label')}
            </p>
            <a href="mailto:info@rolltop.ch" className="text-primary hover:underline">
              info@rolltop.ch
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
              {tContact('hours_label')}
            </p>
            <p className="text-text-main">{tContact('hours')}</p>
          </div>

          {/* Google Maps embed */}
          {/* NOTE: Replace the src URL below with a real Google Maps embed URL.
              Go to maps.google.com → search "Holzhäusernstrasse 32B, 6343 Rotkreuz" → Share → Embed a map → copy the src */}
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm h-60 mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2714.5!2d8.4274!3d47.1437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479aa5e1e1e1e1e1%3A0x0!2sHolzh%C3%A4usernstrasse%2032B%2C%206343%20Rotkreuz!5e0!3m2!1sde!2sch!4v1720000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rolltop Standort"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Type check & dev test**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Open `http://localhost:3000/de/kontakt` — should show contact form + info + map embed.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Kontakt page with form, contact info, and Google Maps embed"
```

---

### Task 11: Final Build Check & Vercel Deploy

**Files:** No new files.

- [ ] **Step 1: Full type check**

```bash
npx tsc --noEmit
```
Expected: Exit code 0, no errors.

- [ ] **Step 2: Production build**

```bash
npm run build
```
Expected: Build completes successfully. Check output for any pre-render errors.

- [ ] **Step 3: Create `.env.local` with Resend key**

```bash
# Add to .env.local (NOT committed):
echo "RESEND_API_KEY=re_your_key_here" >> .env.local
```

Add `.env.local` to `.gitignore` (should already be there from create-next-app).

- [ ] **Step 4: Deploy to Vercel**

```bash
npx vercel --prod
```

When prompted:
- Link to existing project or create new
- Set environment variable `RESEND_API_KEY` in Vercel dashboard under Settings → Environment Variables

- [ ] **Step 5: Verify production**

Visit the deployed URL:
- `[url]/de` — Homepage loads with hero, products, etc.
- `[url]/en` — English version loads
- `[url]/de/produkte/spannrahmen` — Product page loads
- `[url]/de/kontakt` — Contact form submits successfully
- Mobile: hamburger menu opens/closes

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete Rolltop website — all pages, i18n, contact form, Vercel deploy"
```
