import Link from 'next/link'

import Logo from '@/static/imgs/logo.svg'

export default function AuthHeader() {
  return (
    <Link
      href="/"
      className="flex items-center justify-center border-b py-3 font-bold"
    >
      <Logo />
      <p className="text-2xl">DDADA 통합 로그인</p>
    </Link>
  )
}
