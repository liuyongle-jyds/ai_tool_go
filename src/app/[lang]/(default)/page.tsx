import { Locale } from '@/types/Locale'
import { getDictionary } from '../dictionaries'
import IndexChild from '@/components/pages/index-child'

export default async function Page({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return <IndexChild dict={dict} />
}
