import { Locale } from '@/types/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import ExperienceChild from '@/components/pages/experience-child'

const convertToNumber = (str?: string) => {
  const page = Number(str)
  if (isNaN(page) || page < 1) return 1
  return page
}

export default async function Page({
  params,
}: {
  params: { lang: Locale; page: string }
}) {
  const { lang } = params
  const dict = await getDictionary(lang)
  const page = convertToNumber(params.page)

  return <ExperienceChild dict={dict} page={page} lang={lang} />
}
