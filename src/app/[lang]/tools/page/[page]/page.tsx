import { Locale } from '@/types/Locale'
import ToolsChild from '@/components/pages/tools-child'
import { getDictionary } from '@/app/[lang]/dictionaries'
import { convertPageToNumber } from '@/utils'

export default async function Page({
  params,
}: {
  params: { lang: Locale; page: string }
}) {
  const { lang } = params
  const dict = await getDictionary(lang)
  const page = convertPageToNumber(params.page)

  return <ToolsChild dict={dict} page={page} />
}
