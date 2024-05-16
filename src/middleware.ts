import { NextRequest, NextResponse } from 'next/server'
import getRedirectUrlByLang from './middlewares/lang'

export default async function middleware(request: NextRequest) {
  // 多语言跳转
  const redirectUrlByLang = getRedirectUrlByLang(request)
  if (redirectUrlByLang) {
    request.nextUrl.pathname = redirectUrlByLang
    return NextResponse.redirect(request.nextUrl)
  }
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|api).*)'],
}
