import type { Metadata } from 'next'

import localFont from 'next/font/local'
import { Toaster } from 'react-hot-toast'

import MainFooter from '@/components/MainFooter/index.tsx'
import MainHeader from '@/components/MainHeader/index.tsx'
import ReactQueryProviders from '@/providers/ReactQueryProvider.tsx'

import '@/app/globals.css'

const pretendard = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
          <div className="flex flex-col h-screen">
            <MainHeader />
            <div className="flex justify-center flex-1">{children}</div>
            <Toaster />
            <MainFooter />
          </div>
        </ReactQueryProviders>
      </body>
    </html>
  )
}
