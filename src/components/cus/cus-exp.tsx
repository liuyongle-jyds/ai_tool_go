import Experience from '@/types/Experience'
import { Button } from '../ui/button'
import { Triangle } from 'lucide-react'
import CusRanking from './cus-ranking'
import { cn } from '@/lib/utils'
import CusIcon from './cus-icon'
import Locale from '@/types/Locale'
import { routerName } from '@/router'
import Link from 'next/link'
import CusTag from './cus-tag'

interface Props {
  exp: Experience
  onTabVote: CallableFunction
  isNotFull?: boolean
  lang: Locale
  hideRanking?: boolean
}

export default function CusExp({
  exp,
  onTabVote,
  lang,
  isNotFull = false,
  hideRanking = false,
}: Props) {
  return (
    <li
      key={exp.id}
      className='rounded-lg border border-dashed p-2 md:rounded-xl md:p-5'
    >
      <div className='mb-1 flex items-center justify-between md:mb-3'>
        <Link
          href={`/${lang + routerName.experience}/all-domains/all-tasks/${exp.id}`}
          title={exp.name}
          className='flex-1'
        >
          <div className='flex items-center'>
            {hideRanking ? (
              <div className='h-7 w-7 rounded-full bg-primary/75 md:h-10 md:w-10'></div>
            ) : (
              <CusRanking rank={exp.ranking} isExp />
            )}
            <div className='h-1 w-1 md:w-2'></div>
            <div className='flex-1'>
              <p className='line-clamp-1 break-all text-xs font-medium md:text-base'>
                {exp.creator}
              </p>
              <p className='line-clamp-1 break-all text-[0.625rem] text-t2 md:text-xs'>
                {exp.job}
              </p>
            </div>
          </div>
        </Link>
        <div className='h-1 w-1'></div>
        <div className='flex items-center'>
          <span className='text-xs font-medium md:text-base'>{exp.vote}</span>
          <div className='h-1 w-1 md:w-2'></div>
          <Button
            variant={exp.voted ? 'primary' : 'secondary'}
            className='rounded-full'
            size='icon'
            onClick={() => onTabVote(exp.id)}
          >
            <Triangle
              fill={exp.voted ? '#fff' : '#90979D'}
              strokeWidth={0}
              className='h-2 w-3 md:h-3 md:w-4'
            />
          </Button>
        </div>
      </div>
      <h4
        className={cn('line-clamp-2 whitespace-pre-wrap text-xs md:text-base', {
          'font-medium md:leading-5': isNotFull,
        })}
      >
        {exp.name}
      </h4>
      {!isNotFull && (
        <>
          <div className='h-3'></div>
          {/* <CusTag list={exp.tag} /> */}
          {/* <div className='h-2'></div> */}
          <div className='flex h-4 items-center justify-between text-xs leading-4 text-t2'>
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
                <CusIcon name='star' className='w-3' />
              )}
              <span className='translate-y-[1px]'>&nbsp;{exp.collection}</span>
              <div className='h-1 w-3'></div>
              <CusIcon name='message-circle' className='w-3' />
              <span className='translate-y-[1px]'>&nbsp;{exp.comment}</span>
            </div>
          </div>
        </>
      )}
    </li>
  )
}
