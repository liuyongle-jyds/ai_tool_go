import { Locale } from '@/types/Locale'
import { getDictionary } from '../dictionaries'
import ProfileChild from '@/components/pages/profile-child'

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)

  return <ProfileChild dict={dict} />
}
