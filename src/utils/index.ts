import Config from '@/config'
import { Locale } from '@/types/Locale'
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types'
import { cookies } from 'next/headers'

const filterImage = (url: string) => {
  if (!url) return ''
  if (url.startsWith('http') || url.startsWith('file:')) {
    return url
  }
  return Config.oss + url
}

const getAltLanguages: (path: string) => Languages<string> = (path: string) => {
  const map: { [k in Locale]: string } = {
    en: 'en',
    zh: 'zh',
  }
  Object.keys(map).forEach((k) => {
    const key = k as keyof typeof map
    map[key] += path
  })
  return map
}

/**

* @desc 函数防抖
* @param func 功能函数
* @param delay 延迟执行
* @param immediate true 表立即执行

*/
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  immediate: boolean = false,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this

    if (timer) clearTimeout(timer)

    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, delay)

      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(() => {
        func.apply(context, args)
      }, delay)
    }
  }
}

export { filterImage, getAltLanguages, debounce }
