'use client'

import { Dictionary } from '@/types/Dictionary'
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
import { Locale } from '@/types/Locale'
import { routerName } from '@/router'
import CusTabs from '../cus/cus-tabs'
import CusSubTabs from '../cus/cus-subTabs'

const list3: Tool[] = [
  {
    id: '1',
    head: '',
    ranking: 1,
    name: 'ChatGPT',
    creator: 'OpenAI',
    voted: true,
    vote: '36.8m',
    collected: true,
    collection: '32.6m',
    comment: '1,253',
    desc: 'The OpenAI API can be applied to almost any task that requires understanding or generating natural language and code. The OpenAI API can also be used to generate and edit images or convert speech into text.',
    tag: ['AI', 'Chat', 'Text Description'],
    tip: '”The GPT (Generative Pre Training Transformer) model of OpenAI can understand natural language and code after training, and GPT provides text output in response to its input.”',
    experiences: '309',
  },
  {
    id: '2',
    head: '',
    ranking: 2,
    name: 'Google Gemini',
    creator: 'Google',
    voted: false,
    vote: '36.8m',
    collected: false,
    collection: '32.6m',
    comment: '1,253',
    desc: 'This is a comprehensive customer service automation tool that integrates multiple functions such as intelligent customer service, work order management, and customer profiling, which can comprehensively improve the work efficiency of customer service teams',
    tag: ['AI', 'Chat', 'Text Description'],
    tip: "”Gemma's two variant models: one for intelligent coding and the other for improving processing efficiency”",
    experiences: '309',
  },
  {
    id: '3',
    head: '',
    ranking: 3,
    name: 'Stable Diffusion',
    creator: 'Stability AI',
    voted: false,
    vote: '36.8m',
    collected: false,
    collection: '32.6m',
    comment: '1,253',
    desc: 'The Stable Diffusion open API allows developers to quickly obtain high-quality images generated by this powerful image generation model by simply providing a textual description.',
    tag: ['AI', 'Chat', 'Text Description'],
    tip: "”Gemma's two variant models: one for intelligent coding and the other for improving processing efficiency”",
    experiences: '309',
  },
  {
    id: '4',
    head: '',
    ranking: 4,
    name: 'Classical Chinese with One Heart',
    creator: 'Qianfan Big Model Platform',
    voted: false,
    vote: '36.8m',
    collected: false,
    collection: '32.6m',
    comment: '1,253',
    desc: 'The Baidu AI Cloud Qianfan platform provides a wealth of APIs, including API capabilities such as chat dialogue, continuation Completions, vector embeddings, plug-in applications, Prompt engineering, model services, management, tuning, and data management.',
    tag: ['AI', 'Chat', 'Text Description'],
    tip: "”Gemma's two variant models: one for intelligent coding and the other for improving processing efficiency”",
    experiences: '2,989',
  },
]

const list4: Experience[] = [
  {
    id: '1',
    ranking: 1,
    name: '”The GPT (Generative Pre Training Transformer) model of OpenAI can understand natural language and code after training, and GPT provides text output in response to its input.”',
    content:
      'Shared his practical experience and insights on significantly improving customer service efficiency after introducing Chatbot',
    creator: 'Jane',
    voted: false,
    vote: '36.8m',
    job: 'Senior E-commerce Operations Manager',
    time: 'May 11th',
    tag: ['好', 'cdg'],
    collected: false,
    collection: '233',
    comment: '1,233',
  },
  {
    id: '2',
    ranking: 2,
    name: "”Gemma's two variant models: one for intelligent coding and the other for improving processing efficiency”",
    content:
      'Shared his practical experience and insights on significantly improving customer service efficiency after introducing Chatbot',
    creator: 'Jane',
    voted: true,
    vote: '36.8m',
    job: 'E-commerce Manager',
    time: 'May 11th',
    tag: ['abc', 'cdg'],
    collected: true,
    collection: '233',
    comment: '1,233',
  },
  {
    id: '3',
    ranking: 3,
    name: "”Gemma's two variant models: one for intelligent coding and the other for improving processing efficiency”",
    content:
      'Shared his practical experience and insights on significantly improving customer service efficiency after introducing Chatbot',
    creator: 'Jane',
    voted: false,
    vote: '36.8m',
    job: 'E-commerce Manager',
    time: 'May 11th',
    tag: ['abc', 'cdg'],
    collected: false,
    collection: '233',
    comment: '1,233',
  },
  {
    id: '4',
    ranking: 4,
    name: "”Gemma's two variant models: one for intelligent coding and the other for improving processing efficiency”",
    content:
      'Shared his practical experience and insights on significantly improving customer service efficiency after introducing Chatbot',
    creator: 'Jane',
    voted: false,
    vote: '36.8m',
    job: 'E-commerce Manager',
    time: 'May 11th',
    tag: ['abc', 'cdg'],
    collected: false,
    collection: '233',
    comment: '1,233',
  },
  {
    id: '5',
    ranking: 5,
    name: "”Gemma's two variant models: one for intelligent coding and the other for improving processing efficiency”",
    content:
      'Shared his practical experience and insights on significantly improving customer service efficiency after introducing Chatbot',
    creator: 'Jane',
    voted: false,
    vote: '36.8m',
    job: 'E-commerce Manager',
    time: 'May 11th',
    tag: ['abc', 'cdg'],
    collected: false,
    collection: '233',
    comment: '1,233',
  },
  {
    id: '6',
    ranking: 6,
    name: "”Gemma's two variant models: one for intelligent coding and the other for improving processing efficiency”",
    content:
      'Shared his practical experience and insights on significantly improving customer service efficiency after introducing Chatbot',
    creator: 'Jane',
    voted: false,
    vote: '36.8m',
    job: 'E-commerce Manager',
    time: 'May 11th',
    tag: ['abc', 'cdg'],
    collected: false,
    collection: '233',
    comment: '1,233',
  },
  {
    id: '7',
    ranking: 7,
    name: "”Gemma's two variant models: one for intelligent coding and the other for improving processing efficiency”",
    content:
      'Shared his practical experience and insights on significantly improving customer service efficiency after introducing Chatbot',
    creator: 'Jane',
    voted: false,
    vote: '36.8m',
    job: 'E-commerce Manager',
    time: 'May 11th',
    tag: ['abc', 'cdg'],
    collected: false,
    collection: '233',
    comment: '1,233',
  },
  {
    id: '8',
    ranking: 8,
    name: "”Gemma's two variant models: one for intelligent coding and the other for improving processing efficiency”",
    content:
      'Shared his practical experience and insights on significantly improving customer service efficiency after introducing Chatbot',
    creator: 'Jane',
    voted: false,
    vote: '36.8m',
    job: 'E-commerce Manager',
    time: 'May 11th',
    tag: ['abc', 'cdg'],
    collected: false,
    collection: '233',
    comment: '1,233',
  },
]

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
  lang: Locale
}

export default function IndexChild({ dict, lang }: Props) {
  const [searchVal, setSearchVal] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toolRanking, setToolRanking] = useState([] as Tool[])
  const [expRanking, setExpRanking] = useState([] as Experience[])
  const [faqList, setFaqList] = useState([] as Faq[])
  const [searchTip, setSearchTip] = useState('')
  const [searchTools, setSearchTools] = useState([] as Tool[])
  const [searchExp, setSearchExp] = useState([] as Experience[])

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
      <div className='mb-5 flex items-center justify-between'>
        <div className='flex items-center'>
          <Image
            src={icon}
            alt='rank tool icon'
            width={32}
            height={32}
            className='h-8 w-8'
            priority
          />
          <div className='h-1 w-2'></div>
          <h3 className='text-2xl font-semibold'>{title}</h3>
        </div>
        <Link
          href={href}
          title={title}
          className='flex cursor-pointer items-center text-t3'
        >
          <span className='font-medium'>{dict.index['See All']}</span>
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
      <h1 className='mb-5 whitespace-pre-wrap text-center text-6xl font-semibold leading-tight'>
        {dict.index.title}
      </h1>
      <h2 className='mb-10 text-center text-t2'>{dict.index.subtitle}</h2>
      <div
        className={cn(
          'mb-10 flex h-14 items-center rounded-full border bg-background px-5',
          { 'border-primary': isFocus },
        )}
      >
        <CusIcon name='search' className='w-6 text-t3' />
        <div className='h-1 w-3'></div>
        <input
          type='text'
          id='text'
          value={searchVal}
          disabled={loading}
          placeholder={dict.index.placeholder}
          className='h-full flex-1 bg-transparent placeholder-t3 outline-none'
          enterKeyHint='search'
          onChange={(e) => setSearchVal(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onKeyDown={debounce(handleInputKeydown, 400, true)}
        />
        <div className='h-1 w-3'></div>
        <Button
          className='h-10 w-10 px-0'
          onClick={onSearch}
          disabled={loading}
        >
          <CusIcon
            name={loading ? 'loader-circle' : 'arrow-right'}
            className={cn('w-4', {
              'animate-spin': loading,
            })}
          />
        </Button>
      </div>
      {searchTip && (
        <div className='mb-5 rounded-xl border-b pb-10'>
          <div className='mx-auto mb-5 max-w-5xl rounded-3xl rounded-tl-none bg-foreground p-5'>
            {searchTip}
          </div>
          <div className='mb-10 flex items-center justify-center'>
            <Button variant='secondary' className='h-10 w-10 px-0'>
              <CusIcon name='refresh-ccw' className='w-4' />
            </Button>
            <div className='h-1 w-5'></div>
            <Button
              variant='secondary'
              className='h-10 w-10 px-0'
              onClick={clearSearch}
            >
              <CusIcon name='x' className='w-4 text-t3' />
            </Button>
          </div>
          <div className='grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-10'>
            <div>
              <div className='mb-5 flex items-center'>
                <Image
                  src='/icons/recommend@2x.png'
                  alt='recommend icon'
                  width={24}
                  height={24}
                  className='h-6 w-6'
                />
                <div className='h-1 w-2'></div>
                <h3 className='text-lg font-medium'>
                  {dict.index['Recommended tools']}
                </h3>
              </div>
              <ul className='space-y-3'>
                {searchTools.map((tool) => (
                  <li key={tool.id} className='rounded-xl border p-5'>
                    <div className='mb-3 flex items-center justify-between'>
                      <div className='flex flex-1 items-center'>
                        <div className='h-8 w-8 rounded-full bg-primary/75'></div>
                        <div className='h-1 w-2'></div>
                        <h4 className='line-clamp-1 break-all font-medium'>
                          {tool.name}
                        </h4>
                      </div>
                      <div className='h-1 w-1'></div>
                      <CusIcon name='arrow-right' className='w-4 text-t3' />
                    </div>
                    <div className='line-clamp-3 whitespace-pre-wrap text-sm text-t2'>
                      {tool.desc}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className='mb-5 flex items-center'>
                <Image
                  src='/icons/related@2x.png'
                  alt='related icon'
                  width={24}
                  height={24}
                  className='h-6 w-6'
                />
                <div className='h-1 w-2'></div>
                <h3 className='text-lg font-medium'>
                  {dict.index['Related experience']}
                </h3>
              </div>
              <ul className='space-y-3'>
                {searchExp.map((exp) => (
                  <li key={exp.id} className='rounded-xl border p-5'>
                    <h4 className='mb-3 line-clamp-2 font-medium leading-5'>
                      {exp.name}
                    </h4>
                    <p className='mb-1 line-clamp-1 break-all text-sm'>
                      <span className='font-medium'>@ {exp.creator}</span>
                      <span>&nbsp;- {exp.job}</span>
                    </p>
                    <div className='line-clamp-2 whitespace-pre-wrap text-sm text-t2'>
                      {exp.content}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <CusTabs onChangeActive={onChangeActive1} />
      <CusSubTabs onChangeActive={onChangeActive2} />
      <div className='h-10'></div>
      <div className='mb-10 grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-10'>
        <div>
          {rankingTitleDom({
            icon: '/icons/rank_tool@2x.png',
            title: dict.index['Tool Ranking'],
            href: `/${lang + routerName.tools}`,
          })}
          <ul className='space-y-3 pl-4'>
            {toolRanking.map((tool) => (
              <CusTool
                key={tool.id}
                tool={tool}
                dict={dict}
                onTabVote={onVoteTool}
                isNotFull
              />
            ))}
          </ul>
        </div>
        <div>
          {rankingTitleDom({
            icon: '/icons/rank_exp@2x.png',
            title: dict.index['Experience Ranking'],
            href: `/${lang + routerName.experience}`,
          })}
          <ul className='space-y-3'>
            {expRanking.map((exp, index) => (
              <CusExp key={exp.id} exp={exp} onTabVote={onVoteExp} isNotFull />
            ))}
          </ul>
        </div>
      </div>
      <div className='py-10'>
        <h3 className='mb-5 text-xl font-semibold'>
          {dict.index['AIToolGo’s FAQ']}
        </h3>
        <Accordion type='single' collapsible>
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-10'>
            {faqList.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.title}</AccordionTrigger>
                <AccordionContent>{faq.content}</AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </Accordion>
      </div>
    </>
  )
}
