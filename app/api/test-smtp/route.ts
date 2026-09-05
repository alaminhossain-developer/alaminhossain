import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY not set' }, { status: 500 })
  }

  try {
    const resend = new Resend(apiKey)

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['developeralamin17@gmail.com'],
      subject: '✅ Test email from alaminhossain.me',
      html: '<h2 style="color: #00d4e8;">Email is working!</h2><p>Your contact form is now configured correctly.</p>',
      text: 'Email is working!',
    })

    if (error) {
      return NextResponse.json({ error: error.message || JSON.stringify(error) }, { status: 500 })
    }

    return NextResponse.json({ success: true, messageId: data?.id, message: 'Test email sent!' })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : JSON.stringify(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
