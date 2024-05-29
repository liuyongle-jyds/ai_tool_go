'use client'

import Dictionary from '@/types/Dictionary'
import Locale from '@/types/Locale'
import Image from 'next/image'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../../ui/navigation-menu'
import CusUl from '../cus-ul'
import CusLanguage from './cus-language'
import CusLogin from './cus-login'
import { useApp } from '@/contexts/appContext'
import { useParams } from 'next/navigation'

interface Props {
  dict: Dictionary
}

export default function CusHeader({ dict }: Props) {
  const { toolsList, experienceList } = useApp()
  const params = useParams()
  const lang = params.lang as Locale

  return (
    <header className='flex h-20 w-full items-center'>
      <Link href={`/${lang}`} title={dict.meta.title} className='shrink-0'>
        <Image
          src='/images/logo@2x.png'
          alt='AIToolGo logo'
          width={96}
          height={18}
          className='w-24'
          priority
        />
      </Link>
      <div className='h-1 w-5'></div>
      <div className='flex flex-1 items-center justify-between'>
        <div className='flex items-center'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {dict.header.Tools}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <CusUl list={toolsList} isNav active='' />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {dict.header.Experience}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <CusUl list={experienceList} isNav />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className='flex items-center'>
          <CusLanguage />
          <div className='h-1 w-5'></div>
          <CusLogin dict={dict} />
        </div>
      </div>
    </header>
  )
}