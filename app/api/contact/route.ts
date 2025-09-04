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

  const content = `New contact form submission\n\nName: ${safe.firstName} ${safe.lastName}\nEmail: ${safe.email}\nSubject: ${safe.subject}\n\nMessage:\n${safe.message}`

  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; line-height:1.6;">
      <h2 style="margin:0 0 8px;">New contact form submission</h2>
      <p><strong>Name:</strong> ${safe.firstName} ${safe.lastName}</p>
      <p><strong>Email:</strong> ${safe.email}</p>
      <p><strong>Subject:</strong> ${safe.subject}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;background:#f6f7f9;padding:12px;border-radius:8px;">${safe.message}</pre>
    </div>
  `

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
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


