import { routerName } from '@/router'
import { Locale } from '@/types/Locale'
import { getAltLanguages } from '@/utils'
import { Metadata } from 'next'

interface Props {
  children: React.ReactNode
  params: {
    lang: Locale
  }
}

export function generateMetadata({ params }: Props): Metadata {
  const { lang } = params
  const path = routerName.experience
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
