"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight-new"
import { Download, Calendar, Award, Briefcase, GraduationCap, Code, ExternalLink } from "lucide-react"
import { useLocale } from "next-intl"
import { TechBadge } from "@/components/ui/tech-badge"
import { MixedContent } from "@/lib/rtl-utils"
import { useSupabaseTranslations } from "@/hooks/use-supabase-translations"

export default function ResumeSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const { t } = useSupabaseTranslations()
  const locale = useLocale()
  const isRTL = locale === 'ar'
  
  // Set default values for non-translatable fields
  const finalContent = {
    title: t('resume.title'),
    subtitle: t('resume.subtitle'),
    education: [
      {
        degree: t('resume.educationDetails.bachelor.degree'),
        school: t('resume.educationDetails.bachelor.school'),
        date: t('resume.educationDetails.bachelor.date'),
        location: t('resume.educationDetails.bachelor.location'),
        description: t('resume.educationDetails.bachelor.description'),
        hidden: false
      },
      {
        degree: t('resume.educationDetails.highSchool.degree'),
        school: t('resume.educationDetails.highSchool.school'),
        date: t('resume.educationDetails.highSchool.date'),
        location: t('resume.educationDetails.highSchool.location'),
        description: t('resume.educationDetails.highSchool.description'),
        hidden: false
      }
    ],
    certifications: [
      { title: t('resume.certificationDetails.dataEngineer.title'), issuer: t('resume.certificationDetails.dataEngineer.issuer'), date: t('resume.certificationDetails.dataEngineer.date'), link: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/c0d2e90cbbdc287e61faaf285e45c5af244597b1', hidden: false },
      { title: t('resume.certificationDetails.dataScientist.title'), issuer: t('resume.certificationDetails.dataScientist.issuer'), date: t('resume.certificationDetails.dataScientist.date'), link: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/5a81b11b3f98bf7664cca160403d04a4bd6d406e', hidden: false },
      { title: t('resume.certificationDetails.dataAnalyst.title'), issuer: t('resume.certificationDetails.dataAnalyst.issuer'), date: t('resume.certificationDetails.dataAnalyst.date'), link: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/86f17bd095be0cbde70befab0e01e50bd1e3e766', hidden: false },
    ],
    experience: [
      {
        role: t('resume.experienceDetails.fullStack.role'),
        company: t('resume.experienceDetails.fullStack.company'),
        employmentType: t('resume.experienceDetails.fullStack.employmentType'),
        date: t('resume.experienceDetails.fullStack.date'),
        location: t('resume.experienceDetails.fullStack.location'),
        summary: t('resume.experienceDetails.fullStack.summary'),
        hidden: false
      }
    ],
    skills: {
      languages: ['JavaScript','TypeScript','Python','Dart','SQL'],
      frameworks: ['React','Next.js','Flutter','Node.js','Express'],
      tools: ['AWS','Firebase','Docker','Git','PostgreSQL']
    },
    hidden: false,
    title_hidden: false,
    subtitle_hidden: false
  }
  if (finalContent.hidden) return null
  if (!mounted) return null
  
  // Define proper types for the arrays
  type EducationItem = {
    degree: string
    school: string
    date: string
    location: string
    description: string
    hidden: boolean
  }
  
  type CertificationItem = {
    title: string
    issuer: string
    date: string
    link: string
    hidden: boolean
  }
  
  type ExperienceItem = {
    role: string
    company: string
    employmentType: string
    date: string
    location: string
    summary: string
    hidden: boolean
  }
  
  const education = finalContent.education as EducationItem[] | undefined
  const certifications = finalContent.certifications as CertificationItem[] | undefined
  const experience = finalContent.experience as ExperienceItem[] | undefined
  const skills = finalContent.skills as { languages?: string[]; frameworks?: string[]; tools?: string[] } | undefined
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
          {!finalContent.title_hidden && (
            <h2 className="text-4xl font-bold mb-4 dark:text-white text-black"><MixedContent text={finalContent.title} isRTL={isRTL} /></h2>
          )}
          {!finalContent.subtitle_hidden && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"><MixedContent text={finalContent.subtitle} isRTL={isRTL} /></p>
          )}
          <Button 
            size="lg" 
            className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 cursor-pointer"
            onClick={() => window.open('/resume/nouraddin-resume.pdf', '_blank')}
          >
            <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            <MixedContent text={t('resume.downloadResume') || 'Download Resume'} isRTL={isRTL} />
          </Button>
        </motion.div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Education & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`space-y-8 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div>
              <h3 className={`text-2xl font-bold dark:text-white text-black mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <GraduationCap className={`w-6 h-6 text-primary ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <MixedContent text={t('resume.education.title')} isRTL={isRTL} />
              </h3>
              <Card className="p-6 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 cursor-pointer">
                <div className="space-y-4">
                  {(education||[]).filter((e)=>!e?.hidden).map((e, i)=> (
                    <div key={i} className={`flex items-start ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}>
                      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${i%2===0? 'bg-primary':'bg-accent'}`}></div>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <h4 className="font-semibold dark:text-white text-black"><MixedContent text={e.degree} isRTL={isRTL} /></h4>
                        <p className="text-accent font-medium"><MixedContent text={e.school} isRTL={isRTL} /></p>
                        <p className={`text-sm text-muted-foreground flex items-center mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Calendar className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                          <MixedContent text={e.date} isRTL={isRTL} />
                          {e.location && (
                            <> • <MixedContent text={e.location} isRTL={isRTL} /></>
                          )}
                        </p>
                        {e.description && (
                          <p className="text-sm text-muted-foreground mt-2"><MixedContent text={e.description} isRTL={isRTL} /></p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div>
              <h3 className={`text-2xl font-bold dark:text-white text-black mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Award className={`w-6 h-6 text-accent ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <MixedContent text={t('resume.certifications.title')} isRTL={isRTL} />
              </h3>
              <Card className="p-6 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 cursor-pointer">
                <div className="space-y-4">
                  {(certifications||[]).filter((c)=>!c?.hidden).map((c, i)=> (
                    <div key={i} className={`flex items-start ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}>
                      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${i%2===0? 'bg-accent':'bg-primary'}`}></div>
                      <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {c.link ? (
                          <a 
                            href={c.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`group flex items-center hover:text-accent transition-colors duration-300 ${isRTL ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'}`}
                          >
                            <h4 className="font-semibold dark:text-white text-black group-hover:text-accent transition-colors duration-300 group-hover:drop-shadow-lg">
                              <MixedContent text={c.title} isRTL={isRTL} />
                            </h4>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors duration-300 group-hover:scale-110 transform" />
                          </a>
                        ) : (
                          <h4 className="font-semibold dark:text-white text-black"><MixedContent text={c.title} isRTL={isRTL} /></h4>
                        )}
                        <p className="text-sm text-muted-foreground">
                          <MixedContent text={c.issuer} isRTL={isRTL} /> • {c.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Experience & Skills */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`space-y-8 ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div>
              <h3 className={`text-2xl font-bold dark:text-white text-black mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Briefcase className={`w-6 h-6 text-primary ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <MixedContent text={t('resume.experience.title')} isRTL={isRTL} />
              </h3>
              <Card className="p-6 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 cursor-pointer">
                <div className="space-y-6">
                  {(experience||[]).filter((x)=>!x?.hidden).map((x, i)=> (
                    <div key={i} className={`flex items-start ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}>
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <h4 className="font-semibold dark:text-white text-black"><MixedContent text={x.role} isRTL={isRTL} /></h4>
                        <p className="text-accent font-medium">
                          <MixedContent text={x.company} isRTL={isRTL} />
                          {x.employmentType && (
                            <> • <MixedContent text={x.employmentType} isRTL={isRTL} /></>
                          )}
                        </p>
                        <p className={`text-sm text-muted-foreground flex items-center mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Calendar className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                          <MixedContent text={x.date} isRTL={isRTL} />
                        </p>
                        {x.location && (
                          <p className="text-sm text-muted-foreground mt-1"><MixedContent text={x.location} isRTL={isRTL} /></p>
                        )}
                        {x.summary && (
                          <p className="text-sm text-muted-foreground mt-2"><MixedContent text={x.summary} isRTL={isRTL} /></p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div>
              <h3 className={`text-2xl font-bold dark:text-white text-black mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Code className={`w-6 h-6 text-accent ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <MixedContent text={t('resume.technicalSkills.title')} isRTL={isRTL} />
              </h3>
              <Card className="p-6 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 cursor-pointer">
                <div className="space-y-4">
                  <div>
                    <h4 className={`font-semibold dark:text-white text-black mb-3 ${isRTL ? 'text-right' : 'text-left'}`}><MixedContent text={t('resume.technicalSkills.languages')} isRTL={isRTL} /></h4>
                    <div className="flex flex-wrap gap-2">
                      {(skills?.languages||[]).map((label, i)=> (
                        <TechBadge key={i} name={label} size="sm" isRTL={isRTL} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-semibold dark:text-white text-black mb-3 ${isRTL ? 'text-right' : 'text-left'}`}><MixedContent text={t('resume.technicalSkills.frameworks')} isRTL={isRTL} /></h4>
                    <div className="flex flex-wrap gap-2">
                      {(skills?.frameworks||[]).map((label, i)=> (
                        <TechBadge key={i} name={label} size="sm" variant="outline" isRTL={isRTL} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-semibold dark:text-white text-black mb-3 ${isRTL ? 'text-right' : 'text-left'}`}><MixedContent text={t('resume.technicalSkills.tools')} isRTL={isRTL} /></h4>
                    <div className="flex flex-wrap gap-2">
                      {(skills?.tools||[]).map((label, i)=> (
                        <TechBadge key={i} name={label} size="sm" isRTL={isRTL} />
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
