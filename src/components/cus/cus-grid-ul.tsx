interface Props {
  children?: React.ReactNode
}

export default function CusGridUl({ children }: Props) {
  return (
    <div className='min-h-36 md:min-h-96'>
      <ul className='grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-5'>
        {children}
      </ul>
    </div>
  )
}
