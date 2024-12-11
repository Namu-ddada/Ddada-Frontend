import Image from 'next/image'

import { PlayerType, SatDataType } from '@/features/mypage/types/MyMatchType.ts'
import GAINED_BAR from '@/static/imgs/mypage/my-page-gained-bar.svg'
import LOST_BAR from '@/static/imgs/mypage/my-page-lost-bar.svg'

interface MatchTimeLineProps {
  teamAPlayer1: PlayerType
  teamAPlayer2: PlayerType
  teamBPlayer1: PlayerType
  teamBPlayer2: PlayerType
  userTeamNum: number
  setData: SatDataType
}

export default function MatchTimeLine({
  teamAPlayer1,
  teamAPlayer2,
  teamBPlayer1,
  teamBPlayer2,
  userTeamNum,
  setData,
}: MatchTimeLineProps) {
  let teamAScore = 0
  let teamBScore = 0
  if (!setData) {
    return (
      <div className="flex flex-col items-center text-disabled-dark">
        <p className="text-sm">해당 세트는 존재하지 않아요</p>
      </div>
    )
  }
  const getPlayerInfo = (playerNum: number) => {
    switch (playerNum) {
      case teamAPlayer1.playerNum:
        return teamAPlayer1
      case teamAPlayer2.playerNum:
        return teamAPlayer2
      case teamBPlayer1.playerNum:
        return teamBPlayer1
      case teamBPlayer2.playerNum:
        return teamBPlayer2
      default:
        return null
    }
  }
  return (
    <div className="flex flex-col items-center text-disabled-dark">
      <p className="text-sm">매치스코어</p>
      <div className="text-4xl font-bold">
        <span
          className={`
          ${userTeamNum === 1 && 'text-theme'}
          `}
        >
          {setData.team1Score}
        </span>{' '}
        :{' '}
        <span
          className={`
          ${userTeamNum === 2 && 'text-theme'}
          `}
        >
          {setData.team2Score}
        </span>
      </div>
      <div className="flex flex-col items-center gap-[0.625rem] w-full">
        {setData.scores.map((score) => {
          let earnedPlayer = null
          let isUserTeam = false
          let BarComponent = GAINED_BAR
          let isTeamA = false
          if (score.earnedMember) {
            earnedPlayer = getPlayerInfo(score.earnedMember)
            isUserTeam = userTeamNum === (score.earnedMember <= 20 ? 1 : 2)
            BarComponent = isUserTeam ? GAINED_BAR : LOST_BAR
            isTeamA = score.earnedMember <= 20
          } else if (score.missedMember1) {
            earnedPlayer = getPlayerInfo(score!.missedMember1)
            isUserTeam = userTeamNum === (score.missedMember1 <= 20 ? 2 : 1)
            BarComponent = isUserTeam ? GAINED_BAR : LOST_BAR
            isTeamA = score.missedMember1 >= 20
          }

          if (isTeamA) {
            teamAScore += 1
          } else {
            teamBScore += 1
          }

          return (
            <div
              key={`${score.scoreNumber}`}
              className="flex gap-3 items-center w-full"
            >
              {isTeamA ? (
                <>
                  <div className="flex flex-col flex-1 justify-end items-end">
                    <p
                      className={`font-bold
                      ${userTeamNum === 1 ? 'text-primary' : 'text-danger'}
                      `}
                    >
                      {teamAScore}:{teamBScore}
                    </p>
                    {earnedPlayer && (
                      <div className="flex gap-1 justify-center items-center">
                        <div className="flex text-sm gap-2 p-1">
                          <div className="w-6 h-6 overflow-hidden relative rounded-full">
                            <Image
                              src={earnedPlayer.profileImagePath}
                              alt="profile"
                              fill
                            />
                          </div>
                        </div>
                        <p className="text-xs">{earnedPlayer.nickname}</p>
                        <div className="text-sm">
                          {score.earnedType === 'SMASH' && <p>스매쉬</p>}
                          {score.earnedType === 'HAIRPIN' && <p>헤어핀</p>}
                          {score.earnedType === 'DROP' && <p>드롭</p>}
                          {score.earnedType === 'PUSH' && <p>푸시</p>}
                          {score.earnedType === 'SERVE' && <p>서브</p>}
                          {score.earnedType === 'CLEAR' && <p>클리어</p>}
                          {score.missedType === 'SERVE_MISS' && <p>서브미스</p>}
                        </div>
                      </div>
                    )}
                  </div>
                  <BarComponent />
                  <div className="flex-1" />
                </>
              ) : (
                <>
                  <div className="flex-1" />
                  <BarComponent />
                  <div className="flex flex-col flex-1">
                    <p
                      className={`font-bold
                      ${userTeamNum === 2 ? 'text-primary' : 'text-danger'}
                      `}
                    >
                      {teamAScore}:{teamBScore}
                    </p>
                    {earnedPlayer && (
                      <div className="flex gap-1 items-center">
                        <div className="flex text-sm gap-2 p-1">
                          <div className="w-6 h-6 overflow-hidden relative rounded-full">
                            <Image
                              src={earnedPlayer.profileImagePath}
                              alt="profile"
                              fill
                            />
                          </div>
                        </div>
                        <p className="text-xs">{earnedPlayer.nickname}</p>
                        <div className="text-sm ">
                          {score.earnedType === 'SMASH' && <p>스매쉬</p>}
                          {score.earnedType === 'HAIRPIN' && <p>헤어핀</p>}
                          {score.earnedType === 'DROP' && <p>드롭</p>}
                          {score.earnedType === 'PUSH' && <p>푸시</p>}
                          {score.earnedType === 'SERVE' && <p>서브</p>}
                          {score.earnedType === 'CLEAR' && <p>클리어</p>}
                          {score.missedType === 'SERVE_MISS' && <p>서브미스</p>}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
