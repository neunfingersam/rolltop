import { getTranslations } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'

type Props = { params: { locale: string } }

export default async function KontaktPage({ params }: Props) {
  const locale = params.locale as 'de' | 'en'
  const t = await getTranslations({ locale, namespace: 'contact_page' })
  const tContact = await getTranslations({ locale, namespace: 'contact' })

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-primary-light py-16 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-text-main mb-2">{t('title')}</h1>
        <p className="text-text-muted">{t('subtitle')}</p>
      </section>

      {/* Main content */}
      <section className="py-16 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <ContactForm />
        </div>

        {/* Info + Map */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
              {tContact('address_label')}
            </p>
            <p className="text-text-main">{tContact('address')}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
              {tContact('phone_label')}
            </p>
            <p>
              <a href="tel:+41763886070" className="text-primary hover:underline">
                Dario Hermann: +41 76 388 60 70
              </a>
            </p>
            <p>
              <a href="tel:+41765720607" className="text-primary hover:underline">
                Heinz Hermann: +41 76 572 06 07
              </a>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
              {tContact('email_label')}
            </p>
            <a href="mailto:info@rolltop.ch" className="text-primary hover:underline">
              info@rolltop.ch
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
              {tContact('hours_label')}
            </p>
            <p className="text-text-main">{tContact('hours')}</p>
          </div>

          {/* Google Maps embed */}
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm h-60 mt-4">
            <iframe
              src="https://maps.google.com/maps?q=Holzh%C3%A4usernstrasse+32B+6343+Rotkreuz&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rolltop Standort"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
