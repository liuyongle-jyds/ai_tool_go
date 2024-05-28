'use client'

import { Dictionary } from '@/types/Dictionary'
import { Button } from '../ui/button'
import { Operation } from '@/types/Operation'
import CusTabs from '../cus/cus-tabs'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import CusUl from '../cus/cus-ul'
import { cn } from '@/lib/utils'
import { debounce, toastManager } from '@/utils'
import { useApp } from '@/contexts/appContext'
import User from '@/types/User'
import { uploadFile } from '@/services'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import CusGridUl from '../cus/cus-grid-ul'

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
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<Partial<User>>({
    nickName: '',
    head: '',
    greeting: '',
    email: '',
  })

  const { user, setUser } = useApp()

  const onChangeActive = (id: Operation) => {
    setActive(id)
  }

  const onChangeFilter = (val: Filter) => {
    setFilter(val)
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !files.length) return
    const file = files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'user_upload')
    try {
      setLoading(true)
      toastManager.showLoading(dict.common.Loading)
      const res = await uploadFile(formData)
      if (res.code === 200) {
        setUser((oldMap) => ({
          ...oldMap,
          head: res.result,
        }))
        setForm((oldMap) => ({
          ...oldMap,
          head: res.result,
        }))
      } else {
        toastManager.showToast(res.message)
      }
    } catch (error) {
    } finally {
      toastManager.dismiss()
      setLoading(false)
    }
  }

  const onTabSave = () => {
    toastManager.showLoading(dict.common.Loading)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setEditing(false)
      toastManager.dismiss()
    }, 1000)
  }

  useEffect(() => {
    if (user.id) {
      setForm((prevForm) => ({
        nickName: prevForm.nickName || user.nickName,
        head: prevForm.head || user.head,
        email: prevForm.email || user.email,
        greeting: prevForm.greeting || user.greeting,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id])

  return (
    <div className={cn({ loading })}>
      <div
        className={cn({
          hidden: editing,
        })}
      >
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
          <Button
            variant='outline'
            className='rounded-lg'
            onClick={() => setEditing(true)}
          >
            {dict.profile['Edit Profile']}
          </Button>
        </div>
        <div className='mt-5 whitespace-pre-wrap rounded-xl rounded-tl-none bg-foreground p-3 text-t2'>
          Likes to try various new things, and maintain a passion for life
        </div>
        <div className='my-5'>
          <CusTabs
            list={tabs}
            active={active}
            onChangeActive={onChangeActive}
            useSelfList
          >
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
          <CusGridUl></CusGridUl>
        </div>
      </div>
      <div className={cn('hidden flex-col items-center', { flex: editing })}>
        <div className='my-5 h-[7.5rem] w-[7.5rem] rounded-full bg-primary/75'></div>
        <Button
          variant='outline'
          className='relative mb-10 rounded-lg px-5 text-sm'
        >
          {dict.profile['Upload new picture']}
          <input
            type='file'
            accept='image/*'
            onChange={debounce(handleFileChange, 300)}
            className='absolute bottom-0 left-0 right-0 top-0 h-full w-full opacity-0'
          />
        </Button>
        <div className='w-full max-w-4xl'>
          <div className='grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-10'>
            <div className='grid gap-2'>
              <label className='font-medium' htmlFor='name'>
                {dict.profile.Name} <span className='text-destructive'>*</span>
              </label>
              <Input
                type='text'
                id='name'
                autoComplete='name'
                value={form.nickName}
                onChange={(e) =>
                  setForm((oldMap) => ({ ...oldMap, nickName: e.target.value }))
                }
              />
            </div>
            <div className='grid gap-2'>
              <label className='font-medium' htmlFor='email'>
                {dict.profile['E-mail']}{' '}
                <span className='text-destructive'>*</span>
              </label>
              <Input
                type='email'
                id='email'
                autoComplete='email'
                value={form.email}
                onChange={(e) =>
                  setForm((oldMap) => ({ ...oldMap, email: e.target.value }))
                }
              />
            </div>
          </div>
          <div className='mt-10 grid gap-2'>
            <label htmlFor='description' className='font-medium'>
              {dict.profile.Description}
            </label>
            <Textarea
              id='description'
              placeholder={dict.profile['Brief description']}
              value={form.greeting}
              onChange={(e) =>
                setForm((oldMap) => ({ ...oldMap, greeting: e.target.value }))
              }
            />
          </div>
        </div>
        <Button
          variant='primary'
          className='my-10 rounded-lg'
          onClick={onTabSave}
        >
          {dict.profile['Save Profile']}
        </Button>
      </div>
    </div>
  )
}
