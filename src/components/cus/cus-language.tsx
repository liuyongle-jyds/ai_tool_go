import { Locale } from '@/types/Locale'
import CusUl from './cus-ul'
import { usePathname, useRouter } from 'next/navigation'
import { setCookie } from '@/utils/actions'
import CusIcon from './cus-icon'
import { cn } from '@/lib/utils'
import { debounce } from '@/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useState } from 'react'
import { ChevronUp } from 'lucide-react'

type Lang = {
  text: string
  value: Locale
}

const languages: Lang[] = [
  {
    text: 'English',
    value: 'en',
  },
  {
    text: '简体中文',
    value: 'zh',
  },
]

export default function CusLanguage({
  lang,
  isGrey = false,
}: {
  lang: Locale
  isGrey?: boolean
}) {
  const pathName = usePathname()
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  const list = languages.map((language) => {
    let link = '/'
    if (pathName) {
      const segments = pathName.split('/')
      segments[1] = language.value
      link = segments.join('/')
    }
    return {
      link,
      value: language.value,
      text: language.text,
    }
  })

  const onChangeLang = debounce(async (e: string) => {
    if (!e) return
    await setCookie('locale', e)
    router.refresh()
  }, 200)

  return (
    <DropdownMenu onOpenChange={(open) => setVisible(open)}>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        <div
          className={cn('flex items-center ', {
            'text-t2': isGrey,
          })}
        >
          <CusIcon name='globe' className='h-6 w-6' />
          <div className='h-1 w-2'></div>
          <span>
            {languages.find((language) => language.value === lang)?.text ?? ''}
          </span>
          <div className='h-1 w-1'></div>
          <ChevronUp
            className={cn('relative h-3 w-3 transition duration-200', {
              'rotate-180': isGrey === visible,
            })}
            aria-hidden='true'
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <CusUl list={list} callbackFn={onChangeLang} replace />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
