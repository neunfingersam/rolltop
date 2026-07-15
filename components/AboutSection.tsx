'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function AboutSection() {
  const t = useTranslations('about')
  const locale = useLocale()

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-main mb-4">
            {t('section_title')}
          </h2>
          <p className="text-text-muted leading-relaxed mb-6">{t('text')}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {(['badge1', 'badge2', 'badge3'] as const).map((key) => (
              <span
                key={key}
                className="bg-primary-light text-primary text-sm font-medium px-3 py-1 rounded-full"
              >
                {t(key)}
              </span>
            ))}
          </div>
          <Link
            href={`/${locale}/ueber-uns`}
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
          >
            {t('cta')} →
          </Link>
        </div>

        {/* Image */}
        <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/images/team.jpg"
            alt="Rolltop Team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/10" />
        </div>
      </div>
    </section>
  )
}
