'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { fetchManagerPk } from '@/features/manager/api/managerAPI.tsx'
import BadmintonScoreBoard from '@/features/manager/components/BadmintonScoreBoard/index.tsx'
import MatchCourtShortInfo from '@/features/manager/components/MatchCourtShortInfo/index.tsx'
import MatchPlayerInfo from '@/features/manager/components/MatchPlayerInfo/index.tsx'
import { fetchMatchDetail } from '@/features/reservationDetail/api/matchDetailAPI.tsx'

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
          if (data.status === 'PLAYING') {
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
        <BadmintonScoreBoard data={data} />
      </div>
    </div>
  )
}
