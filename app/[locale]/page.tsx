import * as React from "react"
import { Suspense, lazy } from "react"
import { PortfolioClient } from "./portfolio-client"

interface PortfolioProps {
  params: Promise<{ locale: string }>
}

export default async function Portfolio({ params }: PortfolioProps) {
  const { locale } = await params

  return <PortfolioClient locale={locale} />
}
