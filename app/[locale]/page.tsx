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
