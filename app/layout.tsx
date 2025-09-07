import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "next-themes"
import Script from "next/script"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Nouraddin Abdurahman Aden - Software Engineer & Data Engineer",
  description:
    "Portfolio of Nouraddin Abdurahman Aden - Full-Stack Developer, Data Engineer, and Cloud Solutions Architect. Building scalable applications and data-driven systems.",
  generator: "v0.app",
  metadataBase: new URL("https://nouradin.com"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Nouraddin Abdurahman Aden - Software Engineer & Data Engineer",
    description:
      "Portfolio of Nouraddin Abdurahman Aden - Full-Stack Developer, Data Engineer, and Cloud Solutions Architect.",
    url: "https://nouradin.com",
    siteName: "Nouraddin Portfolio",
    images: [
      {
        url: "/favicon.png",
        width: 800,
        height: 800,
        alt: "Nouraddin Abdurahman Aden",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nouraddin Abdurahman Aden - Software Engineer & Data Engineer",
    description:
      "Portfolio of Nouraddin Abdurahman Aden - Full-Stack Developer, Data Engineer, and Cloud Solutions Architect.",
    creator: "@nouradiin_",
    images: ["https://nouradin.com/favicon.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Michroma&family=Lobster&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Nouraddin Abdurahman Aden",
                "url": "https://nouradin.com",
                "image": "https://nouradin.com/favicon.png",
                "jobTitle": "Software Engineer",
                "sameAs": [
                  "https://github.com/NouradinAbdurahman",
                  "https://linkedin.com/in/nouraddin",
                  "https://instagram.com/nouradiin_"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Nouraddin Portfolio",
                "url": "https://nouradin.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://nouradin.com/?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            ]),
          }}
        />
      </head>
      <body 
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
        <Toaster />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZJED4365EB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZJED4365EB');
          `}
        </Script>
      </body>
    </html>
  )
}
