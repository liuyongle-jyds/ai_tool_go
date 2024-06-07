'use client'

import Dictionary from '@/types/Dictionary'
import Tool from '@/types/Tool'
import CusTag from '../cus/cus-tag'
import { Button } from '../ui/button'
import CusIcon from '../cus/cus-icon'
import { Triangle, Star } from 'lucide-react'
import Category from '@/types/Category'
import { useEffect, useState } from 'react'
import CusTabs from '../cus/cus-tabs'
import CusFilter from '../cus/cus-filter'
import CusComments from '../cus/cus-comments'
import Learning from '@/types/Learning'
import { list4 } from '@/data/test-list'
import CusTool from '../cus/cus-tool'
import Locale from '@/types/Locale'
import { useParams } from 'next/navigation'
import CusExp from '../cus/cus-exp'
import { doShare, filterImage, filterNumber, toastManager } from '@/utils'
import CusImage from '../cus/cus-image'
import ImageViewer from 'awesome-image-viewer'
import { postGetTool, postGetTools, postUserAction } from '@/services'
import { filterResp } from '@/utils/actions'
import filterTool from '@/services/filters/filterTool'
import Sort from '@/types/Sort'

function AnchorDom({ id }: { id: string }) {
  return <div className='invisible -mt-10 h-10 md:-mt-12 md:h-12' id={id}></div>
}

let isPdata = true
let lastRelatedTools: Tool[] = []
let lastTool: Tool

export default function ToolDetail({
  dict,
  tool,
  toolsList,
  slugName,
  pageSize,
}: {
  dict: Dictionary
  tool: Tool
  slugName: string
  pageSize: number
  toolsList: Tool[]
}) {
  const params = useParams()
  const [active, setActive] = useState('tool-information')
  const [expSort, setExpSort] = useState('DESC' as Sort)
  const [relatedTools, setRelatedTools] = useState(
    isPdata ? toolsList : lastRelatedTools,
  )
  const [currentTool, setCurrentTool] = useState(isPdata ? tool : lastTool)
  const [expList, setExpList] = useState([] as Learning[])

  const lang = params.lang as Locale
  lastRelatedTools = relatedTools
  lastTool = currentTool

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
      content: dict.header.Learning,
      id: 'learning',
      link: '#learning',
    },
    {
      content: dict.tools.Comments,
      id: 'comments',
      link: '#comments',
    },
    {
      content: dict.tools['Related Tools'],
      id: 'related-tools',
      link: '#related-tools',
    },
  ]

  const openImageViewer = (index: number) => {
    const imgs = tool.previewUrl.map((e) => ({ mainUrl: filterImage(e) }))
    new ImageViewer({
      images: imgs,
      currentSelected: index,
    })
  }

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

  const onChangeExpSort = (e: Sort) => {
    setExpSort(e)
  }

  const onChangeActive = (id: string) => {
    setActive(id)
  }

  const updateCommentsCount = (commentsCount: number) => {
    isPdata = false
    setCurrentTool((e) => ({
      ...e,
      commentsCount,
    }))
    lastTool = currentTool
  }

  const onVoteTool = async () => {
    try {
      const res = await postUserAction('tool', {
        actionModel: currentTool.isVoted ? 'CANCEL_ACTION' : 'ACTION',
        itemId: currentTool.id,
        type: 'VOTE',
      })
      if (res.code === 200) {
        if (!res.result) return
        isPdata = false
        setCurrentTool((e) => ({
          ...e,
          isVoted: !currentTool.isVoted,
          votesCount: Math.max(
            currentTool.votesCount + (currentTool.isVoted ? -1 : 1),
            0,
          ),
        }))
        lastTool = currentTool
      } else {
        await filterResp(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onCollectTool = async () => {
    try {
      const res = await postUserAction('tool', {
        actionModel: currentTool.isCollected ? 'CANCEL_ACTION' : 'ACTION',
        itemId: currentTool.id,
        type: 'COLLECT',
      })
      if (res.code === 200) {
        if (!res.result) return
        isPdata = false
        setCurrentTool((e) => ({
          ...e,
          isCollected: !currentTool.isCollected,
          collectsCount: Math.max(
            currentTool.collectsCount + (currentTool.isCollected ? -1 : 1),
            0,
          ),
        }))
        lastTool = currentTool
      } else {
        await filterResp(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onVoteRelatedTool = async (data: Tool) => {
    try {
      const res = await postUserAction('tool', {
        actionModel: data.isVoted ? 'CANCEL_ACTION' : 'ACTION',
        itemId: data.id,
        type: 'VOTE',
      })
      if (res.code === 200) {
        if (!res.result) return
        isPdata = false
        setRelatedTools((e) =>
          e.map((tool) =>
            tool.id === data.id
              ? {
                  ...tool,
                  isVoted: !tool.isVoted,
                  votesCount: Math.max(
                    tool.votesCount + (tool.isVoted ? -1 : 1),
                    0,
                  ),
                }
              : tool,
          ),
        )
        lastRelatedTools = relatedTools
      } else {
        await filterResp(res)
      }
    } catch (error) {
      console.log(error)
    }
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

  const reload = async () => {
    try {
      const res1 = await postGetTool(slugName)
      if (res1.code === 200) {
        if (res1.result) {
          const newTool = filterTool(res1.result)
          isPdata = false
          setCurrentTool(newTool)
          lastTool = newTool

          const res2 = await postGetTools({
            pageSize,
            domainNames: newTool.domains,
            taskNames: newTool.tasks,
          })
          if (res2.code === 200) {
            if (res2.result) {
              const list: [] = res2.result.rows || []
              const newList = list
                .map((e) => filterTool(e))
                .filter((e) => e.slugName !== newTool.slugName)
                .slice(0, pageSize - 1)
              isPdata = false
              setRelatedTools(newList)
              lastRelatedTools = newList
            }
          } else {
            await filterResp(res2)
          }
        }
      } else {
        await filterResp(res1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    init()
    if (!isPdata) {
      reload()
    }
    return () => {
      isPdata = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='xl:flex xl:space-x-10'>
      <div className='xl:w-2/3'>
        <div className='mb-2 flex flex-wrap md:mb-5'>
          <div className='flex flex-1'>
            <CusImage
              src={currentTool.logoUrl}
              alt={currentTool.name + ' ' + 'logo'}
              width={80}
              height={80}
              className='h-12 w-12 flex-shrink-0 rounded-full md:h-20 md:w-20'
            />
            <div className='h-1 w-1 md:w-3'></div>
            <div>
              <h1 className='text-base font-semibold md:mb-1 md:text-2xl md:leading-7'>
                {currentTool.name}
              </h1>
              <div className='mb-2 text-xs text-t2 md:mb-3 md:text-base'>
                {currentTool.companyName}
              </div>
              <CusTag list={currentTool.tasks} />
            </div>
          </div>
          <div className='h-1 w-1'></div>
          <div className='mt-2 flex w-full flex-shrink-0 flex-col items-end md:mt-0 md:w-auto'>
            <div className='mb-2 flex items-center md:mb-4'>
              <Button variant='secondary' size='icon' onClick={onClickShare}>
                <CusIcon name='share-2' className='w-3' />
              </Button>
              <Button
                variant='secondary'
                size='icon'
                className='mx-3 md:mx-5'
                delay={1000}
                onClick={onCollectTool}
              >
                {currentTool.isCollected ? (
                  <Star fill='#EEB244' strokeWidth={0} className='w-4' />
                ) : (
                  <Star className='w-4' />
                )}
              </Button>
              <Button
                variant={currentTool.isVoted ? 'primary' : 'secondary'}
                className='rounded font-normal'
                delay={1000}
                onClick={onVoteTool}
              >
                <Triangle
                  fill={currentTool.isVoted ? '#fff' : '#90979D'}
                  strokeWidth={0}
                  className='h-3 w-5'
                />
                <span className='md:translate-y-[1px]'>
                  &nbsp;{dict.tools.UPVOTE}&nbsp;
                  {filterNumber(currentTool.votesCount)}
                </span>
              </Button>
            </div>
            <div className='flex items-center text-xs leading-none text-t2'>
              <Star className='w-3 text-t3' />
              <span className='md:translate-y-[1px]'>
                &nbsp;{filterNumber(currentTool.collectsCount)}
              </span>
              <div className='h-1 w-2 md:w-3'></div>
              <CusIcon name='message-circle' className='w-3 text-t3' />
              <span className='md:translate-y-[1px]'>
                &nbsp;{filterNumber(currentTool.commentsCount)}
              </span>
              <div className='h-1 w-2 md:w-3'></div>
              <CusIcon name='lightbulb' className='w-3 text-t3' />
              <span className='md:translate-y-[1px]'>
                &nbsp;{filterNumber(currentTool.learnsCount)}
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
            {currentTool.profile}
          </div>
          <div className='flex flex-wrap space-x-3'>
            {currentTool.previewUrl.map((e, index) => (
              <CusImage
                key={index}
                src={e}
                alt={currentTool.name + "'s image" + (index + 1)}
                width={208}
                height={144}
                priority
                className='h-20 w-28 rounded md:h-36 md:w-52 md:rounded-xl'
                onClick={() => openImageViewer(index)}
              />
            ))}
          </div>
        </div>
        <AnchorDom id='application-cases' />
        <div className='pt-2 md:pb-2 md:pt-5'>
          <h3 className='mb-2 text-base font-semibold md:mb-5 md:text-xl'>
            {dict.tools['Application Cases']}
          </h3>
          <CusTag list={currentTool.domains} size='lg' />
        </div>
        <AnchorDom id='learning' />
        <div className='py-2 md:py-5'>
          <div className='mb-2 flex items-center justify-between md:mb-5'>
            <h3 className='text-base font-semibold md:text-xl'>
              {dict.header.Learning}
            </h3>
            <CusFilter
              active={expSort}
              dict={dict}
              onChangeSort={onChangeExpSort}
            />
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
        <AnchorDom id='comments' />
        <CusComments
          dict={dict}
          itemSlugName={slugName}
          itemType='TOOL'
          updateCommentsCount={updateCommentsCount}
        />
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
                onTabVote={onVoteRelatedTool}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
