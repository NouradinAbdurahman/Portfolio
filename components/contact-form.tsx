"use client"

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
import { useSectionContent } from "@/hooks/use-content"
import { useToast } from "@/hooks/use-toast"

const ContactSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Email is invalid"),
  subject: z.string().min(3, "Subject is too short"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactForm() {
  const content = useSectionContent('contact', {
    title: 'Get In Touch',
    lead: "Let's discuss your next project or collaboration opportunity",
    email: 'n.aden1208@gmail.com',
    phone: '+90 552 875 97 71',
    location: 'Ankara, Turkey',
    github: 'https://github.com/NouradinAbdurahman',
    linkedin: 'https://linkedin.com/in/nouraddin',
    instagram: 'https://instagram.com/nouradiin_',
    twitter: 'https://x.com/Nouradin1208',
    hidden: false,
    title_hidden: false,
    lead_hidden: false
  })
  if ((content as any).hidden) return null
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
      setErrors(fieldErrors as any)
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
    } catch (err) {
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
          {!content.title_hidden && (
            <h2 className="text-4xl font-bold mb-4 dark:text-white text-black">{content.title}</h2>
          )}
          {!content.lead_hidden && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{content.lead}</p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold dark:text-white text-black mb-6">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm always interested in new opportunities, challenging projects, and meaningful collaborations.
                Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear
                from you.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 p-4 rounded-lg"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold dark:text-white text-black">Email</div>
                  <div className="text-muted-foreground">{content.email}</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 p-4 rounded-lg"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold dark:text-white text-black">Phone</div>
                  <div className="text-muted-foreground">{content.phone}</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 p-4 rounded-lg"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold dark:text-white text-black">Location</div>
                  <div className="text-muted-foreground">{content.location}</div>
                </div>
              </motion.div>
            </div>

            <div className="flex space-x-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={content.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={content.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={content.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent"
              >
                <FaInstagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={content.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent"
              >
                <FaXTwitter className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-xl bg-transparent border-gray-300 dark:border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium dark:text-white text-black">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                    />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium dark:text-white text-black">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium dark:text-white text-black">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium dark:text-white text-black">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Project Discussion"
                    className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                  {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium dark:text-white text-black">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project, timeline, and requirements..."
                    rows={5}
                    className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    required
                  />
                  {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className={
                    `w-full group cursor-pointer transition-colors ` +
                    (submitState === "success" ? " bg-green-600 hover:bg-green-600 " : submitState === "error" ? " bg-red-600 hover:bg-red-600 " : "")
                  }
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Message...
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
                      Send Message
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
