import Locale from '@/types/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import ToolDetail from '@/components/pages/tool-detail'
import Tool from '@/types/Tool'
import { postGetTool, postGetTools } from '@/services'
import filterTool from '@/services/filters/filterTool'

export default async function Page({
  params,
}: {
  params: { lang: Locale; slugName: string }
}) {
  const { lang, slugName } = params
  const dict = await getDictionary(lang)

  let tool = {} as Tool
  try {
    const res = await postGetTool(slugName)
    tool = filterTool(res.result)
  } catch (error) {
    console.log(error)
  }

  let toolsList: Tool[] = []
  try {
    const res = await postGetTools({
      pageSize: 4,
      pageNo: 1,
    })
    const list: [] = res.result.rows || []
    toolsList = list.map((e) => filterTool(e))
  } catch (error) {
    console.log(error)
  }

  return <ToolDetail dict={dict} tool={tool} toolsList={toolsList} />
}
