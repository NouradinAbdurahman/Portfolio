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
    <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5; color: #333333;">
      
      <!-- Main Container -->
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dddddd;">
        
        <!-- Header -->
        <div style="background-color: #333333; color: #ffffff; padding: 30px; text-align: center;">
          <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: bold;">New Contact Form Submission</h1>
          <p style="margin: 0; font-size: 16px; color: #cccccc;">Someone wants to connect with you!</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
          
          <!-- Contact Information -->
          <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #333333; border-bottom: 2px solid #333333; padding-bottom: 10px;">Contact Information</h2>
          
          <table style="width: 100%; margin-bottom: 30px; border-collapse: collapse;">
            <tr>
              <td style="padding: 15px; border: 1px solid #dddddd; background-color: #f9f9f9; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 15px; border: 1px solid #dddddd;">${safe.firstName} ${safe.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 15px; border: 1px solid #dddddd; background-color: #f9f9f9; font-weight: bold;">Email:</td>
              <td style="padding: 15px; border: 1px solid #dddddd;"><a href="mailto:${safe.email}" style="color: #0066cc; text-decoration: none;">${safe.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 15px; border: 1px solid #dddddd; background-color: #f9f9f9; font-weight: bold;">Subject:</td>
              <td style="padding: 15px; border: 1px solid #dddddd;">${safe.subject}</td>
            </tr>
          </table>
          
          <!-- Message -->
          <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #333333;">Message:</h3>
          <div style="background-color: #f9f9f9; border: 1px solid #dddddd; padding: 20px; margin-bottom: 30px;">
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${safe.message}</p>
          </div>
          
          <!-- Action Buttons -->
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="mailto:${safe.email}?subject=Re: ${safe.subject}&body=Hi ${safe.firstName},%0D%0A%0D%0AThank you for reaching out through my portfolio contact form.%0D%0A%0D%0ABest regards,%0D%0ANouraddin" style="display: inline-block; background-color: #333333; color: #ffffff; text-decoration: none; padding: 12px 24px; margin: 0 10px; border-radius: 4px; font-weight: bold;">Reply via Email</a>
            <a href="https://nouradin.com" style="display: inline-block; background-color: #ffffff; color: #333333; text-decoration: none; padding: 12px 24px; margin: 0 10px; border: 2px solid #333333; border-radius: 4px; font-weight: bold;">View Portfolio</a>
          </div>
          
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #dddddd;">
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #666666;">
            This email was sent from your portfolio contact form at 
            <a href="https://nouradin.com" style="color: #0066cc; text-decoration: none;">nouradin.com</a>
          </p>
          <p style="margin: 0; font-size: 12px; color: #999999;">
            Sent on ${new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
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
        headers: {
          "X-Priority": "3",
          "X-Mailer": "Portfolio Contact Form",
          "X-Entity-Ref-ID": "portfolio-contact-form",
        },
        tags: [
          {
            name: "contact-form",
            value: "portfolio"
          }
        ]
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


