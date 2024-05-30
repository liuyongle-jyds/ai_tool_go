'use client'

import { list3, list4 } from '@/data/test-list'
import Dictionary from '@/types/Dictionary'
import Locale from '@/types/Locale'
import { useParams } from 'next/navigation'
import CusIcon from '../cus/cus-icon'
import { Button } from '../ui/button'
import { Triangle } from 'lucide-react'
import Link from 'next/link'
import CusComments from '../cus/cus-comments'
import CusTag from '../cus/cus-tag'
import CusExp from '../cus/cus-exp'
import { useEffect, useState } from 'react'
import Tool from '@/types/Tool'
import Experience from '@/types/Experience'
import CusTool from '../cus/cus-tool'

export default function ExperienceDetail({ dict }: { dict: Dictionary }) {
  const params = useParams()
  const [relatedTools, setRelatedTools] = useState([] as Tool[])
  const [expList, setExpList] = useState([] as Experience[])

  const lang = params.lang as Locale
  const exp = list4[0]

  const shareAndVoteDom = () => (
    <div className='flex items-center'>
      <Button variant='secondary' size='icon'>
        <CusIcon name='share-2' className='w-3' />
      </Button>
      <Button variant='secondary' size='icon' className='mx-5'>
        {exp.collected ? (
          <CusIcon name='star' fill='#EEB244' strokeWidth={0} className='w-4' />
        ) : (
          <CusIcon name='star' className='w-4' />
        )}
      </Button>
      <Button
        variant={exp.voted ? 'primary' : 'secondary'}
        className='rounded font-normal'
      >
        <Triangle
          fill={exp.voted ? '#fff' : '#90979D'}
          strokeWidth={0}
          className='h-3 w-5'
        />
        <span className='translate-y-[1px]'>
          &nbsp;{dict.tools.UPVOTE}&nbsp;{exp.vote}
        </span>
      </Button>
    </div>
  )

  const onVoteTool = (id: string) => {
    setRelatedTools((e) =>
      e.map((tool) =>
        tool.id === id
          ? {
              ...tool,
              voted: !tool.voted,
            }
          : tool,
      ),
    )
  }

  const onVoteExp = (id: string) => {
    setExpList((e) =>
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
      setRelatedTools(list3)
      setExpList(list4)
    }, 500)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className='mt-5 flex space-x-10'>
      <div className='flex-grow-[2] basis-0 space-y-10'>
        <div>
          <h1 className='mb-3 text-2xl font-bold'>{exp.name}</h1>
          <div className='flex h-4 justify-between text-sm leading-4 text-t2'>
            <span>{exp.time}</span>
            <div className='flex items-center'>
              {exp.collected ? (
                <CusIcon
                  name='star'
                  fill='#EEB244'
                  strokeWidth={0}
                  className='w-3'
                />
              ) : (
                <CusIcon name='star' className='w-3 text-t3' />
              )}
              <span className='translate-y-[1px]'>&nbsp;{exp.collection}</span>
              <div className='h-1 w-3'></div>
              <CusIcon name='message-circle' className='w-3 text-t3' />
              <span className='translate-y-[1px]'>&nbsp;{exp.comment}</span>
              <div className='h-1 w-3'></div>
              <CusIcon name='eye' className='w-4 text-t3' />
              <span className='translate-y-[1px]'>&nbsp;{'2,222'}</span>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex flex-1'>
            <div className='h-10 w-10 flex-shrink-0 rounded-full bg-primary/75'></div>
            <div className='h-1 w-3'></div>
            <div>
              <p className='mb-1 font-medium'>{exp.creator}</p>
              <p className='text-xs text-t2'>{exp.job}</p>
            </div>
          </div>
          {shareAndVoteDom()}
        </div>
        <div>
          <h3 className='mb-5 text-xl font-bold leading-6'>
            <span className='text-primary'>“ </span>
            {dict.experience['Brief introduction']}
          </h3>
          <div className='whitespace-pre-wrap border-l-4 bg-foreground p-3 text-sm'>
            {'sss\n\n adssad'}
          </div>
        </div>
        <div>
          <h3 className='mb-5 text-xl font-bold leading-6'>
            <span className='text-primary'>“ </span>
            {dict.experience['Using tool']}
          </h3>
          <div className='whitespace-pre-wrap border-l-4 bg-foreground p-3 text-sm'>
            {'sss\n\n adssad'}
          </div>
        </div>
        <div>
          <h3 className='mb-5 text-xl font-bold leading-6'>
            <span className='text-primary'>“ </span>
            {dict.experience['Main steps']}
          </h3>
          <div className='whitespace-pre-wrap border-l-4 bg-foreground p-3 text-sm'>
            {'sss\n\n adssad'}
          </div>
        </div>
        <Link
          href=''
          className='flex items-center rounded-xl border bg-foreground p-3 text-sm leading-4 text-t2 hover:underline'
        >
          <CusIcon name='link' className='w-3' />
          <p className='translate-y-[1px]'>
            &nbsp;
            {dict.experience['Original link']}
            <span>: </span>
            {
              'https://www.example.com/chatgpt-optimize-ecommerce-product-description'
            }
          </p>
        </Link>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='h-10 w-10 rounded-full bg-primary'></div>
            <div className='-ml-3 h-10 w-10 rounded-full bg-black'></div>
            <div className='-ml-3 h-10 w-10 rounded-full bg-red-600'></div>
            <div className='h-1 w-3'></div>
            <div className='text-sm font-medium'>
              {'13.2k' + ' ' + dict.experience.Recommend}
            </div>
          </div>
          {shareAndVoteDom()}
        </div>
        <CusComments dict={dict} total={exp.comment} className='border-t' />
      </div>
      <div className='flex-1'>
        <div className='mb-5 rounded-xl border p-5 pb-3'>
          <Link
            href=''
            className='mb-5 flex items-center justify-between rounded-xl border bg-foreground p-3'
          >
            <div className='flex flex-1 items-center'>
              <div className='h-10 w-10 rounded-lg bg-primary/75'></div>
              <div className='h-1 w-3'></div>
              <div>
                <h4 className='mb-1 line-clamp-1 break-all font-medium'>
                  {list3[0].name}
                </h4>
                <p className='line-clamp-1 break-all text-xl text-t2'>
                  {list3[0].creator}
                </p>
              </div>
            </div>
            <CusIcon name='chevron-right' className='w-5 text-t3' />
          </Link>
          <div>
            <h5 className='mb-3 font-medium'>{dict.experience.Keywords}</h5>
            <CusTag list={list3[0].tag} size='medium' />
          </div>
        </div>
        <div className='mb-10'>
          <h3 className='mb-3 text-xl font-bold leading-6'>
            {dict.experience['Similar Experience']}
          </h3>
          <ul className='space-y-3'>
            {expList.map((e) => (
              <CusExp
                hideRanking
                key={e.id}
                exp={e}
                onTabVote={onVoteExp}
                lang={lang}
              />
            ))}
          </ul>
        </div>
        <div>
          <h3 className='mb-3 text-xl font-bold leading-6'>
            {dict.tools['Related Tools']}
          </h3>
          <ul className='space-y-3'>
            {relatedTools.map((e) => (
              <CusTool
                tipLimit
                key={e.id}
                tool={e}
                dict={dict}
                lang={lang}
                onTabVote={onVoteTool}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
