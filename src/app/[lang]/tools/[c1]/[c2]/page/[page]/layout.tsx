import { routerName } from '@/router'
import { Locale } from '@/types/Locale'
import { getAltLanguages } from '@/utils'
import { Metadata } from 'next'

interface Props {
  children: React.ReactNode
  params: {
    lang: Locale
    page: string
    c1: string
    c2: string
  }
}

export function generateMetadata({ params }: Props): Metadata {
  const { lang, page, c1, c2 } = params
  const path = `${routerName.tools}/${c1}/${c2}/page/${page}`
  return {
    alternates: {
      canonical: `/${lang + path}`,
      languages: getAltLanguages(path),
    },
  }
}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
