'use client'

import { Dictionary } from '@/types/Dictionary'
import CusHeader from './cus-header'
import { Locale } from '@/types/Locale'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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
      className='container bg-contain bg-no-repeat'
      style={{ backgroundImage: topUrl ? `url(${topUrl})` : undefined }}
    >
      <CusHeader dict={dict} lang={lang} />
      {children}
    </div>
  )
}
