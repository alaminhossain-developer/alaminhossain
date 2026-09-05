import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY not set in environment variables' }, { status: 500 })
  }

  try {
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'alaminhossain.me <onboarding@resend.dev>',
      to: ['contact@alaminhossain.me', 'developeralamin17@gmail.com'],
      subject: '✅ Test email from alaminhossain.me',
      html: '<h2 style="color: #00d4e8;">Email is working!</h2><p>Your contact form is now configured correctly.</p>',
      text: 'Email is working! Your contact form is now configured correctly.',
    })

    return NextResponse.json({ success: true, message: 'Test email sent! Check your inbox.' })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
