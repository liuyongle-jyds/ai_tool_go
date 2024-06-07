'use client'

import Dictionary from '@/types/Dictionary'
import CusTabs from '../cus/cus-tabs'
import CusSubTabs from '../cus/cus-subTabs'
import CusGridUl from '../cus/cus-grid-ul'
import CusPagination from '../cus/cus-pagination'
import Locale from '@/types/Locale'
import { routerName } from '@/router'
import CusIcon from '../cus/cus-icon'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import CusFilter from '../cus/cus-filter'
import Learning from '@/types/Learning'
import { list4 } from '@/data/test-list'
import CusExp from '../cus/cus-exp'
import Sort from '@/types/Sort'

interface Props {
  dict: Dictionary
  page?: number
  c1?: string
  c2?: string
}

export default function LearningChild({ dict, page = 1, c1, c2 }: Props) {
  const params = useParams()
  const [list, setList] = useState([] as Learning[])

  const lang = params.lang as Locale

  const total = 99
  const [sort, setSort] = useState('DESC' as Sort)

  const onChangeSort = (e: Sort) => {
    setSort(e)
  }

  const getBasePath = () =>
    `/${lang + routerName.learning}` + (c1 && c2 ? `/${c1}/${c2}` : '')

  const onVoteExp = (id: string) => {
    setList((e) =>
      e.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              voted: !exp.voted,
            }
          : exp,
      ),
    )
  }

  const init = () => {
    setTimeout(() => {
      setList(list4)
    }, 500)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div className='mb-2 mt-2 flex items-center md:mb-10 md:mt-5'>
        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary md:h-16 md:w-16'>
          <CusIcon
            name='lightbulb'
            className='w-3 text-primary-foreground md:w-14'
          />
        </div>
        <div className='h-1 w-1 md:w-3'></div>
        <h1 className='text-lg font-bold md:text-[1.75rem]'>
          {dict.header.Learning}
        </h1>
      </div>
      <CusTabs source={routerName.learning} />
      <CusSubTabs source={routerName.tools} />
      <div className='mb-2 mt-3 flex items-center justify-between md:mb-5 md:mt-10'>
        <div className='flex items-center'></div>
        <CusFilter active={sort} dict={dict} onChangeSort={onChangeSort} />
      </div>
      <CusGridUl>
        {list.map((exp) => (
          <CusExp key={exp.id} exp={exp} onTabVote={onVoteExp} lang={lang} />
        ))}
      </CusGridUl>
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
