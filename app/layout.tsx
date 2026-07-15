import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://rolltop.ch'),
  title: {
    default: 'Rolltop Insektenschutzsysteme GmbH – Insektenschutz Zentralschweiz',
    template: '%s | Rolltop Insektenschutz',
  },
  description: 'Professioneller Insektenschutz für Fenster, Türen & mehr. Beratung, Montage und Reparatur seit 2010 in Rotkreuz, Zug und der ganzen Zentralschweiz.',
  keywords: ['Insektenschutz', 'Fliegengitter', 'Insektenschutz Schweiz', 'Insektenschutz Rotkreuz', 'Insektenschutz Zug', 'Rollladen Insektenschutz', 'Plissee', 'Schiebetür Insektenschutz', 'Montage Insektenschutz Zentralschweiz'],
  authors: [{ name: 'Rolltop Insektenschutzsysteme GmbH' }],
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    alternateLocale: 'en_US',
    siteName: 'Rolltop Insektenschutzsysteme GmbH',
    images: [{ url: '/images/BannerNeu.jpg', width: 3584, height: 1184, alt: 'Rolltop Insektenschutzsysteme GmbH' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/BannerNeu.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://rolltop.ch',
    languages: { 'de': 'https://rolltop.ch/de', 'en': 'https://rolltop.ch/en' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement
}
