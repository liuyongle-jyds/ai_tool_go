import Locale from '@/types/Locale'
import CusUl from '../cus-ul'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { setCookie } from '@/utils/actions'
import CusIcon from '../cus-icon'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'

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

interface Props {
  isGrey?: boolean
}

export default function CusLanguage({ isGrey = false }: Props) {
  const pathName = usePathname()
  const router = useRouter()
  const params = useParams()

  const lang = params.lang as Locale

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

  const onChangeLang = async (e: string) => {
    if (!e || e === lang) return

    await setCookie('locale', e)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild needAngle>
        <div
          className={cn('flex items-center', {
            'text-t2': isGrey,
          })}
        >
          <CusIcon name='globe' className='w-3 md:w-5' />
          <div className='h-1 w-1 md:w-2'></div>
          <span className='text-xs md:text-base'>
            {languages.find((language) => language.value === lang)?.text ?? ''}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='max-h-[60vh] overflow-y-auto p-0 md:p-0'>
        <CusUl list={list} callbackFn={onChangeLang} active={lang} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
