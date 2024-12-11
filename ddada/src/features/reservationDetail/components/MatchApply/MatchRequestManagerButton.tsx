import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import {
  addJudgeToMatch,
  deleteJudgeToMatch,
} from '@/features/manager/api/managerAPI.tsx'
import { useMatchDetailContext } from '@/features/reservationDetail/providers/index.tsx'
import useInvalidateMatchReservations from '@/hooks/useInvalidateMatchReservations/index.tsx'

interface MatchRequestManagerButtonProps {
  isJoin: boolean
  matchId: number
}

export default function MatchRequestManagerButton({
  isJoin,
  matchId,
}: MatchRequestManagerButtonProps) {
  const queryClient = useQueryClient()
  const matchDetailData = useMatchDetailContext()
  const { invalidateMatchReservationList, invalidateReservationList } =
    useInvalidateMatchReservations()

  const managerLength = [matchDetailData.manager].filter(
    (player) => player !== null,
  ).length

  const handleMatchJudgeJoin = async () => {
    try {
      await addJudgeToMatch(matchId)
      queryClient.invalidateQueries({
        queryKey: ['matchDetail', `${matchId}`],
      })
      invalidateMatchReservationList()
      toast.success('매치 심판 신청에 성공했습니다.')
    } catch {
      toast.error('매치 심판 신청 중 오류가 발생했습니다.')
    }
  }

  const handleMatchJudgeCancel = async () => {
    try {
      await deleteJudgeToMatch(matchId)
      queryClient.invalidateQueries({
        queryKey: ['matchDetail', `${matchId}`],
      })
      invalidateReservationList()
      toast.success('매치 심판 취소에 성공했습니다.')
    } catch {
      toast.error('매치 심판 취소 중 오류가 발생했습니다.')
    }
  }

  if (
    matchDetailData.status === 'PLAYING' ||
    matchDetailData.status === 'FINISHED' ||
    matchDetailData.status === 'CANCELED'
  ) {
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
  if (isJoin) {
    return (
      <button
        type="button"
        className="border border-danger  rounded-[.25rem] py-2 px-1 box-border"
        onClick={() => handleMatchJudgeCancel()}
      >
        <span className="text-xs text-danger">매치 심판 취소하기</span>
      </button>
    )
  }
  if (managerLength === 1) {
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
    <button
      type="button"
      className="bg-theme rounded-[.25rem] py-2 px-1 box-border"
      onClick={() => handleMatchJudgeJoin()}
    >
      <span className="text-xs text-white">매치 심판 신청하기</span>
    </button>
  )
}
