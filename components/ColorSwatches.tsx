'use client'

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
