import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { useApp } from '@/contexts/appContext'
import Category from '@/types/Category'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Locale from '@/types/Locale'
import { routerName } from '@/router'
import TabSource from '@/types/TabSource'

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
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
  className,
  ...props
}: Props) {
  const { categories1, slugName1, setSlugName1, slugName2 } = useApp()
  const params = useParams()

  const lang = params.lang as Locale

  const onTabItem = (e: Category) => {
    if (!slugName1 || !slugName2) return
    onChangeActive?.(useSelfList ? e.id : e.slugName)
    if (useSelfList) return

    setSlugName1(e.slugName!)
  }

  const getArr = () => {
    return useSelfList ? list : categories1
  }

  const hideLinkOrNot = () => {
    if (!slugName1 || !slugName2 || source === routerName.home) return true
    return false
  }

  const liDom = (item: Category) => {
    const isActive = useSelfList
      ? active === item.id
      : slugName1 === item.slugName
    const li = (
      <li
        key={item.id}
        onClick={() => onTabItem(item)}
        className={cn(
          'relative flex h-full shrink-0 cursor-pointer items-center px-1 text-xs font-bold hover:opacity-85 md:px-5 md:text-base md:font-medium',
          {
            'text-primary': isActive,
          },
        )}
      >
        {item.content}
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
          title={item.content}
          className='h-full'
        >
          {li}
        </Link>
      )
    }
    if (useSelfList || hideLinkOrNot()) return li
    const path = `/${lang + source}/${item.slugName || 'all-domains'}/${slugName2}/page/1`
    return (
      <Link key={item.id} href={path} title={item.content} className='h-full'>
        {li}
      </Link>
    )
  }

  return (
    <div
      {...props}
      className={cn(
        'mb-2 flex min-h-10 w-full items-center justify-between border-b md:mb-5 md:min-h-14',
        className,
      )}
    >
      <ScrollArea className='flex-1 whitespace-nowrap'>
        <ul className='flex h-10 flex-1 items-center space-x-1 md:h-14 md:space-x-3'>
          {getArr().map((item) => liDom(item))}
        </ul>

        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      {children && <div className='pl-1 md:pl-2'>{children}</div>}
    </div>
  )
}
