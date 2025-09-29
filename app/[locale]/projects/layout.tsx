import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects – Nouraddin",
  description: "Explore my portfolio of software development projects including web applications, mobile apps, and data engineering solutions. Built with modern technologies like React, Next.js, Flutter, and more.",
  keywords: [
    "Nouraddin Abdurahman Aden",
    "Software Projects",
    "Web Development",
    "Mobile Apps",
    "React",
    "Next.js",
    "Flutter",
    "TypeScript",
    "Portfolio Projects"
  ],
  openGraph: {
    title: "Projects – Nouraddin",
    description: "Explore my portfolio of software development projects including web applications, mobile apps, and data engineering solutions.",
    url: "https://nouradin.com/projects",
    siteName: "Nouraddin Portfolio",
    images: [
      {
        url: "https://nouradin.com/favicon.png",
        width: 1200,
        height: 630,
        alt: "Nouraddin Projects Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects – Nouraddin",
    description: "Explore my portfolio of software development projects including web applications, mobile apps, and data engineering solutions.",
    creator: "@nouradiin_",
    images: ["https://nouradin.com/favicon.png"],
  },
  alternates: {
    canonical: "https://nouradin.com/projects",
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
