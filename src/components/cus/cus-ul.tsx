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
}

export default function CusUl({ list, callbackFn, isNav = false }: Props) {
  const style = cn(
    navigationMenuTriggerStyle(),
    '!block w-full truncate text-center font-normal',
  )

  const ItemDom = (children: React.ReactNode) => {
    if (isNav) {
      return <NavigationMenuItem asChild>{children}</NavigationMenuItem>
    }
    return <DropdownMenuItem asChild>{children}</DropdownMenuItem>
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
    <ul className='min-w-28 max-w-48'>
      {list.map((e, index) => (
        <li
          key={index}
          className='truncate break-all'
          onClick={debounce(() => callbackFn?.(e.value), 200, true)}
        >
          {e.link == undefined
            ? ItemDom(<div className={style}>{e.text}</div>)
            : ItemDom(LinkDom(e.text, e.link))}
        </li>
      ))}
    </ul>
  )
}
