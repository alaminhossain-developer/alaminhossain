import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET() {
  const smtpPass = process.env.SMTP_PASS

  if (!smtpPass) {
    return NextResponse.json({ error: 'SMTP_PASS not set in environment variables' }, { status: 500 })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'mail.alaminhossain.me',
      port: 465,
      secure: true,
      auth: {
        user: 'contact@alaminhossain.me',
        pass: smtpPass,
      },
      connectionTimeout: 10000,
    })

    // Verify connection
    await transporter.verify()

    // Send test email
    await transporter.sendMail({
      from: '"Portfolio Test" <contact@alaminhossain.me>',
      to: 'contact@alaminhossain.me',
      subject: '✅ Test email from alaminhossain.me',
      html: '<h2 style="color: #00d4e8;">Email is working!</h2><p>Your contact form is now configured correctly.</p>',
      text: 'Email is working! Your contact form is now configured correctly.',
    })

    return NextResponse.json({ success: true, message: 'SMTP connection verified and test email sent!' })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
