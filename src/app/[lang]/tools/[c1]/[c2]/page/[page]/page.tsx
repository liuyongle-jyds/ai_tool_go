import { Locale } from '@/types/Locale'
import ToolsChild from '@/components/pages/tools-child'
import { getDictionary } from '@/app/[lang]/dictionaries'
import { convertPageToNumber } from '@/utils'

interface Props {
  params: {
    lang: Locale
    c1: string
    c2: string
    page: string
  }
}

export default async function Page({ params }: Props) {
  const { lang, c1, c2, page } = params
  const dict = await getDictionary(lang)
  const pageNumber = convertPageToNumber(page)

  return <ToolsChild dict={dict} page={pageNumber} c1={c1} c2={c2} />
}
