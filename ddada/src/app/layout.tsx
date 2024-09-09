import type { Metadata } from 'next'

import localFont from 'next/font/local'

import { useUserRole } from '@/hooks/queries/user.ts'
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
  useUserRole()
  return (
    <html lang="kr" className={`${pretendard.variable} font-pretendard`}>
      <body>
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  )
}
