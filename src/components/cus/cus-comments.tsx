import Dictionary from '@/types/Dictionary'
import CusFilter from './cus-filter'
import { useCallback, useEffect, useState } from 'react'
import CusComment from './cus-comment'
import CusCommentsInp from './cus-comments-inp'
import { Separator } from '../ui/separator'
import Comment from '@/types/Comment'
import { cn } from '@/lib/utils'
import { filterNumber } from '@/utils'
import { postGetComments } from '@/services'
import { filterResp } from '@/utils/actions'
import Sort from '@/types/Sort'
import ItemType from '@/types/ItemType'
import CusImage from './cus-image'
import { useApp } from '@/contexts/appContext'

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  dict: Dictionary
  itemId?: string
  itemSlugName?: string
  itemType: ItemType
  updateCommentsCount: CallableFunction
}

export default function CusComments({
  dict,
  className,
  itemId,
  itemSlugName,
  itemType,
  updateCommentsCount,
  ...props
}: Props) {
  const [commentSort, setCommentSort] = useState('DESC' as Sort)
  const [active, setActive] = useState('')
  const [list, setList] = useState([] as Comment[])
  const [total, setTotal] = useState(0)
  const { user } = useApp()
  const [loading, setLoading] = useState(false)

  const onChangeCommentSort = (e: Sort) => {
    if (e === active || loading) return
    setCommentSort(e)
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

  const getComments = async () => {
    if (loading) return
    setLoading(true)
    try {
      const res = await postGetComments({
        itemSlugName,
        itemId,
        sort: commentSort,
      })
      if (res.code === 200) {
        const listRes = res.result || []
        setList(listRes)
        setTotal(listRes.length)
        updateCommentsCount(listRes.length)
      } else {
        await filterResp(res)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentSort])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  return (
    <div
      {...props}
      className={cn('py-2 md:py-5', className, {
        loading: loading,
      })}
    >
      <div className='mb-2 flex items-center justify-between md:mb-5'>
        <h3 className='text-base font-semibold md:text-xl'>
          {dict.index.Comment}({filterNumber(total)})
        </h3>
        <CusFilter
          active={commentSort}
          dict={dict}
          onChangeSort={onChangeCommentSort}
        />
      </div>
      <div className='mb-2 flex md:mb-5'>
        <CusImage
          src={user.avatarUrl}
          alt='user head'
          width={32}
          height={32}
          placeholder='empty'
          className='h-6 w-6 rounded-full md:h-8 md:w-8'
        />
        <div className='h-1 w-1 md:w-3'></div>
        <CusCommentsInp
          placeholder={dict.tools['Add your comment here...']}
          itemId={itemId}
          itemType={itemType}
          itemSlugName={itemSlugName}
          onSendSucess={getComments}
        />
      </div>
      <ul
        className={cn('rounded-lg border p-2 md:rounded-xl md:p-5', {
          'border-0': total === 0,
        })}
      >
        {list.map((comment, index) => {
          const borderVisible = index + 1 !== list.length
          return (
            <li key={comment.id}>
              <CusComment
                active={active}
                comment={comment}
                dict={dict}
                setActive={setActive}
                commentUpdate={getComments}
              />
              {borderVisible && <Separator className='my-2 md:my-5' />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
