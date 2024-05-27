import { routerName } from '@/router'
import { Locale } from '@/types/Locale'
import { getAltLanguages } from '@/utils'
import { Metadata } from 'next'

interface Props {
  children: React.ReactNode
  params: {
    lang: Locale
    page: string
  }
}

export function generateMetadata({ params }: Props): Metadata {
  const path = routerName.tools + '/page/' + params.page
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