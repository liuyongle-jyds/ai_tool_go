import { Locale } from '@/types/Locale'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu'
import CusUl from './cus-ul'
import { usePathname } from 'next/navigation'
import { setCookie } from '@/utils/actions'
import CusIcon from './cus-icon'

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

export default function CusLanguage({ lang }: { lang: Locale }) {
  const pathName = usePathname()

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
    if (!e) return
    await setCookie('locale', e)
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <CusIcon name='globe' className='h-6 w-6' />
            <div className='h-1 w-2'></div>
            {languages.find((language) => language.value === lang)?.text ?? ''}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <CusUl list={list} callbackFn={onChangeLang} />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
