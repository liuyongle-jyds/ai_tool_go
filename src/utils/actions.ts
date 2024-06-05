'use server'

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import { auth } from '@clerk/nextjs/server'

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

const filterResp = async (res: any) => {
  if (!res) return
  if (res.code === 401) {
    await deleteCookie('token')
    auth().redirectToSignIn()
  }
}

export { setCookie, deleteCookie, getCookie, filterResp }
