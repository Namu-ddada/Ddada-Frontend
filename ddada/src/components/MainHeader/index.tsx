'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { logOut } from '@/api/user/index.ts'
import { getProfile } from '@/features/mypage/api/mypage/index.ts'
import { useUserRole } from '@/hooks/queries/user.ts'
import Logo from '@/static/imgs/logo-responsive.svg'
import CalendarIcon from '@/static/imgs/main/CalendarIcon.svg'

export default function MainHeader() {
  const { data } = useUserRole()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const pathname = usePathname()
  const [currentPath, setCurrentPath] = useState<string>(pathname.split('/')[1])
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [loginType, setLoginType] = useState<string | null>(null)
  useEffect(() => {
    setLoginType(sessionStorage.getItem('loginType'))
  }, [])
  useEffect(() => {
    setCurrentPath(pathname.split('/')[1])
  }, [pathname])

  useEffect(() => {
    setAccessToken(sessionStorage.getItem('accessToken'))
  }, [])

  useEffect(() => {
    if (!accessToken) return
    const fetchProfileImage = async () => {
      try {
        const userData = await getProfileImage()
        setProfileImage(userData.profilePreSignedUrl)
      } catch (error) {
        console.error('프로필 이미지를 가져오는데 문제발생', error)
      }
    }
    fetchProfileImage()
  }, [accessToken])

  const getProfileImage = async () => {
    const userProfil = await getProfile()
    return userProfil
  }
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
    <div className="px-8 py-4 flex gap-x-3">
      {/* logo */}
      <Link href="/" className="flex gap-x-2 items-center">
        <Logo className="w-14" />
        <h1 className="text-xl font-bold">DDADA</h1>
      </Link>

      {/* 가운데 링크들 */}
      <div className="flex gap-x-12 items-center justify-center text-disabled-dark grow">
        <Link href="/" className={`${currentPath === '' && 'text-theme'}`}>
          홈
        </Link>
        <Link
          href="/match-reservation"
          className={`${currentPath === 'match-reservation' && 'text-theme'}`}
        >
          매치 예약
        </Link>
        <Link
          href="/court-reservation"
          className={`${currentPath === 'court-reservation' && 'text-theme'}`}
        >
          장소 예약
        </Link>
        <Link
          href="/racket"
          className={`${currentPath === '/racket' && 'text-theme'}`}
        >
          라켓 추천 • 검색
        </Link>

        {accessToken && data?.memberType === 'PLAYER' && (
          <>
            <Link
              href="/ranking"
              className={`${currentPath === 'ranking' && 'text-theme'}`}
            >
              랭킹
            </Link>
            <Link
              href="/mypage/profile-edit"
              className={`${currentPath === 'mypage' && 'text-theme'}`}
            >
              마이페이지
            </Link>
          </>
        )}
        {accessToken && data?.memberType === 'MANAGER' && (
          <Link
            href="/manager"
            className={`${currentPath === 'manager' && 'text-theme'}`}
          >
            매니저 페이지
          </Link>
        )}
        {accessToken && data?.memberType === 'GYM_ADMIN' && (
          <Link
            href="/dashboard"
            className={`${currentPath === 'dashboard' && 'text-theme'}`}
          >
            체육관 페이지
          </Link>
        )}
      </div>

      {/* 오른쪽 */}
      <div className="flex gap-x-4 items-center text-xs">
        {accessToken && data?.memberType === 'PLAYER' && (
          <Link
            className="border border-disabled-dark rounded-full py-3 px-6"
            href="/mypage/mymatch"
          >
            <p className="flex gap-x-3 items-center">
              <CalendarIcon />
              <span />내 일정 확인하기
            </p>
          </Link>
        )}

        {accessToken ? (
          <>
            {profileImage && (
              <Link href="/mypage/profile-edit">
                <div className="w-[3.125rem] h-[3.125rem] justify-center items-center rounded-full overflow-hidden relative">
                  <Image src={profileImage} alt="profile" fill priority />
                </div>
              </Link>
            )}
            {null}
          </>
        ) : (
          <Link
            className="bg-disabled-dark rounded-full text-white py-3 px-6"
            href="/login"
          >
            로그인
          </Link>
        )}
        {accessToken && (
          <button type="button" onClick={handleLogout}>
            <p className="text-disabled-dark underline">로그아웃</p>
          </button>
        )}
      </div>
    </div>
  )
}
