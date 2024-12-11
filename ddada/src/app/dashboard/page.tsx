'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchGymInfo } from '@/features/gym/api/GymAPI.ts'
import Callcenter from '@/features/gym/components/CallCenter/index.tsx'
import GymChart from '@/features/gym/components/GymChart/index.tsx'
import GymIncome from '@/features/gym/components/GymIncome/index.tsx'
import GymInfo from '@/features/gym/components/GymInfo/index.tsx'
import GymReservedList from '@/features/gym/components/GymReservedList/index.tsx'
import { GymProvider } from '@/features/gym/providers/index.tsx'
import LoadingSpinner from '@/static/imgs/mypage/playstyle/my-page-playstyle-spinner.svg'

export default function GymDashboardPage() {
  const { data: gymInfo, isSuccess: isGymInfoSuccess } = useQuery({
    queryKey: ['gyminfo'],
    queryFn: fetchGymInfo,
  })

  if (!isGymInfoSuccess) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoadingSpinner className="animate-spin" />
      </div>
    )
  }

  return (
    <GymProvider gymInfo={gymInfo}>
      <div className="flex flex-col bg-base-50">
        {/* 메인 이름 */}
        <GymInfo />
        <div className="flex gap-x-6 p-6">
          {/* Main */}
          <div className="flex flex-col gap-y-6 grow">
            <GymReservedList />
            <GymChart />
          </div>

          {/* sidebar */}
          <div className="flex flex-col gap-y-6">
            <GymIncome />
            <Callcenter />
          </div>
        </div>
      </div>
    </GymProvider>
  )
}
