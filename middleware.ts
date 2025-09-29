import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'ar', 'tr', 'it', 'fr', 'de'],
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always',
  // Ensure English is always the fallback
  alternateLinks: false
})

export const config = {
  matcher: ['/((?!api|_next|admin|.*\\..*).*)']
}


