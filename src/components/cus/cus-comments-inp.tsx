import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { postAddComment } from '@/services'
import ItemType from '@/types/ItemType'
import { filterResp } from '@/utils/actions'

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  placeholder: string
  onSendSucess: CallableFunction
  itemType: ItemType
  itemId?: string
  replyId?: string
  pId?: string
  itemSlugName?: string
}

export default function CusCommentsInp({
  placeholder,
  onSendSucess,
  className,
  itemType,
  itemId,
  replyId,
  pId,
  itemSlugName,
  ...props
}: Props) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const onSendComment = async () => {
    if (!content.trim()) return
    if (loading) return
    setLoading(true)
    try {
      const res = await postAddComment(itemType, content, {
        itemId,
        replyId,
        pId,
        itemSlugName,
      })
      if (res.code === 200) {
        setContent('')
        onSendSucess()
      } else {
        await filterResp(res)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div {...props} className={cn('relative flex-1', className)}>
      <Textarea
        name='comment'
        value={content}
        maxLength={400}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className='w-full pr-10 md:pr-20'
      />
      <Button
        className='absolute bottom-2 right-2 md:bottom-3 md:right-2 '
        onClick={onSendComment}
        size='icon'
        disabled={loading}
      >
        {loading ? (
          <LoaderCircle className='w-3 animate-spin md:w-4' />
        ) : (
          <ArrowRight className='w-3 md:w-4' />
        )}
      </Button>
    </div>
  )
}
