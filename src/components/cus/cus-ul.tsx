import Link from 'next/link'
import { navigationMenuTriggerStyle } from '../ui/navigation-menu'
import { cn } from '@/lib/utils'

interface Props {
  list: Array<{
    text: string
    link: string
    value?: string
  }>
  callbackFn?: CallableFunction
}

export default function CusUl({ list, callbackFn }: Props) {
  return (
    <ul className='min-w-28 max-w-48'>
      {list.map((e, index) => (
        <li
          key={index}
          className='truncate'
          onClick={() => callbackFn?.(e.value)}
        >
          <Link
            href={e.link}
            title={e.text}
            className={cn(
              navigationMenuTriggerStyle(),
              '!block w-full truncate font-normal',
            )}
          >
            {e.text}
          </Link>
        </li>
      ))}
    </ul>
  )
}
