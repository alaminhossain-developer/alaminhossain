import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    // Web3Forms — free tier, 200 submissions/month
    // User needs to sign up at https://web3forms.com and get an access key
    // Then add WEB3FORMS_KEY to Vercel environment variables
    const accessKey = process.env.WEB3FORMS_KEY

    if (!accessKey) {
      // Fallback: log to console if no key set
      console.log('📨 Contact form submission:', { name, email, phone, message })
      return NextResponse.json({
        success: true,
        message: 'Message received! (Email not configured — set WEB3FORMS_KEY in Vercel)',
      })
    }

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        phone: phone || '',
        message,
        subject: `New message from ${name} — alaminhossain.me`,
        from_name: 'alaminhossain.me Contact Form',
      }),
    })

    const data = await res.json()

    if (data.success) {
      return NextResponse.json({ success: true, message: 'Message sent successfully!' })
    } else {
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
