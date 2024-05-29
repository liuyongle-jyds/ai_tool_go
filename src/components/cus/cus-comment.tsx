import { Dictionary } from '@/types/Dictionary'
import CusFilter from './cus-filter'
import { useState } from 'react'

interface Props {
  dict: Dictionary
  total: string
}

export default function CusComment({ dict, total = '0' }: Props) {
  const [commentSort, setCommentSort] = useState('latest')

  const onChangeCommentSort = (e: string) => {
    setCommentSort(e)
  }

  return (
    <div className='py-5' id='comment'>
      <div className='mb-5 flex items-center justify-between'>
        <h3 className='text-xl font-semibold'>
          {dict.index.Comment}({total})
        </h3>
        <CusFilter active={commentSort} onChangeSort={onChangeCommentSort} />
      </div>
    </div>
  )
}
