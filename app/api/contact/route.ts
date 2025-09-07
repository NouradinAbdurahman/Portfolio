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
        <!-- Main Card -->
        <div style="background: white; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); overflow: hidden;">
          
          <!-- Header -->
          <div style="background: #050010; padding: 32px 24px; text-align: center; color: white;">
            <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.1); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">New Contact Form Submission</h1>
            <p style="margin: 8px 0 0; font-size: 16px; opacity: 0.8;">Someone wants to connect with you!</p>
          </div>

          <!-- Content -->
          <div style="padding: 32px 24px;">
            
            <!-- Contact Info -->
            <div style="margin-bottom: 24px;">
              <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.5px;">Contact Information</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                  <p style="margin: 0 0 6px; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                  <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1f2937;">${safe.firstName} ${safe.lastName}</p>
                </div>
                <div>
                  <p style="margin: 0 0 6px; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                  <p style="margin: 0; font-size: 16px; font-weight: 500; color: #1f2937; word-break: break-all;">${safe.email}</p>
                </div>
              </div>
            </div>

            <!-- Subject -->
            <div style="margin-bottom: 24px;">
              <p style="margin: 0 0 6px; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Subject</p>
              <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1f2937;">${safe.subject}</p>
            </div>

            <!-- Message -->
            <div style="margin-bottom: 32px;">
              <p style="margin: 0 0 12px; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
              <div style="background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e5e7eb; white-space: pre-wrap; font-size: 16px; line-height: 1.6; color: #374151; min-height: 80px;">${safe.message}</div>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin-bottom: 24px;">
              <a href="mailto:${safe.email}?subject=Re: ${safe.subject}" style="display: inline-block; background: #050010; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px; margin-right: 12px; box-shadow: 0 4px 12px rgba(5, 0, 16, 0.3); transition: all 0.2s;">
                Reply via Email
              </a>
              <a href="https://nouradin.com" style="display: inline-block; background: #f8fafc; color: #374151; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px; border: 1px solid #e5e7eb; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                View Portfolio
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This email was sent from your portfolio contact form at 
              <a href="https://nouradin.com" style="color: #050010; text-decoration: none; font-weight: 600;">nouradin.com</a>
            </p>
            <p style="margin: 4px 0 0; color: #9ca3af; font-size: 12px;">
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
        from: "Nouraddin Portfolio <onboarding@resend.dev>",
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


