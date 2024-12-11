'use client'

import { useState } from 'react'

import Button from '@/features/manager/components/Button/index.tsx'
// import GameUserInfo from '@/features/manager/components/GameUserInfo/index.tsx'
import {
  EARN_TYPE,
  MISS_TYPE,
} from '@/features/manager/constants/matchConstants.ts'
import useBadmintonStore from '@/features/manager/stores/useBadmintonStore.tsx'

interface ScoreModalProps {
  selectTeam: string
  modalhandler: () => void
}

export default function ScoreModal({
  modalhandler,
  selectTeam,
}: ScoreModalProps) {
  const [earnedUser, setEarnedUser] = useState<number>(-1)
  const [earnedType, setEarnedType] = useState<string>('')
  const [missedType, setMissedType] = useState<string>('')
  const [missedUser, setMissedUser] = useState<number[]>([])
  const [faultUser, setFaultUser] = useState<number>(-1)

  const { badmintonInstance, update } = useBadmintonStore((state) => ({
    badmintonInstance: state.badmintonInstance,
    update: state.update,
  }))

  const getTeamPlayers = (team: 'team1' | 'team2') => {
    const teamData = badmintonInstance.teams[team]
    if (teamData) {
      return [teamData.player1, teamData.player2]
    }
    return []
  }

  const handleMissedUser = (userId: number) => {
    setMissedUser((prevMissedUser) => {
      const index = prevMissedUser.indexOf(userId)

      if (index >= 0) {
        return prevMissedUser.filter((id) => id !== userId)
      }
      return [...prevMissedUser, userId]
    })
  }

  const handleFaultType = (key: string) => {
    // 이전꺼 초기화
    setEarnedUser(-1)
    setEarnedType('')
    setMissedUser([])

    // 폴트 설정
    setMissedType(key)
  }

  const handleEarnType = (key: string) => {
    // 이전꺼 초기화
    setMissedType('')
    setMissedUser([])
    setFaultUser(-1)

    // 득점 설정
    setEarnedType(key)
  }

  const handleStoreScore = () => {
    if (missedType === 'SERVE_MISS') {
      handleStoreFaultScore()
    } else {
      handleStoreEarnScore()
    }

    update(badmintonInstance)
    modalhandler()
  }
  const handleStoreEarnScore = () => {
    if (earnedType === '' && missedUser.length === 0 && earnedUser === -1)
      return
    badmintonInstance.earnScored(earnedUser, earnedType, missedUser)
  }
  const handleStoreFaultScore = () => {
    if (faultUser === -1) return
    badmintonInstance.faultScored(faultUser, missedType)
  }

  const checkCanSave = () => {
    if (missedType !== 'SERVE_MISS') {
      if (earnedType !== '' && missedUser.length !== 0 && earnedUser !== -1)
        return true
    }

    if (missedType === 'SERVE_MISS') {
      if (faultUser !== -1) return true
    }
    return false
  }

  return (
    <>
      <div
        className="fixed left-0 top-0 z-40 h-screen w-screen overflow-hidden bg-black opacity-50"
        onClick={() => modalhandler()}
        aria-hidden="true"
      />

      <div className="fixed left-1/2 top-1/2 z-40 max-w-[57.4375rem] px-6 py-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl">
        <div className="flex flex-col gap-y-3">
          {/* 위에 툴바 */}
          <div className="py-3 border-b border-disabled flex gap-x-3">
            <div className="flex gap-x-3">
              {/* <GameUserInfo /> */}
              {/* <GameUserInfo /> */}
            </div>
            {selectTeam === 'team1' ? (
              <div className="flex gap-x-1 items-center">
                <span className="text-disabled-dark text-sm font-bold">
                  {' '}
                  팀 A
                </span>
                <div className="rounded-full w-2 h-2 bg-[#FFF3C5]" />
              </div>
            ) : (
              <div className="flex gap-x-1 items-center">
                <span className="text-disabled-dark text-sm font-bold">
                  {' '}
                  팀 B
                </span>
                <div className="rounded-full w-2 h-2 bg-theme" />
              </div>
            )}
          </div>

          {/* 득점 인원 */}
          <div
            className={`py-1 px-2 flex flex-col gap-y-2 rounded-md  ${missedType !== '' && `bg-base-50`}`}
          >
            <p className="font-bold">득점인원</p>
            <div className="flex gap-x-3">
              {selectTeam === 'team1'
                ? getTeamPlayers('team1').map((playerInfo, index) => (
                    <Button
                      key={playerInfo.nickname}
                      size="lg"
                      type="fault"
                      text={`A${index + 1}`}
                      changeStyle={earnedUser === playerInfo.id}
                      onClick={() => setEarnedUser(playerInfo.id)}
                      disabled={missedType !== ''}
                    />
                  ))
                : getTeamPlayers('team2').map((playerInfo, index) => (
                    <Button
                      key={playerInfo.nickname}
                      size="lg"
                      type="fault"
                      text={`B${index + 1}`}
                      changeStyle={earnedUser === playerInfo.id}
                      onClick={() => setEarnedUser(playerInfo.id)}
                      disabled={missedType !== ''}
                    />
                  ))}
            </div>
          </div>
          {/* 득점 종류 */}
          <div className="py-1 px-2 flex flex-col gap-y-2">
            <p className="font-bold">득점 종류</p>
            <div className="flex gap-x-3">
              {Object.entries(EARN_TYPE).map(([key, value]) => (
                <Button
                  key={key}
                  size="md"
                  type="earn"
                  text={value}
                  changeStyle={earnedType === key}
                  onClick={() => handleEarnType(key)}
                />
              ))}
            </div>
          </div>

          {/* 실점 종류 */}
          <div className="py-1 px-2 flex flex-col gap-y-2">
            <p className="font-bold">실점 종류</p>
            <div className="flex gap-x-3">
              {Object.entries(MISS_TYPE).map(([key, value]) => (
                <Button
                  key={key}
                  size="md"
                  type="miss"
                  text={value}
                  changeStyle={missedType === key}
                  // onClick={() => setEarnedType(key)}
                  onClick={() => handleFaultType(key)}
                />
              ))}
            </div>
          </div>

          {/* 폴트인원 */}
          {missedType === 'SERVE_MISS' ? (
            // 서브 미스 일때
            <div className="py-1 px-2 flex flex-col gap-y-2 rounded-md">
              <p className="font-bold">폴트인원</p>
              <div className="flex gap-x-3">
                {selectTeam === 'team1'
                  ? getTeamPlayers('team1').map((playerInfo, index) => (
                      <Button
                        key={playerInfo.nickname}
                        size="lg"
                        type="fault"
                        text={`A${index + 1}`}
                        changeStyle={faultUser === playerInfo.id}
                        onClick={() => setFaultUser(playerInfo.id)}
                      />
                    ))
                  : getTeamPlayers('team2').map((playerInfo, index) => (
                      <Button
                        key={playerInfo.nickname}
                        size="lg"
                        type="fault"
                        text={`B${index + 1}`}
                        changeStyle={faultUser === playerInfo.id}
                        onClick={() => setFaultUser(playerInfo.id)}
                      />
                    ))}
              </div>
            </div>
          ) : (
            <div
              className={`py-1 px-2 flex flex-col gap-y-2 rounded-md ${earnedType === '' && `bg-base-50`}`}
            >
              <p className="font-bold">폴트인원</p>
              <div className="flex gap-x-3">
                {selectTeam === 'team1'
                  ? getTeamPlayers('team2').map((playerInfo, index) => (
                      <Button
                        key={playerInfo.nickname}
                        size="lg"
                        type="fault"
                        text={`B${index + 1}`}
                        changeStyle={missedUser.includes(playerInfo.id)}
                        onClick={() => handleMissedUser(playerInfo.id)}
                        disabled={earnedType === ''}
                      />
                    ))
                  : getTeamPlayers('team1').map((playerInfo, index) => (
                      <Button
                        key={playerInfo.nickname}
                        size="lg"
                        type="fault"
                        text={`A${index + 1}`}
                        changeStyle={missedUser.includes(playerInfo.id)}
                        onClick={() => handleMissedUser(playerInfo.id)}
                        disabled={earnedType === ''}
                      />
                    ))}
              </div>
            </div>
          )}

          {/* 닫기 & 저장 */}
          <div className="flex gap-x-3 text-base">
            <button
              className="grow rounded-xl border py-[.625rem] border-theme"
              type="button"
              onClick={() => modalhandler()}
            >
              닫기
            </button>
            <button
              className={`grow rounded-xl border py-[.625rem]   ${checkCanSave() ? `text-white bg-theme ` : `text-disabled-dark bg-disabled`}`}
              type="button"
              onClick={() => handleStoreScore()}
              disabled={!checkCanSave()}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
