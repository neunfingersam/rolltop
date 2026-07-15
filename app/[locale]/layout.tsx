import { Fraunces, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import '../globals.css'

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

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Rolltop Insektenschutzsysteme GmbH',
  description: 'Professioneller Insektenschutz für Fenster, Türen & mehr. Beratung, Montage und Reparatur seit 2010.',
  url: 'https://rolltop.ch',
  telephone: '+41763886070',
  email: 'info@rolltop.ch',
  foundingDate: '2010',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Holzhäusernstrasse 32B',
    addressLocality: 'Rotkreuz',
    postalCode: '6343',
    addressCountry: 'CH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.1432,
    longitude: 8.4282,
  },
  areaServed: ['Rotkreuz', 'Zug', 'Luzern', 'Zentralschweiz'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:30',
      closes: '17:00',
    },
  ],
  priceRange: '$$',
  image: 'https://rolltop.ch/images/BannerNeu.jpg',
  logo: 'https://rolltop.ch/images/logo-transparent.png',
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  return (
    <html lang={locale} className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
