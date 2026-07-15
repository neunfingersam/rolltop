'use client'

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
