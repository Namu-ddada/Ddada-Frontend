import { useEffect, useState } from 'react'

import { fetchUserPk } from '@/api/user/index.ts'
import { fetchManagerPk } from '@/features/manager/api/managerAPI.tsx'
import { MatchDetailType } from '@/features/manager/types/MatchDataType.ts'
import { useUserRole } from '@/hooks/queries/user.ts'

export default function useGetUserStatus(data: MatchDetailType) {
  const { data: userRole, isSuccess } = useUserRole()
  const [isTeamA, setIsTeamA] = useState<boolean>(false)
  const [isTeamB, setIsTeamB] = useState<boolean>(false)
  const [isManager, setIsManager] = useState<boolean>(false)

  useEffect(() => {
    if (!isSuccess) {
      return
    }
    if (userRole?.memberType === 'MANAGER') {
      fetchManagerPk().then((res) => {
        setIsManager(!![data.manager].find((player) => player?.id === res?.id))
      })
    } else {
      fetchUserPk().then((res) => {
        setIsTeamA(
          !![data.team1.player1, data.team1.player2].find(
            (player) => player?.id === res?.playerId,
          ),
        )

        setIsTeamB(
          !![data.team2.player1, data.team2.player2].find(
            (player) => player?.id === res?.playerId,
          ),
        )
      })
    }
  }, [isSuccess, data, userRole?.memberType])

  return { isTeamA, isTeamB, isManager }
}
