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
    <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <div style="min-height: 100vh; padding: 20px; display: flex; align-items: center; justify-content: center;">
        <div style="background: white; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden; max-width: 600px; width: 100%;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Someone wants to connect with you!</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <!-- Contact Info Cards -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
              <div style="background: #f8fafc; border-radius: 12px; padding: 20px; border-left: 4px solid #667eea;">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span style="font-weight: 600; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name</span>
                </div>
                <p style="margin: 0; font-size: 18px; font-weight: 500; color: #1f2937;">${safe.firstName} ${safe.lastName}</p>
              </div>

              <div style="background: #f8fafc; border-radius: 12px; padding: 20px; border-left: 4px solid #10b981;">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span style="font-weight: 600; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                </div>
                <p style="margin: 0; font-size: 16px; font-weight: 500; color: #1f2937; word-break: break-all;">${safe.email}</p>
              </div>
            </div>

            <!-- Subject -->
            <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #f59e0b;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
                <span style="font-weight: 600; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</span>
              </div>
              <p style="margin: 0; font-size: 18px; font-weight: 500; color: #1f2937;">${safe.subject}</p>
            </div>

            <!-- Message -->
            <div style="background: #f8fafc; border-radius: 12px; padding: 20px; border-left: 4px solid #8b5cf6;">
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span style="font-weight: 600; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message</span>
              </div>
              <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb; white-space: pre-wrap; font-size: 16px; line-height: 1.6; color: #374151;">${safe.message}</div>
            </div>

            <!-- Action Buttons -->
            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${safe.email}?subject=Re: ${safe.subject}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; font-size: 16px; margin-right: 10px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                Reply via Email
              </a>
              <a href="https://nouradin.com" style="display: inline-block; background: #f8fafc; color: #374151; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; font-size: 16px; border: 1px solid #e5e7eb;">
                View Portfolio
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This email was sent from your portfolio contact form at 
              <a href="https://nouradin.com" style="color: #667eea; text-decoration: none; font-weight: 500;">nouradin.com</a>
            </p>
            <p style="margin: 5px 0 0; color: #9ca3af; font-size: 12px;">
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


