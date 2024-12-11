'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { logOut } from '@/api/user/index.ts'

export default function ManagerHeader() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loginType, setLoginType] = useState<string | null>(null)
  const pathname = usePathname()
  const [currentPath, setCurrentPath] = useState<string>(pathname.split('/')[1])

  useEffect(() => {
    setCurrentPath(pathname.split('/')[1])
  }, [pathname])

  useEffect(() => {
    setAccessToken(sessionStorage.getItem('accessToken'))
    setLoginType(sessionStorage.getItem('loginType'))
  }, [])

  const handleLogout = async () => {
    if (loginType === 'kakao') {
      await logOut()
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}&logout_redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGOUT_REDIRECT_URI}`
    } else {
      await logOut()
      window.location.href = '/'
    }
  }
  return (
    <div className="border-b border-disabled px-4 flex gap-x-6 py-[0.625rem]">
      {/* logo */}
      <div className="flex gap-x-3 items-center">
        <p className="text-2xl">
          <span>DDADA</span> <span className="font-bold">for managers</span>
        </p>
      </div>

      {/* 가운데 링크들 */}
      <div className="flex gap-x-12 items-center justify-start text-[#6B6E78] grow">
        <Link href="/" className={`${currentPath === '' && 'text-[#FCA211]'}`}>
          홈
        </Link>
        <Link
          href="/match-reservation"
          className={`${currentPath === 'match-reservation' && 'text-[#FCA211]'}`}
        >
          매치 예약
        </Link>
      </div>

      {/* 오른쪽 */}
      <div className="flex gap-x-[0.625rem] items-center text-xs">
        {accessToken ? (
          <button
            type="button"
            className="text-disabled-dark underline py-3"
            onClick={() => handleLogout()}
          >
            로그아웃
          </button>
        ) : (
          <Link
            className="bg-[#6B6E78] rounded-[62.5rem] text-white py-3 px-6"
            href="/login"
          >
            로그인
          </Link>
        )}
      </div>
    </div>
  )
}
