/*
  Seed the Technical Skills content via the app's API.
  Usage:
    SITE_URL=https://your-deployment.com node scripts/seed-technical-skills.js
  or
    node scripts/seed-technical-skills.js  (defaults to http://localhost:3000)
*/

const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:3000`

async function main() {
  const url = `${SITE_URL.replace(/\/$/, '')}/api/content`

  const content = {
    title: 'Technical Skills',
    lead: 'Technologies and tools I work with',
    // Card 1
    catFullTitle: 'Full-Stack Development',
    catFullDesc: 'React, Next.js, Flutter, Node.js',
    catFullHidden: false,
    itemsFull: [
      { name: 'React', icon: 'SiReact', color: 'text-cyan-400', hidden: false },
      { name: 'Next.js', icon: 'SiNextdotjs', color: 'text-black dark:text-white', hidden: false },
      { name: 'Flutter', icon: 'SiFlutter', color: 'text-blue-500', hidden: false },
      { name: 'Node.js', icon: 'SiNodedotjs', color: 'text-green-500', hidden: false },
      { name: 'Express', icon: 'SiExpress', color: 'text-gray-600 dark:text-gray-200', hidden: false },
      { name: 'React Native', icon: 'SiReact', color: 'text-cyan-400', hidden: false }
    ],
    // Card 2
    catDataTitle: 'Data Engineering',
    catDataDesc: 'ETL Pipelines, SQL, Python, Analytics',
    catDataHidden: false,
    itemsData: [
      { name: 'Python', icon: 'FaPython', color: 'text-yellow-400', hidden: false },
      { name: 'SQL', icon: 'TbSql', color: 'text-indigo-400', hidden: false },
      { name: 'PostgreSQL', icon: 'SiPostgresql', color: 'text-sky-400', hidden: false }
    ],
    // Card 3
    catCloudTitle: 'Cloud & DevOps',
    catCloudDesc: 'AWS, Firebase, Automation, CI/CD',
    catCloudHidden: false,
    itemsCloud: [
      { name: 'AWS', icon: 'FaAws', color: 'text-orange-400', hidden: false },
      { name: 'Firebase', icon: 'SiFirebase', color: 'text-orange-500', hidden: false },
      { name: 'Docker', icon: 'FaDocker', color: 'text-blue-500', hidden: false },
      { name: 'Git', icon: 'FaGitAlt', color: 'text-orange-500', hidden: false }
    ]
  }

  console.log(`Seeding skills to: ${url}`)
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ section: 'skills', content })
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Failed to seed skills: ${res.status} ${txt}`)
  }

  const out = await res.json()
  console.log('Seed success:', out)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})


