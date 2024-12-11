export type GymManager = {
  id: number
  nickname: string
  image: string
  income: number
}

type MatchStatistics = {
  date: string
  matchCount: number
}

type GymMatchDetail = {
  id: number
  date: string
  time: string
  courtNumber: number
  playerCount: number
  status: 'CREATED'
  manager: GymManager
}

export type GymInfo = {
  gymAdmin: GymManager
  matchStatistics: MatchStatistics[]
}

export type GymMatchList = {
  matches: GymMatchDetail[]
}
