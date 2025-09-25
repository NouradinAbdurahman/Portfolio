"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { FaInstagram, FaXTwitter } from "react-icons/fa6"
import { useSectionContent } from "@/hooks/use-content"

export function Footer() {
  const content = useSectionContent('footer', {
    github: 'https://github.com/NouradinAbdurahman',
    linkedin: 'https://linkedin.com/in/nouraddin',
    instagram: 'https://instagram.com/nouradiin_',
    twitter: 'https://x.com/Nouradin1208',
    hidden: false
  })
  if ((content as any).hidden) return null
  return (
    <section id="footer" className="py-12 bg-gray-50 dark:bg-[var(--section-footer-bg,#060010)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <motion.a aria-label="GitHub profile" whileHover={{ scale: 1.1, y: -2 }} href={content.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
            <Github className="h-6 w-6" />
          </motion.a>
          <motion.a aria-label="LinkedIn profile" whileHover={{ scale: 1.1, y: -2 }} href={content.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
            <Linkedin className="h-6 w-6" />
          </motion.a>
          <motion.a aria-label="Instagram profile" whileHover={{ scale: 1.1, y: -2 }} href={content.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-pink-500 transition-colors">
            <FaInstagram className="h-6 w-6" />
          </motion.a>
          <motion.a aria-label="X (Twitter) profile" whileHover={{ scale: 1.1, y: -2 }} href={content.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-black dark:hover:text-white transition-colors">
            <FaXTwitter className="h-6 w-6" />
          </motion.a>
          <motion.a aria-label="Send email" whileHover={{ scale: 1.1, y: -2 }} href="mailto:n.aden1208@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
            <Mail className="h-6 w-6" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default Footer


