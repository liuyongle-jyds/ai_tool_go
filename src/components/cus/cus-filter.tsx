import LinkA from '@/types/LinkA'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import CusUl from './cus-ul'
import Dictionary from '@/types/Dictionary'

interface Props {
  active: string
  list?: LinkA[]
  dict: Dictionary
  onChangeSort: CallableFunction
}

export default function CusFilter({ active, onChangeSort, dict, list }: Props) {
  const current = list || [
    {
      text: dict.common.Asc,
      value: 'ASC',
    },
    {
      text: dict.common.Desc,
      value: 'DESC',
    },
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        needAngle
        className='h-6 rounded border px-1 text-xs md:h-10 md:px-5 md:text-sm'
      >
        <div className='flex items-center'>
          <div className='h-1 w-2'></div>
          <span>{current.find((e) => e.value === active)?.text ?? ''}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0 md:p-0'>
        <CusUl list={current} callbackFn={onChangeSort} active={active} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
