import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { useApp } from '@/contexts/appContext'

interface Props {
  onChangeActive: CallableFunction
}

export default function CusSubTabs({ onChangeActive }: Props) {
  const { categories2, active2, setActive2 } = useApp()

  const onTabItem = (id: string, index: number) => {
    if (active2 === index) return
    setActive2(index)
    onChangeActive(id)
  }

  return (
    <ScrollArea className='min-h-10 w-full whitespace-nowrap'>
      <ul className='flex h-10 select-none items-center space-x-4'>
        {categories2.map((item, index) => (
          <li
            key={item.id}
            onClick={() => onTabItem(item.id, index)}
            className={cn(
              'relative flex h-full shrink-0 cursor-pointer items-center rounded-lg bg-foreground px-3 hover:opacity-85',
              {
                'text-primary': active2 === index,
              },
            )}
          >
            {item.text}
          </li>
        ))}
      </ul>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}
