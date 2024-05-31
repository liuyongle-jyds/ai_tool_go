interface Props {
  children?: React.ReactNode
}

export default function CusGridUl({ children }: Props) {
  return (
    <ul className='grid grid-cols-1 gap-y-2 md:min-h-96 md:grid-cols-2 md:gap-x-5'>
      {children}
    </ul>
  )
}
