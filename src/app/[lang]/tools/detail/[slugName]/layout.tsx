import Config from '@/config'
import { routerName } from '@/router'
import { postGetTool } from '@/services'
import filterTool from '@/services/filters/filterTool'
import Locale from '@/types/Locale'
import Tool from '@/types/Tool'
import { filterImage, getAltLanguages } from '@/utils'
import { Metadata } from 'next'

interface Props {
  children: React.ReactNode
  params: {
    lang: Locale
    slugName: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slugName } = params
  const path = `${routerName.tools}/detail/${slugName}`

  let tool = {} as Tool
  try {
    const res = await postGetTool(slugName)
    tool = filterTool(res.result)
  } catch (error) {
    console.log(error)
  }

  const title = tool.seoTitle
  const description = tool.seoDesc
  const imgUrl = filterImage(tool.logoUrl || Config.defaultImg)

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang + path}`,
      languages: getAltLanguages(path),
    },
    openGraph: {
      title,
      description,
      images: [{ url: imgUrl }],
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: [imgUrl],
    },
  }
}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
