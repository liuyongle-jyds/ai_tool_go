import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import i18n from '@/i18n-config'
import { Locale } from '@/types/Locale'
import { getDictionary } from './dictionaries'
import { filterImage } from '@/utils'
import Config from '@/config'
import { AppContextProvider } from '@/contexts/appContext'
import CusLayout from '@/components/cus/cus-layout'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  const title = dict.meta.title
  const description = dict.meta.description
  const imgUrl = filterImage(Config.defaultImg)

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      images: [{ url: imgUrl }],
    },
    twitter: {
      title,
      description,
      card: 'summary',
      images: [imgUrl],
    },
  }
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: Locale }
}>) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return (
    <AppContextProvider>
      <html lang={params.lang}>
        <body className={inter.className}>
          <CusLayout dict={dict}>{children}</CusLayout>
          <Toaster />
        </body>
      </html>
    </AppContextProvider>
  )
}
