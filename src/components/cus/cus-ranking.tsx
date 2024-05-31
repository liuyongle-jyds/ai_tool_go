import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props {
  rank: number
  isExp?: boolean
}

export default function CusRanking({ rank, isExp = false }: Props) {
  if (rank > 3) {
    return (
      <div
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-t2 md:h-6 md:w-6',
          {
            'h-5 w-5 md:h-8 md:w-8': !isExp,
          },
        )}
      >
        {rank}
      </div>
    )
  }
  const icon = `/icons/rank${rank}@2x.png`
  return (
    <Image
      src={icon}
      alt={`ranking ${rank}`}
      width={isExp ? 24 : 32}
      height={isExp ? 24 : 32}
      className={isExp ? 'h-5 w-5 md:h-6 md:w-6' : 'h-5 w-5 md:h-8 md:w-8'}
    />
  )
}
