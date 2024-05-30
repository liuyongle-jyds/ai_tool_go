import Dictionary from '@/types/Dictionary'
import CusFilter from './cus-filter'
import { useCallback, useEffect, useState } from 'react'
import CusComment from './cus-comment'
import CusCommentsInp from './cus-comments-inp'
import { Separator } from '../ui/separator'
import Comment from '@/types/Comment'

interface Props {
  dict: Dictionary
  total: string
}

export default function CusComments({ dict, total = '0' }: Props) {
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
    <div className='py-5' id='comment'>
      <div className='mb-5 flex items-center justify-between'>
        <h3 className='text-xl font-semibold'>
          {dict.index.Comment}({total})
        </h3>
        <CusFilter active={commentSort} onChangeSort={onChangeCommentSort} />
      </div>
      <div className='mb-5 flex'>
        <div className='h-8 w-8 rounded-full bg-primary/75'></div>
        <div className='h-1 w-3'></div>
        <CusCommentsInp
          placeholder={dict.tools['Add your comment here...']}
          onSendSucess={onSendSucess}
        />
      </div>
      <ul className='rounded-xl border p-5'>
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
              {borderVisible && <Separator className='my-5' />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
