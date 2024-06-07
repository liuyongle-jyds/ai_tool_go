import Locale from '@/types/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import ToolDetail from '@/components/pages/tool-detail'
import Tool from '@/types/Tool'
import { postGetTool, postGetTools } from '@/services'
import filterTool from '@/services/filters/filterTool'
import { filterResp } from '@/utils/actions'
import { redirect } from 'next/navigation'
import { routerName } from '@/router'

const pageSize = 4

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
    toolRes = await postGetTool(slugName)
    if (toolRes.code === 200 && toolRes.result) {
      tool = filterTool(toolRes.result)
      toolsListRes = await postGetTools({
        pageSize,
        domainNames: tool.domains,
        taskNames: tool.tasks,
      })
      if (toolsListRes.code === 200) {
        const list: [] = toolsListRes.result.rows || []
        toolsList = list
          .map((e) => filterTool(e))
          .filter((e) => e.slugName !== tool.slugName)
          .slice(0, pageSize - 1)
      }
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
      pageSize={pageSize}
    />
  )
}
