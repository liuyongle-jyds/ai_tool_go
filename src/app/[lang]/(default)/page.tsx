import { Locale } from '@/types/Locale'
import { getDictionary } from '../dictionaries'

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)

  return <div>{dict.meta.title}</div>
}
