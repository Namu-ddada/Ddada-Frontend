import {
  EARN_TYPE,
  MATCH_STATUS,
  MATCH_TYPE,
  MISS_TYPE,
} from '@/features/manager/constants/matchConstants.ts'

type PlayerType = {
  id: number
  nickname: string
  gender: Gender
  rating: number
  image: string
  gameCount: number
}

type TeamType = {
  id: number
  player1: PlayerType
  player2: PlayerType
}

export type CourtType = {
  id: number
  name: string
  address: string
  status: string
  image: string
  facilities: string[]
  contactNumber: string
  description: string
  url: string
  reservations: Record<string, string[]>
}

type SetType = {
  id: number
  setNumber: number
  setWinnerTeamNumber: number
  team1Score: number
  team2Score: number
}

type ManagerType = {
  id: number
  nickname: string
}

type MatchDetailType = {
  id: number
  court: CourtType
  team1: TeamType
  team2: TeamType
  winnerTeamNumber: 1 | 2 | null
  manager?: ManagerType
  team1SetScore: number | null
  team2SetScore: number | null
  status: MatchStatusType
  rankType: 'RANK' | 'NORMAL'
  matchType: MatchType
  date: string
  time: string
  sets?: SetType[]
}

type PlayerScoreType = {
  scoreNumber: number // 스코어 순번
  earnedPlayer: 11 | 12 | 21 | 22 | null
  missedPlayer1: 11 | 12 | 21 | 22 | null
  missedPlayer2: 11 | 12 | 21 | 22 | null
  earnedType: EarnType | null // 득점 유형
  missedType: MissType | null // 실점 유형
}

type SetResultType = {
  setNumber: number // 세트 번호
  setWinnerTeamNumber: 1 | 2 | null // 해당 세트에서 이긴 팀
  team1Score: number // 팀1의 해당 세트 점수
  team2Score: number // 팀2의 해당 세트 점수
  scores: PlayerScoreType[] // 해당 세트에서의 모든 스코어 기록
}

type MatchReusltStoreType = {
  id?: number
  winnerTeamNumber: 1 | 2 | number | null
  team1SetScore: number
  team2SetScore: number
  sets: SetResultType[]
}

type ManagerMatchListPayload = {
  statuses: MatchStatusType
  keyword?: string
  todayOnly?: boolean
  page?: number
  size?: number
}

type MatchStatusType = keyof typeof MATCH_STATUS
type MatchType = keyof typeof MATCH_TYPE
type EarnType = keyof typeof EARN_TYPE
type MissType = keyof typeof MISS_TYPE
type Gender = 'MALE' | 'FEMALE'

type ManagerMatchDetailType = {
  id: number
  date: Date
  time: string
  status: MatchStatusType
  rankType: 'RANK' | 'NORMAL'
  matchType: MatchType
  rating: number
  team1PlayerCount: number
  team2PlayerCount: number
  team1Gender: ['MALE', 'MALE']
  team2Gender: ['MALE', 'FEMALE']
  isReserved: boolean
  court: CourtType
}

type FetchManagerMatchListType = {
  content: ManagerMatchDetailType[]
  page: {
    size: number
    number: number
    totalElements: number
    totalPages: number
  }
}

export type {
  SetResultType,
  TeamType,
  MatchDetailType,
  MatchReusltStoreType,
  ManagerMatchListPayload,
  ManagerMatchDetailType,
  FetchManagerMatchListType,
  PlayerType,
  MatchStatusType,
}
