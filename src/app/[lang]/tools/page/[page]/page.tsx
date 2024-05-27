import { Locale } from '@/types/Locale'
import ToolsChild from '@/components/pages/tools-child'
import { getDictionary } from '../../../dictionaries'

const convertToNumber = (str?: string) => {
  const page = Number(str)
  if (isNaN(page) || page < 1) return 1
  return page
}

export default async function ToolsPage({
  params,
}: {
  params: { lang: Locale; page: string }
}) {
  const { lang } = params
  const dict = await getDictionary(lang)
  const page = convertToNumber(params.page)

  return <ToolsChild dict={dict} page={page} lang={lang} />
}
