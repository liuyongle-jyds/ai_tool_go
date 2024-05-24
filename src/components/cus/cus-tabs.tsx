import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

interface Props {
  children?: React.ReactNode
  list: {
    text: string
    id: string
  }[]
  active: string
  onChangeActive: CallableFunction
}

export default function CusTabs({
  list,
  active,
  onChangeActive,
  children,
}: Props) {
  return (
    <ScrollArea className='mb-5 min-h-14 w-full whitespace-nowrap'>
      <div className='flex items-center justify-between border-b'>
        <ul className='flex h-14 flex-1 select-none items-center space-x-3'>
          {list.map((item) => (
            <li
              key={item.id}
              onClick={() => onChangeActive(item.id)}
              className={cn(
                'relative flex h-full shrink-0 cursor-pointer items-center px-5 font-medium hover:opacity-85',
                {
                  'text-primary': active === item.id,
                },
              )}
            >
              {item.text}
              {active === item.id && (
                <div className='absolute bottom-0 left-0 z-50 h-[2px] w-full bg-gradient-primary'></div>
              )}
            </li>
          ))}
        </ul>
        {children}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}
