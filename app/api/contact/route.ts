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
    <body style="margin: 0; padding: 0; background: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <div style="padding: 20px; max-width: 600px; margin: 0 auto;">
        <div style="background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; border: 1px solid #e5e7eb;">
          <!-- Header -->
          <div style="background: #667eea; padding: 20px; text-align: center; color: white;">
            <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h1 style="margin: 0; font-size: 20px; font-weight: 600;">New Contact Form Submission</h1>
            <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">Someone wants to connect with you!</p>
          </div>

          <!-- Content -->
          <div style="padding: 20px;">
            <!-- Contact Details -->
            <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 16px; border-left: 4px solid #667eea;">
              <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.5px;">Contact Information</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div>
                  <p style="margin: 0 0 4px; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">Name</p>
                  <p style="margin: 0; font-size: 16px; font-weight: 500; color: #1f2937;">${safe.firstName} ${safe.lastName}</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">Email</p>
                  <p style="margin: 0; font-size: 14px; font-weight: 500; color: #1f2937; word-break: break-all;">${safe.email}</p>
                </div>
              </div>
            </div>

            <!-- Subject -->
            <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 16px; border-left: 4px solid #10b981;">
              <p style="margin: 0 0 4px; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">Subject</p>
              <p style="margin: 0; font-size: 16px; font-weight: 500; color: #1f2937;">${safe.subject}</p>
            </div>

            <!-- Message -->
            <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #8b5cf6;">
              <p style="margin: 0 0 8px; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">Message</p>
              <div style="background: white; border-radius: 6px; padding: 12px; border: 1px solid #e5e7eb; white-space: pre-wrap; font-size: 14px; line-height: 1.5; color: #374151;">${safe.message}</div>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center;">
              <a href="mailto:${safe.email}?subject=Re: ${safe.subject}" style="display: inline-block; background: #667eea; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 500; font-size: 14px; margin-right: 8px; box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);">
                Reply via Email
              </a>
              <a href="https://nouradin.com" style="display: inline-block; background: #f8fafc; color: #374151; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 500; font-size: 14px; border: 1px solid #e5e7eb;">
                View Portfolio
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 12px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 12px;">
              This email was sent from your portfolio contact form at 
              <a href="https://nouradin.com" style="color: #667eea; text-decoration: none; font-weight: 500;">nouradin.com</a>
            </p>
            <p style="margin: 2px 0 0; color: #9ca3af; font-size: 11px;">
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


