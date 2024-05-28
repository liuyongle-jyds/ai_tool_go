'use client'

import { Dictionary } from '@/types/Dictionary'
import CusHeader from './cus-header'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import CusFooter from './cus-footer'
import { ScrollArea } from '../ui/scroll-area'
import Image from 'next/image'
import { Locale } from '@/types/Locale'

interface Props {
  children: React.ReactNode
  dict: Dictionary
}

const homeTopBg = '/images/home_top_bg.png'

export default function CusLayout({ children, dict }: Props) {
  const pathName = usePathname()
  const params = useParams()
  const [topUrl, setTopUrl] = useState('')

  const lang = params.lang as Locale

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
        <CusHeader dict={dict} />
      </div>
      <ScrollArea className='relative z-10 w-full flex-1'>
        <div className='container'>
          {children}
          <CusFooter dict={dict} />
        </div>
      </ScrollArea>
    </div>
  )
}
