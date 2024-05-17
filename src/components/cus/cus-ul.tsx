import Link from 'next/link'
import { cva } from 'class-variance-authority'
import { navigationMenuTriggerStyle } from '../ui/navigation-menu'
import { cn } from '@/lib/utils'

interface Props {
  list: Array<{
    text: string
    link: string
  }>
}

export default function CusUl({ list }: Props) {
  return (
    <ul className='max-w-40'>
      {list.map((e, index) => (
        <li key={index} className='truncate'>
          <Link
            href={e.link}
            title={e.text}
            className={cn(
              navigationMenuTriggerStyle(),
              '!block w-full truncate',
            )}
          >
            {e.text}
          </Link>
        </li>
      ))}
    </ul>
  )
}
