import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "next-themes"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Nouraddin Abdurahman Aden - Software Engineer & Data Engineer",
  description:
    "Portfolio of Nouraddin Abdurahman Aden - Full-Stack Developer, Data Engineer, and Cloud Solutions Architect. Building scalable applications and data-driven systems.",
  generator: "v0.app",
  metadataBase: new URL("https://nouraddin-portfolio.vercel.app"),
  openGraph: {
    title: "Nouraddin Abdurahman Aden - Software Engineer & Data Engineer",
    description:
      "Portfolio of Nouraddin Abdurahman Aden - Full-Stack Developer, Data Engineer, and Cloud Solutions Architect.",
    url: "https://nouraddin-portfolio.vercel.app",
    siteName: "Nouraddin Portfolio",
    images: [
      {
        url: "/photo.png",
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
    images: ["https://nouraddin-portfolio.vercel.app/photo.png"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Michroma&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Nouraddin Abdurahman Aden",
                "url": "https://nouraddin-portfolio.vercel.app",
                "image": "https://nouraddin-portfolio.vercel.app/photo.png",
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
                "url": "https://nouraddin-portfolio.vercel.app",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://nouraddin-portfolio.vercel.app/?q={search_term_string}",
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
      </body>
    </html>
  )
}
