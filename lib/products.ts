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
