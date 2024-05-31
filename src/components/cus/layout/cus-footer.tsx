'use client'

import Dictionary from '@/types/Dictionary'
import CusLanguage from './cus-language'
import Link from 'next/link'
import Image from 'next/image'
import { useApp } from '@/contexts/appContext'

interface Props {
  dict: Dictionary
}

const mail1 = 'info@aitoolgo.com'
const mail2 = 'suggestion@aitoolgo.com'
const mail3 = 'partners@aitoolgo.com'

export default function CusFooter({ dict }: Props) {
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
    <footer className='pt-5 md:pt-10'>
      <div className='flex flex-wrap justify-between space-x-2 text-sm text-t2'>
        <div className='mb-4 md:mb-5 md:w-[25rem]'>
          <Image
            src='/images/logo@2x.png'
            alt='AIToolGo logo'
            width={96}
            height={18}
            className='w-16 md:w-24'
            priority
          />
          <div className='h-3 md:h-10'></div>
          <div className='whitespace-pre-wrap text-sm md:text-base md:leading-6'>
            {dict.footer.introduce}
          </div>
        </div>
        <div className='mb-4 md:mb-5'>
          <h2 className='text-base font-medium text-t1'>{dict.header.Tools}</h2>
          <div className='h-2 md:h-5'></div>
          <ul>
            {toolsList.map((e, index) => (
              <li key={index}>
                <Link
                  href={e.link!}
                  title={e.text}
                  className='flex h-7 items-center hover:opacity-85 md:h-10'
                >
                  {e.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='mb-4 md:mb-5'>
          <h2 className='text-base font-medium text-t1'>
            {dict.header.Experience}
          </h2>
          <div className='h-2 md:h-5'></div>
          <ul>
            {experienceList.map((e, index) => (
              <li key={index}>
                <Link
                  href={e.link!}
                  title={e.text}
                  className='flex h-7 items-center hover:opacity-85 md:h-10'
                >
                  {e.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='mb-4 md:mb-5'>
          <h2 className='text-base font-medium text-t1'>
            {dict.footer['Contact Us']}
          </h2>
          <ul>
            {mailList.map((e, index) => (
              <li key={index} className='mt-2'>
                <Link
                  href={e.link}
                  className='flex h-7 items-center hover:opacity-85 md:h-10'
                >
                  {e.text}
                  <span className='underline'>{e.mail}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='flex min-h-16 flex-wrap items-center justify-between'>
        <CusLanguage isGrey />
        <div className='flex h-full flex-wrap items-center text-xs leading-6 text-t3 md:leading-4'>
          <Link href=''>{dict.footer['Term of service']}</Link>
          <div className='h-1 w-5'></div>
          <Link href=''>{dict.footer['Privacy Agreement']}</Link>
          <div className='h-1 w-5 md:w-10'></div>
          <span>© 2024 AIToolGo.com, Inc. All rights reserved</span>
        </div>
      </div>
      <div className='h-5'></div>
    </footer>
  )
}
