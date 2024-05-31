'use client'

import Dictionary from '@/types/Dictionary'
import CusIcon from '../cus/cus-icon'
import { KeyboardEvent, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { debounce } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import Tool from '@/types/Tool'
import Experience from '@/types/Experience'
import Faq from '@/types/Faq'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import CusTool from '../cus/cus-tool'
import CusExp from '../cus/cus-exp'
import Locale from '@/types/Locale'
import { routerName } from '@/router'
import CusTabs from '../cus/cus-tabs'
import CusSubTabs from '../cus/cus-subTabs'
import { useParams } from 'next/navigation'
import { useApp } from '@/contexts/appContext'
import { LoaderCircle, ArrowRight, X, RefreshCcw } from 'lucide-react'
import { list3, list4 } from '@/data/test-list'

const list5: Faq[] = [
  {
    id: '1',
    title: 'What is email AIToolGo?',
    content:
      'AIToolGo is a direct marketing channel that uses email to send commercial messages about your business’s products, services, sales, or updates to your customers.',
  },
  {
    id: '2',
    title: 'What is email marketing software?',
    content:
      'AIToolGo is a direct marketing channel that uses email to send commercial messages about your business’s products, services, sales, or updates to your customers.',
  },
  {
    id: '3',
    title: 'What is email marketing software?',
    content:
      'AIToolGo is a direct marketing channel that uses email to send commercial messages about your business’s products, services, sales, or updates to your customers.',
  },
  {
    id: '4',
    title: 'Why is email marketing important?',
    content:
      'AIToolGo is a direct marketing channel that uses email to send commercial messages about your business’s products, services, sales, or updates to your customers.',
  },
]

interface Props {
  dict: Dictionary
}

export default function IndexChild({ dict }: Props) {
  const params = useParams()
  const { active1, active2 } = useApp()
  const [searchVal, setSearchVal] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toolRanking, setToolRanking] = useState([] as Tool[])
  const [expRanking, setExpRanking] = useState([] as Experience[])
  const [faqList, setFaqList] = useState([] as Faq[])
  const [searchTip, setSearchTip] = useState('')
  const [searchTools, setSearchTools] = useState([] as Tool[])
  const [searchExp, setSearchExp] = useState([] as Experience[])

  const lang = params.lang as Locale

  const onSearch = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSearchTip(
        'You seem to be looking for an AI customer service tool suitable for the e-commerce field and hoping to use it to improve the efficiency of customer service.\nI have found the following excellent tools and related experience sharing for you on the AiToolGo platform',
      )
      setSearchTools(list3.slice(0, 2))
      setSearchExp(list4.slice(0, 2))
    }, 1000)
  }

  const clearSearch = () => {
    setSearchVal('')
    setSearchExp([])
    setSearchTip('')
    setSearchTools([])
  }

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.shiftKey || e.nativeEvent.isComposing) return
    e.preventDefault()
    onSearch()
  }

  const onChangeActive1 = (id: string) => {
    console.log(id)
  }

  const onChangeActive2 = (id: string) => {
    console.log(id)
  }

  const rankingTitleDom = ({
    icon,
    title,
    href,
  }: {
    icon: string
    title: string
    href: string
  }) => {
    return (
      <div className='mb-2 flex items-center justify-between md:mb-5'>
        <div className='flex items-center'>
          <Image
            src={icon}
            alt='rank tool icon'
            width={32}
            height={32}
            className='w-6 md:w-8'
            priority
          />
          <div className='h-1 w-1 md:w-2'></div>
          <h3 className='text-base font-semibold md:text-2xl'>{title}</h3>
        </div>
        <Link
          href={href}
          title={title}
          className={cn(
            'flex cursor-pointer items-center text-sm text-t3 md:text-base',
            {
              'pointer-events-none': !active1 || !active2,
            },
          )}
        >
          <span className='text-sm font-medium md:text-base'>
            {dict.index['See All']}
          </span>
          <div className='h-1 w-1'></div>
          <CusIcon name='arrow-right' className='w-4' />
        </Link>
      </div>
    )
  }

  const onVoteTool = (id: string) => {
    setToolRanking((e) =>
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
    setExpRanking((e) =>
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
      setToolRanking(list3)
      setExpRanking(list4)
      setFaqList(list5)
    }, 500)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <h1 className='mb-2 whitespace-pre-wrap text-center text-xl font-semibold leading-tight md:mb-5 md:text-6xl'>
        {dict.index.title}
      </h1>
      <h2 className='mb-5 text-center text-xs text-t2 md:mb-10 md:text-xl'>
        {dict.index.subtitle}
      </h2>
      <div
        className={cn(
          'mb-4 flex h-10 items-center rounded-full border bg-background px-2 md:mb-10 md:h-14 md:px-5',
          { 'border-primary': isFocus },
        )}
      >
        <CusIcon name='search' className='w-4 text-t3 md:w-6' />
        <div className='h-1 w-1 md:w-3'></div>
        <input
          type='text'
          id='text'
          value={searchVal}
          disabled={loading}
          placeholder={dict.index.placeholder}
          className='h-full flex-1 bg-transparent text-xs placeholder-t3 outline-none md:text-base'
          enterKeyHint='search'
          onChange={(e) => setSearchVal(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onKeyDown={debounce(handleInputKeydown, 400, true)}
        />
        <div className='h-1 w-1 md:w-3'></div>
        <Button size='icon' onClick={onSearch} disabled={loading}>
          {loading ? (
            <LoaderCircle className='w-3 animate-spin md:w-4' />
          ) : (
            <ArrowRight className='w-3 md:w-4' />
          )}
        </Button>
      </div>
      {searchTip && (
        <div className='mb-2 border-b pb-10 md:mb-5'>
          <div className='mx-auto mb-2 max-w-5xl whitespace-pre-wrap rounded-lg rounded-tl-none bg-foreground p-2 text-sm md:mb-5 md:rounded-3xl md:p-5 md:text-base'>
            {searchTip}
          </div>
          <div className='mb-5 flex items-center justify-center md:mb-10'>
            <Button variant='secondary' size='icon' className='h-8 w-8'>
              <RefreshCcw className='w-3 md:w-4' />
            </Button>
            <div className='h-1 w-5'></div>
            <Button
              variant='secondary'
              onClick={clearSearch}
              size='icon'
              className='h-8 w-8'
            >
              <X className='w-3 md:w-4' />
            </Button>
          </div>
          <div className='grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-10'>
            <div>
              <div className='mb-2 flex items-center md:mb-5'>
                <Image
                  src='/icons/recommend@2x.png'
                  alt='recommend icon'
                  width={24}
                  height={24}
                  className='w-4 md:w-6'
                />
                <div className='h-1 w-1 md:w-2'></div>
                <h3 className='text-sm font-medium md:text-lg'>
                  {dict.index['Recommended tools']}
                </h3>
              </div>
              <ul className='space-y-2 md:space-y-3'>
                {searchTools.map((tool) => (
                  <li
                    key={tool.id}
                    className='rounded-lg border p-2 md:rounded-xl md:p-5'
                  >
                    <div className='mb-1 flex items-center justify-between md:mb-3'>
                      <div className='flex flex-1 items-center'>
                        <div className='h-5 w-5 rounded-full bg-primary/75 md:h-8 md:w-8'></div>
                        <div className='h-1 w-1 md:w-2'></div>
                        <h4 className='line-clamp-1 break-all text-sm font-medium md:text-base'>
                          {tool.name}
                        </h4>
                      </div>
                      <div className='h-1 w-1'></div>
                      <CusIcon
                        name='arrow-right'
                        className='w-3 text-t3 md:w-4'
                      />
                    </div>
                    <div className='line-clamp-3 whitespace-pre-wrap text-xs text-t2 md:text-sm'>
                      {tool.desc}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className='mb-2 flex items-center md:mb-5'>
                <Image
                  src='/icons/related@2x.png'
                  alt='related icon'
                  width={24}
                  height={24}
                  className='w-4 md:w-6'
                />
                <div className='h-1 w-1 md:w-2'></div>
                <h3 className='text-sm font-medium md:text-lg'>
                  {dict.index['Related experience']}
                </h3>
              </div>
              <ul className='space-y-2 md:space-y-3'>
                {searchExp.map((exp) => (
                  <li
                    key={exp.id}
                    className='rounded-lg border p-2 md:rounded-xl md:p-5'
                  >
                    <h4 className='mb-1 line-clamp-2 text-xs font-bold leading-4 md:mb-4 md:text-base md:font-medium md:leading-5'>
                      {exp.name}
                    </h4>
                    <p className='mb-[1px] line-clamp-1 break-all text-xs md:mb-1 md:text-sm'>
                      <span className='font-medium'>@ {exp.creator}</span>
                      <span>&nbsp;- {exp.job}</span>
                    </p>
                    <div className='line-clamp-2 whitespace-pre-wrap text-xs text-t2 md:text-sm'>
                      {exp.content}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <CusTabs onChangeActive={onChangeActive1} source={routerName.home} />
      <CusSubTabs onChangeActive={onChangeActive2} source={routerName.home} />
      <div className='h-5 md:h-10'></div>
      <div className='mb-5 grid grid-cols-1 gap-y-5 md:mb-10 md:grid-cols-2 md:gap-x-10'>
        <div>
          {rankingTitleDom({
            icon: '/icons/rank_tool@2x.png',
            title: dict.index['Tool Ranking'],
            href: `/${lang + routerName.tools}/${active1}/${active2}/page/1`,
          })}
          <ul className='space-y-2 pl-2 md:space-y-3 md:pl-4'>
            {toolRanking.map((tool) => (
              <CusTool
                key={tool.id}
                tool={tool}
                dict={dict}
                lang={lang}
                onTabVote={onVoteTool}
                hideExpNum
              />
            ))}
          </ul>
        </div>
        <div>
          {rankingTitleDom({
            icon: '/icons/rank_exp@2x.png',
            title: dict.index['Experience Ranking'],
            href: `/${lang + routerName.experience}/${active1}/${active2}/page/1`,
          })}
          <ul className='space-y-2 md:space-y-3'>
            {expRanking.map((exp) => (
              <CusExp
                key={exp.id}
                lang={lang}
                exp={exp}
                onTabVote={onVoteExp}
                isNotFull
              />
            ))}
          </ul>
        </div>
      </div>
      <div className='py-5 md:py-10'>
        <h3 className='mb-1 text-base font-semibold md:mb-5 md:text-xl'>
          {dict.index['AIToolGo’s FAQ']}
        </h3>
        <Accordion type='single' collapsible>
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-10'>
            {faqList.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>· {faq.title}</AccordionTrigger>
                <AccordionContent>{faq.content}</AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </Accordion>
      </div>
    </>
  )
}
