'use client'

import GymHeader from '@/features/gym/components/GymHeader/index.tsx'
import { useUserRole } from '@/hooks/queries/user.ts'
import LoadingSpinner from '@/static/imgs/mypage/playstyle/my-page-playstyle-spinner.svg'

export default function GymDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data, isSuccess } = useUserRole()

  if (!isSuccess) {
    return (
      <div className="flex flex-col h-screen">
        {/* 헤더 */}
        <GymHeader />
        <div className="grow flex justify-center items-center">
          <LoadingSpinner className="animate-spin" />
        </div>
      </div>
    )
  }

  if (data?.memberType !== 'GYM_ADMIN') {
    return (
      <div className="flex flex-col h-screen">
        {/* 헤더 */}
        <GymHeader />
        <div className="grow flex justify-center items-center">
          <p className="text-2xl font-bold">접근권한이 없습니다.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col h-screen">
      {/* 헤더 */}
      <GymHeader />
      <div className="grow">{children}</div>
    </div>
  )
}
