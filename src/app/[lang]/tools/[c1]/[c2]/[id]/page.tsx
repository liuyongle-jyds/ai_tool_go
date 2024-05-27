import { Locale } from '@/types/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import ToolDetail from '@/components/pages/tool-detail'

export default async function Page({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return <ToolDetail dict={dict} />
}
