"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight-new"
import { Download, Calendar, Award, Briefcase, GraduationCap, Code, ExternalLink } from "lucide-react"
import { useSectionContent } from "@/hooks/use-content"
import { TechBadge } from "@/components/ui/tech-badge"

export default function ResumeSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const content = useSectionContent('resume', {
    title: 'Resume',
    lead: 'My professional journey and technical expertise',
    hidden: false,
    title_hidden: false,
    lead_hidden: false,
    education: [
      {
        degree: 'Bachelor of Engineering - BE, Software Engineering',
        school: 'OSTİM Teknik Üniversitesi',
        date: 'Sep 2022 - Jun 2026',
        location: 'Ankara Türkiye',
        description: 'Comprehensive study in Python, C, Web Development, Databases, Data Mining, Software Project Management, C++, Java, SQL, JavaScript, and Machine Learning.',
        hidden: false
      },
      {
        degree: 'High School Diploma, Information Technology - Engineering',
        school: 'Omar bin Abdul Aziz Secondary Independent School for Boys',
        date: 'Sep 2018 - Jun 2021',
        location: 'Doha/Qatar',
        description: 'Foundation in CSS, Python, JavaScript, Information Technology, and HTML programming.',
        hidden: false
      }
    ],
    certifications: [
      { title: 'Associate Data Engineer in SQL', issuer: 'DataCamp', date: 'Jan 2025', link: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/c0d2e90cbbdc287e61faaf285e45c5af244597b1', hidden: false },
      { title: 'Data Scientist in Python', issuer: 'DataCamp', date: 'Jun 2024', link: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/5a81b11b3f98bf7664cca160403d04a4bd6d406e', hidden: false },
      { title: 'Data Analyst in SQL', issuer: 'DataCamp', date: 'Jan 2024', link: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/86f17bd095be0cbde70befab0e01e50bd1e3e766', hidden: false },
    ],
    experience: [
      {
        role: 'Full-Stack Developer',
        company: 'DAKAEI AI',
        employmentType: 'Full-time',
        date: 'Apr 2025 - Present',
        location: 'London Area, United Kingdom • Remote',
        summary: 'Developing full-stack applications using React.js, TypeScript, Node.js, Next.js, JavaScript, SQL, HTML, CSS, Firebase, PostgreSQL, and Databases.',
        hidden: false
      }
    ],
    skills: {
      languages: ['JavaScript','TypeScript','Python','Dart','SQL'],
      frameworks: ['React','Next.js','Flutter','Node.js','Express'],
      tools: ['AWS','Firebase','Docker','Git','PostgreSQL']
    }
  })
  if ((content as any).hidden) return null
  if (!mounted) return null
  const education = (content as any).education as Array<any> | undefined
  const certifications = (content as any).certifications as Array<any> | undefined
  const experience = (content as any).experience as Array<any> | undefined
  const skills = (content as any).skills as { languages?: string[]; frameworks?: string[]; tools?: string[] } | undefined

  function iconFor(label: string) {
    const key = label.toLowerCase()
    if (key.includes('typescript')) return <SiTypescript className="w-3 h-3 text-blue-500" />
    if (key === 'javascript' || key === 'js') return <SiJavascript className="w-3 h-3 text-yellow-400" />
    if (key.includes('python')) return <FaPython className="w-3 h-3 text-yellow-400" />
    if (key.includes('dart')) return <SiDart className="w-3 h-3 text-blue-400" />
    if (key.includes('sql') || key.includes('postgres')) return <SiPostgresql className="w-3 h-3 text-blue-600" />
    if (key.includes('react')) return <FaReact className="w-3 h-3 text-cyan-400" />
    if (key.includes('next')) return <SiNextdotjs className="w-3 h-3 text-black dark:text-white" />
    if (key.includes('flutter')) return <SiFlutter className="w-3 h-3 text-blue-500" />
    if (key.includes('node')) return <FaNodeJs className="w-3 h-3 text-green-500" />
    if (key.includes('express')) return <SiExpress className="w-3 h-3" />
    if (key.includes('aws')) return <FaAws className="w-3 h-3 text-orange-400" />
    if (key.includes('firebase')) return <SiFirebase className="w-3 h-3 text-orange-500" />
    if (key.includes('docker')) return <FaDocker className="w-3 h-3 text-blue-500" />
    if (key.includes('git')) return <FaGitAlt className="w-3 h-3 text-orange-500" />
    return null
  }
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
          {!content.title_hidden && (
            <h2 className="text-4xl font-bold mb-4 dark:text-white text-black">{content.title}</h2>
          )}
          {!content.lead_hidden && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">{content.lead}</p>
          )}
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
                  {(education||[]).filter((e)=>!e?.hidden).map((e, i)=> (
                    <div key={i} className="flex items-start space-x-4">
                      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${i%2===0? 'bg-primary':'bg-accent'}`}></div>
                      <div>
                        <h4 className="font-semibold dark:text-white text-black">{e.degree}</h4>
                        <p className="text-accent font-medium">{e.school}</p>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {e.date}{e.location? ` • ${e.location}`:''}
                        </p>
                        {e.description && (
                          <p className="text-sm text-muted-foreground mt-2">{e.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
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
                  {(certifications||[]).filter((c)=>!c?.hidden).map((c, i)=> (
                    <div key={i} className="flex items-start space-x-4">
                      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${i%2===0? 'bg-accent':'bg-primary'}`}></div>
                      <div className="flex-1">
                        {c.link ? (
                          <a 
                            href={c.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center space-x-2 hover:text-accent transition-colors duration-300"
                          >
                            <h4 className="font-semibold dark:text-white text-black group-hover:text-accent transition-colors duration-300 group-hover:drop-shadow-lg">
                              {c.title}
                            </h4>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors duration-300 group-hover:scale-110 transform" />
                          </a>
                        ) : (
                          <h4 className="font-semibold dark:text-white text-black">{c.title}</h4>
                        )}
                        <p className="text-sm text-muted-foreground">{c.issuer} • {c.date}</p>
                      </div>
                    </div>
                  ))}
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
                  {(experience||[]).filter((x)=>!x?.hidden).map((x, i)=> (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold dark:text-white text-black">{x.role}</h4>
                        <p className="text-accent font-medium">{x.company}{x.employmentType? ` • ${x.employmentType}`:''}</p>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {x.date}
                        </p>
                        {x.location && (
                          <p className="text-sm text-muted-foreground mt-1">{x.location}</p>
                        )}
                        {x.summary && (
                          <p className="text-sm text-muted-foreground mt-2">{x.summary}</p>
                        )}
                      </div>
                    </div>
                  ))}
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
                      {(skills?.languages||[]).map((label, i)=> (
                        <TechBadge key={i} name={label} size="sm" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-white text-black mb-3">Frameworks & Libraries</h4>
                    <div className="flex flex-wrap gap-2">
                      {(skills?.frameworks||[]).map((label, i)=> (
                        <TechBadge key={i} name={label} size="sm" variant="outline" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-white text-black mb-3">Cloud & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {(skills?.tools||[]).map((label, i)=> (
                        <TechBadge key={i} name={label} size="sm" />
                      ))}
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
