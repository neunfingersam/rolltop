'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { PRODUCTS } from '@/lib/products'

export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const locale = useLocale()

  return (
    <footer className="bg-text-main text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <Image
            src="/images/logo-transparent.png"
            alt="Rolltop"
            width={120}
            height={120}
            className="h-10 w-auto object-contain mb-3"
          />
          <p className="text-sm text-gray-400">{t('tagline')}</p>
        </div>

        {/* Nav */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">
            {tNav('products')}
          </p>
          <ul className="space-y-1">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${locale}/produkte/${p.slug}`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {p.name[locale as 'de' | 'en']}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">{tNav('contact')}</p>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Holzhäusernstrasse 32B</li>
            <li>6343 Rotkreuz</li>
            <li className="mt-2">
              <a href="tel:+41763886070" className="hover:text-white">+41 76 388 60 70</a>
            </li>
            <li>
              <a href="mailto:info@rolltop.ch" className="hover:text-white">info@rolltop.ch</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
        {t('copyright')}
      </div>
    </footer>
  )
}
