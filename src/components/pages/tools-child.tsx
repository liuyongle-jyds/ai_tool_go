'use client'

import { Dictionary } from '@/types/Dictionary'
import Image from 'next/image'
import CusTabs from '../cus/cus-tabs'
import CusSubTabs from '../cus/cus-subTabs'
import CusGridUl from '../cus/cus-grid-ul'
import CusPagination from '../cus/cus-pagination'
import { Locale } from '@/types/Locale'
import { routerName } from '@/router'
import { useParams } from 'next/navigation'

interface Props {
  dict: Dictionary
  page?: number
  c1?: string
  c2?: string
}

export default function ToolsChild({ dict, page = 1, c1, c2 }: Props) {
  const params = useParams()
  const lang = params.lang as Locale

  const onChangeActive1 = (id: string) => {
    console.log(id)
  }

  const onChangeActive2 = (id: string) => {
    console.log(id)
  }

  const total = 99

  const getBasePath = () =>
    `/${lang + routerName.tools}` + (c1 && c2 ? `/${c1}/${c2}` : '')

  return (
    <>
      <div className='mb-10 mt-5 flex items-center'>
        <Image
          src='/images/alltools.png'
          alt='tools icon'
          width={64}
          height={64}
          className='h-16 w-16'
        />
        <div className='h-1 w-3'></div>
        <h1 className='text-[1.75rem] font-bold'>{dict.tools['All Tools']}</h1>
      </div>
      <CusTabs
        onChangeActive={onChangeActive1}
        source={routerName.experience}
      />
      <CusSubTabs onChangeActive={onChangeActive2} source={routerName.tools} />
      <CusGridUl></CusGridUl>
      <div className='h-5'></div>
      <CusPagination
        current={page}
        total={total}
        pageSize={6}
        path={getBasePath()}
      />
    </>
  )
}
