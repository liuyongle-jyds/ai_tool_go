import i18n from '@/i18n-config'
import Locale from '@/types/Locale'
import { NextRequest, NextResponse } from 'next/server'
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'

const getLocale: (request: NextRequest) => Locale = (request: NextRequest) => {
  const locale = request.cookies.get('locale')?.value
  if (i18n.locales.includes(locale as Locale)) {
    return locale as Locale
  }

  const acceptLanguage =
    request.headers.get('accept-language') || 'en-US,en;q=0.5'
  const languages = new Negotiator({
    headers: { 'accept-language': acceptLanguage },
  }).languages()
  const browserLocale = match(languages, i18n.locales, i18n.defaultLocale)

  return browserLocale as Locale
}

const getRedirectUrlByLang: (request: NextRequest) => string = (
  request: NextRequest,
) => {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return ''

  const locale = getLocale(request)
  return `/${locale + pathname}`
}

const intlMiddleware = (req: NextRequest) => {
  const redirectUrlByLang = getRedirectUrlByLang(req)
  if (redirectUrlByLang) {
    req.nextUrl.pathname = redirectUrlByLang
    return NextResponse.redirect(req.nextUrl)
  }
}

export default intlMiddleware
