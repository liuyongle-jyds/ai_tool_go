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
  setCurrentInp: Dispatch<SetStateAction<HTMLDivElement | null>>
}

export default function CusComment({
  comment,
  dict,
  active,
  setActive,
  setCurrentInp,
  isSingle = false,
}: Prosp) {
  const inputRef = useRef<HTMLDivElement>(null)

  const onSendSuccess = () => {
    setActive('')
  }

  const onReadyReply = () => {
    if (comment.id === active) return
    setActive(comment.id)
  }

  return (
    <div className='flex'>
      <div className='h-8 w-8 rounded-full bg-primary/75'></div>
      <div className='h-1 w-2'></div>
      <div className='flex-1'>
        <div className='h-8 truncate break-all font-medium leading-8'>
          Enisaurus
        </div>
        <div className='mb-2'>{comment.content}</div>
        <div className='flex h-4 items-center justify-between text-xs leading-4 text-t2'>
          <span>{comment.time}</span>
          <div className='flex items-center'>
            <Button
              variant='plain'
              size='plain'
              className='text-xs text-t2'
              onClick={onReadyReply}
            >
              <CusIcon name='message-circle' className='h-3 w-3 text-t3' />
              &nbsp;
              <span className='translate-y-[1px]'>{dict.tools.Reply}</span>
            </Button>
            <div className='h-1 w-5'></div>
            {comment.liked ? (
              <Heart fill='#F43D3D' strokeWidth={0} className='h-3 w-3' />
            ) : (
              <Heart className='h-3 w-3 text-t3' />
            )}
            &nbsp;<span className='translate-y-[1px]'>{comment.like}</span>
          </div>
        </div>
        {active === comment.id && (
          <div ref={inputRef}>
            <CusCommentsInp
              className='mt-5'
              placeholder={dict.tools.Reply + '@' + 'sssa'}
              onSendSucess={onSendSuccess}
            />
          </div>
        )}
        {comment.replies && (
          <ul>
            {comment.replies.map((subcomment) => (
              <li key={subcomment.id} className='pt-5'>
                <CusComment
                  active={active}
                  setCurrentInp={setCurrentInp}
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
