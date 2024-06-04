'use client'

import Dictionary from '@/types/Dictionary'
import { getCookie } from '@/utils/actions'
import { useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { CircleUser, LogOut } from 'lucide-react'
import { routerName } from '@/router'
import Locale from '@/types/Locale'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { DrawerClose } from '@/components/ui/drawer'
import CusImage from '../cus-image'
import { useApp } from '@/contexts/appContext'
import { useAuth } from '@clerk/nextjs'
import { toastManager } from '@/utils'

interface Props {
  dict: Dictionary
  fromDrawer?: boolean
}

export default function CusLogin({ dict, fromDrawer = false }: Props) {
  const params = useParams()
  const [hasToken, setHasToken] = useState(false)
  const { user } = useApp()
  const { signOut } = useAuth()

  const lang = params.lang as Locale

  const init = async () => {
    const token = await getCookie('token')
    setHasToken(!!token)
  }

  const profileLink = () => (
    <Link href={`/${lang + routerName.profile}`} rel='nofollow'>
      <CircleUser className='w-4 md:w-5' />
      <div className='h-1 w-2'></div>
      <span>{dict.header.Profile}</span>
    </Link>
  )

  const loginOut = () => {
    toastManager.showDialog(dict.header['Sign Out'], {
      action: {
        label: dict.common.Accept,
        onClick: async () => {
          await signOut()
        },
      },
      cancel: {
        label: dict.common.Cancel,
        onClick: () => {},
      },
    })
  }

  useEffect(() => {
    init()
  }, [user.id])

  return (
    <>
      {hasToken ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='cursor-pointer'>
            <div className='flex items-center'>
              <CusImage
                src={user.avatarUrl}
                alt="user's avatar"
                width={40}
                height={40}
                className='h-8 w-8 rounded-full md:h-10 md:w-10'
              />
              <div className='h-1 w-2 md:w-3'></div>
              <div className='max-w-[50vw] truncate break-words text-sm font-medium md:max-w-28 md:text-base'>
                {user.nickname}
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[70vw] md:w-64'>
            <div className='flex flex-col items-center'>
              <CusImage
                src={user.avatarUrl}
                alt="user's avatar"
                width={80}
                height={80}
                className='h-14 w-14 rounded-full md:h-20 md:w-20'
              />
              <div className='my-1 w-full text-center font-medium md:my-3'>
                {user.nickname}
              </div>
            </div>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                {fromDrawer ? (
                  <DrawerClose asChild>{profileLink()}</DrawerClose>
                ) : (
                  profileLink()
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={loginOut}>
                <LogOut className='w-4 md:w-5' />
                <div className='h-1 w-2'></div>
                <span>{dict.header['Sign Out']}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={`/${lang + routerName.profile}`} rel='nofollow'>
          <Button className='w-full md:w-auto md:min-w-20'>
            {dict.header['Sign up']}
          </Button>
        </Link>
      )}
    </>
  )
}
