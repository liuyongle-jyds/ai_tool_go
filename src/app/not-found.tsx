import { Inter } from 'next/font/google'
import NotFoundChild from '@/components/pages/not-found-child'

const inter = Inter({ subsets: ['latin'] })

export default function NotFound() {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NotFoundChild />
      </body>
    </html>
  )
}
