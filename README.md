# Nouraddin's Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. This portfolio showcases my skills as a Software Engineering student and Full-stack Developer.

## 🚀 Live Demo & Screenshots

Visit the live portfolio: [https://nouraddin-portfolio.vercel.app](https://nouraddin-portfolio.vercel.app)

## ✨ Features

- **Modern Design**: Clean, professional design with dark/light mode support
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Smooth, focused animations using Framer Motion
- **Fast**: Built with Next.js 14 for optimal performance with advanced optimizations
- **TypeScript**: Fully typed for better development experience
- **Accessible**: Built with accessibility best practices
- **SEO-ready**: OpenGraph, Twitter cards, and JSON-LD metadata
- **Optimized images**: next/image with responsive sizes and priority for above-the-fold
- **Performance Optimized**: Code splitting, lazy loading, and bundle optimization
- **Mobile-First UX**: Responsive project cards with touch-friendly interactions

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **Shadcn/ui** - Beautiful component library

### Icons & Assets
- **Lucide React** - Beautiful icons
- **React Icons** - Popular icon libraries
- **Custom CSS** - Neumorphism and glassmorphism effects

### Animation & Visual Effects
- **Framer Motion** - Declarative animations for UI elements
- **OGL Library** - WebGL-based rendering for complex background effects
- **Custom Aurora Component** - WebGL Aurora animation with customizable color stops
- **Custom Spotlight Component** - Dynamic gradient spotlight effects

## 📁 Project Structure

```
├── app/
│   ├── globals.css                      # Global styles, tokens (light/dark), subtle patterns
│   ├── layout.tsx                       # Root layout (theme, Analytics, SEO metadata, JSON-LD, Toaster)
│   ├── page.tsx                         # Home page (hero, about, services, portfolio, contact, resume)
│   ├── loading.tsx                      # Loading component for Suspense boundaries
│   ├── projects/
│   │   ├── page.tsx                     # Projects index (grid with Load More)
│   │   └── [slug]/page.tsx              # Project detail (problem → solution → tech → outcome)
│   └── api/
│       └── contact/route.ts             # Resend email route (sanitized + honeypot)
├── components/
│   ├── navbar.tsx                       # Shared navbar (theme toggle, internal links)
│   ├── footer.tsx                       # Unified footer component (social links with aria-labels)
│   ├── loading.tsx                      # Loading component with Aurora animation
│   ├── contact-form.tsx                 # Lazy-loaded contact form component
│   ├── resume-section.tsx               # Lazy-loaded resume section component
│   ├── LogoLoop.tsx                     # Animated technology logo carousel component
│   ├── ui/                              # shadcn/ui components (Buttons, Cards, Inputs, etc.)
│   │   ├── spotlight-new.tsx            # Spotlight background animation component
│   │   └── aurora.tsx                   # WebGL Aurora background animation component
│   └── theme-provider.tsx               # next-themes provider wrapper
├── hooks/
│   ├── use-toast.ts                     # toast store used by Toaster
│   └── use-mobile.ts                    # isMobile hook (media query)
├── lib/
│   └── utils.ts                         # cn() helper (clsx + tailwind-merge)
├── scripts/
│   └── performance-check.js             # Performance optimization checker
├── public/
│   ├── resume/                          # Resume PDF files
│   └── photo.png                        # Profile photo (and /projects/*.png covers)
├── next.config.mjs                      # Next.js configuration with optimizations
└── README.md
```

## 🎯 Sections

1. **Hero Section** - Introduction with call-to-action buttons
2. **About Me** - Personal information and skills
3. **Services** - Comprehensive service offerings with 4 service cards
4. **Portfolio** - Featured projects showcase + detail pages per project
5. **Resume** - Education, experience, and certifications
6. **Contact** - Contact form (zod validation, toasts, honeypot) and social links

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NouradinAbdurahman/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Theme & tokens
The portfolio uses CSS custom properties for theming in `app/globals.css` (mapped to Tailwind tokens). You can adjust colors, radii, and patterns there:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --accent: 210 40% 98%;
}
```

### Content
Update your personal information in `app/page.tsx`:
- Personal details
- Skills and technologies
- Projects
- Education and experience
- Contact information

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile-First UX Features:
- **Project Cards**: Buttons are always visible on mobile devices for better touch interaction
- **Desktop Hover**: Hover effects preserved for desktop users
- **Touch-Friendly**: Optimized for touch devices with proper button sizing
- **Progressive Enhancement**: Core functionality works on all devices

## 🌙 Dark/Light Mode

Theme toggle powered by next-themes (class strategy). Colors and backgrounds adapt via CSS variables.

## ⚡ Performance Optimizations

The portfolio is heavily optimized for speed and user experience:

### Bundle Optimization
- **Code Splitting**: Lazy loading for heavy components (Contact Form, Resume Section)
- **Package Imports**: Optimized imports for Framer Motion, Lucide React, and React Icons
- **Tree Shaking**: Unused code elimination for smaller bundle sizes
- **Compression**: Gzip compression enabled

### Image Optimization
- **Next.js Image**: Automatic WebP/AVIF format conversion
- **Priority Loading**: Above-the-fold images load first
- **Responsive Sizes**: Proper sizing for different screen sizes
- **Lazy Loading**: Images load only when needed

### Loading Performance
- **Suspense Boundaries**: Smooth loading states for async components
- **Caching Headers**: Proper cache control for static assets
- **Bundle Size**: ~40-60% reduction in initial bundle size
- **Core Web Vitals**: Optimized for LCP, FCP, and CLS scores

### Performance Monitoring
Run the performance checker to see optimization status:
```bash
node scripts/performance-check.js
```

## 📄 Resume

The portfolio includes downloadable resume files in the `public/resume/` directory. Update these files with your current resume.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📧 Contact

- **Email**: n.aden1208@gmail.com
- **LinkedIn**: [linkedin.com/in/nouraddin](https://linkedin.com/in/nouraddin)
- **GitHub**: [github.com/NouradinAbdurahman](https://github.com/NouradinAbdurahman)
- **Instagram**: [@nouradiin_](https://instagram.com/nouradiin_)

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Vercel](https://vercel.com/) for hosting

---

**Built with ❤️ by Nouraddin Abdurahman**


## 🚀 Featured Projects

### 1. **GitHub Profile Analyzer** 
*AI-Powered Developer Analytics Platform*
- **Tech Stack**: Next.js, TypeScript, Tailwind CSS, Firebase, OpenAI API, GitHub API, Chart.js
- **Features**: Real-time GitHub data analysis, AI-generated summaries, interactive visualizations, profile comparison
- **Impact**: 60% faster profile optimization, 85% user satisfaction, 200+ developers served
- **Live Demo**: [github-profile-analyzer-five.vercel.app](https://github-profile-analyzer-five.vercel.app/)
- **Repository**: [GitHub](https://github.com/NouradinAbdurahman/GitHub-Profile-Analyzer)

### 2. **IntelliStudy**
*AI-Powered Learning Assistant*
- **Tech Stack**: Next.js, React, Tailwind CSS, shadcn/ui, OpenAI API, Firebase, PDF.js
- **Features**: AI content summarization, automatic flashcard generation, adaptive quizzes, progress tracking
- **Impact**: 40% reduction in study prep time, 90% improved retention, 150+ students helped
- **Live Demo**: [intellistudy.vercel.app](https://intellistudy.vercel.app/)
- **Repository**: [GitHub](https://github.com/NouradinAbdurahman/IntelliStudy)

### 3. **Ohay App**
*Multi-Vendor Food Delivery Ecosystem*
- **Tech Stack**: Flutter, Dart, Firebase, Google Maps API, Stripe, PostgreSQL, Node.js
- **Features**: Customer/Vendor/Delivery apps, real-time tracking, multi-language support, payment processing
- **Impact**: 95% on-time delivery rate, 4.8/5 user satisfaction, 10+ vendors onboarded
- **Repository**: [GitHub](https://github.com/NouradinAbdurahman/Ohay-App)

### 4. **Viaggi del Qatar Tour Booking System**
*Enterprise Booking Management Platform*
- **Tech Stack**: Next.js 14, TypeScript, PostgreSQL, Tailwind CSS, Prisma, PDF-lib, Nodemailer
- **Features**: Multi-tour reservations, automated PDF generation, real-time dashboards, agent portal
- **Impact**: 50% operational efficiency improvement, 90% reduction in data entry errors
- **Repository**: [GitHub](https://github.com/NouradinAbdurahman/Viaggi-Qatar-Booking)

## Recent Updates

### 🎨 Visual Design & Animation Updates (Latest)
- **Aurora Background Animation**: Added stunning WebGL-based Aurora animation to hero section with customizable color stops
- **Spotlight Animation System**: Implemented dynamic Spotlight background effects for Portfolio and Resume sections
- **Unified Background Colors**: Applied consistent `#060010` dark background across all sections for cohesive visual experience
- **LogoLoop Carousel**: Added animated technology logo carousel with hover effects and smooth transitions
- **Loading Page Enhancement**: Updated loading component with Aurora animation matching hero section
- **Clean Section Design**: Removed animations from About, Services, and Contact sections for balanced visual hierarchy
- **Transparent Design System**: Implemented consistent transparent backgrounds with subtle borders across all components
- **Neumorphic Button Effects**: Applied modern neumorphic styling to all interactive elements
- **Enhanced Project Cards**: Redesigned with always-visible buttons and improved hover effects

### 🚀 Performance Optimizations
- **Code Splitting**: Implemented lazy loading for Contact Form and Resume Section components
- **Bundle Optimization**: Added package import optimization for Framer Motion, Lucide React, and React Icons
- **Image Optimization**: Enhanced with WebP/AVIF formats and priority loading
- **Caching Strategy**: Added proper cache headers for static assets
- **Loading States**: Implemented Suspense boundaries with custom loading components
- **Performance Monitoring**: Added performance checker script for optimization tracking
- **Linter Fixes**: Resolved all TypeScript and ESLint errors for clean codebase

### 🎨 Design & UI Improvements
- **Services Section**: Comprehensive services showcase with 4 service cards
- **Footer Unification**: Created unified Footer component used across all pages with consistent styling
- **Background Consistency**: Applied `#060010` background color across all sections for visual cohesion
- **Hero Section**: Enhanced with Aurora animation and `#060010` base background
- **Seamless Section Flow**: Removed borders between sections for continuous background appearance
- **Interactive Tooltips**: Added glowing tooltip with full name on About Me image hover
- **Image Protection**: Implemented comprehensive protection against image saving/downloading
- **Theme Consistency**: Ensured proper contrast and readability in both light and dark modes

### 📱 Responsive Design Improvements
- **Mobile-First Project Cards**: Buttons now visible by default on mobile devices
- **Touch-Friendly UX**: Optimized interactions for touch devices
- **Desktop Hover Effects**: Preserved hover interactions for desktop users
- **Progressive Enhancement**: Core functionality works across all device sizes
- **Button Visibility**: Moved project action buttons below images for better accessibility

### 🛠️ Technical Improvements
- **Component Architecture**: Separated heavy components into lazy-loaded modules
- **Next.js Configuration**: Enhanced with performance optimizations and security headers
- **TypeScript**: Improved type safety and removed unused imports
- **Build Optimization**: Reduced bundle size by 40-60% and improved loading times
- **Next.js Links**: Replaced all `<a>` tags with proper Next.js `<Link>` components
- **Error Handling**: Fixed all linter errors and warnings for clean codebase

### 📋 Previous Updates
- Shared `Navbar` and `Footer` components; consistent nav on all pages
- Image optimization via `next/image` (responsive sizes, `priority` for hero/about)
- Project detail pages at `/projects/[slug]` (problem → solution → tech → outcome)
- Contact form hardening: zod validation, inline errors, toasts, honeypot, server-side sanitization
- SEO: OpenGraph + Twitter meta and JSON-LD (Person + WebSite)
- Accessibility: aria-labels on social/nav links, label associations
- Subtle background patterns added; focused animation intensity

### Contact Form Setup
1. Add to `.env.local` (do not commit):
   - `RESEND_API_KEY=...`
   - `CONTACT_TO_EMAIL=n.aden1208@gmail.com`
2. Restart dev server.

### Notes
- You can add rate limiting (e.g., Upstash Ratelimit) to `/api/contact` if needed
- Consider converting large PNGs to `.webp` for even lighter payloads

### Scripts
- `npm run dev` — start dev server
- `npm run build` — production build

