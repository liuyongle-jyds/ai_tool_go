import Locale from '@/types/Locale'
import { getDictionary } from '../dictionaries'

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)

  return (
    <div className='select-text'>
      <h1 className='text-center text-3xl font-bold'>
        {dict.termsOfService.title}
      </h1>
      <br />
      <p className='whitespace-pre-wrap'>{dict.termsOfService.time}</p>
      <br />
      <h2 className='text-xl font-bold'>{dict.termsOfService.Welcome}</h2>
      <p className='whitespace-pre-wrap'>
        {dict.termsOfService['Welcome Tip']}
      </p>
      <br />
      <h3 className='text-xl font-bold'>{dict.termsOfService.t1}</h3>
      <p className='whitespace-pre-wrap'>{dict.termsOfService.c1}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.termsOfService.t2}</h3>
      <p className='whitespace-pre-wrap'>{dict.termsOfService.c2}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.termsOfService.t3}</h3>
      <p className='whitespace-pre-wrap'>{dict.termsOfService.c3}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.termsOfService.t4}</h3>
      <p className='whitespace-pre-wrap'>{dict.termsOfService.c4}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.termsOfService.t5}</h3>
      <p className='whitespace-pre-wrap'>{dict.termsOfService.c5}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.termsOfService.t6}</h3>
      <p className='whitespace-pre-wrap'>{dict.termsOfService.c6}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.termsOfService.t7}</h3>
      <p className='whitespace-pre-wrap'>{dict.termsOfService.c7}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.termsOfService.t8}</h3>
      <p className='whitespace-pre-wrap'>{dict.termsOfService.c8}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.termsOfService.t9}</h3>
      <p className='whitespace-pre-wrap'>{dict.termsOfService.c9}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.termsOfService.t10}</h3>
      <p className='whitespace-pre-wrap'>{dict.termsOfService.c10}</p>
      <br />
      <h3 className='text-xl font-bold'>{dict.termsOfService.t11}</h3>
      <p className='whitespace-pre-wrap'>{dict.termsOfService.c11}</p>
      <br />
    </div>
  )
}
