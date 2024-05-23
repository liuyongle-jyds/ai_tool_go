'use client'

import { Dictionary } from '@/types/Dictionary'
import { Locale } from '@/types/Locale'
import CusLanguage from './cus-language'
import Link from 'next/link'
import Image from 'next/image'
import { useApp } from '@/contexts/appContext'

interface Props {
  dict: Dictionary
  lang: Locale
}

const mail1 = 'info@aitoolgo.com'
const mail2 = 'suggestion@aitoolgo.com'
const mail3 = 'partners@aitoolgo.com'

export default function CusFooter({ dict, lang }: Props) {
  const { toolsList, experienceList } = useApp()

  const mailList = [
    {
      text: dict.footer['Learn More: '],
      mail: mail1,
      link: 'mailto:' + mail1,
    },
    {
      text: dict.footer['Suggestions: '],
      mail: mail2,
      link: 'mailto:' + mail2,
    },
    {
      text: dict.footer['Cooperation: '],
      mail: mail3,
      link: 'mailto:' + mail3,
    },
  ]

  return (
    <footer className='pt-10'>
      <div className='flex justify-between text-sm text-t2'>
        <div className='w-[25rem]'>
          <Image
            src='/images/logo@2x.png'
            alt='AIToolGo logo'
            width={96}
            height={18}
            className='w-24'
            priority
          />
          <div className='h-10'></div>
          <div className='whitespace-pre-wrap'>{dict.footer.introduce}</div>
        </div>
        <div className='h-1 w-2'></div>
        <div>
          <h2 className='text-base font-medium text-t1'>{dict.header.Tools}</h2>
          <div className='h-5'></div>
          <ul>
            {toolsList.map((e, index) => (
              <li key={index}>
                <Link
                  href={e.link}
                  title={e.text}
                  className='flex h-10 items-center hover:opacity-85'
                >
                  {e.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='h-1 w-2'></div>
        <div>
          <h2 className='text-base font-medium text-t1'>
            {dict.header.Experience}
          </h2>
          <div className='h-5'></div>
          <ul>
            {experienceList.map((e, index) => (
              <li key={index}>
                <Link
                  href={e.link}
                  title={e.text}
                  className='flex h-10 items-center hover:opacity-85'
                >
                  {e.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='h-1 w-2'></div>
        <div>
          <h2 className='text-base font-medium text-t1'>
            {dict.footer['Contact Us']}
          </h2>
          <ul>
            {mailList.map((e, index) => (
              <li key={index} className='mt-5'>
                <Link
                  href={e.link}
                  className='flex h-10 items-center hover:opacity-85'
                >
                  {e.text}
                  <span className='underline'>{e.mail}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className='h-5'></div>
        </div>
      </div>
      <div className='h-5'></div>
      <div className='flex h-16 items-center justify-between'>
        <CusLanguage lang={lang} isGrey />
        <div className='flex h-full items-center text-xs text-t3'>
          <Link href=''>{dict.footer['Term of service']}</Link>
          <div className='h-1 w-5'></div>
          <Link href=''>{dict.footer['Privacy Agreement']}</Link>
          <div className='h-1 w-10'></div>
          <span>© 2024 AIToolGo.com, Inc. All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}
