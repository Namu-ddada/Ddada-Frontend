import { AxiosError } from 'axios'

import { privateAPI, publicAPI } from '@/api/axios.ts'
import { MatchDetailType } from '@/features/manager/types/MatchDataType.ts'

export async function fetchMatchDetail(
  matchId: string,
): Promise<MatchDetailType> {
  const res = await publicAPI.get(`/matches/${matchId}`)
  return res.data.result
}

export async function addUserToMatch(matchId: number, teamNumber: number) {
  try {
    await privateAPI.patch(`/matches/${matchId}/teams/${teamNumber}`)
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 409) {
        throw Error('time')
      }
    }
  }
}

export async function deleteUserToMatch(matchId: number, teamNumber: number) {
  await privateAPI.delete(`/matches/${matchId}/teams/${teamNumber}`)
}
