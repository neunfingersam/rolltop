'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/bannerkorrekt.png"
        alt="Rolltop Insektenschutz"
        fill
        className="object-cover object-center"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a27]/80 via-[#2E5C3E]/60 to-[#4A7C59]/40" />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
        <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
          {t('headline')}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          {t('subheadline')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}/kontakt`}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            {t('cta_primary')} →
          </Link>
          <a
            href="#produkte"
            className="border-2 border-white/70 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-full transition-colors"
          >
            {t('cta_secondary')} ↓
          </a>
        </div>
      </div>
    </section>
  )
}
