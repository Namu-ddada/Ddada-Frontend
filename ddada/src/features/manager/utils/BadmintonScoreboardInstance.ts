'use client'

import { SCOREBOARD_SETTING } from '@/features/manager/constants/matchConstants.ts'
import {
  SetResultType,
  TeamType,
} from '@/features/manager/types/MatchDataType.ts'

type TeamKey = 'team1' | 'team2'

type HistoryType = {
  player?: number | null
  earnedType?: string | null
  missedUser?: Array<number> | null
  missedType?: string | null

  team1SetScore: number
  team2SetScore: number
  team1MatchScore: number
  team2MatchScore: number
  currentSet: number
  scoreNumber: number
  winnerTeamNumber: number | null
}

/**
 * 배드민턴 인스턴스
 */

class BadmintonScoreboardInstance {
  id?: number
  winnerTeamNumber: number | null
  team1SetScore: number
  team2SetScore: number
  sets: SetResultType[]
  teams: {
    team1?: TeamType
    team2?: TeamType
  }
  history: HistoryType[]
  currentHistoryIndex: number
  currentSet: number

  /**
   * constructor
   * @param {number} gameId
   * @param {object} team1 teamData
   * @param {object} team2 teamData
   */

  constructor(gameId?: number, team1?: TeamType, team2?: TeamType) {
    this.id = gameId

    this.teams = {
      team1,
      team2,
    }

    this.team1SetScore = 0
    this.team2SetScore = 0
    this.sets = []

    this.sets.push({
      setNumber: 1,
      setWinnerTeamNumber: null,
      team1Score: 0,
      team2Score: 0,
      scores: [],
    })
    this.sets.push({
      setNumber: 2,
      setWinnerTeamNumber: null,
      team1Score: 0,
      team2Score: 0,
      scores: [],
    })
    this.sets.push({
      setNumber: 3,
      setWinnerTeamNumber: null,
      team1Score: 0,
      team2Score: 0,
      scores: [],
    })
    this.sets.push({
      setNumber: 4,
      setWinnerTeamNumber: null,
      team1Score: 0,
      team2Score: 0,
      scores: [],
    })

    this.history = [] // 상태 히스토리를 저장하는 배열
    this.currentHistoryIndex = -1 // 현재 히스토리의 위치
    this.winnerTeamNumber = null
    this.currentSet = 1
  }

  /**
   * 인스턴스 초기화 함수
   * @param player userId
   * @param earnedType
   * @param missedUser
   */
  initialize() {
    const savedData = BadmintonScoreboardInstance.loadFromLocalStorage()
    if (savedData) {
      this.team1SetScore = savedData.team1SetScore
      this.team2SetScore = savedData.team2SetScore
      this.winnerTeamNumber = savedData.winnerTeamNumber
      this.currentSet = savedData.currentSet
      this.history = savedData.history || []
      this.currentHistoryIndex = savedData.currentHistoryIndex || -1
      this.sets = savedData.sets
    } else {
      this.saveToHistory()
    }
  }

  /**
   * earnScored 득점반영 함수
   * @param player userId
   * @param earnedType
   * @param missedUser
   */
  earnScored(player: number, earnedType: string, missedUser: Array<number>) {
    if (this.winnerTeamNumber || !this.teams) return

    // player기준 팀 이름을 가져옴
    const playerTeam = this.getPlayerTeam(player)

    // player기준 상대팀 이름을 가져옴
    const opponentTeam = playerTeam === 'team1' ? 'team2' : 'team1'

    if (playerTeam === 'Unknown Team') {
      return
    }

    const scoreKey: 'team1Score' | 'team2Score' = `${playerTeam}Score` as const
    const opponentScoreKey: 'team1Score' | 'team2Score' =
      `${opponentTeam}Score` as const

    // 점수 상승
    this.sets[this.currentSet - 1][scoreKey] += 1

    // 데이터 저장
    this.saveToHistory(player, earnedType, missedUser)

    // 현재 세트 종료 확인
    const isSetEnd = this.checkSetEnd(
      playerTeam,
      opponentTeam,
      scoreKey,
      opponentScoreKey,
    )
    if (isSetEnd) {
      const isGameEnd = this.checkGameWinner()
      if (!isGameEnd) {
        this.nextSet()
        this.currentSet += 1

        this.saveToHistory()
      }
    }
    this.saveToLocalStorage()
  }

  /**
   * faultScored 폴트반영 함수
   * @param player userId
   * @param earnedType
   * @param missedUser
   */
  faultScored(player: number, missedType: string) {
    if (this.winnerTeamNumber || !this.teams) return

    // player기준 팀 이름을 가져옴
    const playerTeam = this.getPlayerTeam(player)

    // player기준 상대팀 이름을 가져옴
    const opponentTeam = playerTeam === 'team1' ? 'team2' : 'team1'

    if (playerTeam === 'Unknown Team') {
      return
    }

    const scoreKey: 'team1Score' | 'team2Score' = `${playerTeam}Score` as const
    const opponentScoreKey: 'team1Score' | 'team2Score' =
      `${opponentTeam}Score` as const

    // 점수 상승
    this.sets[this.currentSet - 1][opponentScoreKey] += 1

    // 데이터 저장
    this.saveToHistory(null, null, [player], missedType)

    // 현재 세트 종료 확인
    const isSetEnd = this.checkSetEnd(
      playerTeam,
      opponentTeam,
      scoreKey,
      opponentScoreKey,
    )
    if (isSetEnd) {
      const isGameEnd = this.checkGameWinner()
      if (!isGameEnd) {
        this.nextSet()
        this.currentSet += 1

        this.saveToHistory()
      }
    }
    this.saveToLocalStorage()
  }

  /**
   * 현재 진행중인 세트가 끝났는지 확인
   */
  checkSetEnd(
    teamName: 'team1' | 'team2',
    opponentTeam: 'team1' | 'team2',
    scoreKey: 'team1Score' | 'team2Score',
    opponentScoreKey: 'team1Score' | 'team2Score',
  ) {
    const teamScore = this.sets[this.currentSet - 1][scoreKey]
    const opponentScore = this.sets[this.currentSet - 1][opponentScoreKey]
    const scoreDifference = Math.abs(teamScore - opponentScore)

    // 세트 종료 분기처리
    if (
      scoreDifference >= 2 &&
      Math.max(teamScore, opponentScore) >= SCOREBOARD_SETTING.matchScore
    ) {
      const winningTeam = teamScore > opponentScore ? teamName : opponentTeam
      const winSetScoreKey: 'team1SetScore' | 'team2SetScore' =
        `${winningTeam}SetScore` as const
      this[winSetScoreKey] += 1
      this.sets[this.currentSet - 1].setWinnerTeamNumber =
        winningTeam === 'team1' ? 1 : 2
      return true
      // this.checkGameWinner()
      // if (!this.winnerTeamNumber) {
      //   this.nextSet()
      // }
    }
    return false
  }

  /**
   * 게임이 끝났는지 확인 후 로컬스토리지 초기화
   */
  finishMatch() {
    if (this.winnerTeamNumber) {
      localStorage.removeItem('badmintonScoreboard')
      return
    }
    throw new Error('게임 종료 중 에러가 발생했습니다.')
  }

  /**
   * 경기의 승자를 반영
   */
  checkGameWinner() {
    if (this.team1SetScore === 2) {
      this.storeSetResult()
      this.winnerTeamNumber = 1 // 팀1 승리
      this.currentSet += 1
      this.saveToHistory()
      return true
    }
    if (this.team2SetScore === 2) {
      this.storeSetResult()
      this.winnerTeamNumber = 2 // 팀2 승리
      this.currentSet += 1
      this.saveToHistory()
      return true
    }
    return false
  }

  /**
   * 다음세트로 진행시 초기화 함수
   */
  nextSet() {
    if (!this.winnerTeamNumber) {
      this.storeSetResult()

      if (this.currentSet > 3) {
        alert('경기가 세트 최대 수를 초과했습니다.')
      }
    }
  }

  /**
   * 다음 세트를 시작하기 전 this.sets를 반영
   */

  storeSetResult() {
    const filteredHistoryData = this.history
      .filter((data) => data.scoreNumber !== -1)
      .filter((data) => data.currentSet === this.currentSet)

    const convertData = filteredHistoryData.map((data, index) => {
      if (!data.missedUser) {
        data.missedUser = []
      }
      return {
        scoreNumber: index + 1,
        earnedPlayer: this.getMemberNumber(data.player),
        missedPlayer1: this.getMemberNumber(data.missedUser[0]) || null,
        missedPlayer2: this.getMemberNumber(data.missedUser[1]) || null,
        earnedType: data.earnedType || null,
        missedType: data.missedType || null,
      }
    })
    this.sets[this.currentSet - 1].scores = convertData
  }

  getMemberNumber(
    playerId: number | undefined | null,
  ): 11 | 12 | 21 | 22 | null {
    if (!this.teams.team1) {
      return null
    }
    if (!this.teams.team2) {
      return null
    }

    if (playerId === this.teams.team1.player1.id) return 11
    if (playerId === this.teams.team1.player2.id) return 12
    if (playerId === this.teams.team2.player1.id) return 21
    if (playerId === this.teams.team2.player2.id) return 22
    return null // 매칭되지 않으면 null
  }

  /**
   * history undo
   */
  undo() {
    if (this.currentHistoryIndex > 0) {
      this.currentHistoryIndex -= 1
      this.applyState(this.history[this.currentHistoryIndex])
    }
  }

  /**
   * history redo
   */
  redo() {
    if (this.currentHistoryIndex < this.history.length - 1) {
      this.currentHistoryIndex += 1

      this.applyState(this.history[this.currentHistoryIndex])
    }
  }

  /**
   * state 적용
   */
  applyState(state: {
    team1SetScore: number
    team2SetScore: number
    team1MatchScore: number
    team2MatchScore: number
    winnerTeamNumber: number | null
    currentSet: number
  }) {
    this.currentSet = state.currentSet
    this.team1SetScore = state.team1SetScore
    this.team2SetScore = state.team2SetScore

    this.sets[this.currentSet - 1].team1Score = state.team1MatchScore
    this.sets[this.currentSet - 1].team2Score = state.team2MatchScore
    this.winnerTeamNumber = state.winnerTeamNumber

    this.saveToLocalStorage()
  }

  saveToHistory(
    player?: number | null,
    earnedType?: string | null,
    missedUser?: Array<number> | null,
    missedType?: string | null,
  ) {
    // 현재 상태를 히스토리에 저장하고, 인덱스 갱신
    const currentState = {
      player,
      earnedType,
      missedUser,
      missedType,
      scoreNumber: this.currentHistoryIndex,
      currentSet: this.currentSet,
      team1SetScore: this.team1SetScore,
      team2SetScore: this.team2SetScore,
      team1MatchScore: this.sets[this.currentSet - 1].team1Score,
      team2MatchScore: this.sets[this.currentSet - 1].team2Score,
      winnerTeamNumber: this.winnerTeamNumber,
    }
    // 현재 인덱스보다 이후의 히스토리가 존재할 경우 삭제 (되돌리기 후 새로 입력된 경우)
    if (this.currentHistoryIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentHistoryIndex + 1)
    }
    this.history.push(currentState)
    this.currentHistoryIndex += 1
  }

  /**
   * 인스턴스를 로컬스토리지에 저장
   */
  saveToLocalStorage() {
    localStorage.setItem('badmintonScoreboard', JSON.stringify(this))
  }

  /**
   * 현재 진행중인 세트를 반환
   */
  getCurrentSet() {
    return this.currentSet
  }

  /**
   * 현재 team1의 매치스코어 반환
   */
  getCurMatchScoreTeam1() {
    if (this.currentSet >= 4) return 0
    return this.sets[this.getCurrentSet() - 1].team1Score
  }

  /**
   * 현재 team2의 매치스코어 반환
   */
  getCurMatchScoreTeam2() {
    if (this.currentSet >= 4) return 0
    return this.sets[this.getCurrentSet() - 1].team2Score
  }

  getPlayerTeam(player: number) {
    if (!this.teams.team1 || !this.teams.team2) {
      return 'Unknown Team'
    }

    return (
      (['team1', 'team2'] as TeamKey[]).find(
        (team) =>
          this.teams[team] &&
          [this.teams[team].player1.id, this.teams[team].player2.id].includes(
            player,
          ),
      ) || 'Unknown Team'
    )
  }

  /**
   * 로컬스토리지에 저장된 데이터를 반환
   */
  static loadFromLocalStorage() {
    const savedData = localStorage.getItem(`badmintonScoreboard`)
    return savedData ? JSON.parse(savedData) : null
  }
}

export default BadmintonScoreboardInstance
