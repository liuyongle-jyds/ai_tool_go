'use client'

import Dictionary from '@/types/Dictionary'
import { Button } from '../ui/button'
import Operation from '@/types/Operation'
import CusTabs from '../cus/cus-tabs'
import { ChangeEvent, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { debounce, toastManager } from '@/utils'
import { useApp } from '@/contexts/appContext'
import User from '@/types/User'
import { postUpdateUser, postUploadFile } from '@/services'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import CusGridUl from '../cus/cus-grid-ul'
import ItemType from '@/types/ItemType'
import CusFilter from '../cus/cus-filter'
import CusImage from '../cus/cus-image'
import { filterResp } from '@/utils/actions'

export default function ProfileChild({ dict }: { dict: Dictionary }) {
  const tabs: { content: string; id: Operation }[] = [
    {
      content: dict.profile['My Votes'],
      id: 'vote',
    },
    {
      content: dict.profile['My Collection'],
      id: 'collection',
    },
    {
      content: dict.profile.Likes,
      id: 'like',
    },
    {
      content: dict.profile['My Comments'],
      id: 'comment',
    },
    {
      content: dict.profile['Browsing History'],
      id: 'history',
    },
  ]
  const filters: { text: string; value: ItemType }[] = [
    {
      text: dict.header.Tools,
      value: 'TOOL',
    },
    {
      text: dict.header.Learning,
      value: 'LEARN',
    },
  ]

  const [active, setActive] = useState('vote' as Operation)
  const [filter, setFilter] = useState('tools' as ItemType)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<Partial<User>>({
    nickname: '',
    avatarUrl: '',
    profile: '',
    email: '',
  })

  const { user, setUser } = useApp()

  const onChangeActive = (id: Operation) => {
    setActive(id)
  }

  const onChangeFilter = (val: ItemType) => {
    setFilter(val)
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !files.length) return
    const file = files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('prefix', 'user-head')
    try {
      setLoading(true)
      toastManager.showLoading(dict.common.Loading)
      const res = await postUploadFile(formData)
      if (res.code === 200) {
        setForm((oldMap) => ({
          ...oldMap,
          avatarUrl: res.result,
        }))
      } else {
        await filterResp(res)
        toastManager.showToast(res.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      toastManager.dismiss()
      setLoading(false)
    }
  }

  const onTabSave = async () => {
    if (!form.nickname?.trim()) return
    if (loading) return
    toastManager.showLoading(dict.common.Loading)
    setLoading(true)
    try {
      const res = await postUpdateUser(form)
      if (res.code === 200) {
        setUser((oldMap) => ({
          ...oldMap,
          ...form,
        }))
        setEditing(false)
      } else {
        await filterResp(res)
        toastManager.showToast(res.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      toastManager.dismiss()
    }
  }

  useEffect(() => {
    if (user.id) {
      setForm((prevForm) => ({
        nickname: prevForm.nickname || user.nickname,
        avatarUrl: prevForm.avatarUrl || user.avatarUrl,
        email: prevForm.email || user.email,
        profile: prevForm.profile || user.profile,
      }))
    }
  }, [user.avatarUrl, user.email, user.id, user.nickname, user.profile])

  return (
    <div className={cn({ loading })}>
      <div
        className={cn({
          hidden: editing,
        })}
      >
        <div className='flex flex-wrap items-center justify-between py-2 md:py-5'>
          <div className='flex flex-1 items-center'>
            <CusImage
              src={user.avatarUrl}
              alt="user's avatar"
              width={80}
              height={80}
              className='h-10 w-10 rounded-full md:h-20 md:w-20'
            />
            <div className='h-1 w-2 md:w-5'></div>
            <div className='flex-1'>
              <h1 className='mb-1 line-clamp-1 break-all font-semibold leading-5 md:mb-2 md:text-2xl md:leading-7'>
                {user.nickname}
              </h1>
              <h2 className='line-clamp-1 break-all text-xs leading-4 text-t2 md:text-base md:leading-5'>
                {user.email}
              </h2>
            </div>
          </div>
          <div className='h-1 w-1'></div>
          <div className='mt-3 w-full md:mt-0 md:w-auto'>
            <Button variant='outline' onClick={() => setEditing(true)}>
              {dict.profile['Edit Profile']}
            </Button>
          </div>
        </div>
        <div className='mt-2 whitespace-pre-wrap rounded-lg rounded-tl-none bg-foreground px-2 text-xs text-t2 md:mt-5 md:rounded-xl md:p-3 md:text-base'>
          {user.profile || ' '}
        </div>
        <div className='my-2 md:my-5'>
          <CusTabs
            list={tabs}
            active={active}
            onChangeActive={onChangeActive}
            useSelfList
          >
            <CusFilter
              active={filter}
              list={filters}
              dict={dict}
              onChangeSort={onChangeFilter}
            />
          </CusTabs>
          <CusGridUl></CusGridUl>
        </div>
      </div>
      <div className={cn('hidden flex-col items-center', { flex: editing })}>
        <CusImage
          src={form.avatarUrl || ''}
          alt="user's avatar"
          width={120}
          height={120}
          className='my-3 h-20 w-20 rounded-full md:my-5 md:h-[7.5rem] md:w-[7.5rem]'
        />
        <Button variant='outline' className='relative mb-5 md:mb-10'>
          {dict.profile['Upload new picture']}
          <input
            type='file'
            accept='image/*'
            onChange={debounce(handleFileChange, 300)}
            className='absolute bottom-0 left-0 right-0 top-0 h-full w-full opacity-0'
          />
        </Button>
        <div className='w-full max-w-4xl'>
          <div className='grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-10'>
            <div className='grid gap-1 md:gap-2'>
              <label
                className='text-sm font-medium md:text-base'
                htmlFor='name'
              >
                {dict.profile.Name} <span className='text-destructive'>*</span>
              </label>
              <Input
                type='text'
                id='name'
                autoComplete='name'
                value={form.nickname}
                maxLength={15}
                onChange={(e) =>
                  setForm((oldMap) => ({ ...oldMap, nickname: e.target.value }))
                }
              />
            </div>
            <div className='grid gap-2'>
              <label
                className='text-sm font-medium md:text-base'
                htmlFor='email'
              >
                {dict.profile['E-mail']}{' '}
                <span className='text-destructive'>*</span>
              </label>
              <Input
                type='email'
                id='email'
                autoComplete='email'
                value={form.email}
                maxLength={100}
                onChange={(e) =>
                  setForm((oldMap) => ({ ...oldMap, email: e.target.value }))
                }
              />
            </div>
          </div>
          <div className='mt-10 grid gap-2'>
            <label
              htmlFor='description'
              className='text-sm font-medium md:text-base'
            >
              {dict.profile.Description}
            </label>
            <Textarea
              id='description'
              placeholder={dict.profile['Brief description']}
              value={form.profile}
              maxLength={200}
              onChange={(e) =>
                setForm((oldMap) => ({ ...oldMap, profile: e.target.value }))
              }
            />
          </div>
        </div>
        <Button variant='primary' className='my-10' onClick={onTabSave}>
          {dict.profile['Save Profile']}
        </Button>
      </div>
    </div>
  )
}
