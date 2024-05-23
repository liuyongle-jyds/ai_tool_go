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
  return {
    alternates: {
      canonical: params.lang,
      languages: getAltLanguages(routerName.profile),
    },
  }
}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
