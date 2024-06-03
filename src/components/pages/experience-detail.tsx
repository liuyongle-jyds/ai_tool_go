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
      <Button variant='secondary' size='icon' className='mx-3 md:mx-5'>
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
    <div className='mt-2 md:mt-5 md:flex md:space-x-10'>
      <div className='space-y-5 md:flex-grow-[2] md:basis-0 md:space-y-10'>
        <div>
          <h1 className='mb-2 text-base font-bold md:mb-3 md:text-2xl'>
            {exp.name}
          </h1>
          <div
            className='flex h-3 justify-between text-xs leading-3 text-t2 
         md:h-4 md:text-sm md:leading-4'
          >
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
              <div className='h-1 w-2 md:w-3'></div>
              <CusIcon name='message-circle' className='w-3 text-t3' />
              <span className='translate-y-[1px]'>&nbsp;{exp.comment}</span>
              <div className='h-1 w-2 md:w-3'></div>
              <CusIcon name='eye' className='w-4 text-t3' />
              <span className='translate-y-[1px]'>&nbsp;{'2,222'}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap justify-between md:flex-nowrap'>
          <div className='mb-2 flex w-full items-center md:mb-0 md:w-auto md:flex-1'>
            <div className='h-8 w-8 flex-shrink-0 rounded-full bg-primary/75 md:h-10 md:w-10'></div>
            <div className='h-1 w-1 md:w-3'></div>
            <div>
              <p className='font-medium md:mb-1'>{exp.creator}</p>
              <p className='text-xs text-t2'>{exp.job}</p>
            </div>
          </div>
          {shareAndVoteDom()}
        </div>
        <div>
          <h3 className='mb-2 text-base font-bold md:mb-5 md:text-xl md:leading-6'>
            <span className='text-primary'>“ </span>
            {dict.experience['Brief introduction']}
          </h3>
          <div className='whitespace-pre-wrap border-l-2 bg-foreground p-1 text-xs md:border-l-4 md:p-3 md:text-sm'>
            {'sss\n\n adssad'}
          </div>
        </div>
        <div>
          <h3 className='mb-2 text-base font-bold md:mb-5 md:text-xl md:leading-6'>
            <span className='text-primary'>“ </span>
            {dict.experience['Using tool']}
          </h3>
          <div className='whitespace-pre-wrap border-l-2 bg-foreground p-1 text-xs md:border-l-4 md:p-3 md:text-sm'>
            {'sss\n\n adssad'}
          </div>
        </div>
        <div>
          <h3 className='mb-2 text-base font-bold md:mb-5 md:text-xl md:leading-6'>
            <span className='text-primary'>“ </span>
            {dict.experience['Main steps']}
          </h3>
          <div className='whitespace-pre-wrap border-l-2 bg-foreground p-1 text-xs md:border-l-4 md:p-3 md:text-sm'>
            {'sss\n\n adssad'}
          </div>
        </div>
        <Link
          href=''
          className='flex items-center rounded-lg border bg-foreground p-1 text-xs leading-[0.875rem] text-t2 hover:underline md:rounded-xl md:p-3 md:text-sm md:leading-4'
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
            <div className='h-6 w-6 rounded-full bg-primary md:h-10 md:w-10'></div>
            <div className='-ml-2 h-6 w-6 rounded-full bg-black md:-ml-4 md:h-10 md:w-10'></div>
            <div className='-ml-2 h-6 w-6 rounded-full bg-red-600 md:-ml-4 md:h-10 md:w-10'></div>
            <div className='h-1 w-1 md:w-3'></div>
            <div className='text-xs font-medium md:text-sm'>
              {'13.2k' + ' ' + dict.experience.Recommend}
            </div>
          </div>
          {shareAndVoteDom()}
        </div>
        <CusComments dict={dict} total={exp.comment} className='border-t' />
      </div>
      <div className='mt-4 md:mt-0 md:flex-1'>
        <div className='mb-4 rounded-lg border p-2 pb-1 md:mb-5 md:rounded-xl md:p-5 md:pb-3'>
          <Link
            href=''
            className='mb-2 flex items-center justify-between rounded-lg border bg-foreground p-2 md:mb-5 md:rounded-xl md:p-3'
          >
            <div className='flex flex-1 items-center'>
              <div className='h-8 w-8 rounded-md bg-primary/75 md:h-10 md:w-10 md:rounded-lg'></div>
              <div className='h-1 w-1 md:w-3'></div>
              <div>
                <h4 className='line-clamp-1 break-all text-sm font-medium md:text-base'>
                  {list3[0].name}
                </h4>
                <p className='line-clamp-1 break-all text-xs text-t2'>
                  {list3[0].creator}
                </p>
              </div>
            </div>
            <CusIcon name='chevron-right' className='w-4 text-t3 md:w-5' />
          </Link>
          <div>
            <h5 className='mb-1 text-sm font-medium md:mb-3 md:text-base'>
              {dict.experience.Keywords}
            </h5>
            <CusTag list={list3[0].tag} size='medium' />
          </div>
        </div>
        <div className='mb-5 md:mb-10'>
          <h3 className='mb-1 text-base font-bold md:mb-3 md:text-xl md:leading-6'>
            {dict.experience['Similar Experience']}
          </h3>
          <ul className='space-y-2 md:space-y-3'>
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
          <h3 className='mb-1 text-base font-bold md:mb-3 md:text-xl md:leading-6'>
            {dict.tools['Related Tools']}
          </h3>
          <ul className='space-y-2 md:space-y-3'>
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
