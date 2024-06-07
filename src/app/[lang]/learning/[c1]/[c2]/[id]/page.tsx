import Locale from '@/types/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import LearningDetail from '@/components/pages/learning-detail'

export default async function Page({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return <LearningDetail dict={dict} />
}
