'use client'

import { Dictionary } from '@/types/Dictionary'
import CusHeader from './cus-header'
import { Locale } from '@/types/Locale'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import CusFooter from './cus-footer'
import { ScrollArea } from '../ui/scroll-area'
import Image from 'next/image'

interface Props {
  children: React.ReactNode
  dict: Dictionary
  lang: Locale
}

const homeTopBg = '/images/home_top_bg.png'

export default function CusLayout({ children, dict, lang }: Props) {
  const pathName = usePathname()
  const [topUrl, setTopUrl] = useState('')

  useEffect(() => {
    setTopUrl(pathName === `/${lang}` ? homeTopBg : '')
  }, [pathName, lang])

  return (
    <div className='relative flex h-screen select-none flex-col items-center overflow-hidden'>
      {topUrl && (
        <Image
          src={topUrl}
          alt='background image'
          width={1512}
          height={389}
          className='absolute top-0 mx-auto w-full max-w-[1400px]'
          priority
        />
      )}
      <div className='container relative z-20'>
        <CusHeader dict={dict} lang={lang} />
      </div>
      <ScrollArea className='relative z-10 w-full flex-1'>
        <div className='container'>
          {children}
          <CusFooter dict={dict} lang={lang} />
        </div>
      </ScrollArea>
    </div>
  )
}
