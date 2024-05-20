'use client'

import { Dictionary } from '@/types/Dictionary'
import { getCookie } from '@/utils/actions'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import CusIcon from './cus-icon'

export default function CusLogin({ dict }: { dict: Dictionary }) {
  const [hasToken, setHasToken] = useState(false)

  const init = async () => {
    const token = await getCookie('token')
    setHasToken(!!token)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      {!hasToken ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex items-center'>
              <div className='max-w-28 truncate font-medium'>user</div>
              <div className='h-1 w-3'></div>
              <CusIcon name='user-round' className='h-10 w-10' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-64'>
            <div className='flex flex-col items-center'>
              <CusIcon name='user-round' className='h-10 w-10' />
              <div className='my-3 w-full break-words text-center font-medium'>
                user
              </div>
            </div>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CusIcon name='circle-user' className='h-5 w-5' />
                <div className='h-1 w-2'></div>
                <span>{dict.header.Profile}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <CusIcon name='log-out' className='h-5 w-5' />
                <div className='h-1 w-2'></div>
                <span>{dict.header['Sign Out']}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button>{dict.header['Sign up']}</Button>
      )}
    </>
  )
}