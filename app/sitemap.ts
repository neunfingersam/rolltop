import type { MetadataRoute } from 'next'
import { PRODUCTS } from '@/lib/products'

const BASE = 'https://rolltop.ch'
const locales = ['de', 'en']

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/ueber-uns', '/kontakt']

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE}/${l}${page}`])
        ),
      },
    }))
  )

  const productEntries = locales.flatMap((locale) =>
    PRODUCTS.map((product) => ({
      url: `${BASE}/${locale}/produkte/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE}/${l}/produkte/${product.slug}`])
        ),
      },
    }))
  )

  return [...staticEntries, ...productEntries] as MetadataRoute.Sitemap
}
