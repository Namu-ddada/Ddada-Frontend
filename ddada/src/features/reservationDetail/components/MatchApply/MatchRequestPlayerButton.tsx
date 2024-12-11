import { useQueryClient } from '@tanstack/react-query'
import Script from 'next/script'
import { toast } from 'react-hot-toast'

import { getProfile } from '@/features/mypage/api/mypage/index.ts'
import { addUserToMatch } from '@/features/reservationDetail/api/matchDetailAPI.tsx'
import { useMatchDetailContext } from '@/features/reservationDetail/providers/index.tsx'
import { checkGenderMatchJoin } from '@/features/reservationDetail/utils/index.ts'
import useInvalidateMatchReservations from '@/hooks/useInvalidateMatchReservations/index.tsx'
import { UserRole } from '@/types/user/index.ts'

interface MatchRequestButtonProps {
  matchId: number
  clickedTeam: number
  isJoin: boolean
  userRole: UserRole | null
  handleModalOpen: () => void
}

export default function MatchRequestButton({
  clickedTeam,
  matchId,
  isJoin,
  userRole,
  handleModalOpen,
}: MatchRequestButtonProps) {
  const queryClient = useQueryClient()
  const matchDetailData = useMatchDetailContext()
  const { invalidateMatchReservationList } = useInvalidateMatchReservations()
  const teamALength = [
    matchDetailData.team1.player1,
    matchDetailData.team1.player2,
  ].filter((player) => player !== null).length
  const teamBLength = [
    matchDetailData.team2.player1,
    matchDetailData.team2.player2,
  ].filter((player) => player !== null).length

  const handleMatchJoin = async () => {
    if (clickedTeam === -1) {
      return
    }
    // if (isJoinTeamA || isJoinTeamB) {
    //   return
    // }

    try {
      const playerGender = await queryClient.ensureQueryData({
        queryKey: ['profile'],
        queryFn: getProfile,
      })

      checkGenderMatchJoin(matchDetailData, clickedTeam, playerGender.gender)
      await requestPayment()
      await addUserToMatch(matchId, clickedTeam)
      queryClient.invalidateQueries({
        queryKey: ['matchDetail', `${matchId}`],
      })
      toast.success('매치 예약에 성공했습니다.')

      invalidateMatchReservationList()
    } catch (error) {
      const err = error as Error
      switch (err.message) {
        case 'gender':
          toast.error('매치타입을 확인해주세요')
          break
        case 'miss gender':
          toast.error('참여하는 팀의 성별을 확인해주세요')
          break
        case 'pay':
          toast.error('결제에 실패했습니다.')
          break

        case 'time':
          toast.error('같은 시간대 예약한 매치가 있습니다.')
          break

        default:
          toast.error('매치 예약 중 오류가 발생했습니다.')
      }
    }
  }

  async function requestPayment() {
    const response = await window.PortOne.requestPayment({
      storeId: process.env.NEXT_PUBLIC_STORE_ID,
      channelKey: process.env.NEXT_PUBLIC_CHANNEL_KEY,
      paymentId: `payment-${crypto.randomUUID()}`,
      orderName: `${matchDetailData.court.name} ${matchDetailData.date} ${matchDetailData.time} 참가`,
      totalAmount: 5500,
      currency: 'CURRENCY_KRW',
      payMethod: 'EASY_PAY',
      issueName: 'ddada',
    })

    if (response.code != null) {
      throw Error('pay')
    }
  }

  if (
    matchDetailData.status === 'PLAYING' ||
    matchDetailData.status === 'FINISHED' ||
    matchDetailData.status === 'CANCELED' ||
    userRole === undefined ||
    userRole === null
  ) {
    return (
      <button
        type="button"
        className="border border-disabled  rounded-[.25rem] py-2 px-1 box-border bg-base-50"
        disabled
      >
        <span className="text-xs text-disabled-dark">신청 불가</span>
      </button>
    )
  }

  if (isJoin) {
    return (
      <button
        type="button"
        className="border border-danger  rounded-[.25rem] py-2 px-1 box-border"
        onClick={() => handleModalOpen()}
      >
        <span className="text-xs text-danger">예약 취소하기</span>
      </button>
    )
  }
  if (teamALength + teamBLength === 4) {
    return (
      <button
        type="button"
        className="border border-disabled  rounded-[.25rem] py-2 px-1 box-border bg-base-50"
        disabled
      >
        <span className="text-xs text-disabled-dark">신청 마감</span>
      </button>
    )
  }

  return (
    <>
      <Script src="https://cdn.portone.io/v2/browser-sdk.js" />
      <button
        type="button"
        className="bg-theme rounded-[.25rem] py-2 px-1 box-border"
        onClick={() => handleMatchJoin()}
      >
        <span className="text-xs text-white">매치 신청하기</span>
      </button>
    </>
  )
}
