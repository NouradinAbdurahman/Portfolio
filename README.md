# Nouraddin's Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. This portfolio showcases my skills as a Software Engineering student and Full-stack Developer.

## 🚀 Live Demo

Visit the live portfolio: [https://nouraddin-portfolio.vercel.app](https://nouraddin-portfolio.vercel.app)

## ✨ Features

- **Modern Design**: Clean, professional design with dark/light mode support
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Smooth animations and transitions using Framer Motion
- **Fast**: Built with Next.js 14 for optimal performance
- **TypeScript**: Fully typed for better development experience
- **Accessible**: Built with accessibility best practices

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

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main portfolio page
├── components/
│   ├── ui/                  # Reusable UI components
│   └── theme-provider.tsx   # Theme context provider
├── lib/
│   └── utils.ts             # Utility functions
├── public/
│   ├── resume/              # Resume PDF files
│   └── photo.jpg            # Profile photo
└── README.md
```

## 🎯 Sections

1. **Hero Section** - Introduction with call-to-action buttons
2. **About Me** - Personal information and skills
3. **Portfolio** - Featured projects showcase
4. **Resume** - Education, experience, and certifications
5. **Contact** - Contact form and social links

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

### Colors
The portfolio uses CSS custom properties for theming. You can customize colors in `app/globals.css`:

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

## 🌙 Dark/Light Mode

The portfolio includes a theme toggle that switches between dark and light modes. The theme preference is saved in localStorage.

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
