import { cn } from '@/lib/utils'

interface Props {
  list: string[]
  size?: 'default' | 'lg'
}

export default function CusTag({ list, size = 'default' }: Props) {
  return (
    <ul
      className={cn('flex flex-wrap items-center space-x-1', {
        'space-x-3': size === 'lg',
      })}
    >
      {list.map((e, index) => (
        <li
          key={index}
          className={cn(
            'mb-1 h-6 rounded-full border bg-foreground px-3 text-xs leading-6 text-t2',
            {
              'mb-3 h-10 rounded-lg bg-transparent text-base leading-10':
                size === 'lg',
            },
          )}
        >
          {e}
        </li>
      ))}
    </ul>
  )
}
