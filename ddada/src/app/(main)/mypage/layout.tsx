'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { logOut } from '@/api/user/index.ts'
import { getProfile } from '@/features/mypage/api/mypage/index.ts'
import DeleteUserModal from '@/features/mypage/components/DeleteUserModal/index.tsx'
import RankTier from '@/features/mypage/components/RankTier/index.tsx'
import Logo from '@/static/imgs/logo.svg'
import FemaleIcon from '@/static/imgs/mypage/mypage-female-icon.svg'
import MaleIcon from '@/static/imgs/mypage/mypage-male-icon.svg'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [loginType, setLoginType] = useState<string | null>(null)
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentPath = pathname.split('/')[2]
  const [isAllowed, setIsAllowed] = useState(false)

  const { data, isSuccess } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: isAllowed,
  })
  useEffect(() => {
    setLoginType(sessionStorage.getItem('loginType'))
  }, [])
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken')

    if (!accessToken) {
      router.push('/')
    } else {
      setIsAllowed(true)
    }
  }, [router])
  if (!isAllowed) {
    return null
  }

  const handleOpenDeleteUserModal = () => {
    setDeleteUserModal(true)
  }
  const handleCloseDeleteUserModal = () => {
    setDeleteUserModal(false)
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

  if (isSuccess) {
    const { gender, nickname, profilePreSignedUrl } = data
    return (
      <>
        <div className="flex justify-center h-full">
          <div className="flex flex-col p-6 gap-4 text-disabled-dark font-bold w-[20.625rem]">
            <div className="flex flex-col py-6 gap-y-2 justify-center items-center">
              <div className="w-[5rem] h-[5rem] justify-center items-center rounded-full overflow-hidden relative">
                {profilePreSignedUrl ? (
                  <Image
                    src={profilePreSignedUrl}
                    alt="profile"
                    fill
                    priority
                  />
                ) : (
                  <Logo />
                )}
              </div>
              <div className="flex gap-1">
                <p className="text-sm font-medium	text-black">{nickname}</p>
                <div className="flex justify-center items-center">
                  {gender === 'MALE' ? <MaleIcon /> : <FemaleIcon />}
                </div>
              </div>
              <RankTier rating={data.rating} gameCount={data.gameCount} />
              <p className="text-xs font-medium">
                {data.winCount}승 {data.loseCount}패
              </p>
              {data.winCount + data.loseCount > 0 ? (
                <p className="text-xs font-medium">
                  승률{' '}
                  {(
                    (data.winCount / (data.winCount + data.loseCount)) *
                    100
                  ).toFixed(2)}
                  %
                </p>
              ) : (
                <p className="text-xs font-medium">승률 0%</p>
              )}
            </div>
            <div className="flex flex-col gap-3 flex-grow mb-[9.375rem] text-sm">
              <button
                type="button"
                onClick={() => router.push('/mypage/profile-edit')}
                className={`p-6 rounded-xl text-left
                ${currentPath === 'profile-edit' ? 'bg-theme-light text-theme' : 'hover:bg-base-50'}`}
              >
                내 프로필 수정
              </button>
              <button
                type="button"
                onClick={() => router.push('/mypage/password-change')}
                className={`p-6 rounded-xl text-left
                ${currentPath === 'password-change' ? 'bg-theme-light text-theme' : 'hover:bg-base-50'}`}
              >
                비밀번호 변경
              </button>
              <button
                type="button"
                onClick={() => router.push('/mypage/mymatch')}
                className={`p-6 rounded-xl text-left
                ${currentPath === 'mymatch' ? 'bg-theme-light text-theme' : 'hover:bg-base-50'}`}
              >
                나의 매치
              </button>
              <button
                type="button"
                onClick={() => router.push('/mypage/playstyle')}
                className={`p-6 rounded-xl text-left
                ${currentPath === 'playstyle' ? 'bg-theme-light text-theme' : 'hover:bg-base-50'}`}
              >
                플레이스타일 분석
              </button>
              <button
                type="button"
                onClick={() => router.push('/manager-recruit')}
                className="p-6 rounded-xl text-left mb-40 hover:bg-base-50"
              >
                매니저 신청
              </button>
            </div>
            <div className="p-6">
              <button type="button" onClick={handleLogout}>
                <p className="underline">로그아웃</p>
              </button>
            </div>
            <div className="p-6 text-danger">
              <button type="button" onClick={handleOpenDeleteUserModal}>
                회원탈퇴
              </button>
            </div>
          </div>
          <div className="p-6 w-[36.25rem]">{children}</div>
        </div>
        {deleteUserModal && (
          <DeleteUserModal
            closeModal={handleCloseDeleteUserModal}
            nickname={nickname}
          />
        )}
      </>
    )
  }
  return <div>Loading...</div>
}
