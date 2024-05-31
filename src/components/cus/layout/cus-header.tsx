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
import CusIcon from '../cus-icon'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Menu } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface Props {
  dict: Dictionary
}

export default function CusHeader({ dict }: Props) {
  const { toolsList, experienceList } = useApp()
  const params = useParams()

  const lang = params.lang as Locale

  return (
    <header className='flex h-10 w-full items-center justify-between md:h-20'>
      <Link href={`/${lang}`} title={dict.meta.title} className='shrink-0'>
        <Image
          src='/images/logo@2x.png'
          alt='AIToolGo'
          width={96}
          height={18}
          className='w-16 md:w-24'
          priority
        />
      </Link>
      <div className='hidden h-1 w-5 md:inline-flex'></div>
      <div className='flex items-center md:hidden'>
        <CusLanguage />
        <div className='h-1 w-3'></div>
        <Drawer direction='left'>
          <DrawerTrigger asChild>
            <Menu className='w-5' />
          </DrawerTrigger>
          <DrawerContent className='h-full w-[85vw] px-5 py-2'>
            <div className='flex-1'>
              <Accordion type='single' collapsible>
                <AccordionItem value='1'>
                  <AccordionTrigger>{dict.header.Tools}</AccordionTrigger>
                  <AccordionContent>
                    <CusUl list={toolsList} isAccordion fromDrawer active='' />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='2'>
                  <AccordionTrigger>{dict.header.Experience}</AccordionTrigger>
                  <AccordionContent>
                    <CusUl
                      list={experienceList}
                      isAccordion
                      fromDrawer
                      active=''
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div>
              <CusLogin dict={dict} fromDrawer />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <div className='hidden flex-1 items-center justify-between md:flex'>
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
