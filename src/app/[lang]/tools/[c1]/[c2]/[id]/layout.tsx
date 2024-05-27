import { routerName } from '@/router'
import { Locale } from '@/types/Locale'
import { getAltLanguages } from '@/utils'
import { Metadata } from 'next'

interface Props {
  children: React.ReactNode
  params: {
    lang: Locale
    c1: string
    c2: string
    id: string
  }
}

export function generateMetadata({ params }: Props): Metadata {
  const { lang, c1, c2, id } = params
  const path = `${routerName.tools}/${c1}/${c2}/${id}`
  return {
    alternates: {
      canonical: `/${params.lang + path}`,
      languages: getAltLanguages(path),
    },
  }
}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
