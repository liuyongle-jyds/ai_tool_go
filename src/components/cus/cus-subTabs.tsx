import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { useApp } from '@/contexts/appContext'
import Locale from '@/types/Locale'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Category from '@/types/Category'
import { routerName } from '@/router'
import TabSource from '@/types/TabSource'

interface Props {
  onChangeActive?: CallableFunction
  source?: TabSource
}

export default function CusSubTabs({ onChangeActive, source }: Props) {
  const { categories2, slugName2, setSlugName2, slugName1 } = useApp()
  const params = useParams()

  const lang = params.lang as Locale

  const onTabItem = (slugName: string) => {
    if (!slugName1 || !slugName2) return
    setSlugName2(slugName)
    onChangeActive?.(slugName)
  }

  const getLink = (slugName?: string) =>
    `/${lang + source}/${slugName1}/${slugName || 'all-tasks'}/page/1`

  const hideLinkOrNot = () => {
    if (!slugName1 || !slugName2 || source === routerName.home) return true
    return false
  }

  const liInnerDom = (item: Category) => {
    const inner = (
      <div className='flex h-full items-center px-1 text-xs md:px-3 md:text-base'>
        {item.content}
      </div>
    )
    if (hideLinkOrNot()) {
      return inner
    }
    return (
      <Link
        title={item.content}
        href={getLink(item.slugName)}
        className='h-full'
      >
        {inner}
      </Link>
    )
  }

  return (
    <ScrollArea className='min-h-7 w-full whitespace-nowrap md:min-h-10'>
      <ul className='flex h-7 items-center space-x-2 md:h-10 md:space-x-4'>
        {categories2.map((item) => (
          <li
            key={item.id}
            onClick={() => onTabItem(item.slugName!)}
            className={cn(
              'relative h-full shrink-0 cursor-pointer rounded bg-foreground hover:opacity-85 md:rounded-lg',
              {
                'text-primary': slugName2 === item.slugName,
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
