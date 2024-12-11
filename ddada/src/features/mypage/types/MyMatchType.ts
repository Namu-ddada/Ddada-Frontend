export type MatchStatus =
  | 'CREATED'
  | 'RESERVED'
  | 'PLAYING'
  | 'FINISHED'
  | 'CANCELED'

export type MatchType =
  | 'FEMALE_SINGLE'
  | 'MALE_SINGLE'
  | 'FEMALE_DOUBLE'
  | 'MALE_DOUBLE'
  | 'MIXED_DOUBLE'

export type RankType = 'NORMAL' | 'RANK'

export type MyMatchDetailsType = {
  MyTeamAndNumber: string
  avgRating: number
  gymAddress: string
  gymName: string
  matchDate: string
  matchId: number
  matchStatus: MatchStatus
  matchTime: string
  matchType: MatchType
  myRatingChange: number
  rankType: RankType
}

export type SatDataType = {
  setNumber: number
  setWinnerTeamNumber: number
  team1Score: number
  team2Score: number
  scores: ScoreDetail[]
}

export type ScoreDetail = {
  scoreNumber: number
  earnedMember: number | null
  missedMember1: number | null
  missedMember2: number | null
  earnedType: string | null
  missedType: string | null
}

export type PlayerType = {
  playerNum: number
  playerId: number
  nickname: string
  profileImagePath: string
}
