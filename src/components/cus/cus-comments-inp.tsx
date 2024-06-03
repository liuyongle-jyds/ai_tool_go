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
