import { NextResponse } from "next/server"

interface ContactPayload {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL || "n.aden1208@gmail.com"

  if (!apiKey) return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 })

  const body = (await req.json()) as Partial<ContactPayload & { website?: string }>

  // Honeypot CAPTCHA: reject if hidden field is filled
  if (body.website) return NextResponse.json({ error: "Invalid submission" }, { status: 400 })

  const { firstName, lastName, email, subject, message } = body

  if (!firstName || !lastName || !email || !subject || !message)
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })

  // Basic sanitization to avoid HTML injection in email body
  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")

  const safe = {
    firstName: escapeHtml(firstName),
    lastName: escapeHtml(lastName),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message),
  }

  const content = `📧 NEW CONTACT FORM SUBMISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${safe.firstName} ${safe.lastName}
📧 Email: ${safe.email}
📝 Subject: ${safe.subject}

💬 Message:
${safe.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Sent: ${new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}
🌐 From: nouradin.com

Reply directly to this email or visit: https://nouradin.com`

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; background: #050010; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; min-height: 100vh;">
      <div style="padding: 24px; max-width: 600px; margin: 0 auto;">
        <!-- Single Main Card -->
        <div style="background: white; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #050010 0%, #1a0a2e 50%, #16213e 100%); padding: 40px 32px; text-align: center; color: white; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"dots\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"><circle cx=\"10\" cy=\"10\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23dots)\"/></svg>') repeat; opacity: 0.3;"></div>
            <div style="position: relative; z-index: 1;">
              <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.15); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.2);">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">New Contact Form Submission</h1>
              <p style="margin: 12px 0 0; font-size: 18px; opacity: 0.9;">Someone wants to connect with you!</p>
            </div>
          </div>

          <!-- Single Content Container -->
          <div style="padding: 40px 32px;">
            
            <!-- Contact Information -->
            <div style="margin-bottom: 32px;">
              <h3 style="margin: 0 0 20px; font-size: 18px; font-weight: 700; color: #050010; text-transform: uppercase; letter-spacing: 1px; text-align: center;">Contact Information</h3>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
                <div>
                  <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                  <p style="margin: 0; font-size: 20px; font-weight: 600; color: #1f2937;">${safe.firstName} ${safe.lastName}</p>
                </div>
                <div>
                  <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                  <p style="margin: 0; font-size: 18px; font-weight: 500; color: #1f2937; word-break: break-all;">${safe.email}</p>
                </div>
              </div>
            </div>

            <!-- Subject -->
            <div style="margin-bottom: 32px;">
              <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Subject</p>
              <p style="margin: 0; font-size: 20px; font-weight: 600; color: #1f2937;">${safe.subject}</p>
            </div>

            <!-- Message -->
            <div style="margin-bottom: 40px;">
              <p style="margin: 0 0 12px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
              <div style="background: #f8fafc; border-radius: 12px; padding: 24px; white-space: pre-wrap; font-size: 16px; line-height: 1.7; color: #374151; min-height: 100px; border-left: 4px solid #050010;">${safe.message}</div>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin-bottom: 32px;">
              <a href="mailto:${safe.email}?subject=Re: ${safe.subject}" style="display: inline-block; background: linear-gradient(135deg, #050010 0%, #1a0a2e 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin-right: 16px; box-shadow: 0 6px 20px rgba(5, 0, 16, 0.4); transition: all 0.3s;">
                Reply via Email
              </a>
              <a href="https://nouradin.com" style="display: inline-block; background: #f8fafc; color: #050010; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; border: 2px solid #050010; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                View Portfolio
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This email was sent from your portfolio contact form at 
              <a href="https://nouradin.com" style="color: #050010; text-decoration: none; font-weight: 700;">nouradin.com</a>
            </p>
            <p style="margin: 6px 0 0; color: #9ca3af; font-size: 12px;">
              Sent on ${new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nouraddin Portfolio <contact@nouradin.com>",
        to: [toEmail],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html,
        text: content,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error("Resend email failed", { status: res.status, err })
      return NextResponse.json({ error: err || "Email send failed" }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("/api/contact unexpected error", e)
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
  }
}


