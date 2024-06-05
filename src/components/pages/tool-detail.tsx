'use client'

import Dictionary from '@/types/Dictionary'
import Tool from '@/types/Tool'
import CusTag from '../cus/cus-tag'
import { Button } from '../ui/button'
import CusIcon from '../cus/cus-icon'
import { Triangle } from 'lucide-react'
import Category from '@/types/Category'
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
import { doShare, filterNumber, toastManager } from '@/utils'
import CusImage from '../cus/cus-image'

function AnchorDom({ id }: { id: string }) {
  return <div className='invisible -mt-10 h-10 md:-mt-12 md:h-12' id={id}></div>
}

let isPdata = true
let lastToolsList: Tool[] = []

export default function ToolDetail({
  dict,
  tool,
  toolsList,
}: {
  dict: Dictionary
  tool: Tool
  toolsList: Tool[]
}) {
  const params = useParams()
  const [active, setActive] = useState('tool-information')
  const [expSort, setExpSort] = useState('popular')
  const [relatedTools, setRelatedTools] = useState(
    isPdata ? toolsList : lastToolsList,
  )
  const [expList, setExpList] = useState([] as Experience[])

  const lang = params.lang as Locale
  lastToolsList = relatedTools

  const onClickShare = async () => {
    try {
      const res = await doShare({
        title: tool.seoTitle,
        text: tool.seoDesc,
        url: window.location.href,
      })
      if (res === 2) {
        toastManager.showToast(dict.common.Copied)
      }
    } catch (error) {
      console.log(error)
      toastManager.showToast(error as string)
    }
  }

  const tabs: Category[] = [
    {
      content: dict.tools['Tool Information'],
      id: 'tool-information',
      link: '#tool-information',
    },
    {
      content: dict.tools['Application Cases'],
      id: 'application-cases',
      link: '#application-cases',
    },
    {
      content: dict.header.Experience,
      id: 'experience',
      link: '#experience',
    },
    {
      content: dict.index.Comment,
      id: 'comment',
      link: '#comment',
    },
    {
      content: dict.tools['Related Tools'],
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
              voted: !tool.isVoted,
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
      setExpList(list4)
    }, 500)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className='xl:flex xl:space-x-10'>
      <div className='xl:w-2/3'>
        <div className='mb-2 flex flex-wrap md:mb-5'>
          <div className='flex flex-1'>
            <CusImage
              src={tool.logoUrl}
              alt={tool.name + ' ' + 'logo'}
              width={80}
              height={80}
              className='h-12 w-12 flex-shrink-0 rounded-full md:h-20 md:w-20'
            />
            <div className='h-1 w-1 md:w-3'></div>
            <div>
              <h1 className='text-base font-semibold md:mb-1 md:text-2xl md:leading-7'>
                {tool.name}
              </h1>
              <div className='mb-2 text-xs text-t2 md:mb-3 md:text-base'>
                {tool.companyName}
              </div>
              <CusTag list={tool.tasks} />
            </div>
          </div>
          <div className='h-1 w-1'></div>
          <div className='mt-2 flex w-full flex-shrink-0 flex-col items-end md:mt-0 md:w-auto'>
            <div className='mb-2 flex items-center md:mb-4'>
              <Button variant='secondary' size='icon' onClick={onClickShare}>
                <CusIcon name='share-2' className='w-3' />
              </Button>
              <Button variant='secondary' size='icon' className='mx-3 md:mx-5'>
                {tool.isCollected ? (
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
                variant={tool.isVoted ? 'primary' : 'secondary'}
                className='rounded font-normal'
              >
                <Triangle
                  fill={tool.isVoted ? '#fff' : '#90979D'}
                  strokeWidth={0}
                  className='h-3 w-5'
                />
                <span className='md:translate-y-[1px]'>
                  &nbsp;{dict.tools.UPVOTE}&nbsp;{filterNumber(tool.votesCount)}
                </span>
              </Button>
            </div>
            <div className='flex items-center text-xs leading-none text-t2'>
              {tool.isCollected ? (
                <CusIcon
                  name='star'
                  fill='#EEB244'
                  strokeWidth={0}
                  className='w-3'
                />
              ) : (
                <CusIcon name='star' className='w-3 text-t3' />
              )}
              <span className='md:translate-y-[1px]'>
                &nbsp;{filterNumber(tool.collectsCount)}
              </span>
              <div className='h-1 w-2 md:w-3'></div>
              <CusIcon name='message-circle' className='w-3 text-t3' />
              <span className='md:translate-y-[1px]'>
                &nbsp;{filterNumber(tool.commentsCount)}
              </span>
              <div className='h-1 w-2 md:w-3'></div>
              <CusIcon name='lightbulb' className='w-3 text-t3' />
              <span className='md:translate-y-[1px]'>
                &nbsp;{filterNumber(tool.experiencesCount)}
              </span>
            </div>
          </div>
        </div>
        <CusTabs
          list={tabs}
          active={active}
          useSelfList
          className='sticky left-0 top-0 z-10 bg-background'
          onChangeActive={onChangeActive}
        />
        <AnchorDom id='tool-information' />
        <div className='py-2 md:py-5'>
          <h3 className='mb-2 text-base font-semibold md:mb-5 md:text-xl'>
            {dict.tools['Tool Information']}
          </h3>
          <div className='mb-2 whitespace-pre-wrap rounded rounded-tl-none bg-foreground p-2 text-xs text-t2 md:mb-5 md:rounded-xl md:p-5 md:text-sm'>
            {tool.profile}
          </div>
          <div className='grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3'>
            {tool.tasks.map((e, index) => (
              <div
                key={index}
                className='h-20 rounded bg-primary/75 md:h-36 md:rounded-xl'
              ></div>
            ))}
          </div>
        </div>
        <AnchorDom id='application-cases' />
        <div className='pt-2 md:pb-2 md:pt-5'>
          <h3 className='mb-2 text-base font-semibold md:mb-5 md:text-xl'>
            {dict.tools['Application Cases']}
          </h3>
          <CusTag list={tool.domains} size='lg' />
        </div>
        <AnchorDom id='experience' />
        <div className='py-2 md:py-5'>
          <div className='mb-2 flex items-center justify-between md:mb-5'>
            <h3 className='text-base font-semibold md:text-xl'>
              {dict.header.Experience}
            </h3>
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
        <CusComments dict={dict} total={tool.commentsCount} />
      </div>
      <div className='xl:w-1/3'>
        <AnchorDom id='related-tools' />
        <div className='py-2 xl:py-0'>
          <h3 className='mb-2 text-base font-semibold md:mb-5 md:text-xl'>
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
