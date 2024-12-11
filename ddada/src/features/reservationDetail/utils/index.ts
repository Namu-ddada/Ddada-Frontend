import {
  MatchDetailType,
  TeamType,
} from '@/features/manager/types/MatchDataType.ts'

export function getTier(rating: number) {
  const tiers = [
    { min: -Infinity, max: 800, tier: '아마추어', tierNum: 1 },
    { min: 800, max: 1000, tier: '아마추어', tierNum: 2 },
    { min: 1000, max: 1200, tier: '아마추어', tierNum: 3 },
    { min: 1200, max: 1400, tier: '세미프로', tierNum: 1 },
    { min: 1400, max: 1600, tier: '세미프로', tierNum: 2 },
    { min: 1600, max: 1800, tier: '세미프로', tierNum: 3 },
    { min: 1800, max: 2000, tier: '프로페셔널', tierNum: 1 },
    { min: 2000, max: 2200, tier: '프로페셔널', tierNum: 2 },
    { min: 2200, max: 2400, tier: '프로페셔널', tierNum: 3 },
    { min: 2400, max: Infinity, tier: '마스터', tierNum: 0 },
  ]
  const currentTier = tiers.find((t) => rating >= t.min && rating < t.max)

  let numTier

  if (currentTier) {
    numTier = currentTier.tier
    if (currentTier.tierNum === 0) {
      numTier = ''
    } else if (currentTier.tierNum === 1) {
      numTier = 'I'
    } else if (currentTier.tierNum === 2) {
      numTier = 'II'
    } else if (currentTier.tierNum === 3) {
      numTier = 'III'
    }
  }
  if (!currentTier) {
    return '루키'
  }
  return currentTier.tier + numTier
}

export function getAverageRating(matchDetailData: MatchDetailType) {
  const averageRating =
    [
      matchDetailData.team1.player1,
      matchDetailData.team1.player2,
      matchDetailData.team2.player1,
      matchDetailData.team2.player2,
    ]
      .filter((player) => player !== null)
      .map((player) => player.rating)
      .reduce((acc, cur) => {
        return acc + cur
      }, 0) /
    [
      matchDetailData.team1.player1,
      matchDetailData.team1.player2,
      matchDetailData.team2.player1,
      matchDetailData.team2.player2,
    ]
      .filter((player) => player !== null)
      .map((player) => player.rating).length

  return averageRating
}

export function checkGenderMatchJoin(
  matchDetailData: MatchDetailType,
  selectTeam: number,
  gender: 'MALE' | 'FEMALE',
) {
  switch (matchDetailData.matchType) {
    case 'MALE_DOUBLE':
      if (gender === 'MALE') {
        return true
      }
      throw Error('gender')
    case 'FEMALE_DOUBLE':
      if (gender === 'FEMALE') {
        return true
      }
      throw Error('gender')

    case 'MIXED_DOUBLE':
      if (selectTeam === 1) {
        if (assignPlayer(matchDetailData.team1, gender)) return true
      } else if (selectTeam === 2) {
        if (assignPlayer(matchDetailData.team2, gender)) return true
      }
      throw Error('miss gender')

    default:
      throw Error('gender')
  }
}

function assignPlayer(team: TeamType, gender: 'MALE' | 'FEMALE') {
  // player1이 없으면 player1에 배정 가능
  if (!team.player1) {
    // player2와 성별이 같으면 안 되고, player2와 다른 성별이면 배정 가능
    if (!team.player2 || team.player2.gender !== gender) {
      return true
    }
  }

  // player1이 이미 있고, player2가 없으면 player2에 배정 가능
  if (!team.player2) {
    // player1과 다른 성별이면 player2에 배정 가능
    if (team.player1.gender !== gender) {
      return true
    }
  }

  // player1과 player2가 모두 채워져 있거나 성별이 맞지 않는 경우 배정 불가
  return false
}
