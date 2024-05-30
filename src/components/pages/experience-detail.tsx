'use client'

import { list4 } from '@/data/test-list'
import Dictionary from '@/types/Dictionary'
import Locale from '@/types/Locale'
import { useParams } from 'next/navigation'

export default function ExperienceDetail({ dict }: { dict: Dictionary }) {
  const params = useParams()

  const lang = params.lang as Locale
  const exp = list4[0]

  return (
    <div className='mt-5 flex space-x-10'>
      <div className='flex-grow-[2] basis-0'>
        <h1 className='mb-3 text-2xl font-bold'>{exp.name}</h1>
      </div>
      <div className='flex-1'></div>
    </div>
  )
}
