import Link from 'next/link'

import MAIN_LOGO from '@/static/imgs/logo.svg'

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <p className="text-xl font-bold">404, 찾을 수 없는 페이지입니다.</p>
      <MAIN_LOGO />
      <Link href="/">
        <div className="text-sm rounded-xl text-[#FCA211] p-3 border border-[#FCA211] hover:bg-[#FCA211] hover:text-[#FFFBEA] transition-colors duration-300 ease-in-out">
          메인 페이지로 돌아가기
        </div>
      </Link>
    </div>
  )
}
