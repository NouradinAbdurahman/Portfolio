import { redirect } from 'next/navigation'

export default function RootPage() {
  // Always redirect to English as the default locale
  redirect('/en')
}
