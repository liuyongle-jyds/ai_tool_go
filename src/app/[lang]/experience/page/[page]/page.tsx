import { Locale } from '@/types/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import ExperienceChild from '@/components/pages/experience-child'
import { convertPageToNumber } from '@/utils'

interface Props {
  params: {
    lang: Locale
    page: string
  }
}

export default async function Page({ params }: Props) {
  const { lang, page } = params
  const dict = await getDictionary(lang)
  const pageNumber = convertPageToNumber(page)

  return <ExperienceChild dict={dict} page={pageNumber} />
}
