'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { PRODUCTS } from '@/lib/products'

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const currentLocale = useLocale()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const otherLocale = currentLocale === 'de' ? 'en' : 'de'
  const switchPath = pathname.replace(`/${currentLocale}`, `/${otherLocale}`)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a1a10] shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="/images/logo-transparent.png"
            alt="Rolltop Logo"
            width={120}
            height={120}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href={`/${locale}`} className="text-sm font-medium text-white/90 hover:text-white transition-colors">
            {t('home')}
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="text-sm font-medium text-white/90 hover:text-white transition-colors flex items-center gap-1">
              {t('products')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-[#0a1a10] rounded-xl shadow-md border border-white/10 py-2 min-w-[200px]">
                {PRODUCTS.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/${locale}/produkte/${product.slug}`}
                    className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {product.name[locale as 'de' | 'en']}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href={`/${locale}/ueber-uns`} className="text-sm font-medium text-white/90 hover:text-white transition-colors">
            {t('about')}
          </Link>
          <Link href={`/${locale}/kontakt`} className="text-sm font-medium text-white/90 hover:text-white transition-colors">
            {t('contact')}
          </Link>
        </nav>

        {/* Desktop: Sprache + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href={switchPath} className="text-xs font-medium uppercase tracking-wide text-white/70 hover:text-white transition-colors">
            {otherLocale}
          </Link>
          <Link href={`/${locale}/kontakt`} className="text-sm font-medium px-5 py-2 rounded-full bg-primary hover:bg-primary-dark text-white transition-colors">
            {t('cta')}
          </Link>
        </div>

        {/* Mobile: Sprache + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <Link href={switchPath} className="text-xs font-medium uppercase tracking-wide text-white/70 hover:text-white transition-colors">
            {otherLocale}
          </Link>
          <button className="text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a1a10] border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          <Link href={`/${locale}`} className="text-sm font-medium text-white py-2" onClick={() => setMenuOpen(false)}>{t('home')}</Link>
          <p className="text-xs text-white/50 uppercase tracking-wide font-semibold">{t('products')}</p>
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/produkte/${p.slug}`}
              className="text-sm pl-2 py-1 text-white/70 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {p.name[locale as 'de' | 'en']}
            </Link>
          ))}
          <Link href={`/${locale}/ueber-uns`} className="text-sm font-medium text-white py-2" onClick={() => setMenuOpen(false)}>{t('about')}</Link>
          <Link href={`/${locale}/kontakt`} className="text-sm font-medium text-white py-2" onClick={() => setMenuOpen(false)}>{t('contact')}</Link>
          <Link href={`/${locale}/kontakt`} className="bg-primary text-white text-sm font-medium px-5 py-2 rounded-full text-center" onClick={() => setMenuOpen(false)}>
            {t('cta')}
          </Link>
        </div>
      )}
    </header>
  )
}
