'use client'

import { useLayoutEffect, useState } from 'react'

import ScoreModal from '@/features/manager/components/ScoreModal/index.tsx'
import { useBadmintonContext } from '@/features/manager/providers/BadmintonProvider.tsx'

export default function ScoreBoard() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectUser, setSelectUser] = useState<number>(0)
  const [gamescore, setGamescore] = useState({
    setScores: {
      team1: 0,
      team2: 0,
    },
    matchScores: {
      team1: 0,
      team2: 0,
    },
  })

  const badmintonInstance = useBadmintonContext()

  const handleScore = (user: number) => {
    setSelectUser(user)
    setModalOpen(true)
  }
  const handleScoreModalOff = () => {
    setGamescore(badmintonInstance.getScore())
    setModalOpen(false)
  }

  const handleUndo = () => {
    badmintonInstance.undo()
    setGamescore(badmintonInstance.getScore())
  }

  const handleRedo = () => {
    badmintonInstance.redo()
    setGamescore(badmintonInstance.getScore())
  }

  useLayoutEffect(() => {
    badmintonInstance.initialize()
    setGamescore(badmintonInstance.getScore())
  }, [])

  return (
    <div className="w-[300px]">
      <div>
        <p>점수판</p>
        <p>
          세트 스코어 {gamescore.setScores.team1} : {gamescore.setScores.team2}
        </p>
        <p>
          매치 스코어 {gamescore.matchScores.team1} :{' '}
          {gamescore.matchScores.team2}
        </p>
        <div className="flex gap-x-3">
          <button type="button" onClick={() => handleUndo()}>
            undo
          </button>
          <button type="button" onClick={() => handleRedo()}>
            redo
          </button>
        </div>
      </div>
      <div className="flex bg-orange-700 flex-col h-[200px]">
        <div className="flex grow">
          <button
            type="button"
            className="w-[150px] border-r-2 border-dashed"
            onClick={() => handleScore(badmintonInstance.teams.team1[0].id)}
          >
            {badmintonInstance.teams.team1[0].nickname}
          </button>
          <button
            className="grow"
            type="button"
            onClick={() => handleScore(badmintonInstance.teams.team1[1].id)}
          >
            {badmintonInstance.teams.team1[1].nickname}
          </button>
        </div>
        <div className="border-y-2 border-black h-[20px]" />
        <div className="flex grow">
          <button
            type="button"
            className=" w-[150px] border-r-2 border-dashed"
            onClick={() => handleScore(badmintonInstance.teams.team2[0].id)}
          >
            {badmintonInstance.teams.team2[0].nickname}
          </button>
          <button
            type="button"
            className="grow"
            onClick={() => handleScore(badmintonInstance.teams.team2[1].id)}
          >
            {badmintonInstance.teams.team2[1].nickname}
          </button>
        </div>
      </div>
      {JSON.stringify(badmintonInstance.history)}
      {isModalOpen && (
        <ScoreModal
          modalhandler={handleScoreModalOff}
          currentUserId={selectUser}
        />
      )}
    </div>
  )
}
