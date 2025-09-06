"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Spotlight } from "@/components/ui/spotlight-new"
import { Download, Calendar, Award, Briefcase, GraduationCap, Code, Database } from "lucide-react"
import { FaReact, FaNodeJs, FaPython, FaAws, FaGitAlt, FaDocker } from "react-icons/fa"
import { SiTypescript, SiNextdotjs, SiFlutter, SiDart, SiFirebase, SiPostgresql, SiJavascript, SiExpress } from "react-icons/si"

export default function ResumeSection() {
  return (
    <section id="resume" className="site-background py-20 relative overflow-hidden">
      <Spotlight />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white text-black">Resume</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            My professional journey and technical expertise
          </p>
          <Button 
            size="lg" 
            className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 cursor-pointer"
            onClick={() => window.open('/resume/nouraddin-resume.pdf', '_blank')}
          >
            <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Download Resume
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold dark:text-white text-black mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 mr-3 text-primary" />
                Education
              </h3>
              <Card className="p-6 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 cursor-pointer">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold dark:text-white text-black">Bachelor of Engineering - BE, Software Engineering</h4>
                      <p className="text-accent font-medium">OSTİM Teknik Üniversitesi</p>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        Sep 2022 - Jun 2026 • Ankara Türkiye
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Comprehensive study in Python, C, Web Development, Databases, Data Mining, Software Project Management, C++, Java, SQL, JavaScript, and Machine Learning.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold dark:text-white text-black">High School Diploma, Information Technology - Engineering</h4>
                      <p className="text-accent font-medium">Omar bin Abdul Aziz Secondary Independent School for Boys</p>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        Sep 2018 - Jun 2021 • Doha/Qatar
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Foundation in CSS, Python, JavaScript, Information Technology, and HTML programming.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h3 className="text-2xl font-bold dark:text-white text-black mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-accent" />
                Certifications
              </h3>
              <Card className="p-6 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 cursor-pointer">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold dark:text-white text-black">Associate Data Engineer in SQL</h4>
                      <p className="text-sm text-muted-foreground">DataCamp • Jan 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold dark:text-white text-black">Data Scientist in Python</h4>
                      <p className="text-sm text-muted-foreground">DataCamp • Jun 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold dark:text-white text-black">Data Analyst in SQL</h4>
                      <p className="text-sm text-muted-foreground">DataCamp • Jan 2024</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Experience & Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold dark:text-white text-black mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-3 text-primary" />
                Experience
              </h3>
              <Card className="p-6 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 cursor-pointer">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold dark:text-white text-black">Full-stack Developer</h4>
                      <p className="text-accent font-medium">DAKAEI AI • Full-time</p>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        Apr 2025 - Present
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        London Area, United Kingdom • Remote
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Developing full-stack applications using React.js, TypeScript, Node.js, Next.js, JavaScript, SQL, HTML, CSS, Firebase, PostgreSQL, and Databases.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold dark:text-white text-black">Freelance Full-Stack Developer</h4>
                      <p className="text-accent font-medium">Self-Employed</p>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        2023 - 2025
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Developed web and mobile applications for various clients, specializing in React, Next.js, and
                        Flutter.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h3 className="text-2xl font-bold dark:text-white text-black mb-6 flex items-center">
                <Code className="w-6 h-6 mr-3 text-accent" />
                Technical Skills
              </h3>
              <Card className="p-6 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 cursor-pointer">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold dark:text-white text-black mb-3">Programming Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <SiJavascript className="w-3 h-3" />
                        JavaScript
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <SiTypescript className="w-3 h-3 text-blue-500" />
                        TypeScript
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <FaPython className="w-3 h-3 text-yellow-400" />
                        Python
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <SiDart className="w-3 h-3 text-blue-400" />
                        Dart
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <Database className="w-3 h-3" />
                        SQL
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-white text-black mb-3">Frameworks & Libraries</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <FaReact className="w-3 h-3 text-cyan-400" />
                        React
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <SiNextdotjs className="w-3 h-3 text-black dark:text-white" />
                        Next.js
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <SiFlutter className="w-3 h-3 text-blue-500" />
                        Flutter
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <FaNodeJs className="w-3 h-3 text-green-500" />
                        Node.js
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <SiExpress className="w-3 h-3" />
                        Express
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-white text-black mb-3">Cloud & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <FaAws className="w-3 h-3 text-orange-400" />
                        AWS
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <SiFirebase className="w-3 h-3 text-orange-500" />
                        Firebase
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <FaDocker className="w-3 h-3 text-blue-500" />
                        Docker
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <FaGitAlt className="w-3 h-3 text-orange-500" />
                        Git
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 hover:scale-105 transition-transform bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"
                      >
                        <SiPostgresql className="w-3 h-3 text-blue-600" />
                        PostgreSQL
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
