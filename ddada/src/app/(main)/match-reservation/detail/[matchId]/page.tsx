'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import MatchCourtInfo from '@/components/MatchCourtInfo/index.tsx'
import MatchRule from '@/components/MatchRule/index.tsx'
import { fetchMatchDetail } from '@/features/reservationDetail/api/matchDetailAPI.tsx'
import MatchApply from '@/features/reservationDetail/components/MatchApply/index.tsx'
import MatchPlayerInfo from '@/features/reservationDetail/components/MatchPlayerInfo/index.tsx'
import MatchShortInfo from '@/features/reservationDetail/components/MatchShortInfo/index.tsx'
import RefundPolicyInfo from '@/features/reservationDetail/components/RefundPolicyInfo/index.tsx'
import { MatchReservationDetailProvider } from '@/features/reservationDetail/providers/index.tsx'
import { useUserRole } from '@/hooks/queries/user.ts'
import LoadingSpinner from '@/static/imgs/mypage/playstyle/my-page-playstyle-spinner.svg'

export default function MatchReservationDetailPage({
  params,
}: {
  params: { matchId: string }
}) {
  const router = useRouter()
  const { matchId } = params
  const { data: userRole, isSuccess: isUserRole } = useUserRole()
  const { data, isSuccess } = useQuery({
    queryKey: ['matchDetail', matchId],
    queryFn: () => fetchMatchDetail(matchId),
    enabled: !!matchId,
  })

  useEffect(() => {
    if (userRole?.memberType === 'GYM_ADMIN') {
      router.push('/match-reservation')
    }
  }, [isUserRole, router, userRole?.memberType])

  if (!isSuccess || !isUserRole || userRole?.memberType === 'GYM_ADMIN') {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner className="animate-spin" />
      </div>
    )
  }

  return (
    <MatchReservationDetailProvider matchDetailData={data}>
      <div className=" max-w-[46rem] flex flex-col">
        <div className="h-[12.5rem] overflow-hidden object-cover relative">
          <Image
            src={data.court.image}
            alt="court Image"
            style={{ objectFit: 'cover' }}
            fill
            priority
          />
        </div>
        <div className="flex gap-x-1">
          <div className="flex flex-col gap-y-3 flex-1">
            <MatchPlayerInfo />
            <MatchShortInfo />
            <MatchCourtInfo>
              <MatchCourtInfo.TitleWithUnderline />
              <MatchCourtInfo.Amenities />
              <MatchCourtInfo.Number />
              <MatchCourtInfo.Website />
              <MatchCourtInfo.Detail />
            </MatchCourtInfo>
            <MatchRule>
              <MatchRule.TitleWithUnderline />
              <MatchRule.TossRule />
              <MatchRule.ScoreRule />
              <MatchRule.DoubleRule />
              <MatchRule.InvalidityRule />
              <MatchRule.FaultRule />
            </MatchRule>
            <RefundPolicyInfo />
          </div>
          <div className="flex-1">
            <MatchApply />
          </div>
        </div>
      </div>
    </MatchReservationDetailProvider>
  )
}
