import type { Metadata } from 'next'
import '@/styles/globals.css'
import { getDictionary } from './[lang]/dictionaries'
import i18n from '@/i18n-config'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary(i18n.defaultLocale)
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
