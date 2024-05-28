'use client'

import { Dictionary } from '@/types/Dictionary'
import Tool from '@/types/Tool'
import CusTag from '../cus/cus-tag'
import { Button } from '../ui/button'
import CusIcon from '../cus/cus-icon'
import { Triangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import Category from '@/types/Categories'
import { useState } from 'react'
import CusTabs from '../cus/cus-tabs'

export default function ToolDetail({ dict }: { dict: Dictionary }) {
  const [active, setActive] = useState('tool-information')

  const tool: Tool = {
    id: '1',
    head: '',
    ranking: 1,
    name: 'ChatGPT',
    creator: 'OpenAI',
    voted: false,
    vote: '36.8m',
    collected: true,
    collection: '32.6m',
    comment: '1,253',
    desc: 'The OpenAI API can be applied to almost any task that requires understanding or generating natural language and code. The OpenAI API can also be used to generate and edit images or convert speech into text.',
    tag: ['AI', 'Chat', 'Text Description'],
    tip: '”The GPT (Generative Pre Training Transformer) model of OpenAI can understand natural language and code after training, and GPT provides text output in response to its input.”',
    experiences: '309',
  }

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

  const onChangeActive = (id: string) => {
    setActive(id)
  }

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
                className='h-10 w-10 rounded-full p-0'
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
        <div className='sticky left-0 top-0 w-full bg-background'>
          <CusTabs
            list={tabs}
            active={active}
            useSelfList
            onChangeActive={onChangeActive}
          />
        </div>
        <div className='py-5' id='tool-information'>
          <h3 className='mb-5 text-xl font-semibold'>
            {dict.tools['Tool Information']}
          </h3>
          <div className='mb-5 whitespace-pre-wrap rounded-xl rounded-tl-none bg-foreground p-5 text-sm leading-normal text-t2'>
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
        <div className='pb-2 pt-5' id='application-cases'>
          <h3 className='mb-5 text-xl font-semibold'>
            {dict.tools['Application Cases']}
          </h3>
          <CusTag list={tool.tag} size='lg' />
        </div>
        <div className='py-5' id='experience'>
          <h3 className='mb-5 text-xl font-semibold'>
            {dict.header.Experience}
          </h3>
        </div>
        <div className='py-5' id='comment'>
          <h3 className='mb-5 text-xl font-semibold'>{dict.index.Comment}</h3>
        </div>
      </div>
      <div className='flex-1'>
        <div className='py-5' id='related-tools'>
          <h3 className='mb-5 text-xl font-semibold'>
            {dict.tools['Related Tools']}
          </h3>
        </div>
      </div>
    </div>
  )
}
