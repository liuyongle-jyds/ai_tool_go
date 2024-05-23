import Image from 'next/image'

interface Props {
  rank: number
  isExp?: boolean
}

export default function CusRanking({ rank, isExp = false }: Props) {
  if (rank > 3) {
    return (
      <div className='flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-t2'>
        {rank}
      </div>
    )
  }
  const icon = `/icons/rank${rank}.png`
  return (
    <Image
      src={icon}
      alt={`ranking ${rank}`}
      width={isExp ? 24 : 32}
      height={isExp ? 24 : 32}
      className={isExp ? 'h-6 w-6' : 'h-8 w-8'}
    />
  )
}
