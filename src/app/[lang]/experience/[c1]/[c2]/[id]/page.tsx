import { Locale } from '@/types/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import ExperienceDetail from '@/components/pages/experience-detail'

export default async function Page({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return <ExperienceDetail dict={dict} />
}
