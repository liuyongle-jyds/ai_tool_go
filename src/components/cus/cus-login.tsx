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
import { CircleUser, LogOut } from 'lucide-react'
import Link from 'next/link'
import { routerName } from '@/router'
import { Locale } from '@/types/Locale'

export default function CusLogin({
  dict,
  lang,
}: {
  dict: Dictionary
  lang: Locale
}) {
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
      {hasToken ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='cursor-pointer'>
            <div className='flex items-center'>
              <div className='max-w-28 truncate font-medium'>user</div>
              <div className='h-1 w-3'></div>
              <div className='h-10 w-10 rounded-full bg-primary/75' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-64'>
            <div className='flex flex-col items-center'>
              <div className='h-20 w-20 rounded-full bg-primary/75' />
              <div className='my-3 w-full break-words text-center font-medium'>
                user
              </div>
            </div>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href={`/${lang + routerName.profile}`}
                  className='flex h-full w-full items-center'
                >
                  <CircleUser className='h-5 w-5' />
                  <div className='h-1 w-2'></div>
                  <span>{dict.header.Profile}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className='h-5 w-5' />
                <div className='h-1 w-2'></div>
                <span>{dict.header['Sign Out']}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button className='min-w-20'>{dict.header['Sign up']}</Button>
      )}
    </>
  )
}
