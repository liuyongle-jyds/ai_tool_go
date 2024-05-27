import { Locale } from '@/types/Locale'
import { getDictionary } from '../dictionaries'
import ExperienceChild from '@/components/pages/experience-child'

export default async function Page({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return <ExperienceChild dict={dict} lang={lang} />
}
