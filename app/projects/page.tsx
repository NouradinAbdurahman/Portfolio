import * as React from "react"
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function ProjectsPage() {
  // Redirect to the localized version
  redirect('/en/projects')
}
