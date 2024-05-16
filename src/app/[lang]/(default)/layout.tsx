import { Locale } from '@/types/Locale'
import { getAltLanguages } from '@/utils'
import { Metadata } from 'next'

interface Props {
  children: React.ReactNode,
  params: {
    lang: Locale
  }
}

export function generateMetadata({params}: Props): Metadata {
  return {
    alternates: {
      canonical: params.lang,
      languages: getAltLanguages('')
    }
  }
}

export default function Layout({children}: Props) {
  return (
    <div>{children}</div>
  )
}