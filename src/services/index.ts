'use server'

import Config from '@/config'
import { getCookie } from '@/utils/actions'
import { UserResource } from '@clerk/types'

interface Props {
  method?: string
  body?: Record<string, unknown> | FormData | null
  headers?: HeadersInit
  cache?: RequestCache
}

const fetchAPI = async (
  path: string,
  { method = 'POST', body = null, headers = {}, cache = 'default' }: Props = {},
) => {
  const url = `${Config.baseUrl}${path}`
  let token = ''
  try {
    token = (await getCookie('token')) || ''
  } catch (error) {}
  const isFormData = body instanceof FormData

  const config: RequestInit = {
    method,
    headers: {
      Authorization: !!token ? `Bearer ${token}` : '',
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    cache,
  }

  if (body) {
    config.body = isFormData ? body : JSON.stringify(body)
  }

  try {
    const response = await fetch(url, config)
    const res = response.json()
    if (!res) throw new Error('no response')
    return res
  } catch (error) {
    throw error
  }
}

export const postUploadFile = async (formData: FormData) => {
  return await fetchAPI('/util/file/upload', { body: formData })
}

export const postLogin = async (body = {}) => {
  return await fetchAPI('/user/login', { body })
}

export const postGetUser = async () => {
  return await fetchAPI('/user/info')
}
