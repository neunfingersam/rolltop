'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function sendContactEmail(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const product = formData.get('product') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { status: 'error', message: 'Bitte füllen Sie alle Pflichtfelder aus.' }
  }

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safePhone = phone ? escapeHtml(phone) : ''
  const safeProduct = product ? escapeHtml(product) : ''
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

  try {
    await resend.emails.send({
      from: 'Website <noreply@rolltop.ch>',
      to: 'info@rolltop.ch',
      subject: `Neue Beratungsanfrage: ${safeProduct || 'Allgemein'}`,
      html: `
        <h2>Neue Anfrage von ${safeName}</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>E-Mail:</strong> ${safeEmail}</p>
        ${safePhone ? `<p><strong>Telefon:</strong> ${safePhone}</p>` : ''}
        ${safeProduct ? `<p><strong>Produkt:</strong> ${safeProduct}</p>` : ''}
        <p><strong>Nachricht:</strong><br>${safeMessage}</p>
      `,
      replyTo: email,
    })
    return { status: 'success' }
  } catch {
    return { status: 'error' }
  }
}
