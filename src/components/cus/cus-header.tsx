'use client'

import { Dictionary } from '@/types/Dictionary'
import { Locale } from '@/types/Locale'
import Image from 'next/image'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu'
import CusUl from './cus-ul'

interface Props {
  dict: Dictionary
  lang: Locale
}

export default function CusHeader({ dict, lang }: Props) {
  const toolsList = [
    {
      text: 'sss',
      link: '',
    },
    {
      text: 'sss1234567890sss1234567890',
      link: '',
    },
  ]
  const experienceList = [
    {
      text: 'sss',
      link: '',
    },
    {
      text: 'sss1234567890sss1234567890',
      link: '',
    },
  ]

  return (
    <header className='flex h-20 items-center'>
      <Link href='/' title={dict.meta.title} className='shrink-0'>
        <Image
          src='/images/logo@2x.png'
          alt='AIToolGo logo'
          width={192}
          height={36}
          className='w-24'
          priority
        />
      </Link>
      <div className='h-1 w-5'></div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{dict.header.Tools}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <CusUl list={toolsList} />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {dict.header.Experience}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <CusUl list={experienceList} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
