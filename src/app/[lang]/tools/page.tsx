import { Locale } from '@/types/Locale'
import { getDictionary } from '../dictionaries'
import ToolsChild from '@/components/pages/tools-child'

export default async function Tools({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return <ToolsChild dict={dict} lang={lang} />
}
