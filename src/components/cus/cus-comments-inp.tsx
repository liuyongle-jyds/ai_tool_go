import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  placeholder: string
  onSendSucess: CallableFunction
}

export default function CusCommentsInp({
  placeholder,
  onSendSucess,
  className,
  ...props
}: Props) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const onSendComment = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSendSucess()
    }, 1000)
  }

  return (
    <div className={cn('relative flex-1', className)} {...props}>
      <Textarea
        name='comment'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className='w-full pr-20'
      />
      <Button
        className='absolute bottom-3 right-5 h-10 w-10 px-0'
        onClick={onSendComment}
        disabled={loading}
      >
        {loading ? (
          <LoaderCircle className='w-4 animate-spin' />
        ) : (
          <ArrowRight className='w-4' />
        )}
      </Button>
    </div>
  )
}
