import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { toast } from 'react-hot-toast'

import { WEEKDAYS } from '@/constants/day/index.ts'
import { deleteUserToMatch } from '@/features/reservationDetail/api/matchDetailAPI.tsx'
import MatchPaymentInfo from '@/features/reservationDetail/components/MatchApply/MatchPaymentInfo.tsx'
import MatchRequestManagerButton from '@/features/reservationDetail/components/MatchApply/MatchRequestManagerButton.tsx'
import MatchRequestPlayerButton from '@/features/reservationDetail/components/MatchApply/MatchRequestPlayerButton.tsx'
import MatchStatus from '@/features/reservationDetail/components/MatchApply/MatchStatus.tsx'
import MatchTeamSelectList from '@/features/reservationDetail/components/MatchApply/MatchTeamSelectList.tsx'
import MatchCancelModal from '@/features/reservationDetail/components/MatchCancelModal/index.tsx'
import useGetUserStatus from '@/features/reservationDetail/hooks/useGetUserStatus.tsx'
import { useMatchDetailContext } from '@/features/reservationDetail/providers/index.tsx'
import { useUserRole } from '@/hooks/queries/user.ts'
import useInvalidateMatchReservations from '@/hooks/useInvalidateMatchReservations/index.tsx'
import useModal from '@/hooks/useModal/index.tsx'
import LoadingSpinner from '@/static/imgs/mypage/playstyle/my-page-playstyle-spinner.svg'

export default function MatchApply() {
  const queryClient = useQueryClient()
  const { data: userRole, isSuccess: isUserRole } = useUserRole()

  const matchDetailData = useMatchDetailContext()
  const [clickedTeam, setClickedTeam] = useState<number>(-1)
  const { isModalOpen, portalElement, handleModalOpen, handleModalClose } =
    useModal()
  const { isTeamA, isTeamB, isManager } = useGetUserStatus(matchDetailData)
  const { invalidateReservationList } = useInvalidateMatchReservations()

  if (!isUserRole) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner className="animate-spin" />
      </div>
    )
  }

  const handleMatchCancel = async () => {
    try {
      let playerTeam = 1
      if (isTeamB) {
        playerTeam = 2
      }
      await deleteUserToMatch(matchDetailData.id, playerTeam)
      queryClient.invalidateQueries({
        queryKey: ['matchDetail', `${matchDetailData.id}`],
      })
      invalidateReservationList()
    } catch {
      toast.error('매치 예약 취소 중 오류가 발생했습니다.')
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
      <div className="flex flex-col gap-y-4 py-6 px-3">
        {/* 설명 */}
        <MatchStatus status={matchDetailData.status} isMatchReserved={false} />

        {/* 팀 선택 */}
        <div className="pb-3 flex flex-col gap-y-1  border-b border-disabled text-xs">
          <h2 className="text-sm font-bold">팀 선택</h2>

          <MatchTeamSelectList
            userRole={userRole?.memberType}
            isTeamA={isTeamA}
            isTeamB={isTeamB}
            isManager={isManager}
            data={matchDetailData}
            clickedTeam={clickedTeam}
            setClickedTeam={setClickedTeam}
          />
        </div>

        {/* 예약정보 */}
        <div className="pb-3 flex flex-col gap-y-1  border-b border-disabled text-xs text-disabled-dark">
          <h2 className="text-sm font-bold text-black">예약정보</h2>
          <p className="text-sm">{matchDetailData.court.name}</p>
          <p>{matchDetailData.court.address}</p>
          <p>
            {' '}
            {matchDetailData.date}(
            {WEEKDAYS[new Date(matchDetailData.date).getDay()]}){' '}
            {new Date(
              `${matchDetailData.date}T${matchDetailData.time}`,
            ).getHours()}
            :00-
            {new Date(
              `${matchDetailData.date}T${matchDetailData.time}`,
            ).getHours() + 1}
            :00(1시간){' '}
          </p>
        </div>

        {/* 결제금액 */}
        {(matchDetailData.status === 'RESERVED' ||
          matchDetailData.status === 'CREATED') &&
          !isManager && (
            <MatchPaymentInfo isMatchReserved={!isTeamA && !isTeamB} />
          )}

        {/* 신청버튼 */}
        {userRole?.memberType === 'MANAGER' ? (
          <MatchRequestManagerButton
            isJoin={isManager}
            matchId={matchDetailData.id}
          />
        ) : (
          <MatchRequestPlayerButton
            isJoin={isTeamA || isTeamB}
            matchId={matchDetailData.id}
            clickedTeam={clickedTeam}
            userRole={userRole}
            handleModalOpen={handleModalOpen}
          />
        )}
      </div>
    </>
  )
}
