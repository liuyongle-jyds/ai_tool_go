import LinkA from '@/types/LinkA'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import CusUl from './cus-ul'

interface Props {
  active: string
  onChangeSort: CallableFunction
}

export default function CusFilter({ active, onChangeSort }: Props) {
  const sortList: LinkA[] = [
    {
      text: 'Popular',
      value: 'popular',
    },
    {
      text: 'Latest',
      value: 'latest',
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        needAngle
        className='h-10 rounded border px-5'
      >
        <div className='flex items-center'>
          <div className='h-1 w-2'></div>
          <span>{sortList.find((e) => e.value === active)?.text ?? ''}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <CusUl list={sortList} callbackFn={onChangeSort} active={active} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
