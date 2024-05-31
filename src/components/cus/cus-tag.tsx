import { cn } from '@/lib/utils'

interface Props {
  list: string[]
  size?: 'default' | 'medium' | 'lg'
}

export default function CusTag({ list, size = 'default' }: Props) {
  return (
    <ul
      className={cn('flex flex-wrap items-center space-x-[2px] md:space-x-1', {
        'space-x-1 md:space-x-2': size === 'medium',
        'space-x-2 md:space-x-3': size === 'lg',
      })}
    >
      {list.map((e, index) => (
        <li
          key={index}
          className={cn(
            'mb-[2px] flex h-4 items-center rounded-full border bg-foreground px-1 text-[0.625rem] leading-4 text-t2 md:mb-1 md:h-6 md:px-3 md:text-xs md:leading-6',
            {
              'mb-2 h-8 rounded bg-transparent text-sm leading-8':
                size === 'medium',
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
