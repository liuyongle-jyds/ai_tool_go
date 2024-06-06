import Locale from '@/types/Locale'
import { getDictionary } from '../dictionaries'

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)

  return (
    <div className='select-text'>
      <h1 className='text-center text-3xl font-bold'>
        {dict.privacyPolicy.title}
      </h1>
      <br />
      <p className='whitespace-pre-wrap'>{dict.privacyPolicy.time}</p>
      <br />
      <h2 className='text-xl font-bold'>{dict.privacyPolicy.Welcome}</h2>
      <p className='whitespace-pre-wrap'>{dict.privacyPolicy['Welcome Tip']}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.privacyPolicy.t1}</h3>
      <p className='whitespace-pre-wrap'>{dict.privacyPolicy.c1}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.privacyPolicy.t2}</h3>
      <p className='whitespace-pre-wrap'>{dict.privacyPolicy.c2}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.privacyPolicy.t3}</h3>
      <p className='whitespace-pre-wrap'>{dict.privacyPolicy.c3}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.privacyPolicy.t4}</h3>
      <p className='whitespace-pre-wrap'>{dict.privacyPolicy.c4}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.privacyPolicy.t5}</h3>
      <p className='whitespace-pre-wrap'>{dict.privacyPolicy.c5}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.privacyPolicy.t6}</h3>
      <p className='whitespace-pre-wrap'>{dict.privacyPolicy.c6}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.privacyPolicy.t7}</h3>
      <p className='whitespace-pre-wrap'>{dict.privacyPolicy.c7}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.privacyPolicy.t8}</h3>
      <p className='whitespace-pre-wrap'>{dict.privacyPolicy.c8}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.privacyPolicy.t9}</h3>
      <p className='whitespace-pre-wrap'>{dict.privacyPolicy.c9}</p>
      <br />
    </div>
  )
}
