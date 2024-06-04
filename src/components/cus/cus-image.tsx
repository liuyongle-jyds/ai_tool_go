import React, { useEffect, useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'
import Config from '@/config'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

type Proportion = '1:1' | '4:3'

const loadingBgs: { [k in Proportion]: string } = {
  '1:1': '/images/loading-bg.png',
  '4:3': '/images/loading-bg-4-3.png',
}

interface Props extends ImageProps {
  proportion?: Proportion
}

export default function CusImage({ proportion = '1:1', ...props }: Props) {
  const [url, setUrl] = useState('')

  const loadingBg = loadingBgs[proportion]
  const errorBg = loadingBg

  const filterImage = (src: string) => {
    if (!src) return loadingBg
    if (src === errorBg || src.startsWith('http') || src.startsWith('file:')) {
      return src
    }
    return Config.oss + src
  }

  useEffect(() => {
    if (props.src) {
      setUrl(props.src as string)
    }
  }, [props.src])

  return (
    <Image
      {...props}
      className={cn('object-cover', props.className)}
      src={filterImage(url as string)}
      alt={props.alt}
      placeholder='blur'
      blurDataURL={loadingBg}
      onError={() => setUrl(errorBg)}
    />
  )
}
