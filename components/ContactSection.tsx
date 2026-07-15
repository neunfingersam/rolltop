import { getTranslations } from 'next-intl/server'
import ContactForm from './ContactForm'

export default async function ContactSection() {
  const t = await getTranslations('contact')

  return (
    <section id="kontakt" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-main mb-3">
            {t('section_title')}
          </h2>
          <p className="text-text-muted">{t('section_desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <ContactForm />

          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                {t('address_label')}
              </p>
              <p className="text-text-main">{t('address')}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                {t('phone_label')}
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
                {t('email_label')}
              </p>
              <a href="mailto:info@rolltop.ch" className="text-primary hover:underline">
                info@rolltop.ch
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                {t('hours_label')}
              </p>
              <p className="text-text-main">{t('hours')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
