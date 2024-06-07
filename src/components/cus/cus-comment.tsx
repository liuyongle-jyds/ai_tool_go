import { Heart, MessageCircle } from 'lucide-react'
import Dictionary from '@/types/Dictionary'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '../ui/button'
import CusCommentsInp from './cus-comments-inp'
import Comment from '@/types/Comment'
import { filterNumber, formatTime } from '@/utils'
import CusImage from './cus-image'

interface Prosp {
  comment: Comment
  isSingle?: boolean
  dict: Dictionary
  active: string
  setActive: Dispatch<SetStateAction<string>>
  commentUpdate: CallableFunction
}

export default function CusComment({
  comment,
  dict,
  active,
  setActive,
  commentUpdate,
  isSingle = false,
}: Prosp) {
  const onSendSuccess = () => {
    setActive('')
    commentUpdate()
  }

  const onReadyReply = () => {
    if (comment.id === active) return
    setActive(comment.id)
  }

  return (
    <div className='flex'>
      <CusImage
        src={comment.user.avatarUrl}
        alt={comment.user.nickname + ' head'}
        placeholder='empty'
        width={32}
        height={32}
        className='h-6 w-6 rounded-full md:h-8 md:w-8'
      />
      <div className='h-1 w-1 md:w-2'></div>
      <div className='flex-1'>
        <div className='h-6 truncate break-all text-sm font-medium leading-6 md:h-8 md:text-base md:leading-8'>
          {comment.user.nickname}
          {comment.toUser && ` @${comment.toUser.nickname}`}
        </div>
        <div className='mb-2 text-xs md:text-base'>{comment.content}</div>
        <div className='flex h-4 items-center justify-between text-xs leading-4 text-t2'>
          <span>{formatTime(+comment.createTime)}</span>
          <div className='flex items-center'>
            <Button
              id={`cus-comment-btn-${comment.id}`}
              variant='plain'
              size='plain'
              className='text-xs text-t2'
              onClick={onReadyReply}
            >
              <MessageCircle className='h-3 w-3 text-t3' />
              &nbsp;
              <span className='translate-y-[1px]'>{dict.tools.Reply}</span>
            </Button>
            <div className='h-1 w-3 md:w-5'></div>
            {comment.isLiked ? (
              <Heart fill='#F43D3D' strokeWidth={0} className='h-3 w-3' />
            ) : (
              <Heart className='h-3 w-3 text-t3' />
            )}
            &nbsp;
            <span className='translate-y-[1px]'>
              {filterNumber(+comment.likesCount)}
            </span>
          </div>
        </div>
        {active === comment.id && (
          <CusCommentsInp
            id={`cus-comment-inp-${comment.id}`}
            className='mt-2 md:mt-5'
            itemId={comment.itemId}
            itemType={comment.itemType}
            itemSlugName={comment.itemSlugName}
            replyId={comment.pId !== '0' ? comment.id : ''}
            placeholder={dict.tools.Reply + '@' + comment.user.nickname}
            pId={comment.pId === '0' ? comment.id : comment.pId}
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
                  commentUpdate={commentUpdate}
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
