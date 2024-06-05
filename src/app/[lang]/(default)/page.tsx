import Locale from '@/types/Locale'
import { getDictionary } from '../dictionaries'
import IndexChild from '@/components/pages/index-child'
import Tool from '@/types/Tool'
import { postGetTools } from '@/services'
import filterTool from '@/services/filters/filterTool'
import { filterResp } from '@/utils/actions'

export default async function Page({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const dict = await getDictionary(lang)

  let toolsList: Tool[] = []
  let res: any
  try {
    res = await postGetTools({
      pageSize: 4,
      pageNo: 1,
    })
    if (res.code === 200) {
      const list: [] = res.result.rows || []
      toolsList = list.map((e) => filterTool(e))
    }
  } catch (error) {}

  await filterResp(res)

  return <IndexChild dict={dict} toolsList={toolsList} />
}
