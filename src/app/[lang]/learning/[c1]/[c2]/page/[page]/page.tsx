import Locale from '@/types/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import { convertPageToNumber } from '@/utils'
import LearningChild from '@/components/pages/learning-child'

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

  return <LearningChild dict={dict} page={pageNumber} c1={c1} c2={c2} />
}
