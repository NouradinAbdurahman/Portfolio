"use client"

import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Loader2, Send, Check, AlertCircle } from "lucide-react"
import { Github, Linkedin } from "lucide-react"
import { FaInstagram, FaXTwitter } from "react-icons/fa6"
import { z } from "zod"
import { useSupabaseTranslations } from "@/hooks/use-supabase-translations"
import { useLocale } from "next-intl"
import { useToast } from "@/hooks/use-toast"

const ContactSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Email is invalid"),
  subject: z.string().min(3, "Subject is too short"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactForm() {
  const { t, refresh, clearCache } = useSupabaseTranslations({ autoRefresh: true })
  const locale = useLocale()
  const isRTL = locale === 'ar'
  
  // Force refresh translations on mount
  React.useEffect(() => {
    clearCache()
    refresh()
  }, [refresh, clearCache])
  
  // Get translations with fallbacks
  const title = t('contact.title', 'Get In Touch')
  const subtitle = t('contact.subtitle', "Let's discuss your next project or just say hello")
  const letsConnect = t('contact.letsConnect', "Let's Connect")
  const introText = t('contact.introText', "I'm always interested in new opportunities, challenging projects, and meaningful collaborations. Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.")
  
  // Get placeholder translations - use proper translation system with RTL support
  const firstNamePlaceholder = isRTL ? 'أحمد' : t('contact.placeholder.firstName', 'John')
  const lastNamePlaceholder = isRTL ? 'محمد' : t('contact.placeholder.lastName', 'Doe')
  const emailPlaceholder = isRTL ? 'ahmed.mohamed@example.com' : t('contact.placeholder.email', 'john.doe@example.com')
  const subjectPlaceholder = isRTL ? 'مناقشة المشروع' : t('contact.placeholder.subject', 'Project Discussion')
  const messagePlaceholder = isRTL ? 'أخبرني عن مشروعك والجدول الزمني والمتطلبات...' : t('contact.placeholder.message', 'Tell me about your project, timeline, and requirements...')
  
  // Non-translatable fields
  const email = 'n.aden1208@gmail.com'
  const phone = '+90 552 875 97 71'
  const location = 'Ankara, Turkey'
  const github = 'https://github.com/NouradinAbdurahman'
  const linkedin = 'https://linkedin.com/in/nouraddin'
  const instagram = 'https://instagram.com/nouradiin_'
  const twitter = 'https://x.com/Nouradin1208'
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle")
  const { toast } = useToast()
  const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof ContactSchema>, string>>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement)?.value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement)?.value,
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement)?.value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value,
    }

    const parsed = ContactSchema.safeParse(data)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as string
        if (!fieldErrors[k]) fieldErrors[k] = issue.message
      }
      setErrors(fieldErrors as Partial<Record<keyof z.infer<typeof ContactSchema>, string>>)
      setSubmitState("error")
      toast({ title: "Invalid form", description: "Please correct highlighted fields.", variant: "destructive" })
      return
    }
    setErrors({})

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to send message")
      form.reset()
      setSubmitState("success")
      toast({ title: "Message sent", description: "Thanks! I will get back to you soon." })
    } catch {
      setSubmitState("error")
      toast({ title: "Send failed", description: "Something went wrong. Try again.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitState("idle"), 3000)
    }
  }

  return (
    <section id="contact" className="py-20 dark:bg-[#060010] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white text-black text-center">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information - Right side for RTL, Left side for LTR */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`space-y-8 ${isRTL ? 'text-right lg:order-2' : 'text-left lg:order-1'}`}
          >
            <div>
              <h3 className={`text-2xl font-bold dark:text-white text-black mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{letsConnect}</h3>
              <p className={`text-muted-foreground leading-relaxed mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                {introText}
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                whileHover={{ x: isRTL ? -5 : 5 }}
                className={`flex items-center p-4 rounded-lg ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <div className="font-semibold dark:text-white text-black">{t('contact.email', 'Email')}</div>
                  <div className="text-muted-foreground">{email}</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: isRTL ? -5 : 5 }}
                className={`flex items-center p-4 rounded-lg ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <div className="font-semibold dark:text-white text-black">{t('contact.phone', 'Phone')}</div>
                  <div className="text-muted-foreground">{phone}</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: isRTL ? -5 : 5 }}
                className={`flex items-center p-4 rounded-lg ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <div className="font-semibold dark:text-white text-black">{t('contact.location', 'Location')}</div>
                  <div className="text-muted-foreground">{location}</div>
                </div>
              </motion.div>
            </div>

            <div className={`flex pt-4 ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent"
              >
                <FaInstagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent"
              >
                <FaXTwitter className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form - Left side for RTL, Right side for LTR */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <Card className="p-8 shadow-xl bg-transparent border-gray-300 dark:border-white/20">
              <form onSubmit={handleSubmit} className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'} style={isRTL ? { textAlign: 'right' } : { textAlign: 'left' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className={`text-sm font-medium dark:text-white text-black ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t('contact.firstName', 'First Name')}
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder={firstNamePlaceholder}
                      className={`focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      required
                    />
                    {errors.firstName && <p className={`text-sm text-red-500 ${isRTL ? 'text-right' : 'text-left'}`}>{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className={`text-sm font-medium dark:text-white text-black ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t('contact.lastName', 'Last Name')}
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder={lastNamePlaceholder}
                      className={`focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      required
                    />
                    {errors.lastName && <p className={`text-sm text-red-500 ${isRTL ? 'text-right' : 'text-left'}`}>{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className={`text-sm font-medium dark:text-white text-black ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('contact.email', 'Email')}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={emailPlaceholder}
                    className={`focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    required
                  />
                  {errors.email && <p className={`text-sm text-red-500 ${isRTL ? 'text-right' : 'text-left'}`}>{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className={`text-sm font-medium dark:text-white text-black ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('contact.subject', 'Subject')}
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder={subjectPlaceholder}
                    className={`focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    required
                  />
                  {errors.subject && <p className={`text-sm text-red-500 ${isRTL ? 'text-right' : 'text-left'}`}>{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className={`text-sm font-medium dark:text-white text-black ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('contact.message', 'Message')}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={messagePlaceholder}
                    rows={5}
                    className={`focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    required
                  />
                  {errors.message && <p className={`text-sm text-red-500 ${isRTL ? 'text-right' : 'text-left'}`}>{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className={
                    `w-full group cursor-pointer transition-colors ${isRTL ? 'text-right' : 'text-left'} ` +
                    (submitState === "success" ? " bg-green-600 hover:bg-green-600 " : submitState === "error" ? " bg-red-600 hover:bg-red-600 " : "")
                  }
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('contact.sending', 'Sending...')}
                    </>
                  )}
                  {submitState === "success" && !isSubmitting && (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Thanks! Your message was sent.
                    </>
                  )}
                  {submitState === "error" && !isSubmitting && (
                    <>
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Something went wrong. Try again.
                    </>
                  )}
                  {submitState === "idle" && !isSubmitting && (
                    <>
                      {t('contact.sendMessage', 'Send Message')}
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
