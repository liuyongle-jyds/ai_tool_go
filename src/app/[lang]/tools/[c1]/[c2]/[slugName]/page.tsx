import Locale from '@/types/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import ToolDetail from '@/components/pages/tool-detail'
import Tool from '@/types/Tool'
import { postGetTool, postGetTools } from '@/services'
import filterTool from '@/services/filters/filterTool'
import { filterResp } from '@/utils/actions'
import { redirect } from 'next/navigation'
import { routerName } from '@/router'

export default async function Page({
  params,
}: {
  params: { lang: Locale; slugName: string }
}) {
  const { lang, slugName } = params
  const dict = await getDictionary(lang)

  let tool = {} as Tool
  let res: any
  try {
    res = await postGetTool(slugName)
    if (res.code === 200) {
      if (res.result) {
        tool = filterTool(res.result)
      }
    }
  } catch (error) {}

  await filterResp(res)

  if (!tool.id) redirect(routerName.notFound)

  let toolsList: Tool[] = []
  try {
    res = await postGetTools({
      pageSize: 3,
      pageNo: 1,
    })
    const list: [] = res.result.rows || []
    toolsList = list.map((e) => filterTool(e))
  } catch (error) {}

  await filterResp(res)

  return <ToolDetail dict={dict} tool={tool} toolsList={toolsList} />
}
