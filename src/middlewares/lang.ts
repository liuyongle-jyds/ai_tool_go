import i18n from '@/i18n-config'
import Locale from '@/types/Locale'
import { NextRequest } from 'next/server'
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'
import { whiteList } from '@/router'

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
  if (whiteList.includes(pathname)) return ''

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return ''

  const locale = getLocale(request)
  return `/${locale + pathname}`
}

export default getRedirectUrlByLang
