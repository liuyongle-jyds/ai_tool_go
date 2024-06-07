'use server'

import Config from '@/config'
import User from '@/types/User'
import { getCookie } from '@/utils/actions'
import { ActionModel, ActionType } from '@/types/Action'
import ItemType from '@/types/ItemType'
import Sort from '@/types/Sort'

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
  return await fetchAPI('/common/file/upload', { body: formData })
}

export const postLogin = async (body = {}) => {
  return await fetchAPI('/user/login', { body })
}

export const postGetUser = async () => {
  return await fetchAPI('/user/info')
}

export const postUpdateUser = async (body: Partial<User>) => {
  return await fetchAPI('/user/update', { body })
}

export const postGetTags = async (type: 'DOMAIN' | 'TASK') => {
  return await fetchAPI('/meta-tag/list', { body: { type } })
}

export const postGetTools = async ({
  pageNo,
  pageSize,
  domainNames,
  taskNames,
  sort,
}: {
  pageNo?: number
  pageSize?: number
  domainNames?: string[]
  taskNames?: string[]
  sort?: Sort
}) => {
  return await fetchAPI('/tool/list', {
    body: {
      pageNo,
      pageSize,
      domainNames,
      taskNames,
      sort,
    },
  })
}

export const postGetTool = async (slugName: string) => {
  return await fetchAPI(`/tool/detail?slugName=${slugName}`)
}

type ActionPath = 'tool' | 'learn' | 'comment'
export const postUserAction = async (
  path: ActionPath,
  {
    actionModel,
    type,
    itemId,
  }: {
    actionModel: ActionModel
    type: ActionType
    itemId: string
  },
) => {
  return await fetchAPI(`/user-action/${path}`, {
    body: { actionModel, itemId, type },
  })
}

export const postGetComments = async ({
  itemSlugName,
  itemId,
  sort,
}: {
  itemSlugName?: string
  itemId?: string
  sort?: Sort
}) => {
  return await fetchAPI('/comment/list', {
    body: { itemSlugName, itemId, sort },
  })
}

export const postAddComment = async (
  itemType: ItemType,
  content: string,
  {
    itemId,
    itemSlugName,
    replyId,
    pId,
  }: {
    itemId?: string
    itemSlugName?: string
    replyId?: string
    pId?: string
  },
) => {
  const body = { itemType, content } as any
  if (itemId) body.itemId = itemId
  if (itemSlugName) body.itemSlugName = itemSlugName
  if (pId) body.pId = pId
  if (replyId) body.extension = { replyId }
  return await fetchAPI('/comment', {
    body,
  })
}
