'use client'

import Dictionary from '@/types/Dictionary'
import Image from 'next/image'
import CusTabs from '../cus/cus-tabs'
import CusSubTabs from '../cus/cus-subTabs'
import CusGridUl from '../cus/cus-grid-ul'
import CusPagination from '../cus/cus-pagination'
import Locale from '@/types/Locale'
import { routerName } from '@/router'
import { useParams } from 'next/navigation'
import CusTool from '../cus/cus-tool'
import { useState } from 'react'
import Tool from '@/types/Tool'

interface Props {
  dict: Dictionary
  page: number
  c1?: string
  c2?: string
  toolsList: Tool[]
  total: number
  pageSize: number
}

let isPdata = true
let lastToolsList: Tool[] = []

export default function ToolsChild({
  dict,
  toolsList,
  c1,
  c2,
  total,
  page,
  pageSize,
}: Props) {
  const params = useParams()
  const [list, setList] = useState(isPdata ? toolsList : lastToolsList)

  const lang = params.lang as Locale
  lastToolsList = list

  const onChangeActive1 = (id: string) => {
    console.log(id)
  }

  const onChangeActive2 = (id: string) => {
    console.log(id)
  }

  const getBasePath = () =>
    `/${lang + routerName.tools}` + (c1 && c2 ? `/${c1}/${c2}` : '')

  const onVoteTool = (id: string) => {
    setList((e) =>
      e.map((tool) =>
        tool.id === id
          ? {
              ...tool,
              voted: !tool.isVoted,
            }
          : tool,
      ),
    )
  }

  return (
    <>
      <div className='mb-2 mt-2 flex items-center md:mb-10 md:mt-5'>
        <Image
          src='/images/alltools@2x.png'
          alt='tools icon'
          width={64}
          height={64}
          className='w-8 md:w-16'
        />
        <div className='h-1 w-1 md:w-3'></div>
        <h1 className='text-lg font-bold md:text-[1.75rem]'>
          {dict.tools['All Tools']}
        </h1>
      </div>
      <CusTabs
        onChangeActive={onChangeActive1}
        source={routerName.experience}
      />
      <CusSubTabs onChangeActive={onChangeActive2} source={routerName.tools} />
      <div className='h-3 md:h-5'></div>
      <CusGridUl>
        {list.map((tool) => (
          <CusTool
            key={tool.id}
            tool={tool}
            dict={dict}
            lang={lang}
            onTabVote={onVoteTool}
          />
        ))}
      </CusGridUl>
      <div className='h-5'></div>
      <CusPagination
        current={page}
        total={total}
        pageSize={pageSize}
        path={getBasePath()}
      />
    </>
  )
}
