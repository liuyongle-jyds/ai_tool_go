import { Locale } from '@/types/Locale'
import ExperienceChild from '@/components/pages/experience-child'
import { getDictionary } from '../dictionaries'

interface Props {
  params: {
    lang: Locale
  }
}

export default async function Page({ params }: Props) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return <ExperienceChild dict={dict} />
}
