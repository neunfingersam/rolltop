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
