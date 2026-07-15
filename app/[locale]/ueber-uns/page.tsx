import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

type Props = { params: { locale: string } }

export default async function UeberUnsPage({ params }: Props) {
  const locale = params.locale as 'de' | 'en'
  const t = await getTranslations({ locale, namespace: 'about_page' })

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-primary-light py-16 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-text-main">{t('title')}</h1>
      </section>

      {/* History */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-text-main mb-4">{t('history_title')}</h2>
        <p className="text-text-muted leading-relaxed text-lg">{t('history')}</p>
      </section>

      {/* Team */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-2xl font-bold text-text-main mb-10 text-center">{t('team_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Heinz */}
            <div className="bg-background rounded-2xl p-6 border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold mb-4">
                H
              </div>
              <h3 className="font-serif text-xl font-semibold text-text-main">Heinz Hermann</h3>
              <p className="text-sm text-primary font-medium mb-3">{t('heinz_title')}</p>
              <p className="text-sm text-text-muted leading-relaxed">{t('heinz_desc')}</p>
            </div>
            {/* Dario */}
            <div className="bg-background rounded-2xl p-6 border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold mb-4">
                D
              </div>
              <h3 className="font-serif text-xl font-semibold text-text-main">Dario Hermann</h3>
              <p className="text-sm text-primary font-medium mb-3">{t('dario_title')}</p>
              <p className="text-sm text-text-muted leading-relaxed">{t('dario_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-text-main mb-10 text-center">{t('values_title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['1', '2', '3'] as const).map((n) => (
            <div key={n} className="text-center p-6 bg-surface rounded-2xl border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-main mb-2">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {t(`val${n}_title` as any)}
              </h3>
              <p className="text-sm text-text-muted">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {t(`val${n}_desc` as any)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <h2 className="font-serif text-2xl font-bold mb-4">{t('cta')}</h2>
        <Link
          href={`/${locale}/kontakt`}
          className="inline-block bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-full transition-colors"
        >
          {t('cta')} →
        </Link>
      </section>
    </div>
  )
}
