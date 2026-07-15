'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

  try {
    await resend.emails.send({
      from: 'Website <noreply@rolltop.ch>',
      to: 'info@rolltop.ch',
      subject: `Neue Beratungsanfrage: ${product || 'Allgemein'}`,
      html: `
        <h2>Neue Anfrage von ${name}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        ${product ? `<p><strong>Produkt:</strong> ${product}</p>` : ''}
        <p><strong>Nachricht:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    })
    return { status: 'success' }
  } catch {
    return { status: 'error' }
  }
}
