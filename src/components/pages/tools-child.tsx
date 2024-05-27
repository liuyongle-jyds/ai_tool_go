'use client'

import { Dictionary } from '@/types/Dictionary'
import Image from 'next/image'
import CusTabs from '../cus/cus-tabs'
import CusSubTabs from '../cus/cus-subTabs'
import CusGridUl from '../cus/cus-grid-ul'
import CusPagination from '../cus/cus-pagination'
import { Locale } from '@/types/Locale'
import { routerName } from '@/router'

export default function ToolsChild({
  dict,
  page = 1,
  lang,
}: {
  dict: Dictionary
  page?: number
  lang: Locale
}) {
  const onChangeActive1 = (id: string) => {
    console.log(id)
  }

  const onChangeActive2 = (id: string) => {
    console.log(id)
  }

  const total = 99

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
      <CusTabs onChangeActive={onChangeActive1} />
      <CusSubTabs onChangeActive={onChangeActive2} />
      <CusGridUl></CusGridUl>
      <div className='h-5'></div>
      <CusPagination
        current={page}
        total={total}
        pageSize={6}
        path={`/${lang + routerName.tools}`}
      />
    </>
  )
}
