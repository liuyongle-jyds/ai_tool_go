import Config from '@/config'
import { Locale } from '@/types/Locale'
import { AlternateLinkDescriptor, Languages } from 'next/dist/lib/metadata/types/alternative-urls-types'

const filterImage = (url: string) => {
  if (!url) return ''
  if (url.startsWith('http') || url.startsWith('file:')) {
    return url
  }
  return Config.oss + url
}

const getAltLanguages: (path: string) => Languages<string> = (path: string) => {
  const map: { [k in Locale]: string } = {
    'en': 'en',
    'zh': 'zh'
  }
  Object.keys(map).forEach((k) => {
    const key = k as keyof typeof map
    map[key] += path
  })
  return map
}

export {
  filterImage,
  getAltLanguages
}