'use client'

import { Dictionary } from '@/types/Dictionary'
import CusHeader from './cus-header'
import { Locale } from '@/types/Locale'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import CusFooter from './cus-footer'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

interface Props {
  children: React.ReactNode
  dict: Dictionary
  lang: Locale
}

const homeTopBg = '/images/home_top_bg.png'

export default function CusLayout({ children, dict, lang }: Props) {
  const pathName = usePathname()
  const [topUrl, setTopUrl] = useState(homeTopBg)

  useEffect(() => {
    setTopUrl(pathName === `/${lang}` ? homeTopBg : '')
  }, [pathName, lang])

  return (
    <div
      className='flex h-screen flex-col items-center overflow-hidden bg-top bg-no-repeat'
      style={{
        backgroundImage: topUrl ? `url(${topUrl})` : undefined,
        backgroundSize: '100%, auto',
      }}
    >
      <div className='container'>
        <CusHeader dict={dict} lang={lang} />
      </div>
      <ScrollArea className='w-full flex-1'>
        <div className='container'>
          {children}
          <CusFooter dict={dict} lang={lang} />
        </div>
      </ScrollArea>
    </div>
  )
}
