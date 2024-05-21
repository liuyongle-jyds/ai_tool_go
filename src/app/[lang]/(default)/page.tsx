import { Locale } from '@/types/Locale'
import { getDictionary } from '../dictionaries'
import IndexChild from '@/components/pages/index-child'

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)

  return <IndexChild dict={dict} />
}
