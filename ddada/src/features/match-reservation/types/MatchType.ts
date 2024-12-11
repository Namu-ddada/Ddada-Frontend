export type CourtType = {
  id: number
  name: string
  address: string
  region: string
}

export type MatchType = {
  court: CourtType
  date: string
  id: number
  isReserved: boolean
  matchType: string
  team1Gender: PlayersGender
  team2Gender: PlayersGender
  rankType: string
  rating: number
  status: string
  team1PlayerCount: number
  team2PlayerCount: number
  time: string
}

export type Gender = 'FEMALE' | 'MALE' | 'notReserved'
export type PlayersGender = Gender[]
