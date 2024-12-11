import Link from 'next/link'

import Logo from '@/static/imgs/logo-responsive.svg'

export default function RacketRecommendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col">
      <Link
        href="/"
        className="h-20 flex items-center justify-center gap-y-2.5"
      >
        <Logo className="w-14" />
        <div>
          <p className=" font-bold text-xl">DDADA 라켓 추천</p>
        </div>
      </Link>
      {children}
    </div>
  )
}
