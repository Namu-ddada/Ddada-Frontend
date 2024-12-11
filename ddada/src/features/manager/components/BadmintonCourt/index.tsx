'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

import ScoreModal from '@/features/manager/components/ScoreModal/index.tsx'
import { SCOREBOARD_SETTING } from '@/features/manager/constants/matchConstants.ts'
import useBadmintonStore from '@/features/manager/stores/useBadmintonStore.tsx'
import BlueCourtRight from '@/static/imgs/manager/BlueCourtRight.svg'
import RedCourtLeft from '@/static/imgs/manager/RedCourtLeft.svg'

export default function BadmintonCourt() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectTeam, setselectTeam] = useState<string>('')

  const { badmintonInstance } = useBadmintonStore((state) => ({
    badmintonInstance: state.badmintonInstance,
    update: state.update,
  }))

  const handleScore = (team: string) => {
    if (badmintonInstance.winnerTeamNumber) return
    const teamScore1 = badmintonInstance.getCurMatchScoreTeam1()
    const teamScore2 = badmintonInstance.getCurMatchScoreTeam2()
    const scoreDifference = Math.abs(teamScore1 - teamScore2)

    // 세트 종료 분기처리
    if (
      scoreDifference >= 2 &&
      Math.max(teamScore1, teamScore2) >= SCOREBOARD_SETTING.matchScore
    ) {
      toast.error('되돌리기 또는 다시하기를 확인해주세요')
      return
    }

    setselectTeam(team)
    setModalOpen(true)
  }
  const handleScoreModalOff = () => {
    setModalOpen(false)
  }

  return (
    <div className="flex gap-x-6">
      <div
        className="relative"
        onClick={() => handleScore('team1')}
        aria-hidden="true"
      >
        <div className="text-theme absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-4xl">팀 A</p>
          <p className="font-bold text-6xl">
            {badmintonInstance.getCurMatchScoreTeam1()}
          </p>
        </div>
        <div className="h-[25rem] grow">
          <RedCourtLeft className="w-full h-full cursor-pointer" />
        </div>
      </div>
      <div
        className="relative"
        onClick={() => handleScore('team2')}
        aria-hidden="true"
      >
        <div className="text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-4xl">팀 B</p>
          <p className="font-bold text-6xl">
            {badmintonInstance.getCurMatchScoreTeam2()}
          </p>
        </div>
        <div className="h-[25rem] grow">
          <BlueCourtRight className="w-full h-full cursor-pointer" />
        </div>
      </div>
      {isModalOpen && (
        <ScoreModal
          modalhandler={handleScoreModalOff}
          selectTeam={selectTeam}
        />
      )}
    </div>
  )
}
