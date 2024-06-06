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
import { filterNumber } from '@/utils'
import CusImage from './cus-image'

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
    <li className='relative rounded-lg border p-2 md:rounded-xl md:p-5'>
      <div className='mb-1 flex flex-1 items-center justify-between md:mb-3'>
        <Link
          href={`/${lang + routerName.tools}/all-domains/all-tasks/${tool.slugName}`}
          title={tool.name}
          className='flex-1'
        >
          <div className='flex items-center'>
            <CusImage
              src={tool.logoUrl}
              alt={tool.name + ' ' + 'logo'}
              width={40}
              height={40}
              className='h-6 w-6 rounded-full md:h-12 md:w-12'
            />
            <div className='h-1 w-1 md:w-3'></div>
            <div className='flex flex-1 flex-col justify-center'>
              <div className='line-clamp-1 break-all text-[0.625rem] leading-3 md:text-xs md:leading-4'>
                {tool.companyName}
              </div>
              <h4 className='line-clamp-1 break-all text-xs font-semibold leading-4 md:text-xl md:leading-6'>
                {tool.name}
              </h4>
            </div>
          </div>
        </Link>
        <div className='h-1 w-1'></div>
        <div className='flex items-center'>
          <span className='text-xs font-medium md:text-base'>
            {filterNumber(tool.votesCount)}
          </span>
          <div className='h-1 w-1 md:w-2'></div>
          <Button
            variant={tool.isVoted ? 'primary' : 'secondary'}
            size='icon'
            className='rounded-full'
            delay={1000}
            onClick={() => onTabVote(tool)}
          >
            <Triangle
              fill={tool.isVoted ? '#fff' : '#90979D'}
              strokeWidth={0}
              className='h-2 w-3 md:h-3 md:w-4'
            />
          </Button>
        </div>
      </div>
      <div className='md:pl-[3.75rem]'>
        <div className='mb-2 line-clamp-2 whitespace-pre-wrap text-[0.625rem] leading-[0.875rem] text-t2 md:mb-3 md:text-sm md:leading-4'>
          {tool.profile}
        </div>
        <CusTag list={tool.tasks} />
        <div className='flex h-4 items-center pt-1 text-[0.625rem] font-medium leading-3 md:pt-2 md:text-xs md:leading-none'>
          {tool.isCollected ? (
            <CusIcon
              name='star'
              fill='#EEB244'
              strokeWidth={0}
              className='h-[0.625rem] w-[0.625rem] text-t3 md:h-3 md:w-3'
            />
          ) : (
            <CusIcon
              name='star'
              className='h-[0.625rem] w-[0.625rem] text-t3 md:h-3 md:w-3'
            />
          )}
          <span className='mx-[1px] text-t3 md:mx-1'>
            {dict.index.Collection}
          </span>
          <span>{filterNumber(tool.collectsCount)}</span>
          <div className='h-1 w-2 md:w-5'></div>
          <CusIcon
            name='message-circle'
            className='h-[0.625rem] w-[0.625rem] text-t3 md:h-3 md:w-3'
          />
          <span className='mx-[1px] text-t3 md:mx-1 '>
            {dict.index.Comment}
          </span>
          <span>{filterNumber(tool.commentsCount)}</span>
          <div className='h-1 w-2 md:w-5'></div>
          <CusIcon
            name='share-2'
            className='h-[0.625rem] w-[0.625rem] text-t3 md:h-3 md:w-3'
          />
          <span className='mx-[1px] text-t3 md:mx-1'>{dict.index.Share}</span>
        </div>
      </div>
      <Separator className='my-2 md:my-5' />
      <div className='flex'>
        <CusIcon name='lightbulb' className='w-3 md:w-6' />
        <div className='h-1 w-1 md:w-3'></div>
        <div
          className={cn(
            'flex-1 text-[0.625rem] font-medium leading-3 md:text-sm md:leading-4',
            {
              'line-clamp-2': tipLimit,
            },
          )}
        >
          122333333
        </div>
      </div>
      {!hideExpNum && (
        <div className='mt-2 rounded bg-foreground py-1 text-center text-xs leading-4 text-t2'>
          {tool.learnsCount + ' ' + dict.index.experiences}
        </div>
      )}
      {!tipLimit && !!tool.rank && (
        <div className='absolute left-0 top-0 -translate-x-1/2'>
          <CusRanking rank={tool.rank} />
        </div>
      )}
    </li>
  )
}
