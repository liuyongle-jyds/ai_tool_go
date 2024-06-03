import { clerkMiddleware } from '@clerk/nextjs/server'
import intlMiddleware from './middlewares/intlMiddleware'
import { routerName } from './router'
import i18n from './i18n-config'

const whiteList = [routerName.profile]

export default clerkMiddleware((auth, req) => {
  let purePathname = req.nextUrl.pathname
  i18n.locales.forEach((locale) => {
    purePathname = purePathname.replace(`/${locale}`, '')
  })
  if (!auth().userId && whiteList.includes(purePathname)) {
    return auth().redirectToSignIn()
  }
  return intlMiddleware(req)
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|api).*)'],
}
