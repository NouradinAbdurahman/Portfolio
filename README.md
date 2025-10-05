# Nouraddin's Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. This portfolio showcases my skills as a Software Engineering student and Full-stack Developer with a comprehensive admin panel for content management.

## 🚀 Live Demo & Screenshots

Visit the live portfolio: [https://www.nouradin.com](https://www.nouradin.com)

## ✨ Features

- **Modern Design**: Clean, professional design with dark/light mode support
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Smooth, focused animations using Framer Motion
- **Fast**: Built with Next.js 14 for optimal performance with advanced optimizations
- **TypeScript**: Fully typed for better development experience
- **Accessible**: Built with accessibility best practices
- **Advanced SEO**: Comprehensive SEO optimization with dynamic metadata, structured data, sitemap, and robots.txt
- **Optimized images**: next/image with responsive sizes and priority for above-the-fold
- **Performance Optimized**: Code splitting, lazy loading, and bundle optimization
- **Mobile-First UX**: Responsive project cards with touch-friendly interactions
- **Admin CMS**: Full in-app settings and content management powered by Supabase
- **Typography Controls**: Live-adjust global section titles/descriptions/body sizes + responsive hero title sizes (per breakpoint)
- **Mobile Menu Icon Toggle**: Choose between favicon image or hamburger icon on small screens
- **Dynamic Logo Font Loader**: Auto-loads the selected logo font from Google Fonts
- **Comprehensive Project Management**: Full CRUD operations for projects with detailed content editing
- **Smart Image Handling**: Support for both local and external images with automatic optimization
- **Advanced State Management**: Default/Undo functionality with change tracking
- **Granular Visibility Controls**: Hide/unhide sections, projects, and individual content fields
- **Real-time Synchronization**: Admin changes reflect immediately on the main site
- **Featured Projects Management**: Drag-and-drop reordering and custom title overrides
- **Profile Image Management**: Upload local files or use external URLs with live preview
- **Certification Links**: Clickable certification titles with hover effects and external link icons
- **Custom 404 Page**: Beautiful error page with gradient background and helpful navigation
- **Simplified Content Editing**: Clean, streamlined interface for content management

## 🔐 Admin Panel (CMS)

All admin pages require Supabase email/password auth (limited to the configured admin email). A consistent neumorphic UI, responsive layout, and auto-dismiss toasts are used across pages.

- **Admin Login** (`/admin/login`)
  - Email/password via Supabase
  - Failure feedback with animated toasts

- **Admin Dashboard** (`/admin/dashboard`)
  - Modern gradient card with subtle aurora accents
  - Quick links: Manage Site Settings, Manage Site Content
  - Log out (Supabase sign-out)

- **Manage Site Settings** (`/admin/settings`)
  - Theme
    - Page font family and Logo font family (font pickers)
    - Primary color and Background color (color input + hex)
    - Per-section background map (hero/about/services/skills/projects/contact/resume/footer)
  - Typography
    - Global section font sizes via CSS variables:
      - `Section Title Size` → `--fs-section-title`
      - `Section Description Size` → `--fs-section-description`
      - `Body Text Size` → `--fs-body`
    - Hero title responsive sizes (controls only the text "Software Engineer • Full-Stack Developer • Data Engineer"):
      - `Small (mobile)` → `--fs-hero-title-sm`
      - `Medium (≥768px)` → `--fs-hero-title-md`
      - `Large (≥1024px)` → `--fs-hero-title-lg`
  - Loading Behavior
    - Always show loading animation
    - Smart loading (shows only on slow networks)
    - Mutually exclusive toggles handled in UI logic
  - UI Controls
    - `show_theme_toggle`: hide/show Navbar theme toggle (Sun/Moon)
  - Mobile Menu Icon
    - Toggle between `Image` (uses `/public/favicon.png`) and `Hamburger` on small screens
    - Selected option is highlighted (green) in both light and dark themes
  - Featured Projects Management
    - Drag-and-drop reordering of featured projects
    - Custom title overrides for each project
    - Auto-removal of hidden projects from featured list
    - Hide entire section when no projects are visible
  - Section Order
    - Drag-and-drop reorder + Up/Down buttons; persisted as `section_order`
  - Actions
    - Reset All to Default, Undo last change, Back to Dashboard, Save Settings
  - Implementation
    - Reads/writes `site_settings` (Supabase)
    - Server route: `app/api/settings/route.ts` (admin RPC `update_site_setting`)
    - Live theme application via `contexts/settings-context.tsx` + `components/dynamic-theme.tsx`

- **Manage Site Content** (`/admin/content`)
  - Sidebar sections: hero, about, services, projects, skills, contact, resume, footer
    - Active section has a subtle always-on glow; hover glow on others
    - Mobile-friendly spacing and layout
  - Per-section controls
    - Global hide/unhide for the section
    - Title / Lead / Subtitle fields with per-field hide toggles
    - Hero: Primary/Secondary CTA label + href fields
    - About: Complete content management including:
      - Name, Role, Body description
      - Profile image upload (local files + external URLs) with live preview
      - Full-Stack Expertise, Data Engineering, Cloud & Automation sections
      - Individual hide/unhide for each content section
    - Services: add/remove/reorder service items; item hide/unhide; title, description, icon, technologies
    - Skills: three category cards; add/remove/reorder with fields (name, icon, color, category)
    - Contact/Footer: email, phone, location + social links
    - Resume: Comprehensive resume management with:
      - Education, Experience, Certifications, Technical Skills sections
      - Add/remove/reorder items in each section
      - Individual hide/unhide controls
      - Technology badge integration with automatic icon resolution
      - Certification links with live preview functionality
    - **Projects**: Comprehensive project management with:
      - Full CRUD operations (Create, Read, Update, Delete)
      - Individual project hide/unhide controls
      - Detailed project editor with all content fields
      - Image upload support (local paths and external URLs)
      - Technology badges with automatic icon resolution
      - Button visibility controls (Details, Live Demo, Repository)
      - Project details sections: Problem, Solution, Outcome, Key Features, Architecture, Technical Challenges, Key Learnings, Impact
      - Individual hide/unhide for each detail section
      - Live preview of all changes
  - **Advanced State Management**
    - Default/Undo buttons for sections and individual fields
    - Change tracking and history management
    - Real-time synchronization with main site
    - Session storage for preventing infinite loops
    - Refresh trigger mechanism for reactive UI updates
  - Actions
    - Save Content (per active section) and Reset to Default
    - Undo Last Change functionality
    - Back to Dashboard
    - Debug panel for troubleshooting
  - Implementation
    - Multilingual content powered by `translations` table (Supabase)
    - New API: `app/api/content/multilang/route.ts` (GET/POST full section translations in one request)
    - Backwards compatible: legacy `site_content` still upserts for older pages
    - Live fallback to English when a locale string is empty

### 🗣️ Multilingual Editing (EN/AR/TR/IT/FR/DE)
- Side‑by‑side editing per field across all locales
- Per‑field hide/unhide and per‑locale hide/unhide
- Sections migrated: `Hero`, `Navbar`, `About`, `Services`, `Technical Skills`
- Lists with translations:
  - `Services` → items with `title`, `description`, `icon`, `technologies[]`
  - `Technical Skills` → categories with `title`, `description`, `skills[{ name, icon, color }]`
  - `Hero` → skills list (badges) + CTA labels and hrefs

### New Admin Components
- `components/admin/multilang-sections.tsx` – Orchestrates per‑section editors
- `components/admin/multilang-field.tsx` – Side‑by‑side multi‑locale input
- `components/admin/multilang-dynamic-list.tsx` – Generic translated list editor
- `components/admin/services-manager.tsx` – Service icons + technologies editor
- `components/admin/technical-skills-manager.tsx` – Category + skills editor

### Data Migration & Scripts
Located in `scripts/`:
- `populate-services-technologies.js`, `populate-technical-skills.js`, `populate-hero-skills.js`
- `fix-services-structure.js`, `fix-skills-structure.js`, `fix-services-hidden-field.js`
- Run with `node scripts/<script>.js` (requires Supabase keys in `.env.local`)

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
- **React Icons** - Popular icon libraries (SiHtml5, SiCss3, SiSass, SiLess, etc.)
- **Custom CSS** - Neumorphism and glassmorphism effects
- **TechBadge Component** - Automatic icon resolution for 100+ technologies
- **SafeImage Component** - Smart image handling with error fallbacks and URL conversion

### Animation & Visual Effects
- **Framer Motion** - Declarative animations for UI elements
- **OGL Library** - WebGL-based rendering for complex background effects
- **Custom Aurora Component** - WebGL Aurora animation with customizable color stops
- **Custom Spotlight Component** - Dynamic gradient spotlight effects

### Backend & Database
- **Supabase** - Backend-as-a-Service for authentication and database
- **PostgreSQL** - Relational database for content management
- **Resend** - Email service for contact form
- **Next.js API Routes** - Serverless API endpoints for content and settings management
- **Vercel AI SDK** - AI-powered content generation and management

## 🔍 SEO & Performance Features

### Advanced SEO Implementation
- **Dynamic Metadata**: Each project page has unique, optimized metadata with proper titles, descriptions, and OpenGraph data
- **JSON-LD Structured Data**: Rich snippets for Person, WebSite, ProfessionalService, and Project schemas
- **Canonical URLs**: Proper canonical URL implementation to prevent duplicate content issues
- **Sitemap Generation**: Automatic sitemap.xml generation with all pages and projects
- **Robots.txt**: Comprehensive robots.txt for optimal search engine crawling
- **Meta Keywords**: Strategic keyword targeting for better search visibility
- **OpenGraph & Twitter Cards**: Rich social media previews with optimized images and descriptions

### Performance Optimizations
- **Next.js Image Optimization**: All images use next/image with responsive sizing and priority loading
- **Code Splitting**: Lazy loading of non-critical components (ContactForm, ResumeSection)
- **Bundle Optimization**: Tree shaking and minimal bundle size
- **Server-Side Rendering**: SEO-friendly SSR for all pages
- **Font Optimization**: Preloaded Google Fonts with display=swap
- **Analytics Integration**: Google Analytics with proper privacy compliance

### Accessibility Features
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **ARIA Labels**: Comprehensive ARIA labeling for screen readers
- **Keyboard Navigation**: Full keyboard accessibility support
- **Color Contrast**: WCAG AA compliant color contrast ratios
- **Focus Management**: Visible focus indicators and logical tab order
- **Alt Text**: Descriptive alt text for all images

### Search Engine Optimization
- **Rich Snippets**: Structured data for enhanced search results
- **Mobile-First Indexing**: Optimized for Google's mobile-first indexing
- **Core Web Vitals**: Optimized for LCP, FID, and CLS metrics
- **Page Speed**: Fast loading times with optimized assets
- **Internal Linking**: Strategic internal linking structure
- **URL Structure**: Clean, SEO-friendly URLs

## 📁 Project Structure

```
├── app/
│   ├── globals.css                      # Global styles & design tokens
│   ├── layout.tsx                       # Root layout (theme, Analytics, SEO, JSON-LD, Toaster)
│   ├── page.tsx                         # Home page (Hero, About, Services, Skills, Projects, Contact, Resume)
│   ├── loading.tsx                      # Loading component for Suspense boundaries
│   ├── not-found.tsx                    # Custom 404 page with Aurora background and navigation
│   ├── sitemap.ts                       # Dynamic sitemap generation
│   ├── projects/
│   │   ├── page.tsx                     # Projects index
│   │   └── [slug]/page.tsx              # Project detail (problem → solution → tech → outcome)
│   ├── admin/
│   │   ├── dashboard/page.tsx           # Admin dashboard
│   │   ├── login/page.tsx               # Admin login
│   │   ├── content/page.tsx             # Content management
│   │   └── settings/page.tsx            # Site settings management
│   └── api/
│       ├── contact/route.ts             # Resend email route (sanitized + honeypot)
│       ├── content/route.ts             # Content management API (GET/POST)
│       └── settings/route.ts            # Settings management API (GET/POST)
├── components/
│   ├── navbar.tsx                       # Shared navbar (theme toggle, internal links)
│   ├── footer.tsx                       # Unified footer component (social links with aria-labels)
│   ├── loading.tsx                      # Loading component
│   ├── contact-form.tsx                 # Lazy-loaded contact form
│   ├── resume-section.tsx               # Lazy-loaded resume section
│   ├── sections/                        # Section composables (Hero, About, Services, Skills, Projects)
│   ├── admin/                           # Admin panel components
│   │   └── font-family-select.tsx       # Font family selector for admin
│   └── ui/                              # Atomic UI components & utilities
│       ├── aurora.tsx                   # Aurora background animation
│       ├── spotlight-new.tsx            # Spotlight background animation
│       ├── tech-stack-loop.tsx          # Continuous tech logo marquee
│       ├── tech-badge.tsx               # Auto-icon/color tech badge (100+ technologies)
│       ├── safe-image.tsx               # Smart image handling with error fallbacks
│       ├── project-card.tsx, service-card.tsx, skill-card.tsx, typography.tsx, section.tsx, section-header.tsx, grid.tsx
│       └── … all shadcn/ui primitives (button, card, input, etc.)
├── hooks/
│   ├── use-toast.ts                     # toast store used by Toaster
│   ├── use-mobile.ts                    # isMobile hook (media query)
│   └── use-content.ts                   # Content management hook
├── contexts/
│   ├── settings-context.tsx             # Global settings context
│   └── loading-context.tsx              # Loading state context
├── lib/
│   ├── data.ts                          # Centralized content (projects, services, skills)
│   ├── utils.ts                         # cn() helper (clsx + tailwind-merge)
│   ├── seo.ts                           # SEO utilities (metadata generation, structured data)
│   └── supabaseClient.ts                # Supabase client configuration
├── scripts/
│   ├── performance-check.js             # Performance optimization checker
│   └── lighthouse-audit.js              # Lighthouse SEO/performance audit script
├── public/
│   ├── resume/                          # Resume PDF files
│   ├── photo.png                        # Profile photo (and /projects/*.png covers)
│   ├── robots.txt                       # Search engine crawling instructions
│   └── favicon.png                      # Site favicon
├── next.config.mjs                      # Next.js configuration with optimizations
├── middleware.ts                        # Next.js middleware for admin protection
└── README.md
```

## 🎯 Sections

1. **Hero Section** - Introduction with call-to-action buttons
2. **About Me** - Personal information and skills (fully editable from admin)
3. **Services** - Comprehensive service offerings with 4 service cards
4. **Portfolio** - Featured projects showcase + detail pages per project
5. **Resume** - Education, experience, and certifications (fully editable from admin)
6. **Contact** - Contact form (zod validation, toasts, honeypot) and social links

## 🔍 SEO Implementation Details

### Dynamic Metadata Generation
Each project page automatically generates optimized metadata including:
- **Title**: `{Project Name} – Nouraddin` format
- **Description**: Truncated to 160 characters for optimal display
- **OpenGraph**: Complete social media preview data
- **Twitter Cards**: Optimized for Twitter sharing
- **Canonical URLs**: Prevents duplicate content issues

### Structured Data (JSON-LD)
Comprehensive structured data implementation:
- **Person Schema**: Personal information, skills, and social links
- **WebSite Schema**: Site information with search functionality
- **ProfessionalService Schema**: Service offerings and expertise
- **Project Schema**: Individual project details with technologies and links

### Search Engine Optimization
- **Sitemap**: Auto-generated sitemap.xml with all pages and projects
- **Robots.txt**: Comprehensive crawling instructions
- **Meta Keywords**: Strategic keyword targeting
- **Image Optimization**: Next.js Image with responsive sizing and alt text
- **Performance**: Optimized for Core Web Vitals

### SEO Utility Functions
Located in `lib/seo.ts`:
- `generateMetadata()`: Create metadata for any page
- `generateProjectSchema()`: Generate Project structured data
- `generatePersonSchema()`: Generate Person structured data

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

3. Configure environment variables in `.env.local`:
```bash
# Supabase (required for admin settings/content)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Resend (contact form)
RESEND_API_KEY=...
CONTACT_TO_EMAIL=n.aden1208@gmail.com

# Optional: Google Fonts API (for admin font previews)
NEXT_PUBLIC_GOOGLE_FONTS_API_KEY=...
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
Update your personal information through the admin panel at `/admin/content`:
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
- **Project Cards**: Responsive buttons with abbreviated text on mobile
- **Desktop Hover**: Hover effects preserved for desktop users
- **Touch-Friendly**: Optimized for touch devices with proper button sizing
- **Progressive Enhancement**: Core functionality works on all devices
- **Admin Panel**: Fully responsive admin interface with mobile-optimized controls

## 🌙 Dark/Light Mode

Theme toggle powered by next-themes (class strategy). Colors and backgrounds adapt via CSS variables.

Notes:
- Section background CSS variables set in settings are only enforced in dark mode; in light mode the app falls back to light defaults for readability.

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
- **SafeImage Component**: Smart error handling and URL conversion

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

### 4. **Viaggi del Qatar Tour Booking System**
*Enterprise Booking Management Platform*
- **Tech Stack**: Next.js 14, TypeScript, PostgreSQL, Tailwind CSS, Prisma, PDF-lib, Nodemailer
- **Features**: Multi-tour reservations, automated PDF generation, real-time dashboards, agent portal
- **Impact**: 50% operational efficiency improvement, 90% reduction in data entry errors

## Recent Updates

### 🆕 Latest Features (December 2024)
- **Certification Links**: Clickable certification titles that open DataCamp certificates in new tabs
- **Hover Effects**: Glowing accent color effects and external link icons on certification titles
- **Admin Link Management**: Add, edit, and preview certification links in the admin panel
- **Custom 404 Page**: Beautiful error page with gradient background, floating animations, and helpful navigation
- **Responsive 404 Design**: Mobile-optimized 404 page with touch-friendly buttons and proper spacing
- **Smart Navigation**: 404 page includes quick links to Home, Projects, About, and Contact sections

### 🚀 Latest Admin Panel Enhancements (December 2024)
- **Simplified Content Editing**: Removed formatting buttons and preview sections for cleaner interface
- **Profile Image Management**: Enhanced upload system supporting both local files and external URLs with live preview
- **Mobile-Responsive Admin**: Optimized admin interface for all screen sizes with responsive button layouts
- **Project Card Mobile Optimization**: Responsive project card buttons with abbreviated text on small screens
- **About Section Full Editability**: Complete content management for About section including profile image, expertise sections, and all text content
- **Certification Links System**: Clickable certification titles with hover effects and external link icons
- **Admin Certification Management**: Link field for certifications with live preview functionality
- **Custom 404 Page**: Beautiful, modern 404 page with Aurora background and helpful navigation
- **Advanced Error Handling**: Comprehensive error handling and debugging tools
- **Performance Optimizations**: Resolved all linting warnings and improved build performance
- **Real-time Synchronization**: Admin changes reflect immediately on main site without manual refresh

### 🎛️ Admin Panel Button System (21+ Button Types)
- **Main Toolbar Buttons**: Default, Undo, Hide/Unhide section controls
- **Field-Level Controls**: Individual Default/Undo buttons for each editable field
- **Project Management Buttons**: Add, Remove, Move Up/Down, Hide/Unhide projects
- **Project Details Controls**: Toggle visibility of detailed project editor
- **Button Visibility Toggles**: Control visibility of Details, Live Demo, Repository buttons
- **Content Section Controls**: Individual hide/unhide for Problem, Solution, Outcome, Key Features, Architecture, Technical Challenges, Key Learnings, Impact
- **Profile Image Controls**: Upload, clear, and hide/unhide profile image
- **Visual Feedback**: Color-coded buttons with hover effects and state indicators
- **Responsive Design**: All buttons optimized for mobile and desktop interfaces

### 🎨 Visual Design & Animation Updates
- **Navbar Mobile Icon Toggle**: Choose favicon image or hamburger on small screens; active selections highlighted in green (light & dark)
- **Hero Title Controls**: Admin can set responsive font sizes (sm/md/lg) for the hero headline via CSS variables
- **Typography Controls**: Admin can set global section title/description/body sizes with immediate effect
- **Dynamic Logo Font Loader**: Automatically injects Google Fonts stylesheet for selected logo font
- **Light Mode Polish (Admin)**: Cards, inputs, and labels tuned for legibility; green active states for toggles/buttons
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
- **Infinite Loop Prevention**: Session storage guards and optimized useEffect dependencies
- **Build Optimization**: Successful compilation with zero errors and warnings

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
- **Mobile-First Project Cards**: Responsive buttons with abbreviated text on mobile devices
- **Touch-Friendly UX**: Optimized interactions for touch devices
- **Desktop Hover Effects**: Preserved hover interactions for desktop users
- **Progressive Enhancement**: Core functionality works across all device sizes
- **Button Visibility**: Moved project action buttons below images for better accessibility
- **Admin Mobile Optimization**: Responsive admin interface with mobile-friendly controls

### 🛠️ Technical Improvements
- **Component Architecture**: Separated heavy components into lazy-loaded modules
- **Next.js Configuration**: Enhanced with performance optimizations and security headers
- **TypeScript**: Improved type safety and removed unused imports
- **Build Optimization**: Reduced bundle size by 40-60% and improved loading times
- **Next.js Links**: Replaced all `<a>` tags with proper Next.js `<Link>` components
- **Error Handling**: Fixed all linter errors and warnings for clean codebase
- **SafeImage Component**: Smart image handling with error fallbacks and URL conversion
- **TechBadge Component**: Automatic icon resolution for 100+ technologies
- **Session Storage**: Prevents infinite loops and improves performance
- **Real-time Sync**: Admin changes reflect immediately on main site
- **Cache Busting**: Ensures fresh content with proper cache invalidation

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

## 🎛️ Admin Panel Features

### Content Management System
- **Real-time Editing**: All changes reflect immediately on the main site
- **Comprehensive Project Management**: Full CRUD operations with detailed content editing
- **Advanced State Management**: Default/Undo functionality with change tracking
- **Granular Controls**: Hide/unhide sections, projects, and individual content fields
- **Smart Image Handling**: Support for both local and external images with automatic optimization
- **Profile Image Management**: Upload local files or use external URLs with live preview
- **Simplified Interface**: Clean, streamlined content editing without unnecessary complexity

### Button System Overview
The admin panel includes 21+ different button types for complete content control:

#### Main Toolbar Buttons
- **Default Button**: Resets entire section to default values
- **Undo Button**: Reverts last change made to active section
- **Hide/Unhide Button**: Controls section visibility
- **Refresh Button**: Manually refresh content from database
- **Debug Button**: Toggle debug panel for troubleshooting

#### Field-Level Controls
- **Field Default/Undo**: Individual controls for each editable field
- **Field Hide/Unhide**: Toggle visibility of specific content sections

#### Project Management
- **Add Project**: Create new project cards
- **Remove Project**: Delete projects from the list
- **Move Up/Down**: Reorder projects in the list
- **Project Hide/Unhide**: Control individual project visibility
- **Project Details Toggle**: Show/hide detailed project editor

#### Project Details Controls
- **Content Section Hide/Unhide**: Individual controls for Problem, Solution, Outcome, Key Features, Architecture, Technical Challenges, Key Learnings, Impact
- **Button Visibility Toggles**: Control visibility of Details, Live Demo, Repository buttons

#### Profile Image Controls
- **File Upload**: Direct file upload with drag-and-drop support
- **URL Input**: Enter local paths or external URLs
- **Live Preview**: Real-time image preview in admin
- **Clear Image**: Remove current image
- **Hide/Unhide**: Control profile image visibility

### Technology Integration
- **TechBadge Component**: Automatic icon resolution for 100+ technologies
- **SafeImage Component**: Smart image handling with error fallbacks
- **Real-time Synchronization**: Changes sync immediately across all pages
- **Session Storage**: Prevents infinite loops and improves performance

### Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint

### 🌍 Multilingual System Overhaul (October 2025)

- Supabase is now the single source of truth for all translations at runtime
- All sections (Navbar, Hero, About, Services, Technical Skills, Projects, Contact, Resume, Footer) read text via `useSupabaseTranslations.t('key', fallback)`
- Local `messages/*.json` kept only for seeding/dev; not used in production rendering
- Google Translate is used only from Admin → “Auto Translate”; never during frontend rendering
- Instant Admin → Site sync: edits save to Supabase and the site reads the latest values immediately
- Projects resolve from `projects.items.<slug>.*` (title, description, problem, solution, outcome, features, challenges, learnings, impact)
- Services resolve from `services.items`; if per‑locale fields are missing, fallback keys are used:
  - `services.webDevelopment.title|description`
  - `services.dataEngineering.title|description`
  - `services.mobileDevelopment.title|description`
  - `services.cloudSolutions.title|description`
- Server-only Supabase client added at `lib/supabaseServerClient.ts`; API routes updated accordingly
- Translation upserts now use `onConflict: 'key'` and always include EN baseline

Useful commands
```bash
# Seed translations from local messages (optional, dev only)
node scripts/sync-messages-to-db.js

# Process pending auto-translation jobs
curl -X POST http://localhost:3000/api/translate/process-queue
```

### October 2025 updates

- Services and Technical Skills now render strictly via translation keys, mirroring Hero:
  - Services cards use `services.<key>.title|description` with per-card hide flags.
  - Technical Skills uses `skills.title`, `skills.lead`, and `skills.cat*` keys for category titles/descriptions and visibility.
- Persistent Services localization: if a locale has empty/missing values, the UI falls back to that locale’s per-key strings before static defaults, preventing unwanted English regressions.
- Placeholder handling: values like `[TRANSLATE_NEEDED]` are treated as missing; the client falls back to English automatically.
- Resume employment type updated to Part-time across locales:
  - Default fallback in UI set to `Part-time`.
  - Script to upsert translations: `node scripts/update-resume-from-admin.js` (requires `SUPABASE_SERVICE_ROLE_KEY`).
- Footer: remains link-only; to localize labels/tagline, add keys under `footer.*` and read them with `useSupabaseTranslations`.