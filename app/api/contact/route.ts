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
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <title>New Contact Form Submission</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        .email-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
        }
        
        /* Universal text colors - high contrast for all email clients */
        .text-dark-mode {
          color: #1a1a1a !important;
        }
        .text-light-mode {
          color: #ffffff !important;
        }
        .bg-dark-mode {
          background: #ffffff !important;
        }
        .bg-light-mode {
          background: #1a1a1a !important;
        }
        
        /* Dark mode detection using multiple methods */
        @media (prefers-color-scheme: dark) {
          .text-dark-mode {
            color: #ffffff !important;
          }
          .text-light-mode {
            color: #1a1a1a !important;
          }
          .bg-dark-mode {
            background: #1a1a1a !important;
          }
          .bg-light-mode {
            background: #ffffff !important;
          }
          .section-icon-light {
            background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%) !important;
          }
          .info-card {
            background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%) !important;
            border-left: 4px solid #60a5fa !important;
          }
        }
        
        /* Additional dark mode detection methods */
        [data-theme="dark"] .text-dark-mode,
        .dark .text-dark-mode,
        .dark-mode .text-dark-mode {
          color: #ffffff !important;
        }
        
        [data-theme="dark"] .text-light-mode,
        .dark .text-light-mode,
        .dark-mode .text-light-mode {
          color: #1a1a1a !important;
        }
        
        [data-theme="dark"] .section-icon-light,
        .dark .section-icon-light,
        .dark-mode .section-icon-light {
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%) !important;
        }
        
        [data-theme="dark"] .info-card,
        .dark .info-card,
        .dark-mode .info-card {
          background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%) !important;
          border-left: 4px solid #60a5fa !important;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #060010 0%, #1a0b2e 100%);
          position: relative;
          overflow: hidden;
        }
        
        .gradient-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>') repeat;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .info-card {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-left: 4px solid #060010;
          transition: all 0.3s ease;
        }
        
        .info-card-dark {
          background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
          border-left: 4px solid #60a5fa;
          color: #ffffff;
        }
        
        .section-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          transition: all 0.3s ease;
        }
        
        .section-icon-light {
          background: linear-gradient(135deg, #060010 0%, #1a0b2e 100%);
        }
        
        .section-icon-dark {
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #060010 0%, #1a0b2e 100%);
          box-shadow: 0 8px 25px rgba(6, 0, 16, 0.4);
          transform: translateY(0);
          transition: all 0.3s ease;
        }
        
        .btn-secondary {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 2px solid #060010;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 600px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
          .responsive-buttons {
            flex-direction: column;
            gap: 12px;
          }
          .responsive-buttons a {
            margin: 0 !important;
            width: 100%;
            text-align: center;
          }
          .mobile-title {
            font-size: 20px !important;
          }
          .mobile-subtitle {
            font-size: 14px !important;
          }
          .mobile-section-header {
            font-size: 16px !important;
          }
          .mobile-name-text {
            font-size: 16px !important;
          }
          .mobile-email-text {
            font-size: 12px !important;
          }
          .mobile-subject-text {
            font-size: 16px !important;
          }
          .mobile-message-text {
            font-size: 13px !important;
          }
          .mobile-button-text {
            font-size: 12px !important;
            padding: 12px 20px !important;
          }
          .mobile-label-text {
            font-size: 9px !important;
          }
          .mobile-footer-text {
            font-size: 12px !important;
          }
          .mobile-footer-small {
            font-size: 10px !important;
          }
        }
        
        @media (max-width: 400px) {
          .mobile-title {
            font-size: 18px !important;
          }
          .mobile-subtitle {
            font-size: 12px !important;
          }
          .mobile-section-header {
            font-size: 14px !important;
          }
          .mobile-name-text {
            font-size: 14px !important;
          }
          .mobile-email-text {
            font-size: 11px !important;
          }
          .mobile-subject-text {
            font-size: 14px !important;
          }
          .mobile-message-text {
            font-size: 12px !important;
          }
          .mobile-button-text {
            font-size: 11px !important;
            padding: 10px 16px !important;
          }
          .mobile-label-text {
            font-size: 8px !important;
          }
          .mobile-footer-text {
            font-size: 11px !important;
          }
          .mobile-footer-small {
            font-size: 9px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%); min-height: 100vh;" class="email-container">
      <div style="padding: 20px 12px; max-width: 680px; margin: 0 auto;">
        <div style="border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);" class="glass-card">
          
          <!-- Header Section -->
          <div style="padding: 32px 24px; text-align: center; color: white; position: relative;" class="gradient-bg">
            <div style="position: relative; z-index: 2;">
              <div style="width: 60px; height: 60px; background: rgba(255, 255, 255, 0.15); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(15px); border: 2px solid rgba(255, 255, 255, 0.25); box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              
              <h1 style="margin: 0 0 12px; font-size: 28px; font-weight: 800; letter-spacing: -1px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" class="mobile-title">New Contact Form Submission</h1>
              <p style="margin: 0; font-size: 18px; font-weight: 500; opacity: 0.95; letter-spacing: 0.5px;" class="mobile-subtitle">Someone wants to connect with you!</p>
              
              <div style="position: absolute; top: 15px; right: 15px; width: 50px; height: 50px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); opacity: 0.6;"></div>
              <div style="position: absolute; bottom: 15px; left: 15px; width: 30px; height: 30px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); opacity: 0.4;"></div>
            </div>
          </div>

          <div style="padding: 32px 24px;">
            
            <!-- Contact Information Header -->
            <div style="text-align: center; margin-bottom: 28px;">
              <h2 style="margin: 0 0 6px; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: #1a1a1a;" class="mobile-section-header text-dark-mode">Contact Information</h2>
              <div style="width: 50px; height: 3px; background: linear-gradient(135deg, #060010 0%, #1a0b2e 100%); margin: 0 auto; border-radius: 2px;"></div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px;" class="responsive-grid">
              <div style="padding: 20px; border-radius: 12px;" class="info-card">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <div class="section-icon section-icon-light">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <p style="margin: 0; font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 1px;" class="mobile-label-text">Full Name</p>
                </div>
                <p style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; color: #1a1a1a;" class="mobile-name-text text-dark-mode">${safe.firstName} ${safe.lastName}</p>
              </div>
              
              <div style="padding: 20px; border-radius: 12px;" class="info-card">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <div class="section-icon section-icon-light">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <p style="margin: 0; font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 1px;" class="mobile-label-text">Email Address</p>
                </div>
                <p style="margin: 0; font-size: 16px; font-weight: 600; word-break: break-all; color: #1a1a1a;" class="mobile-email-text text-dark-mode">${safe.email}</p>
              </div>
            </div>

            <!-- Subject Section -->
            <div style="margin-bottom: 28px;">
              <div style="padding: 20px; border-radius: 12px; border: 2px solid #e2e8f0; background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <div class="section-icon section-icon-light">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10,9 9,9 8,9"></polyline>
                    </svg>
                  </div>
                  <p style="margin: 0; font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 1px;" class="mobile-label-text">Subject Line</p>
                </div>
                <p style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: #1a1a1a;" class="mobile-subject-text text-dark-mode">${safe.subject}</p>
              </div>
            </div>

            <!-- Message Section -->
            <div style="margin-bottom: 32px;">
              <div style="display: flex; align-items: center; margin-bottom: 16px;">
                <div class="section-icon section-icon-light">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <p style="margin: 0; font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 1px;" class="mobile-label-text">Message Content</p>
              </div>
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; padding: 24px; border-left: 4px solid #060010; box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);">
                <p style="margin: 0; white-space: pre-wrap; font-size: 16px; line-height: 1.7; font-weight: 500; color: #1a1a1a;" class="mobile-message-text text-dark-mode">${safe.message}</p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin-bottom: 28px;">
              <div style="display: flex; justify-content: center; align-items: center; gap: 16px;" class="responsive-buttons">
                <a href="mailto:${safe.email}?subject=Re: ${safe.subject}" style="display: inline-block; color: white; text-decoration: none; padding: 16px 28px; border-radius: 12px; font-weight: 700; font-size: 15px; letter-spacing: 0.5px; text-transform: uppercase;" class="btn-primary mobile-button-text">
                  ✉️ Reply via Email
                </a>
                <a href="https://nouradin.com" style="display: inline-block; color: #060010; text-decoration: none; padding: 16px 28px; border-radius: 12px; font-weight: 700; font-size: 15px; letter-spacing: 0.5px; text-transform: uppercase;" class="btn-secondary mobile-button-text">
                  🌐 View Portfolio
                </a>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #060010 0%, #1a0b2e 100%); padding: 24px; text-align: center; color: white;">
            <div style="margin-bottom: 12px;">
              <p style="margin: 0 0 6px; font-size: 15px; font-weight: 600; opacity: 0.9;" class="mobile-footer-text">
                📧 This email was sent from your portfolio contact form at 
                <a href="https://nouradin.com" style="color: #90cdf4; text-decoration: none; font-weight: 700;">nouradin.com</a>
              </p>
              <p style="margin: 0; color: #a0aec0; font-size: 13px; font-weight: 500;" class="mobile-footer-small">
                🕒 Sent on ${new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            
            <div style="width: 80px; height: 2px; background: linear-gradient(135deg, #060010 0%, #1a0b2e 100%); margin: 0 auto; border-radius: 1px; opacity: 0.7;"></div>
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


