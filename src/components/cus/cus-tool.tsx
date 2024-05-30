import Tool from '@/types/Tool'
import CusIcon from './cus-icon'
import Dictionary from '@/types/Dictionary'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { Triangle } from 'lucide-react'
import CusRanking from './cus-ranking'
import Link from 'next/link'
import Locale from '@/types/Locale'
import { routerName } from '@/router'
import CusTag from './cus-tag'
import { cn } from '@/lib/utils'

interface Props {
  tool: Tool
  dict: Dictionary
  onTabVote: CallableFunction
  hideExpNum?: boolean
  lang: Locale
  tipLimit?: boolean
}

export default function CusTool({
  tool,
  dict,
  onTabVote,
  lang,
  hideExpNum = false,
  tipLimit = false,
}: Props) {
  return (
    <li className='relative rounded-xl border p-5'>
      <div className='mb-3 flex flex-1 items-center justify-between'>
        <Link
          href={`/${lang + routerName.tools}/all-domains/all-tasks/${tool.id}`}
          title={tool.name}
          className='flex-1'
        >
          <div className='flex items-center'>
            <div className='h-12 w-12 rounded-full bg-primary/75'></div>
            <div className='h-1 w-3'></div>
            <div className='flex flex-1 flex-col justify-center'>
              <div className='line-clamp-1 break-all text-xs'>
                {tool.creator}
              </div>
              <h4 className='line-clamp-1 break-all text-xl font-semibold'>
                {tool.name}
              </h4>
            </div>
          </div>
        </Link>
        <div className='h-1 w-1'></div>
        <div className='flex items-center'>
          <span className='font-medium'>{tool.vote}</span>
          <div className='h-1 w-2'></div>
          <Button
            variant={tool.voted ? 'primary' : 'secondary'}
            className='h-8 w-8 rounded-full p-0'
            onClick={() => onTabVote(tool.id)}
          >
            <Triangle
              fill={tool.voted ? '#fff' : '#90979D'}
              strokeWidth={0}
              className='h-3 w-4'
            />
          </Button>
        </div>
      </div>
      <div className='pl-[3.75rem]'>
        <div className='mb-3 line-clamp-2 whitespace-pre-wrap text-sm leading-4 text-t2'>
          {tool.desc}
        </div>
        <CusTag list={tool.tag} />
        <div className='flex items-center pt-2 text-xs font-medium leading-none'>
          {tool.collected ? (
            <CusIcon
              name='star'
              fill='#EEB244'
              strokeWidth={0}
              className='w-3 text-t3'
            />
          ) : (
            <CusIcon name='star' className='w-3 text-t3' />
          )}
          <span className='mx-1 translate-y-[1px] text-t3'>
            {dict.index.Collection}
          </span>
          <span className='translate-y-[1px]'>{tool.collection}</span>
          <div className='h-1 w-5'></div>
          <CusIcon name='message-circle' className='w-3 text-t3' />
          <span className='mx-1 translate-y-[1px] text-t3'>
            {dict.index.Comment}
          </span>
          <span className='translate-y-[1px]'>{tool.comment}</span>
          <div className='h-1 w-5'></div>
          <CusIcon name='share-2' className='w-3 text-t3' />
          <span className='mx-1 translate-y-[1px] text-t3'>
            {dict.index.Share}
          </span>
        </div>
      </div>
      <Separator className='my-5' />
      <div className='flex'>
        <CusIcon name='lightbulb' className='w-6' />
        <div className='h-1 w-3'></div>
        <div
          className={cn('flex-1 text-sm font-medium leading-4', {
            'line-clamp-2': tipLimit,
          })}
        >
          {tool.tip}
        </div>
      </div>
      {!hideExpNum && (
        <div className='mt-2 rounded bg-foreground py-1 text-center text-xs leading-4 text-t2'>
          {tool.experiences + ' ' + dict.index.experiences}
        </div>
      )}
      {!tipLimit && (
        <div className='absolute left-0 top-0 -translate-x-1/2'>
          <CusRanking rank={tool.ranking} />
        </div>
      )}
    </li>
  )
}
