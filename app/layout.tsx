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
import { JsonLd } from "@/components/json-ld"
import { GlobalLoading } from "@/components/global-loading"
import { SettingsProvider } from "@/contexts/settings-context"

export const metadata: Metadata = {
  title: "Nouraddin Abdurahman Aden - Software Engineer & Data Engineer",
  description:
    "Portfolio of Nouraddin Abdurahman Aden - Full-Stack Developer, Data Engineer, and Cloud Solutions Architect. Building scalable applications and data-driven systems.",
  generator: "Next.js",
  metadataBase: new URL("https://nouradin.com"),
  keywords: [
    "Nouraddin Abdurahman Aden",
    "Software Engineer",
    "Full-Stack Developer",
    "Data Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Flutter",
    "AWS",
    "Firebase",
    "Portfolio",
    "Web Development",
    "Mobile Development",
    "Cloud Solutions"
  ],
  authors: [{ name: "Nouraddin Abdurahman Aden" }],
  creator: "Nouraddin Abdurahman Aden",
  publisher: "Nouraddin Abdurahman Aden",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Nouraddin Abdurahman Aden - Software Engineer & Data Engineer",
    description:
      "Portfolio of Nouraddin Abdurahman Aden - Full-Stack Developer, Data Engineer, and Cloud Solutions Architect. Building scalable applications and data-driven systems.",
    url: "https://nouradin.com",
    siteName: "Nouraddin Portfolio",
    images: [
      {
        url: "https://nouradin.com/favicon.png",
        width: 1200,
        height: 630,
        alt: "Nouraddin Abdurahman Aden - Software Engineer & Data Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nouraddin Abdurahman Aden - Software Engineer & Data Engineer",
    description:
      "Portfolio of Nouraddin Abdurahman Aden - Full-Stack Developer, Data Engineer, and Cloud Solutions Architect. Building scalable applications and data-driven systems.",
    creator: "@nouradiin_",
    images: ["https://nouradin.com/favicon.png"],
  },
  alternates: {
    canonical: "https://nouradin.com",
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
        <link href="https://fonts.googleapis.com/css2?family=Michroma&family=Lobster&family=Inter:wght@300;400;600&family=Roboto:wght@300;400;700&family=Poppins:wght@300;400;600&family=Open+Sans:wght@300;400;700&family=Montserrat:wght@300;500;700&family=Lato:wght@300;400;700&family=Source+Sans+3:wght@300;400;700&family=Nunito:wght@300;600;800&family=Fira+Sans:wght@300;400;700&family=Rubik:wght@300;500;700&family=Merriweather:wght@300;400;700&family=Work+Sans:wght@300;500;700&family=DM+Sans:wght@400;700&family=Manrope:wght@400;700&display=swap" rel="stylesheet" />
        <JsonLd />
      </head>
      <body 
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <SettingsProvider>
            <GlobalLoading />
            <Suspense fallback={null}>{children}</Suspense>
          </SettingsProvider>
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
