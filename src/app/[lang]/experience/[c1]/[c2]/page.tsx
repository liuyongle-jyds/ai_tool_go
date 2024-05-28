import { Locale } from '@/types/Locale'
import { getDictionary } from '../../../dictionaries'
import ExperienceChild from '@/components/pages/experience-child'

interface Props {
  params: {
    lang: Locale
    c1: string
    c2: string
  }
}

export default async function Page({ params }: Props) {
  const { lang, c1, c2 } = params
  const dict = await getDictionary(lang)

  return <ExperienceChild dict={dict} lang={lang} c1={c1} c2={c2} />
}
