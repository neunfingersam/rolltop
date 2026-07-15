'use client'

import { Suspense } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import { sendContactEmail, type ContactState } from '@/app/actions/contact'
import { useTranslations, useLocale } from 'next-intl'
import { PRODUCTS } from '@/lib/products'

const initialState: ContactState = { status: 'idle' }

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-colors"
    >
      {pending ? '...' : label}
    </button>
  )
}

function ContactFormInner() {
  const t = useTranslations('contact')
  const locale = useLocale() as 'de' | 'en'
  const [state, formAction] = useFormState(sendContactEmail, initialState)
  const searchParams = useSearchParams()
  const preselectedProduct = searchParams.get('produkt') ?? ''

  if (state.status === 'success') {
    return (
      <div className="bg-primary-light border border-primary/20 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">✓</div>
        <p className="text-primary font-semibold">{t('success')}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-main mb-1">{t('name')} *</label>
          <input
            name="name"
            required
            className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-main mb-1">{t('email')} *</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-main mb-1">{t('phone')}</label>
          <input
            name="phone"
            type="tel"
            className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-main mb-1">{t('product')}</label>
          <select
            name="product"
            defaultValue={preselectedProduct}
            className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
          >
            <option value="">{t('product_placeholder')}</option>
            {PRODUCTS.map((p) => (
              <option key={p.slug} value={p.name[locale]}>
                {p.name[locale]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-main mb-1">{t('message')} *</label>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background resize-none"
        />
      </div>

      {state.status === 'error' && (
        <p className="text-red-600 text-sm">{state.message ?? t('error')}</p>
      )}

      <SubmitButton label={t('submit')} />
    </form>
  )
}

export default function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormInner />
    </Suspense>
  )
}
