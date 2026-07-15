import Hero from '@/components/Hero'
import UspSection from '@/components/UspSection'
import ProductGrid from '@/components/ProductGrid'
import AboutSection from '@/components/AboutSection'
import ColorSwatches from '@/components/ColorSwatches'
// ContactSection will be added in Task 7

export default function HomePage() {
  return (
    <>
      <Hero />
      <UspSection />
      <ProductGrid />
      <AboutSection />
      <ColorSwatches />
      {/* <ContactSection /> — placeholder for Task 7 */}
    </>
  )
}
