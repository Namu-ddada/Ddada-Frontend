import type { Metadata } from 'next'

import localFont from 'next/font/local'
import { Toaster } from 'react-hot-toast'

import ReactQueryProviders from '@/providers/ReactQueryProvider.tsx'
import '@/app/globals.css'

const pretendard = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: 'DDADA - 배드민턴 경기 매치, 라켓 추천 플랫폼',
  description: 'DDADA는 배드민턴 경기 매치, 라켓 추천 플랫폼입니다.',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable} font-pretendard`}>
      <body>
        <ReactQueryProviders>
          <div>
            <div>{children}</div>
            <Toaster />
          </div>
          <div id="portal" />
        </ReactQueryProviders>
      </body>
    </html>
  )
}
