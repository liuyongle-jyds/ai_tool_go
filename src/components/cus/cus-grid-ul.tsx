interface Props {
  children?: React.ReactNode
}

export default function CusGridUl({ children }: Props) {
  return (
    <ul className='grid min-h-96 grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-5'>
      {children}
    </ul>
  )
}
