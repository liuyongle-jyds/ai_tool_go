import { Heart } from 'lucide-react'
import CusIcon from './cus-icon'
import Dictionary from '@/types/Dictionary'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import CusCommentsInp from './cus-comments-inp'
import Comment from '@/types/Comment'

interface Prosp {
  comment: Comment
  isSingle?: boolean
  dict: Dictionary
  active: string
  setActive: Dispatch<SetStateAction<string>>
}

export default function CusComment({
  comment,
  dict,
  active,
  setActive,
  isSingle = false,
}: Prosp) {
  const onSendSuccess = () => {
    setActive('')
  }

  const onReadyReply = () => {
    if (comment.id === active) return
    setActive(comment.id)
  }

  return (
    <div className='flex'>
      <div className='h-6 w-6 rounded-full bg-primary/75 md:h-8 md:w-8'></div>
      <div className='h-1 w-1 md:w-2'></div>
      <div className='flex-1'>
        <div className='h-6 truncate break-all text-sm font-medium leading-6 md:h-8 md:text-base md:leading-8'>
          Enisaurus
        </div>
        <div className='mb-2 text-xs md:text-base'>{comment.content}</div>
        <div className='flex h-4 items-center justify-between text-xs leading-4 text-t2'>
          <span>{comment.time}</span>
          <div className='flex items-center'>
            <Button
              id={`cus-comment-btn-${comment.id}`}
              variant='plain'
              size='plain'
              className='text-xs text-t2'
              onClick={onReadyReply}
            >
              <CusIcon name='message-circle' className='h-3 w-3 text-t3' />
              &nbsp;
              <span className='translate-y-[1px]'>{dict.tools.Reply}</span>
            </Button>
            <div className='h-1 w-3 md:w-5'></div>
            {comment.liked ? (
              <Heart fill='#F43D3D' strokeWidth={0} className='h-3 w-3' />
            ) : (
              <Heart className='h-3 w-3 text-t3' />
            )}
            &nbsp;<span className='translate-y-[1px]'>{comment.like}</span>
          </div>
        </div>
        {active === comment.id && (
          <CusCommentsInp
            id={`cus-comment-inp-${comment.id}`}
            className='mt-2 md:mt-5'
            placeholder={dict.tools.Reply + '@' + 'sssa'}
            onSendSucess={onSendSuccess}
          />
        )}
        {comment.replies && (
          <ul>
            {comment.replies.map((subcomment) => (
              <li key={subcomment.id} className='pt-2 md:pt-5'>
                <CusComment
                  active={active}
                  setActive={setActive}
                  comment={subcomment}
                  dict={dict}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
