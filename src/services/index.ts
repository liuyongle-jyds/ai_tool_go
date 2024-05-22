'use server'

import { getCookie } from '@/utils/actions'

const baseApi = process.env.CONFIG_BASE_API

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
  const url = `${baseApi}${path}`
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
