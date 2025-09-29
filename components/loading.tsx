"use client"

import { motion } from "framer-motion"
import Aurora from "@/components/ui/aurora"
import { Code, Sparkles, Zap } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-[#060010] bg-gray-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        <Aurora
          colorStops={["#060010", "#B19EEF", "#5227FF", "#FF6B6B"]}
          blend={0.6}
          amplitude={1.2}
          speed={0.3}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          // Use consistent values based on index to avoid hydration mismatch
          const left = (i * 5.2) % 100
          const top = (i * 3.7) % 100
          const duration = 2 + (i * 0.1)
          const delay = (i * 0.1) % 2
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
              }}
            />
          )
        })}
      </div>

      {/* Main Loading Content */}
      <div className="text-center relative z-10">
        {/* Animated Logo/Icon */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Outer Ring */}
          <motion.div
            className="w-24 h-24 border-2 border-white/20 rounded-full absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Middle Ring */}
          <motion.div
            className="w-20 h-20 border-2 border-primary/60 rounded-full absolute inset-2"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner Content */}
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center relative"
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(139, 92, 246, 0.3)",
                "0 0 40px rgba(139, 92, 246, 0.6)",
                "0 0 20px rgba(139, 92, 246, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <Code className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Floating Icons */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-2 -left-2"
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Zap className="w-6 h-6 text-blue-400" />
          </motion.div>
        </motion.div>

        {/* Loading Text with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl font-bold dark:text-white text-black mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Nouraddin
          </motion.h2>
          
          <motion.p
            className="dark:text-white/70 text-black/70 text-lg mb-6"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            Loading amazing content...
          </motion.p>
        </motion.div>

        {/* Animated Progress Dots */}
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Tech Stack Preview */}
        <motion.div
          className="mt-8 flex justify-center space-x-4 opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {["React", "Next.js", "TypeScript"].map((tech, i) => (
            <motion.span
              key={tech}
              className="text-xs text-white/50 px-2 py-1 bg-white/10 rounded-full"
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
                y: [0, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  )
}
