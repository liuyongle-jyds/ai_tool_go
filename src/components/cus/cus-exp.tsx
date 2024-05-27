import Experience from '@/types/Experience'
import { Button } from '../ui/button'
import { Triangle } from 'lucide-react'
import CusRanking from './cus-ranking'
import { cn } from '@/lib/utils'
import CusIcon from './cus-icon'

interface Props {
  exp: Experience
  onTabVote: CallableFunction
  isNotFull?: boolean
}

export default function CusExp({ exp, onTabVote, isNotFull = false }: Props) {
  return (
    <li key={exp.id} className='rounded-xl border border-dashed p-5'>
      <div className='mb-3 flex items-center justify-between'>
        <div className='flex flex-1 items-center'>
          <CusRanking rank={exp.ranking} isExp />
          <div className='h-1 w-2'></div>
          <div className='h-10 w-10 rounded-full bg-primary/75'></div>
          <div className='h-1 w-3'></div>
          <div className='flex-1'>
            <p className='line-clamp-1 break-all font-medium'>{exp.creator}</p>
            <p className='line-clamp-1 break-all text-xs text-t2'>{exp.job}</p>
          </div>
        </div>
        <div className='h-1 w-1'></div>
        <div className='flex items-center'>
          <span className='font-medium'>{exp.vote}</span>
          <div className='h-1 w-2'></div>
          <Button
            variant={exp.voted ? 'primary' : 'secondary'}
            className='h-8 w-8 px-0'
            onClick={() => onTabVote(exp.id)}
          >
            <Triangle
              fill={exp.voted ? '#fff' : '#90979D'}
              strokeWidth={0}
              className='h-3 w-4'
            />
          </Button>
        </div>
      </div>
      <div
        className={cn('line-clamp-2 whitespace-pre-wrap', {
          'font-medium leading-5': isNotFull,
        })}
      >
        {exp.name}
      </div>
      {!isNotFull && (
        <>
          <ul className='mt-3 flex flex-wrap items-center space-x-1'>
            {exp.tag.map((e, index) => (
              <li
                key={index}
                className='mb-1 h-6 rounded-full border bg-foreground px-3 text-xs leading-6 text-t2'
              >
                {e}
              </li>
            ))}
          </ul>
          <div className='flex items-center justify-between pt-2 text-xs leading-none text-t2'>
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
