"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Menu, X } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"
import { useLocale } from "next-intl"
import { useSupabaseTranslations } from "@/hooks/use-supabase-translations"
import { LanguageSwitcher } from "@/components/language-switcher"
import { MixedContent } from "@/lib/rtl-utils"

interface NavbarProps {
  basePath?: string
}

export function Navbar({ basePath = "" }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { settings } = useSettings()
  const { t } = useSupabaseTranslations()
  const locale = useLocale()
  const isRTL = locale === 'ar'

  // Admin hide flags
  const navHidden = (t('navigation.hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideAbout = (t('navigation.about_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideProjects = (t('navigation.projects_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideServices = (t('navigation.services_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideContact = (t('navigation.contact_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideResume = (t('navigation.resume_hidden', 'false') || 'false').toString().toLowerCase() === 'true'

  const href = (hash: string) => `${basePath}${hash}`

  if (navHidden) return null
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar border-b dark:border-white/10 light:border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-2 sm:py-4 justify-between min-w-0">
          {/* Logo - always on the left in LTR, right in RTL */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
            className={isRTL ? 'order-2' : 'order-1'}
          >
            <Link href="/" className="inline-flex items-center select-none cursor-pointer no-select-drag" draggable={false} aria-label="Go to home">
              <span className="text-3xl font-bold dark:text-white text-black no-select-drag" style={{ fontFamily: 'var(--logo-font-family, Lobster), cursive' }}>Nouraddin</span>
            </Link>
          </motion.div>

          {/* Navigation Links - center */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className={`hidden md:flex items-center ${isRTL ? 'gap-8' : 'space-x-8'} order-2`}
          >
            {isRTL ? (
              // RTL order: Resume, Contact, Services, Projects, About
              <>
                {!hideResume && <Link aria-label="Go to Resume section" href={href("#resume")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}><MixedContent text={t('navigation.resume', 'Resume')} isRTL={isRTL} /></Link>}
                {!hideContact && <Link aria-label="Go to Contact section" href={href("#contact")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}><MixedContent text={t('navigation.contact', 'Contact')} isRTL={isRTL} /></Link>}
                {!hideServices && <Link aria-label="Go to Services section" href={href("#services")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}><MixedContent text={t('navigation.services', 'Services')} isRTL={isRTL} /></Link>}
                {!hideProjects && <Link aria-label="Go to Portfolio section" href={href("#portfolio")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}><MixedContent text={t('navigation.projects', 'Projects')} isRTL={isRTL} /></Link>}
                {!hideAbout && <Link aria-label="Go to About section" href={href("#about")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}><MixedContent text={t('navigation.about', 'About')} isRTL={isRTL} /></Link>}
              </>
            ) : (
              // LTR order: About, Projects, Services, Contact, Resume
              <>
                {!hideAbout && <Link aria-label="Go to About section" href={href("#about")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}><MixedContent text={t('navigation.about', 'About')} isRTL={isRTL} /></Link>}
                {!hideProjects && <Link aria-label="Go to Portfolio section" href={href("#portfolio")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}><MixedContent text={t('navigation.projects', 'Projects')} isRTL={isRTL} /></Link>}
                {!hideServices && <Link aria-label="Go to Services section" href={href("#services")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}><MixedContent text={t('navigation.services', 'Services')} isRTL={isRTL} /></Link>}
                {!hideContact && <Link aria-label="Go to Contact section" href={href("#contact")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}><MixedContent text={t('navigation.contact', 'Contact')} isRTL={isRTL} /></Link>}
                {!hideResume && <Link aria-label="Go to Resume section" href={href("#resume")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}><MixedContent text={t('navigation.resume', 'Resume')} isRTL={isRTL} /></Link>}
              </>
            )}
          </motion.div>

          {/* Right side controls - always on the right */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'} order-3 flex-shrink-0 min-w-0`}
          >
            {/* Language switcher - hidden on small devices, shown in mobile dropdown */}
            <div className="hidden md:block relative">
              <LanguageSwitcher />
            </div>
            
            {/* Theme toggle - desktop only */}
            {settings?.show_theme_toggle !== false && (
              <div className="hidden md:block">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-9 h-9 p-0 dark:text-white text-black hover:bg-muted/50 cursor-pointer"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </div>
            )}
            
            {/* Hamburger menu only - theme toggle removed from main navbar */}
            <Button
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              variant="ghost"
              size="sm"
              className="md:hidden w-9 h-9 p-0 dark:text-white text-black hover:bg-muted/50 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : ((settings?.mobile_menu_icon ?? 'image') === 'image' ? (
                <Image src="/favicon.png" alt="Open menu" width={20} height={20} className="rounded" />
              ) : (
                <Menu className="h-4 w-4" />
              ))}
            </Button>
            
          </motion.div>
        </div>

        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`md:hidden py-2 sm:py-4 border-t border-border ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex flex-col space-y-4`}>
              {/* Mobile menu always uses the same order regardless of language */}
              {!hideAbout && <Link href={href("#about")} className={`dark:text-muted-foreground text-black hover:text-primary transition-colors ${isRTL ? 'text-right' : 'text-left'}`} prefetch={false} onClick={() => setIsMobileMenuOpen(false)}><MixedContent text={t('navigation.about', 'About')} isRTL={isRTL} /></Link>}
              {!hideProjects && <Link href={href("#portfolio")} className={`dark:text-muted-foreground text-black hover:text-primary transition-colors ${isRTL ? 'text-right' : 'text-left'}`} prefetch={false} onClick={() => setIsMobileMenuOpen(false)}><MixedContent text={t('navigation.projects', 'Projects')} isRTL={isRTL} /></Link>}
              {!hideServices && <Link href={href("#services")} className={`dark:text-muted-foreground text-black hover:text-primary transition-colors ${isRTL ? 'text-right' : 'text-left'}`} prefetch={false} onClick={() => setIsMobileMenuOpen(false)}><MixedContent text={t('navigation.services', 'Services')} isRTL={isRTL} /></Link>}
              {!hideContact && <Link href={href("#contact")} className={`dark:text-muted-foreground text-black hover:text-primary transition-colors ${isRTL ? 'text-right' : 'text-left'}`} prefetch={false} onClick={() => setIsMobileMenuOpen(false)}><MixedContent text={t('navigation.contact', 'Contact')} isRTL={isRTL} /></Link>}
              {!hideResume && <Link href={href("#resume")} className={`dark:text-muted-foreground text-black hover:text-primary transition-colors ${isRTL ? 'text-right' : 'text-left'}`} prefetch={false} onClick={() => setIsMobileMenuOpen(false)}><MixedContent text={t('navigation.resume', 'Resume')} isRTL={isRTL} /></Link>}
              <div className="flex items-center justify-end gap-2">
                <LanguageSwitcher />
                {settings?.show_theme_toggle !== false && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-9 h-9 p-0 dark:text-white text-black hover:bg-muted/50 cursor-pointer"
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar


