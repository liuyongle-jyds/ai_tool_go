'use client'

import Link from 'next/link'
import CusIcon from '../cus/cus-icon'
import { Separator } from '../ui/separator'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

export default function NotFoundChild() {
  'use client'
  return (
    <>
      <div className='cus-container flex h-[100vh] flex-col items-center justify-center'>
        <h2 className='flex items-center'>
          404 <Separator orientation='vertical' className='mx-2' /> Not Found
        </h2>
        <div className='h-4 w-1'></div>
        <Link href='/' title='home'>
          <div className='flex items-center'>
            <CusIcon name='home' className='w-5' />
            <div className='h-1 w-2' />
            <span className='underline'>Home</span>
          </div>
        </Link>
      </div>
      <ProgressBar
        height='2px'
        color='#983BD4'
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}
