'use server'

import { headers } from 'next/headers'

type ContactState =
  | { status: 'idle' | 'success'; message?: string }
  | { status: 'error'; message: string }

function getEnv(name: string) {
  const value = process.env[name]
  return value && value.trim().length > 0 ? value : undefined
}

export async function sendContact(prevState: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const projectType = String(formData.get('projectType') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !email || !message) {
    return { status: 'error', message: '请填写 Name、Email 和 Message。' }
  }

  const resendKey = getEnv('RESEND_API_KEY')
  const fromEmail = getEnv('FROM_EMAIL')
  const toEmail = getEnv('TO_EMAIL')

  const h = await headers()
  const meta = {
    ip: h.get('x-forwarded-for') ?? 'unknown',
    ua: h.get('user-agent') ?? 'unknown',
  }

  if (!resendKey || !fromEmail || !toEmail) {
    console.log('[Contact][Fallback]', { name, email, projectType, message, meta })
    return { status: 'success', message: '已收到你的消息，我会尽快回复。' }
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(resendKey)

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${name} — ${projectType || 'New Project'}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project Type: ${projectType}`,
        '',
        message,
        '',
        `IP: ${meta.ip}`,
        `UA: ${meta.ua}`,
      ].join('\n'),
    })

    return { status: 'success', message: '发送成功，感谢你。' }
  } catch (error) {
    console.error('[Contact][Resend] Failed:', error)
    return { status: 'error', message: '发送失败，请稍后重试。' }
  }
}
