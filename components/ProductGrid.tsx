'use client'

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
