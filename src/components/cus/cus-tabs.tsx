import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { useApp } from '@/contexts/appContext'
import Category from '@/types/Categories'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Locale } from '@/types/Locale'
import { routerName } from '@/router'
import { TabSource } from '@/types/TabSource'

interface Props {
  children?: React.ReactNode
  onChangeActive?: CallableFunction
  list?: Category[]
  active?: string
  useSelfList?: boolean
  source?: TabSource
}

export default function CusTabs({
  onChangeActive,
  children,
  list = [],
  active,
  useSelfList = false,
  source,
}: Props) {
  const { categories1, active1, setActive1, active2 } = useApp()
  const params = useParams()

  const lang = params.lang as Locale

  const onTabItem = (id: string) => {
    if (!active1 || !active2) return

    onChangeActive?.(id)
    if (useSelfList) return

    setActive1(id)
  }

  const getArr = () => {
    return useSelfList ? list : categories1
  }

  const hideLinkOrNot = () => {
    if (!active1 || !active2 || source === routerName.home) return true
    return false
  }

  const liDom = (item: Category) => {
    const isActive = useSelfList ? active === item.id : active1 === item.id
    const li = (
      <li
        key={item.id}
        onClick={() => onTabItem(item.id)}
        className={cn(
          'relative flex h-full shrink-0 cursor-pointer items-center px-5 font-medium hover:opacity-85',
          {
            'text-primary': isActive,
          },
        )}
      >
        {item.text}
        {isActive && (
          <div className='absolute bottom-0 left-0 z-50 h-[2px] w-full bg-gradient-primary'></div>
        )}
      </li>
    )
    if (useSelfList && item.link) {
      return (
        <Link
          key={item.id}
          href={item.link}
          title={item.text}
          className='h-full'
        >
          {li}
        </Link>
      )
    }
    if (useSelfList || hideLinkOrNot()) return li
    const path = `/${lang + source}/${item.id}/${active2}/page/1`
    return (
      <Link key={item.id} href={path} title={item.text} className='h-full'>
        {li}
      </Link>
    )
  }

  return (
    <div className='mb-5 flex min-h-14 w-full items-center justify-between border-b'>
      <ScrollArea className='flex-1 whitespace-nowrap'>
        <ul className='flex h-14 flex-1 items-center space-x-3'>
          {getArr().map((item) => liDom(item))}
        </ul>

        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      {children && <div className='pl-2'>{children}</div>}
    </div>
  )
}
