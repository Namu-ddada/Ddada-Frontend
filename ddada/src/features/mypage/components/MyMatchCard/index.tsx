'use client'

import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { toast } from 'react-hot-toast'

import MatchTypeTag from '@/components/MatchTypeTag/index.tsx'
import MatchStatusTag from '@/features/mypage/components/MatchStatusTag/index.tsx'
import { MyMatchDetailsType } from '@/features/mypage/types/MyMatchType.ts'
import { deleteUserToMatch } from '@/features/reservationDetail/api/matchDetailAPI.tsx'
import MatchCancelModal from '@/features/reservationDetail/components/MatchCancelModal/index.tsx'
import useInvalidateMatchReservations from '@/hooks/useInvalidateMatchReservations/index.tsx'
import useModal from '@/hooks/useModal/index.tsx'

interface MyMatchCardProps {
  match: MyMatchDetailsType
}

export default function MyMatchCard({ match }: MyMatchCardProps) {
  dayjs.locale('ko')
  const queryClient = useQueryClient()
  const { isModalOpen, portalElement, handleModalOpen, handleModalClose } =
    useModal()
  const { invalidateReservationList } = useInvalidateMatchReservations()
  const [team] = match.MyTeamAndNumber.split(' ')
  const dayOfWeek = dayjs(match.matchDate).format('dd')

  const [ratingChangeColor, setRatingChangeColor] = useState<string>('')
  useEffect(() => {
    if (match.myRatingChange && match.myRatingChange < 0) {
      setRatingChangeColor('DEFEAT')
    } else if (match.myRatingChange && match.myRatingChange > 0) {
      setRatingChangeColor('VICTORY')
    }
  }, [match.myRatingChange])

  const handleMatchCancel = async () => {
    try {
      let playerTeam = 1
      if (team === 'B팀') {
        playerTeam = 2
      }
      await deleteUserToMatch(match.matchId, playerTeam)

      queryClient.invalidateQueries({
        queryKey: ['matchDetail', `${match.matchId}`],
      })
      invalidateReservationList()

      toast.success('매치가 취소되었습니다.')
    } catch {
      console.error('매치 취소 실패')
    }
  }
  return (
    <>
      {isModalOpen && portalElement
        ? createPortal(
            <MatchCancelModal
              handleModalClose={handleModalClose}
              handleMatchCancel={handleMatchCancel}
            />,
            portalElement,
          )
        : null}
      <div
        className={`bg-base-50 rounded-xl flex gap-3 px-6 py-3
        ${ratingChangeColor === 'VICTORY' && 'bg-primary bg-opacity-10'}
        ${ratingChangeColor === 'DEFEAT' && 'bg-danger bg-opacity-10'}
        ${match.matchStatus === 'PLAYING' && 'bg-purple-400 bg-opacity-20'}
        `}
      >
        <div className="flex flex-col justify-center items center text-xs">
          {match.myRatingChange ? (
            <MatchStatusTag
              matchStatus={match.matchStatus}
              ratingChange={match.myRatingChange}
            />
          ) : (
            <MatchStatusTag matchStatus={match.matchStatus} />
          )}
        </div>
        <div className="flex flex-col gap-3 flex-grow">
          <div className="flex flex-col gap-1">
            <div>
              <p className="text-sm font-bold">{match.gymName}</p>
            </div>
            <div className="text-xs text-disabled-dark">
              <span>{match.gymAddress}</span>
              <span> · </span>
              <span> {match.matchDate}</span>
              <span>({dayOfWeek})</span>
              <span> </span>
              <span>{match.matchTime.slice(0, 5)}</span>
            </div>
            <div>
              <p className="text-xs text-disabled-dark">
                {match.MyTeamAndNumber}
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <MatchTypeTag matchType={match.matchType} />
            <MatchTypeTag matchRankType={match.rankType} />
          </div>
        </div>
        <div className="flex gap-1 justify-center items-center text-xs">
          {(match.matchStatus === 'CREATED' ||
            match.matchStatus === 'RESERVED') && (
            <div>
              <button
                type="button"
                onClick={() => handleModalOpen()}
                className="py-1 px-3 border border-disabled text-disabled-dark flex justify-center items-center rounded bg-white"
              >
                <p>취소</p>
              </button>
            </div>
          )}
          {match.matchStatus === 'FINISHED' && (
            <Link href={`/mypage/mymatch/${match.matchId}`}>
              <div className="py-1 px-3 flex justify-center items-center bg-theme text-theme-light rounded">
                상세
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
