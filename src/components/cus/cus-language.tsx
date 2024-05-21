import { Locale } from '@/types/Locale'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu'
import CusUl from './cus-ul'
import { usePathname, useRouter } from 'next/navigation'
import { setCookie } from '@/utils/actions'
import CusIcon from './cus-icon'
import { cn } from '@/lib/utils'
import { debounce } from '@/utils'

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
  isGrey,
}: {
  lang: Locale
  isGrey?: boolean
}) {
  const pathName = usePathname()
  const router = useRouter()

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
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <CusIcon name='globe' className='h-6 w-6' />
            <div className='h-1 w-2'></div>
            <span className={cn({ 'text-t2': isGrey })}>
              {languages.find((language) => language.value === lang)?.text ??
                ''}
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <CusUl list={list} callbackFn={onChangeLang} replace />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
