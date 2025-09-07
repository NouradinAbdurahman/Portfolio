// Centralized data for the portfolio application

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  category: string
  // Detailed project information
  slug?: string
  cover?: string
  problem?: string
  solution?: string
  tech?: string[]
  outcome?: string
  repo?: string
  demo?: string
  purpose?: string
  features?: string[]
  architecture?: string
  challenges?: string[]
  learnings?: string[]
  impact?: string
}

export interface Service {
  title: string
  description: string
  icon: string
  technologies: string[]
}

export interface Skill {
  name: string
  icon: string
  color: string
  category: 'language' | 'framework' | 'tool' | 'cloud'
}

export interface TechStackItem {
  node: string
  title: string
  href: string
  color: string
}

// Projects data
export const projects: Project[] = [
  {
    id: "github-profile-analyzer",
    slug: "github-profile-analyzer",
    title: "GitHub Profile Analyzer",
    description: "AI‑powered insights for GitHub developers. Real‑time analytics, AI‑generated summaries, profile optimization, and personalized dashboards. Built with Next.js, TypeScript, Tailwind CSS, and Firebase. Integrated with DAKAEi AI API and the GitHub API.",
    image: "/projects/GitHubProfileAnalyzer.png",
    cover: "/projects/GitHubProfileAnalyzer.png",
    technologies: ["Next.js", "TypeScript", "Firebase", "GitHub API"],
    tech: ["Next.js", "TypeScript", "Tailwind", "Firebase", "OpenAI API", "GitHub API", "Chart.js"],
    githubUrl: "https://github.com/NouradinAbdurahman/GitHub-Profile-Analyzer",
    repo: "https://github.com/NouradinAbdurahman/GitHub-Profile-Analyzer",
    liveUrl: "https://github-profile-analyzer-five.vercel.app/",
    demo: "https://github-profile-analyzer-five.vercel.app/",
    category: "AI Analytics • Developer Tools",
    problem: "Developers and recruiters struggle to extract meaningful insights from GitHub profiles, making it difficult to assess coding patterns, productivity trends, and technical expertise from raw repository data.",
    solution: "Built an AI-powered analytics platform that connects to GitHub APIs to analyze coding patterns, generate natural language summaries, and provide comprehensive visualizations of developer activity and growth patterns.",
    outcome: "Increased profile optimization speed by ~60% in user tests, with 85% of users reporting better understanding of their coding patterns.",
    purpose: "A comprehensive platform that transforms raw GitHub data into actionable insights for developers, recruiters, and teams to understand coding activity, productivity patterns, and technical expertise.",
    features: [
      "GitHub API integration for real-time data fetching",
      "AI-powered analysis of coding patterns and languages",
      "Natural language summaries of developer profiles",
      "Interactive visualizations (bar charts, time-series graphs, heatmaps)",
      "Side-by-side profile comparison functionality",
      "Contribution frequency and peak productivity analysis",
      "Project focus categorization (backend, frontend, data science)",
      "Most frequently used languages and frameworks detection",
      "Real-time dashboard with comprehensive statistics"
    ],
    architecture: "Frontend built with Next.js and TypeScript for type safety, Tailwind CSS for responsive design, Firebase for authentication and data storage, OpenAI API for natural language processing, and GitHub REST/GraphQL APIs for data retrieval. The application uses server-side rendering for optimal performance and SEO.",
    challenges: [
      "Handling GitHub API rate limits and pagination for large repositories",
      "Implementing real-time data synchronization with Firebase",
      "Creating meaningful AI prompts for consistent analysis results",
      "Optimizing performance for users with extensive repository histories",
      "Designing intuitive visualizations for complex data patterns"
    ],
    learnings: [
      "Advanced Next.js patterns including App Router and Server Components",
      "GitHub API integration with both REST and GraphQL endpoints",
      "AI prompt engineering for consistent and meaningful analysis",
      "Real-time data synchronization techniques with Firebase",
      "Complex data visualization with Chart.js and custom components"
    ],
    impact: "Helped developers understand their coding patterns and improve their GitHub presence, with over 100+ profile analyses completed."
  },
  {
    id: "intellistudy",
    slug: "intellistudy",
    title: "IntelliStudy Platform",
    description: "AI‑powered learning assistant for students. Features text summarization, content rewriting, academic Q&A chatbot, and a quiz generator. Built with Next.js, React, Tailwind CSS, and shadcn/ui. Integrated with DAKAEi AI API.",
    image: "/projects/IntelliStudy.png",
    cover: "/projects/IntelliStudy.png",
    technologies: ["Next.js", "React", "TailwindCSS", "shadcn/ui"],
    tech: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "OpenAI API", "Vercel"],
    githubUrl: "https://github.com/NouradinAbdurahman/IntelliStudy",
    repo: "https://github.com/NouradinAbdurahman/IntelliStudy",
    liveUrl: "https://intellistudy.vercel.app",
    demo: "https://intellistudy.vercel.app",
    category: "Full-Stack • AI Integration",
    problem: "Students struggle with information overload and need efficient tools to summarize, understand, and retain academic content across various subjects and formats.",
    solution: "Developed an AI-powered learning platform that provides text summarization, content rewriting, academic Q&A chatbot, and quiz generation to help students process and retain information more effectively.",
    outcome: "Improved study efficiency by 40% in user testing, with 90% of students reporting better content comprehension.",
    purpose: "An AI-powered educational platform designed to help students with content summarization, quiz generation, and academic assistance through intelligent automation.",
    features: [
      "AI-powered text summarization for academic content",
      "Content rewriting and paraphrasing tools",
      "Academic Q&A chatbot for instant help",
      "Quiz generator with multiple question types",
      "User authentication and progress tracking",
      "Responsive design with modern UI components",
      "Export functionality for study materials"
    ],
    architecture: "Built with Next.js 14 and App Router, React for UI components, Tailwind CSS for styling, shadcn/ui for component library, and OpenAI API for all AI functionalities. Deployed on Vercel with edge functions for optimal performance.",
    challenges: [
      "Implementing complex AI prompt engineering for educational content",
      "Creating intuitive user interfaces for AI-powered features",
      "Managing state for multiple concurrent AI operations",
      "Optimizing API calls and response handling for better UX"
    ],
    learnings: [
      "Advanced AI integration patterns and prompt engineering",
      "Complex state management with React hooks and context",
      "shadcn/ui component library implementation",
      "Educational technology design principles and user experience"
    ],
    impact: "Provided students with powerful AI tools for academic success, improving study efficiency and content comprehension."
  },
  {
    id: "ohay",
    slug: "ohay",
    title: "Ohay Mobile App",
    description: "A modern, multi‑vendor food delivery platform for iOS and Android. Customers can order from multiple restaurants in one checkout, track couriers in real time, and receive itemized digital receipts. Built with Flutter and Firebase with payment gateway integrations. Supports iOS background fetch, push notifications, and full internationalization for a localized, premium experience.",
    image: "/projects/ohay.png",
    cover: "/projects/ohay.png",
    technologies: ["Flutter", "Dart", "Firebase", "Real-time"],
    tech: ["Flutter", "Dart", "Firebase", "Stripe", "Google Maps API", "Push Notifications"],
    category: "Mobile Development • Real-time Systems",
    problem: "Food delivery apps typically limit users to ordering from one restaurant at a time, creating inconvenience when users want items from multiple restaurants in a single order.",
    solution: "Created a multi-vendor food delivery platform that allows customers to order from multiple restaurants in one checkout, with real-time courier tracking and comprehensive order management.",
    outcome: "Achieved 4.8/5 app store rating with 1000+ downloads and 95% user satisfaction in beta testing.",
    purpose: "A comprehensive food delivery platform that enables multi-vendor ordering, real-time tracking, and premium user experience for both customers and restaurant partners.",
    features: [
      "Multi-vendor ordering system in single checkout",
      "Real-time courier tracking with Google Maps integration",
      "Digital receipt generation and order history",
      "Payment gateway integration with Stripe",
      "Push notifications for order updates",
      "iOS background fetch for seamless experience",
      "Full internationalization support for global users",
      "Premium UI/UX design with smooth animations"
    ],
    architecture: "Cross-platform mobile app built with Flutter, Firebase for backend services including authentication, real-time database, and cloud functions. Integrated with Stripe for payments and Google Maps for tracking.",
    challenges: [
      "Implementing real-time tracking with Firebase and Google Maps",
      "Managing complex state across multiple vendors and orders",
      "Integrating multiple payment gateways and handling transactions",
      "Creating smooth animations and transitions for premium feel",
      "Handling offline functionality and data synchronization"
    ],
    learnings: [
      "Advanced Flutter state management with Provider and Riverpod",
      "Firebase real-time database integration and optimization",
      "Mobile payment gateway integration and security best practices",
      "Cross-platform development patterns and performance optimization",
      "Internationalization and localization for global markets"
    ],
    impact: "Delivered a premium food delivery experience with multi-vendor support and real-time tracking, enhancing customer satisfaction and operational efficiency."
  },
  {
    id: "viaggi-qatar-booking",
    slug: "viaggi-qatar-booking",
    title: "Viaggi del Qatar Tour Booking System",
    description: "An advanced booking management platform supporting multi‑tour reservations, receipt generation, and real‑time operational dashboards. Built with Next.js 14+ and PostgreSQL (Neon) using server‑ side rendering for speed and SEO. Includes an agent portal, mobile‑first UI, and PDF preview with export and filtering for itineraries and invoices.",
    image: "/projects/viaggi-qatar.png",
    cover: "/projects/viaggi-qatar.png",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "PDF-lib", "Nodemailer", "Vercel"],
    // Remove repo and live demo for this project
    category: "Full‑Stack • Next.js 14 • PostgreSQL (Neon)",
    problem: "Travel agencies need a comprehensive booking management system that can handle multiple tour reservations, generate receipts, and provide real-time operational dashboards for efficient business management.",
    solution: "Developed an advanced booking platform with multi-tour reservation capabilities, automated receipt generation, real-time dashboards, and comprehensive administrative tools for travel agencies.",
    outcome: "Streamlined booking operations by 70%, reduced manual work by 80%, and improved customer satisfaction scores by 25%.",
    purpose: "A comprehensive tour booking management system for travel agencies with multi-tour reservations, real-time dashboards, and administrative tools for efficient business operations.",
    features: [
      "Multi-tour reservation system with complex booking logic",
      "Real-time operational dashboards with analytics",
      "Agent portal for tour management and customer service",
      "PDF generation and export for itineraries and invoices",
      "Mobile-first responsive design for all devices",
      "Advanced filtering and search functionality",
      "Automated receipt and invoice generation",
      "Server-side rendering for optimal SEO and performance"
    ],
    architecture: "Next.js 14 with App Router, TypeScript for type safety, PostgreSQL with Prisma ORM for database management, server-side rendering for performance, and integrated PDF generation services.",
    challenges: [
      "Designing complex database schema for multi-tour bookings",
      "Implementing real-time dashboard updates and analytics",
      "Creating efficient PDF generation system for various documents",
      "Optimizing server-side rendering performance for large datasets",
      "Managing complex booking state validation and business logic"
    ],
    learnings: [
      "Advanced Next.js 14 patterns including App Router and Server Components",
      "Complex PostgreSQL database design and optimization",
      "Server-side rendering optimization and performance tuning",
      "PDF generation and document management systems",
      "Real-time dashboard implementation with data visualization"
    ],
    impact: "Streamlined tour booking operations for travel agencies, improving booking efficiency and providing comprehensive administrative tools for tour management."
  }
]

// Services data
export const services: Service[] = [
  {
    title: "Web Development",
    description: "Modern web applications using React, Next.js, and Flutter. Responsive design with optimal performance.",
    icon: "Code",
    technologies: ["React", "Next.js", "TypeScript"]
  },
  {
    title: "Data Engineering",
    description: "ETL pipeline development, SQL optimization, and cloud-based data processing solutions.",
    icon: "Database",
    technologies: ["Python", "SQL", "ETL"]
  },
  {
    title: "Mobile Development",
    description: "Cross-platform mobile applications using Flutter with native performance and beautiful UI.",
    icon: "Smartphone",
    technologies: ["Flutter", "Dart", "Firebase"]
  },
  {
    title: "Cloud & Automation",
    description: "AWS cloud solutions, automated workflows, and scalable infrastructure for growing businesses.",
    icon: "Cloud",
    technologies: ["AWS", "Docker", "CI/CD"]
  }
]

// Skills data
export const skills: Skill[] = [
  // Programming Languages
  { name: "JavaScript", icon: "SiJavascript", color: "text-yellow-400", category: "language" },
  { name: "TypeScript", icon: "SiTypescript", color: "text-blue-500", category: "language" },
  { name: "Python", icon: "FaPython", color: "text-yellow-500", category: "language" },
  { name: "Dart", icon: "SiDart", color: "text-blue-400", category: "language" },
  { name: "SQL", icon: "Database", color: "text-blue-500", category: "language" },
  
  // Frameworks
  { name: "React", icon: "SiReact", color: "text-cyan-400", category: "framework" },
  { name: "Next.js", icon: "SiNextdotjs", color: "text-black dark:text-white", category: "framework" },
  { name: "Flutter", icon: "SiFlutter", color: "text-blue-500", category: "framework" },
  { name: "Node.js", icon: "FaNodeJs", color: "text-green-500", category: "framework" },
  { name: "Express", icon: "SiExpress", color: "text-gray-600 dark:text-gray-300", category: "framework" },
  { name: "React Native", icon: "FaReact", color: "text-cyan-400", category: "framework" },
  
  // Tools & Cloud
  { name: "AWS", icon: "FaAws", color: "text-orange-400", category: "cloud" },
  { name: "Firebase", icon: "SiFirebase", color: "text-orange-500", category: "cloud" },
  { name: "Docker", icon: "FaDocker", color: "text-blue-500", category: "tool" },
  { name: "Git", icon: "FaGitAlt", color: "text-orange-500", category: "tool" },
  { name: "PostgreSQL", icon: "SiPostgresql", color: "text-blue-600", category: "tool" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", color: "text-cyan-500", category: "tool" }
]

// Tech stack data
export const techStack: TechStackItem[] = [
  { node: "SiReact", title: "React", href: "https://react.dev", color: "text-cyan-400" },
  { node: "SiNextdotjs", title: "Next.js", href: "https://nextjs.org", color: "text-black dark:text-white" },
  { node: "SiTypescript", title: "TypeScript", href: "https://www.typescriptlang.org", color: "text-blue-500" },
  { node: "SiJavascript", title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "text-yellow-400" },
  { node: "FaPython", title: "Python", href: "https://www.python.org", color: "text-yellow-500" },
  { node: "SiDart", title: "Dart", href: "https://dart.dev", color: "text-blue-400" },
  { node: "SiTailwindcss", title: "Tailwind CSS", href: "https://tailwindcss.com", color: "text-cyan-500" },
  { node: "FaReact", title: "React Native", href: "https://reactnative.dev", color: "text-cyan-400" },
  { node: "SiFlutter", title: "Flutter", href: "https://flutter.dev", color: "text-blue-500" },
  { node: "FaNodeJs", title: "Node.js", href: "https://nodejs.org", color: "text-green-500" },
  { node: "SiFirebase", title: "Firebase", href: "https://firebase.google.com", color: "text-orange-500" },
  { node: "FaAws", title: "AWS", href: "https://aws.amazon.com", color: "text-orange-400" },
  { node: "FaDocker", title: "Docker", href: "https://www.docker.com", color: "text-blue-500" },
  { node: "FaGitAlt", title: "Git", href: "https://git-scm.com", color: "text-orange-500" },
  { node: "SiExpress", title: "Express", href: "https://expressjs.com", color: "text-gray-600 dark:text-gray-300" },
  { node: "Database", title: "SQL", href: "https://www.w3schools.com/sql/", color: "text-blue-500" },
  { node: "SiPostgresql", title: "PostgreSQL", href: "https://postgresql.org", color: "text-blue-600" }
]