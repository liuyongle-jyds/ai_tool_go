'use server'

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

const setCookie = async (
  name: string,
  value: string,
  cookie?: Partial<ResponseCookie> | undefined,
) => {
  const farFutureDate = new Date()
  farFutureDate.setFullYear(farFutureDate.getFullYear() + 100)

  const defaultMap: Partial<ResponseCookie> = {
    httpOnly: true,
    expires: farFutureDate,
  }
  if (cookie) {
    Object.assign(defaultMap, cookie)
  }
  cookies().set(name, value, defaultMap)
}

const deleteCookie = async (name: string) => {
  cookies().delete(name)
}

const getCookie = async (name: string) => {
  return cookies().get(name)?.value ?? ''
}

export { setCookie, deleteCookie, getCookie }
