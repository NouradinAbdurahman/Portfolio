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
    <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #060010 0%, #B19EEF 25%, #5227FF 50%, #FF6B6B 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; min-height: 100vh;">
      <div style="padding: 20px; max-width: 600px; margin: 0 auto;">
        <div style="background: rgba(255, 255, 255, 0.95); border-radius: 16px; box-shadow: 0 25px 50px rgba(0,0,0,0.15); overflow: hidden; backdrop-filter: blur(10px);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #060010 0%, #B19EEF 25%, #5227FF 50%, #FF6B6B 100%); padding: 25px; text-align: center; color: white; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"50\" cy=\"10\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"10\" cy=\"60\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"90\" cy=\"40\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>') repeat; opacity: 0.3;"></div>
            <div style="position: relative; z-index: 1;">
              <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">New Contact Form Submission</h1>
              <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.9;">Someone wants to connect with you!</p>
            </div>
          </div>

          <!-- Content -->
          <div style="padding: 25px;">
            <!-- Contact Info -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 10px; padding: 15px; border-left: 3px solid #667eea; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -10px; right: -10px; width: 30px; height: 30px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; opacity: 0.1;"></div>
                <div style="display: flex; align-items: center; margin-bottom: 6px;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span style="font-weight: 600; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Name</span>
                </div>
                <p style="margin: 0; font-size: 16px; font-weight: 500; color: #1f2937;">${safe.firstName} ${safe.lastName}</p>
              </div>

              <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 10px; padding: 15px; border-left: 3px solid #10b981; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -10px; right: -10px; width: 30px; height: 30px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; opacity: 0.1;"></div>
                <div style="display: flex; align-items: center; margin-bottom: 6px;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span style="font-weight: 600; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                </div>
                <p style="margin: 0; font-size: 14px; font-weight: 500; color: #1f2937; word-break: break-all;">${safe.email}</p>
              </div>
            </div>

            <!-- Subject -->
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 10px; padding: 15px; margin-bottom: 20px; border-left: 3px solid #f59e0b; position: relative; overflow: hidden;">
              <div style="position: absolute; top: -10px; right: -10px; width: 30px; height: 30px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; opacity: 0.1;"></div>
              <div style="display: flex; align-items: center; margin-bottom: 6px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
                <span style="font-weight: 600; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</span>
              </div>
              <p style="margin: 0; font-size: 16px; font-weight: 500; color: #1f2937;">${safe.subject}</p>
            </div>

            <!-- Message -->
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 10px; padding: 15px; margin-bottom: 20px; border-left: 3px solid #8b5cf6; position: relative; overflow: hidden;">
              <div style="position: absolute; top: -10px; right: -10px; width: 30px; height: 30px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 50%; opacity: 0.1;"></div>
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span style="font-weight: 600; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</span>
              </div>
              <div style="background: white; border-radius: 8px; padding: 15px; border: 1px solid #e5e7eb; white-space: pre-wrap; font-size: 14px; line-height: 1.5; color: #374151; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);">${safe.message}</div>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin-bottom: 15px;">
              <a href="mailto:${safe.email}?subject=Re: ${safe.subject}" style="display: inline-block; background: linear-gradient(135deg, #060010 0%, #B19EEF 25%, #5227FF 50%, #FF6B6B 100%); color: white; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-weight: 600; font-size: 14px; margin-right: 8px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); transition: transform 0.2s;">
                Reply via Email
              </a>
              <a href="https://nouradin.com" style="display: inline-block; background: #f8fafc; color: #374151; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-weight: 600; font-size: 14px; border: 1px solid #e5e7eb; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                View Portfolio
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 15px 25px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 12px;">
              This email was sent from your portfolio contact form at 
              <a href="https://nouradin.com" style="color: #667eea; text-decoration: none; font-weight: 500;">nouradin.com</a>
            </p>
            <p style="margin: 3px 0 0; color: #9ca3af; font-size: 11px;">
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


