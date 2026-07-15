import type { Metadata } from 'next'
import Hero from '@/components/Hero'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isDE = params.locale === 'de'
  return {
    title: isDE
      ? 'Insektenschutz Zentralschweiz – Rolltop GmbH Rotkreuz'
      : 'Insect Protection Central Switzerland – Rolltop GmbH',
    description: isDE
      ? 'Ihr Spezialist für Insektenschutz in der Zentralschweiz. Rolladen, Plissee, Schiebetüren & mehr. Kostenlose Beratung, Montage und Reparatur seit 2010 in Rotkreuz.'
      : 'Your specialist for insect protection in Central Switzerland. Roller blinds, pleated blinds, sliding doors & more. Free consultation, installation and repair since 2010.',
    alternates: {
      canonical: `https://rolltop.ch/${params.locale}`,
      languages: { 'de': 'https://rolltop.ch/de', 'en': 'https://rolltop.ch/en' },
    },
    openGraph: {
      url: `https://rolltop.ch/${params.locale}`,
      title: isDE ? 'Rolltop – Insektenschutz Zentralschweiz' : 'Rolltop – Insect Protection Switzerland',
      description: isDE
        ? 'Professioneller Insektenschutz seit 2010. Beratung, Montage & Reparatur in Rotkreuz und Umgebung.'
        : 'Professional insect protection since 2010. Consultation, installation & repair in Rotkreuz and surroundings.',
    },
  }
}
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
