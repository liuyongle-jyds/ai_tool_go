'use client'

import Dictionary from '@/types/Dictionary'
import Tool from '@/types/Tool'
import CusTag from '../cus/cus-tag'
import { Button } from '../ui/button'
import CusIcon from '../cus/cus-icon'
import { Triangle } from 'lucide-react'
import Category from '@/types/Categories'
import { useEffect, useState } from 'react'
import CusTabs from '../cus/cus-tabs'
import CusFilter from '../cus/cus-filter'
import CusComments from '../cus/cus-comments'
import Experience from '@/types/Experience'
import { list3, list4 } from '@/data/test-list'
import CusTool from '../cus/cus-tool'
import Locale from '@/types/Locale'
import { useParams } from 'next/navigation'
import CusExp from '../cus/cus-exp'

function AnchorDom({ id }: { id: string }) {
  return <div className='invisible -mt-12 h-12' id={id}></div>
}

export default function ToolDetail({ dict }: { dict: Dictionary }) {
  const params = useParams()
  const [active, setActive] = useState('tool-information')
  const [expSort, setExpSort] = useState('popular')
  const [relatedTools, setRelatedTools] = useState([] as Tool[])
  const [expList, setExpList] = useState([] as Experience[])

  const lang = params.lang as Locale
  const tool: Tool = list3[0]

  const tabs: Category[] = [
    {
      text: dict.tools['Tool Information'],
      id: 'tool-information',
      link: '#tool-information',
    },
    {
      text: dict.tools['Application Cases'],
      id: 'application-cases',
      link: '#application-cases',
    },
    {
      text: dict.header.Experience,
      id: 'experience',
      link: '#experience',
    },
    {
      text: dict.index.Comment,
      id: 'comment',
      link: '#comment',
    },
    {
      text: dict.tools['Related Tools'],
      id: 'related-tools',
      link: '#related-tools',
    },
  ]

  const onChangeExpSort = (e: string) => {
    setExpSort(e)
  }

  const onChangeActive = (id: string) => {
    setActive(id)
  }

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
    <div className='flex space-x-10'>
      <div className='flex-grow-[2] basis-0'>
        <div className='mb-5 flex'>
          <div className='flex flex-1'>
            <div className='h-20 w-20 flex-shrink-0 rounded-full bg-primary/75'></div>
            <div className='h-1 w-3'></div>
            <div>
              <h1 className='mb-1 text-2xl font-semibold leading-7'>
                {tool.name}
              </h1>
              <h2 className='mb-3 text-t2'>{tool.creator}</h2>
              <CusTag list={tool.tag} />
            </div>
          </div>
          <div className='h-1 w-1'></div>
          <div className='flex flex-shrink-0 flex-col items-end'>
            <div className='mb-4 flex items-center'>
              <Button variant='secondary' size='icon'>
                <CusIcon name='share-2' className='w-3' />
              </Button>
              <Button variant='secondary' size='icon' className='mx-5'>
                {tool.collected ? (
                  <CusIcon
                    name='star'
                    fill='#EEB244'
                    strokeWidth={0}
                    className='w-4'
                  />
                ) : (
                  <CusIcon name='star' className='w-4' />
                )}
              </Button>
              <Button
                variant={tool.voted ? 'primary' : 'secondary'}
                className='rounded'
              >
                <Triangle
                  fill={tool.voted ? '#fff' : '#90979D'}
                  strokeWidth={0}
                  className='h-3 w-4'
                />
              </Button>
            </div>
            <div className='flex items-center text-xs leading-none text-t3'>
              {tool.collected ? (
                <CusIcon
                  name='star'
                  fill='#EEB244'
                  strokeWidth={0}
                  className='w-3'
                />
              ) : (
                <CusIcon name='star' className='w-3 ' />
              )}
              <span className='translate-y-[1px]'>&nbsp;{tool.collection}</span>
              <div className='h-1 w-3'></div>
              <CusIcon name='message-circle' className='w-3' />
              <span className='translate-y-[1px]'>&nbsp;{tool.comment}</span>
              <div className='h-1 w-3'></div>
              <CusIcon name='lightbulb' className='w-3' />
              <span className='translate-y-[1px]'>&nbsp;{'2,222'}</span>
            </div>
          </div>
        </div>
        <div className='sticky left-0 top-0 z-10 w-full bg-background'>
          <CusTabs
            list={tabs}
            active={active}
            useSelfList
            onChangeActive={onChangeActive}
          />
        </div>
        <AnchorDom id='tool-information' />
        <div className='py-5'>
          <h3 className='mb-5 text-xl font-semibold'>
            {dict.tools['Tool Information']}
          </h3>
          <div className='mb-5 whitespace-pre-wrap rounded-xl rounded-tl-none bg-foreground p-5 text-sm text-t2'>
            {tool.desc}
          </div>
          <div className='grid grid-cols-4 gap-3'>
            {tool.tag.map((e, index) => (
              <div
                key={index}
                className='h-36 rounded-xl bg-primary/75 object-cover'
              ></div>
            ))}
          </div>
        </div>
        <AnchorDom id='application-cases' />
        <div className='pb-2 pt-5'>
          <h3 className='mb-5 text-xl font-semibold'>
            {dict.tools['Application Cases']}
          </h3>
          <CusTag list={tool.tag} size='lg' />
        </div>
        <AnchorDom id='experience' />
        <div className='py-5'>
          <div className='mb-5 flex items-center justify-between'>
            <h3 className='text-xl font-semibold'>{dict.header.Experience}</h3>
            <CusFilter active={expSort} onChangeSort={onChangeExpSort} />
          </div>
          <ul className='mb-5 space-y-5'>
            {expList.map((e) => (
              <CusExp key={e.id} exp={e} onTabVote={onVoteExp} lang={lang} />
            ))}
          </ul>
          <div className='flex justify-center'>
            <Button variant='outline' className='min-w-60 text-t2'>
              {dict.index['See All']}
            </Button>
          </div>
        </div>
        <AnchorDom id='comment' />
        <CusComments dict={dict} total={tool.comment} />
      </div>
      <div className='flex-1'>
        <div className='py-5' id='related-tools'>
          <h3 className='mb-5 text-xl font-semibold'>
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
