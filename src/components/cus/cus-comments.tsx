import Dictionary from '@/types/Dictionary'
import CusFilter from './cus-filter'
import { useCallback, useEffect, useState } from 'react'
import CusComment from './cus-comment'
import CusCommentsInp from './cus-comments-inp'
import { Separator } from '../ui/separator'
import Comment from '@/types/Comment'
import { cn } from '@/lib/utils'

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  dict: Dictionary
  total: string
}

export default function CusComments({
  dict,
  total = '0',
  className,
  ...props
}: Props) {
  const [commentSort, setCommentSort] = useState('latest')
  const [active, setActive] = useState('')

  const list: Comment[] = [
    {
      id: '1',
      content:
        'The GPT (Generative Pre Training Transformer) model of OpenAI can understand natural language and code after training, and GPT provides text output in response to its input.',
      time: '2h',
      liked: true,
      like: '890',
      itemType: 'tools',
      itemId: '1',
      replies: [
        {
          id: '6',
          content:
            'Our founding team has worked on productions. In fact, my co-founder used to carry around zip-lock bags full of petty cash and receipts around, back when she was a PA on set :)',
          time: '2h',
          liked: false,
          like: '890',
          itemType: 'tools',
          itemId: '1',
        },
        {
          id: '7',
          content:
            'Our founding team has worked on productions. In fact, my co-founder used to carry around zip-lock bags full of petty cash and receipts around, back when she was a PA on set :)',
          time: '4h',
          liked: false,
          like: '890',
          itemType: 'tools',
          itemId: '1',
        },
      ],
    },
    {
      id: '2',
      content: 'Amazingly detailed illustration! I love that!',
      time: '9 months',
      liked: false,
      like: '80',
      itemType: 'tools',
      itemId: '1',
      replies: [],
    },
    {
      id: '3',
      content: 'Beautiful, love the texture!',
      time: 'almost 4 years',
      liked: false,
      like: '1,890',
      itemType: 'tools',
      itemId: '1',
      replies: [],
    },
  ]

  const onChangeCommentSort = (e: string) => {
    setCommentSort(e)
  }

  const onSendSucess = () => {
    console.log(111)
  }

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const currentInp = document.getElementById(`cus-comment-inp-${active}`)
      const currentBtn = document.getElementById(`cus-comment-btn-${active}`)
      if (
        currentInp &&
        !currentInp.contains(event.target as Node) &&
        !currentBtn?.contains(event.target as Node)
      ) {
        setActive('')
      }
    },
    [active],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  return (
    <div {...props} className={cn('py-2 md:py-5', className)}>
      <div className='mb-2 flex items-center justify-between md:mb-5'>
        <h3 className='text-base font-semibold md:text-xl'>
          {dict.index.Comment}({total})
        </h3>
        <CusFilter active={commentSort} onChangeSort={onChangeCommentSort} />
      </div>
      <div className='mb-2 flex md:mb-5'>
        <div className='h-6 w-6 rounded-full bg-primary/75 md:h-8 md:w-8'></div>
        <div className='h-1 w-1 md:w-3'></div>
        <CusCommentsInp
          placeholder={dict.tools['Add your comment here...']}
          onSendSucess={onSendSucess}
        />
      </div>
      <ul className='rounded-lg border p-2 md:rounded-xl md:p-5'>
        {list.map((comment, index) => {
          const borderVisible = index + 1 !== list.length
          return (
            <li key={comment.id}>
              <CusComment
                active={active}
                comment={comment}
                dict={dict}
                setActive={setActive}
              />
              {borderVisible && <Separator className='my-2 md:my-5' />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
