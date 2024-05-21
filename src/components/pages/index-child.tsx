'use client'

import { Dictionary } from '@/types/Dictionary'
import CusIcon from '../cus/cus-icon'
import { KeyboardEvent, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { debounce } from '@/utils'
import Category from '@/types/Categories'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

const list1 = [
  {
    text: 'All Industries',
    id: '1',
  },
  {
    text: 'Electronic Commerce',
    id: '2',
  },
  {
    text: 'Program Development',
    id: '3',
  },
  {
    text: 'UI / UX',
    id: '4',
  },
  {
    text: 'Art',
    id: '5',
  },
  {
    text: 'Medical Treatment',
    id: '6',
  },
  {
    text: 'System',
    id: '7',
  },
  {
    text: 'Speech Recognition',
    id: '8',
  },
]

const list2 = [
  {
    text: 'All Functions',
    id: '1',
  },
  {
    text: 'Chat',
    id: '2',
  },
  {
    text: 'Photo Restoration',
    id: '3',
  },
  {
    text: 'Face Detection',
    id: '4',
  },
  {
    text: 'Speech Recognition',
    id: '5',
  },
  {
    text: 'E-commerce',
    id: '6',
  },
  {
    text: 'Article Writing',
    id: '7',
  },
  {
    text: 'Tourism',
    id: '8',
  },
  {
    text: 'System Safety',
    id: '9',
  },
  {
    text: 'Market Economy',
    id: '10',
  },
]

export default function IndexChild({ dict }: { dict: Dictionary }) {
  const [searchVal, setSearchVal] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categories1, setCategories1] = useState([] as Category[])
  const [categories2, setCategories2] = useState([] as Category[])
  const [active1, setActive1] = useState('1')
  const [active2, setActive2] = useState('')

  const onSearch = debounce(
    () => {
      if (loading) return
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    },
    200,
    true,
  )

  function handleInputKeydown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter' || e.shiftKey || e.nativeEvent.isComposing) return
    e.preventDefault()
    onSearch()
  }

  const onChangeActive1 = (id: string) => {
    setActive1(id)
  }

  const onChangeActive2 = (id: string) => {
    setActive2(id)
  }

  const init = () => {
    setTimeout(() => {
      setCategories1(list1)
      setCategories2(list2)
    }, 500)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <h1 className='mb-5 whitespace-pre-wrap text-center text-6xl font-bold leading-tight'>
        {dict.index.title}
      </h1>
      <h2 className='mb-10 text-center text-t2'>{dict.index.subtitle}</h2>
      <div
        className={cn(
          'flex h-14 items-center rounded-full border bg-background px-5',
          { 'border-primary': isFocus },
        )}
      >
        <CusIcon name='search' className='h-6 w-6 text-t3' />
        <div className='h-1 w-3'></div>
        <input
          type='text'
          id='text'
          value={searchVal}
          disabled={loading}
          placeholder={dict.index.placeholder}
          className='h-full flex-1 bg-transparent placeholder-t3 outline-none'
          enterKeyHint='search'
          onChange={(e) => setSearchVal(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onKeyDown={handleInputKeydown}
        />
        <div className='h-1 w-3'></div>
        <Button
          className='h-10 w-10 px-0'
          onClick={onSearch}
          disabled={loading}
        >
          <CusIcon
            name={loading ? 'loader-circle' : 'arrow-right'}
            className={cn('h-4 w-4', {
              'animate-spin': loading,
            })}
          />
        </Button>
      </div>
      <ScrollArea className='mb-5 mt-10 min-h-14 w-full whitespace-nowrap'>
        <ul className='flex h-14 items-center space-x-8 border-b'>
          {categories1.map((category) => (
            <li
              key={category.id}
              onClick={() => onChangeActive1(category.id)}
              className={cn(
                'relative flex h-full shrink-0 cursor-pointer items-center px-5 font-medium',
                {
                  'text-primary': active1 === category.id,
                },
              )}
            >
              {category.text}
              {active1 === category.id && (
                <div className='absolute bottom-0 left-0 z-50 h-[2px] w-full bg-gradient-primary'></div>
              )}
            </li>
          ))}
        </ul>
        <ScrollBar orientation='horizontal' className='h-1 md:h-2' />
      </ScrollArea>
      <ScrollArea className='min-h-10 w-full whitespace-nowrap'>
        <ul className='flex h-10 items-center'>
          {categories2.map((category) => (
            <li
              key={category.id}
              onClick={() => onChangeActive2(category.id)}
              className={cn(
                'relative mr-3 flex h-full shrink-0 cursor-pointer items-center rounded-lg bg-foreground px-3',
                {
                  'text-primary': active2 === category.id,
                },
              )}
            >
              {category.text}
            </li>
          ))}
        </ul>
        <ScrollBar orientation='horizontal' className='h-1 md:h-2' />
      </ScrollArea>
      <div className='h-10'></div>
    </>
  )
}
