import Link from 'next/link'
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import { cn } from '@/lib/utils'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import LinkA from '@/types/LinkA'
import { debounce } from '@/utils'

interface Props {
  list: LinkA[]
  callbackFn?: CallableFunction
  isNav?: boolean
  active?: string
}

export default function CusUl({
  list,
  callbackFn,
  isNav = false,
  active = 'no-active',
}: Props) {
  const style = cn(
    navigationMenuTriggerStyle(),
    '!block w-full truncate text-center font-normal',
  )

  const ItemDom = (children: React.ReactNode, isActive: boolean) => {
    if (isNav) {
      return (
        <NavigationMenuItem
          asChild
          className={cn({
            'bg-primary/55': isActive,
          })}
        >
          {children}
        </NavigationMenuItem>
      )
    }
    return (
      <DropdownMenuItem
        asChild
        className={cn({ 'bg-foreground/55': isActive })}
      >
        {children}
      </DropdownMenuItem>
    )
  }

  const LinkDom = (text: string, href: string) => {
    if (isNav) {
      return (
        <NavigationMenuLink href={href} title={text} className={style}>
          {text}
        </NavigationMenuLink>
      )
    }
    return (
      <Link href={href} title={text} className={style}>
        {text}
      </Link>
    )
  }

  return (
    <ul className='min-w-20 max-w-28 md:min-w-28 md:max-w-48'>
      {list.map((e, index) => (
        <li
          key={index}
          className='truncate break-all'
          onClick={debounce(() => callbackFn?.(e.value), 200, true)}
        >
          {e.link == undefined
            ? ItemDom(<div className={style}>{e.text}</div>, e.value === active)
            : ItemDom(LinkDom(e.text, e.link), e.value === active)}
        </li>
      ))}
    </ul>
  )
}
