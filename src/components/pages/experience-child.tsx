'use client'

import { Dictionary } from '@/types/Dictionary'
import CusTabs from '../cus/cus-tabs'
import CusSubTabs from '../cus/cus-subTabs'
import CusGridUl from '../cus/cus-grid-ul'
import CusPagination from '../cus/cus-pagination'
import { Locale } from '@/types/Locale'
import { routerName } from '@/router'
import CusIcon from '../cus/cus-icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import LinkA from '@/types/LinkA'
import CusUl from '../cus/cus-ul'
import { useState } from 'react'

export default function ExperienceChild({
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
  const [sort, setSort] = useState('popular')

  const sortList: LinkA[] = [
    {
      text: 'Popular',
      value: 'popular',
    },
    {
      text: 'Time',
      value: 'time',
    },
  ]

  const onChangeSort = (e: string) => {
    setSort(e)
  }

  return (
    <>
      <div className='mb-10 mt-5 flex items-center'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary'>
          <CusIcon name='lightbulb' className='w-14 text-white' />
        </div>
        <div className='h-1 w-3'></div>
        <h1 className='text-[1.75rem] font-bold'>{dict.header.Experience}</h1>
      </div>
      <CusTabs onChangeActive={onChangeActive1} />
      <CusSubTabs onChangeActive={onChangeActive2} />
      <div className='mb-5 mt-10 flex items-center justify-between'>
        <div className='flex items-center'></div>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            needAngle
            className='h-10 rounded border px-5'
          >
            <div className='flex items-center'>
              <div className='h-1 w-2'></div>
              <span>{sortList.find((e) => e.value === sort)?.text ?? ''}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='p-0'>
            <CusUl list={sortList} callbackFn={onChangeSort} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CusGridUl></CusGridUl>
      <div className='h-5'></div>
      <CusPagination
        current={page}
        total={total}
        pageSize={6}
        path={`/${lang + routerName.experience}`}
      />
    </>
  )
}
