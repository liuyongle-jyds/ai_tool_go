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

  let toolRes = {} as any
  let toolsListRes = {} as any
  let tool = {} as Tool
  let toolsList: Tool[] = []

  try {
    const [res1, res2] = await Promise.all([
      postGetTool(slugName),
      postGetTools({ pageSize: 3, pageNo: 1 }),
    ])
    toolRes = res1
    toolsListRes = res2

    if (toolRes.code === 200 && toolRes.result) {
      tool = filterTool(toolRes.result)
    }

    if (toolsListRes.code === 200 && toolsListRes.result) {
      const list: [] = toolsListRes.result.rows || []
      toolsList = list.map((e) => filterTool(e))
    }
  } catch (error) {}

  if (!tool.id) return redirect(routerName.notFound)

  await filterResp(toolRes)
  await filterResp(toolsListRes)

  return (
    <ToolDetail
      dict={dict}
      slugName={slugName}
      tool={tool}
      toolsList={toolsList}
    />
  )
}
