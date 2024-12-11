import { useEffect, useState } from 'react'

import { fetchUserPk } from '@/api/user/index.ts'
import { MatchDetailType } from '@/features/manager/types/MatchDataType.ts'
import { useUserRole } from '@/hooks/queries/user.ts'

export default function useGetUserInfo(data: MatchDetailType) {
  const { data: userRole, isSuccess } = useUserRole()
  const [userId, setUserId] = useState<number | undefined>(undefined)
  const [userNickname, setUserNickname] = useState<string | undefined>(
    undefined,
  )
  const [userTeamNum, setUserTeamNum] = useState<number>(0)
  useEffect(() => {
    if (!isSuccess || !data) {
      return
    }
    fetchUserPk().then((res) => {
      setUserId(res?.playerId)

      const playerInTeamA = [data.team1.player1, data.team1.player2].find(
        (player) => player?.id === res?.playerId,
      )
      const playerInTeamB = [data.team2.player1, data.team2.player2].find(
        (player) => player?.id === res?.playerId,
      )

      if (playerInTeamA) {
        setUserTeamNum(1)
        setUserNickname(playerInTeamA.nickname)
      } else if (playerInTeamB) {
        setUserTeamNum(2)
        setUserNickname(playerInTeamB.nickname)
      } else {
        setUserTeamNum(0)
        setUserNickname(undefined)
      }
    })
  }, [isSuccess, data, userRole?.memberType])

  return { userId, userNickname, userTeamNum }
}
