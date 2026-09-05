import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      console.log('📧 Contact form (no API key):', { name, email, phone, message })
      return NextResponse.json({
        success: true,
        message: 'Message received! (Set RESEND_API_KEY in Vercel to enable email delivery)',
      })
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'alaminhossain.me <onboarding@resend.dev>',
      to: ['contact@alaminhossain.me', 'developeralamin17@gmail.com'],
      replyTo: email,
      subject: `New message from ${name} — alaminhossain.me`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0e27; color: #fff; border-radius: 12px;">
          <h2 style="color: #00d4e8; margin-bottom: 20px;">📬 New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; width: 120px;">Name</td>
              <td style="padding: 8px 0; color: #fff;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9ca3af;">Email</td>
              <td style="padding: 8px 0; color: #fff;"><a href="mailto:${email}" style="color: #00d4e8;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; color: #9ca3af;">Phone</td>
              <td style="padding: 8px 0; color: #fff;">${phone}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; color: #fff; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #1e293b; margin: 20px 0;">
          <p style="color: #64748b; font-size: 12px;">Sent from alaminhossain.me contact form</p>
        </div>
      `,
      text: `New message from ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\n\nMessage:\n${message}`,
    })

    return NextResponse.json({ success: true, message: 'Message sent successfully!' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
