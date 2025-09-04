"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { FaInstagram } from "react-icons/fa"

export function Footer() {
  return (
    <section className="py-12 bg-muted/30 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <motion.a aria-label="GitHub profile" whileHover={{ scale: 1.1, y: -2 }} href="https://github.com/NouradinAbdurahman" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
            <Github className="h-6 w-6" />
          </motion.a>
          <motion.a aria-label="LinkedIn profile" whileHover={{ scale: 1.1, y: -2 }} href="https://linkedin.com/in/nouraddin" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
            <Linkedin className="h-6 w-6" />
          </motion.a>
          <motion.a aria-label="Instagram profile" whileHover={{ scale: 1.1, y: -2 }} href="https://instagram.com/nouradiin_" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-pink-500 transition-colors">
            <FaInstagram className="h-6 w-6" />
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


