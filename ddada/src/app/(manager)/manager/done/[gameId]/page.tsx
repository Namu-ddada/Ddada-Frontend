'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { fetchManagerPk } from '@/features/manager/api/managerAPI.tsx'
import GameUserInfo from '@/features/manager/components/GameUserInfo/index.tsx'
import MatchCourtShortInfo from '@/features/manager/components/MatchCourtShortInfo/index.tsx'
import MatchPlayerInfo from '@/features/manager/components/MatchPlayerInfo/index.tsx'
import { MatchDetailType } from '@/features/manager/types/MatchDataType.ts'
import { fetchMatchDetail } from '@/features/reservationDetail/api/matchDetailAPI.tsx'
import BlueCourtRight from '@/static/imgs/manager/BlueCourtRight.svg'
import RedCourtLeft from '@/static/imgs/manager/RedCourtLeft.svg'

export default function ScoreBoardPage() {
  const params = useParams() as { gameId: string }
  const [isVisible, setVisible] = useState<boolean>(false)
  const { data, isSuccess } = useQuery({
    queryKey: ['matchDetail', params.gameId],
    queryFn: () => fetchMatchDetail(params.gameId),
    enabled: !!params.gameId,
  })

  useEffect(() => {
    if (isSuccess) {
      fetchManagerPk().then((res) => {
        if (data.manager?.id === res?.id) {
          if (data.status === 'FINISHED') {
            setVisible(true)
          }
        }
      })
    }
  }, [data?.manager?.id, data?.status, isSuccess])

  if (!isSuccess) {
    return null
  }

  if (!isVisible) {
    return (
      <div className="h-[calc(100vh-3.9375rem)] w-full relative flex justify-center items-center">
        <p className="fixed text-2xl font-bold">잘못된 접근입니다.</p>
      </div>
    )
  }

  return (
    <div className="bg-base-100">
      <MatchCourtShortInfo data={data} />
      <div className="flex flex-col gap-y-3">
        <MatchPlayerInfo data={data} />

        <div className="p-2 flex flex-col gap-y-6 bg-white">
          <p className="font-bold">게임 진행 중</p>
          <div className="flex justify-center">
            <BadmintonSetScore data={data} />
          </div>
          <div className="flex justify-center">
            <div className="flex gap-x-6">
              <div className="relative">
                <div className="text-theme absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <p className="text-4xl">팀 A</p>
                  <p className="font-bold text-6xl">0</p>
                </div>
                <div className="h-[25rem] grow">
                  <RedCourtLeft className="w-full h-full" />
                </div>
              </div>
              <div className="relative">
                <div className="text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <p className="text-4xl">팀 B</p>
                  <p className="font-bold text-6xl">0</p>
                </div>
                <div className="h-[25rem] grow">
                  <BlueCourtRight className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
          <MatchScoreCard
            data={data}
            matchResult={{
              team1:
                data.sets && data.sets.length >= 1
                  ? data.sets[0].team1Score
                  : 0,
              team2:
                data.sets && data.sets.length >= 1
                  ? data.sets[0].team2Score
                  : 0,
            }}
            isVisible={!!(data.sets && data.sets.length >= 1)}
          />
          <MatchScoreCard
            data={data}
            matchResult={{
              team1:
                data.sets && data.sets.length >= 2
                  ? data.sets[1].team1Score
                  : 0,
              team2:
                data.sets && data.sets.length >= 2
                  ? data.sets[1].team2Score
                  : 0,
            }}
            isVisible={!!(data.sets && data.sets.length >= 2)}
          />
          <MatchScoreCard
            data={data}
            matchResult={{
              team1:
                data.sets && data.sets.length >= 3
                  ? data.sets[2].team1Score
                  : 0,
              team2:
                data.sets && data.sets.length >= 3
                  ? data.sets[2].team2Score
                  : 0,
            }}
            isVisible={!!(data.sets && data.sets.length >= 3)}
          />
          <div className="bg-disabled flex justify-center items-center h-[4.75rem]">
            <span className="text-disabled-dark text-xl font-bold">
              종료된 경기입니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function BadmintonSetScore({ data }: { data: MatchDetailType }) {
  return (
    <div className="w-[12.5rem] border border-theme px-6 py-2 rounded-[62.5rem] flex justify-center items-center">
      <p className="text-theme text-4xl font-bold ">
        {data.team1SetScore ? data.team1SetScore : 0} :{' '}
        {data.team2SetScore ? data.team2SetScore : 0}
      </p>
    </div>
  )
}

interface MatchResult {
  team1: number
  team2: number
}

function MatchScoreCard({
  data,
  matchResult = { team1: 0, team2: 0 },
  isVisible = false,
}: {
  data: MatchDetailType
  matchResult?: MatchResult | null
  isVisible: boolean
}) {
  const winnerTeam = () => {
    if (!isVisible) {
      return false
    }
    if (!matchResult) {
      return false
    }

    if (matchResult.team1 > matchResult.team2) {
      return 1
    }
    if (matchResult.team1 < matchResult.team2) {
      return 2
    }
    return false
  }

  return (
    <div
      className={`flex gap-x-2 px-6 py-5 border-disabled bg-  border rounded-xl justify-between ${!isVisible && `bg-disabled`}`}
    >
      {/* A팀 */}
      <div className="flex gap-x-3 items-center">
        <div className="flex gap-x-3">
          <GameUserInfo src={data.team1.player1.image} />
          <GameUserInfo src={data.team1.player2.image} />
        </div>
        <div className="grow">
          <div className="flex gap-x-1 items-center">
            <span className="text-disabled-dark text-sm font-bold">팀 A</span>
            <div className="rounded-full w-2 h-2 bg-[#FFF3C5]" />
          </div>
        </div>
      </div>
      {/* 매치 점수 */}
      <div className="flex gap-x-6 text-4xl font-bold">
        <span
          className={`${winnerTeam() === 1 ? `text-theme` : `text-disabled-dark`}`}
        >
          {isVisible ? matchResult?.team1 : '00'}
        </span>
        <span>:</span>
        <span
          className={`${winnerTeam() === 2 ? `text-theme ` : `text-disabled-dark`}`}
        >
          {isVisible ? matchResult?.team2 : '00'}
        </span>
      </div>
      {/* B팀 */}
      <div className="flex gap-x-3 items-center flex-row-reverse">
        <div className="flex gap-x-3">
          <GameUserInfo src={data.team2.player1.image} />
          <GameUserInfo src={data.team2.player2.image} />
        </div>
        <div className="grow">
          <div className="flex gap-x-1 items-center">
            <div className="rounded-full w-2 h-2 bg-theme" />
            <span className="text-disabled-dark text-sm font-bold">팀 B</span>
          </div>
        </div>
      </div>
    </div>
  )
}
