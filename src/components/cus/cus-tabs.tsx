import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { useApp } from '@/contexts/appContext'
import Category from '@/types/Categories'

interface Props {
  children?: React.ReactNode
  onChangeActive: CallableFunction
  list?: Category[]
  active?: string
  isSelf?: boolean
}

export default function CusTabs({
  onChangeActive,
  children,
  list = [],
  active,
  isSelf = false,
}: Props) {
  const { categories1, active1, setActive1 } = useApp()

  const onTabItem = (id: string, index: number) => {
    if (isSelf) {
      if (id === active) return
      onChangeActive(id)
      return
    }
    if (active1 === index) return
    setActive1(index)
    onChangeActive(id)
  }

  const getArr = () => {
    return isSelf ? list : categories1
  }

  const getIsActive = (id: string, index: number) =>
    isSelf ? active === id : active1 === index

  return (
    <div className='mb-5 flex min-h-14 w-full items-center justify-between border-b'>
      <ScrollArea className='flex-1 whitespace-nowrap'>
        <ul className='flex h-14 flex-1 select-none items-center space-x-3'>
          {getArr().map((item, index) => (
            <li
              key={item.id}
              onClick={() => onTabItem(item.id, index)}
              className={cn(
                'relative flex h-full shrink-0 cursor-pointer items-center px-5 font-medium hover:opacity-85',
                {
                  'text-primary': getIsActive(item.id, index),
                },
              )}
            >
              {item.text}
              {getIsActive(item.id, index) && (
                <div className='absolute bottom-0 left-0 z-50 h-[2px] w-full bg-gradient-primary'></div>
              )}
            </li>
          ))}
        </ul>

        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      {children && <div className='pl-2'>{children}</div>}
    </div>
  )
}
