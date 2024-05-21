import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { memo } from 'react'

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}

function CusIconComponent({ name, ...props }: IconProps) {
  const LucideIcon = dynamic(dynamicIconImports[name])
  return <LucideIcon {...props} />
}

const CusIcon = memo(CusIconComponent)
export default CusIcon
