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
import { useParams } from 'next/navigation'

interface Props {
  dict: Dictionary
  page?: number
  c1?: string
  c2?: string
}

export default function ExperienceChild({ dict, page = 1, c1, c2 }: Props) {
  const params = useParams()
  const lang = params.lang as Locale

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

  const getBasePath = () =>
    `/${lang + routerName.experience}` + (c1 && c2 ? `/${c1}/${c2}` : '')

  return (
    <>
      <div className='mb-10 mt-5 flex items-center'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary'>
          <CusIcon name='lightbulb' className='w-14 text-white' />
        </div>
        <div className='h-1 w-3'></div>
        <h1 className='text-[1.75rem] font-bold'>{dict.header.Experience}</h1>
      </div>
      <CusTabs source={routerName.experience} />
      <CusSubTabs source={routerName.tools} />
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
        path={getBasePath()}
      />
    </>
  )
}
