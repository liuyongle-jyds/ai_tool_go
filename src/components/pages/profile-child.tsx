'use client'

import { Dictionary } from '@/types/Dictionary'
import { Button } from '../ui/button'
import { Operation } from '@/types/Operation'
import CusTabs from '../cus/cus-tabs'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import CusUl from '../cus/cus-ul'

type Filter = 'tools' | 'experience'

export default function ProfileChild({ dict }: { dict: Dictionary }) {
  const tabs: { text: string; id: Operation }[] = [
    {
      text: dict.profile['My Votes'],
      id: 'vote',
    },
    {
      text: dict.profile['My Collection'],
      id: 'collection',
    },
    {
      text: dict.profile.Likes,
      id: 'like',
    },
    {
      text: dict.profile['My Comments'],
      id: 'comment',
    },
    {
      text: dict.profile['Browsing History'],
      id: 'history',
    },
  ]
  const filters: { text: string; value: Filter }[] = [
    {
      text: dict.header.Tools,
      value: 'tools',
    },
    {
      text: dict.header.Experience,
      value: 'experience',
    },
  ]

  const [active, setActive] = useState('vote' as Operation)
  const [filter, setFilter] = useState('tools' as Filter)

  const onChangeActive = (id: Operation) => {
    setActive(id)
  }

  const onChangeFilter = (val: Filter) => {
    setFilter(val)
  }

  return (
    <>
      <div className='flex items-center justify-between py-5'>
        <div className='flex flex-1 items-center'>
          <div className='h-20 w-20 rounded-full bg-primary/75'></div>
          <div className='h-1 w-5'></div>
          <div className='flex-1'>
            <p className='mb-2 line-clamp-1 break-all text-2xl font-semibold leading-7'>
              Kathryn Murphy
            </p>
            <p className='line-clamp-1 break-all leading-5 text-t2'>
              kathrynmurphy@gmail.com
            </p>
          </div>
        </div>
        <div className='h-1 w-1'></div>
        <Button variant='outline' className='rounded-lg'>
          {dict.profile['Edit Profile']}
        </Button>
      </div>
      <div className='mt-5 whitespace-pre-wrap rounded-xl rounded-tl-none bg-foreground p-3 text-t2'>
        Likes to try various new things, and maintain a passion for life
      </div>
      <div className='my-5'>
        <CusTabs list={tabs} active={active} onChangeActive={onChangeActive}>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              needAngle
              className='h-10 rounded border px-5'
            >
              <div className='text-sm'>
                {filters.find((e) => e.value === filter)?.text ?? ''}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-0'>
              <CusUl list={filters} callbackFn={onChangeFilter} />
            </DropdownMenuContent>
          </DropdownMenu>
        </CusTabs>
        <ul className='grid min-h-96 grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-5'></ul>
      </div>
    </>
  )
}
