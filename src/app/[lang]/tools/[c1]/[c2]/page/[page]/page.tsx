import Locale from '@/types/Locale'
import ToolsChild from '@/components/pages/tools-child'
import { getDictionary } from '@/app/[lang]/dictionaries'
import { convertPageToNumber } from '@/utils'
import Tool from '@/types/Tool'
import { postGetTools } from '@/services'
import filterTool from '@/services/filters/filterTool'
import { filterResp } from '@/utils/actions'

interface Props {
  params: {
    lang: Locale
    c1: string
    c2: string
    page: string
  }
}

const pageSize = 6

export default async function Page({ params }: Props) {
  const { lang, c1, c2, page } = params
  const dict = await getDictionary(lang)
  const pageNo = convertPageToNumber(page)

  let toolsList: Tool[] = []
  let total = 0
  let res: any
  try {
    res = await postGetTools({
      pageNo,
      pageSize,
    })
    const list: [] = res.result.rows || []
    total = +res.result.total
    toolsList = list.map((e) => filterTool(e))
  } catch (error) {}

  await filterResp(res)

  return (
    <ToolsChild
      dict={dict}
      page={pageNo}
      c1={c1}
      c2={c2}
      total={total}
      toolsList={toolsList}
      pageSize={pageSize}
    />
  )
}
