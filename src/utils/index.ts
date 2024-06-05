import Config from '@/config'
import Locale from '@/types/Locale'
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types'
import { title } from 'process'
import { ReactNode } from 'react'
import { toast } from 'sonner'

const filterImage = (url: string) => {
  if (!url) return ''
  if (url.startsWith('http') || url.startsWith('file:')) {
    return url
  }
  return Config.oss + url
}

const getAltLanguages: (path: string) => Languages<string> = (path: string) => {
  const map: { [k in Locale]: string } = {
    en: '/en',
    zh: '/zh',
  }
  Object.keys(map).forEach((k) => {
    const key = k as keyof typeof map
    map[key] += path
  })
  return map
}

/**

* @description 函数防抖
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

interface Action {
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  actionButtonStyle?: React.CSSProperties
}

class ToastManager {
  private static instance: ToastManager

  private constructor() {}

  public static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager()
    }
    return ToastManager.instance
  }

  public showLoading(txt: string): void {
    this.dismiss()
    toast.loading(txt, { position: 'top-center' })
  }

  public showToast(txt: string): void {
    this.dismiss()
    toast(txt)
  }

  public showDialog(
    txt: string,
    {
      action,
      cancel,
      description,
    }: {
      description?: ReactNode
      action?: ReactNode | Action
      cancel?: ReactNode | Action
    },
  ): void {
    this.dismiss()
    toast(txt, {
      description,
      action,
      cancel,
      position: 'top-center',
      duration: 99999,
      actionButtonStyle: {
        marginLeft: cancel ? 0 : 'var(--toast-button-margin-start)',
      },
    })
  }

  public dismiss(): void {
    toast.dismiss()
  }
}

const toastManager = ToastManager.getInstance()

/**
 * @description 延时函数
 * @param ms 毫秒
 */
const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const convertPageToNumber = (str?: string) => {
  const page = Number(str)
  if (isNaN(page) || page < 1) return 1
  return page
}

const filterNumber = (num: number) => {
  if (!num) return '0'
  if (num < 1000) return num.toString()
  if (num < 10000) return new Intl.NumberFormat().format(num)
  if (num < 1000000) return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'k'
  return '1m+'
}

const doCopy = (text: string) => {
  return new Promise((resolve, reject) => {
    navigator.clipboard
      .writeText(text)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

const doShare: ({
  title,
  text,
  url,
}: {
  title: string
  text: string
  url: string
}) => Promise<1 | 2> = ({ title, text, url }) => {
  return new Promise((resolve, reject) => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text,
          url,
        })
        .then(() => resolve(1))
        .catch(() => {
          doCopy(url)
            .then(() => resolve(2))
            .catch((err) => reject(err))
        })
    } else {
      doCopy(url)
        .then(() => resolve(2))
        .catch((err) => reject(err))
    }
  })
}

export {
  filterImage,
  getAltLanguages,
  debounce,
  toastManager,
  delay,
  convertPageToNumber,
  filterNumber,
  doCopy,
  doShare,
}
