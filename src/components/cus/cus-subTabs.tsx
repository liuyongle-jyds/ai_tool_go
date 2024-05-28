import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { useApp } from '@/contexts/appContext'
import { Locale } from '@/types/Locale'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Category from '@/types/Categories'
import { routerName } from '@/router'
import { TabSource } from '@/types/TabSource'

interface Props {
  onChangeActive?: CallableFunction
  source?: TabSource
}

export default function CusSubTabs({ onChangeActive, source }: Props) {
  const { categories2, active2, setActive2, active1 } = useApp()
  const params = useParams()

  const lang = params.lang as Locale

  const onTabItem = (id: string) => {
    if (!active1 || !active2) return
    setActive2(id)
    onChangeActive?.(id)
  }

  const getLink = (id: string) =>
    `/${lang + routerName.experience}/${active1}/${id}/page/1`

  const hideLinkOrNot = () => {
    if (!active1 || !active2 || source === routerName.home) return true
    return false
  }

  const liInnerDom = (item: Category) => {
    const inner = (
      <div className='flex h-full items-center px-3'>{item.text}</div>
    )
    if (hideLinkOrNot()) {
      return inner
    }
    return (
      <Link title={item.text} href={getLink(item.id)} className='h-full'>
        {inner}
      </Link>
    )
  }

  return (
    <ScrollArea className='min-h-10 w-full whitespace-nowrap'>
      <ul className='flex h-10 items-center space-x-4'>
        {categories2.map((item) => (
          <li
            key={item.id}
            onClick={() => onTabItem(item.id)}
            className={cn(
              'relative h-full shrink-0 cursor-pointer rounded-lg bg-foreground hover:opacity-85',
              {
                'text-primary': active2 === item.id,
              },
            )}
          >
            {liInnerDom(item)}
          </li>
        ))}
      </ul>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}
