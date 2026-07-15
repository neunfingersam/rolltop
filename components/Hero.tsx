'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1a10]">
      {/* Banner — nur auf Desktop sichtbar */}
      <Image
        src="/images/BannerNeu.jpg"
        alt="Rolltop Insektenschutz"
        fill
        className="hidden md:block object-cover object-center"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
        <p className="text-primary-light/80 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-3">
          Rolltop Insektenschutzsysteme GmbH
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
          {t('headline')}
        </h1>
        <p className="text-base md:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
          {t('subheadline')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6 sm:mt-16">
          <Link
            href={`/${locale}/kontakt`}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-lg"
          >
            {t('cta_primary')} →
          </Link>
          <a
            href="#produkte"
            className="border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-full transition-colors"
          >
            {t('cta_secondary')} ↓
          </a>
        </div>
      </div>
    </section>
  )
}
