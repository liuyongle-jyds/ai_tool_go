import Locale from '@/types/Locale'
import { getDictionary } from '../dictionaries'
import IndexChild from '@/components/pages/index-child'
import Tool from '@/types/Tool'
import { postGetTools } from '@/services'
import filterTool from '@/services/filters/filterTool'

export default async function Page({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const dict = await getDictionary(lang)

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

  return <IndexChild dict={dict} toolsList={toolsList} />
}
