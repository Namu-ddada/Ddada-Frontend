import UserTierWithIcon from '@/components/UserTierWithIcon/index.tsx'
import GameUserInfo from '@/features/manager/components/GameUserInfo/index.tsx'
import { PlayerType } from '@/features/manager/types/MatchDataType.ts'
import TangerineFillDot from '@/static/imgs/manager/TangerineFillDot.svg'
import TangerineLightDot from '@/static/imgs/manager/TangerineLightDot.svg'

interface MatchTeamInfoProps {
  player: PlayerType
  team: string
  idx: number
}

export default function MatchTeamInfo({
  player,
  team,
  idx,
}: MatchTeamInfoProps) {
  return (
    <div className="grow">
      {player ? (
        <div className="flex gap-x-3 grow">
          <GameUserInfo src={player.image} />
          <div className="flex flex-col gap-y-1 text-sm">
            <p className="flex gap-x-1 items-center">
              <span className="font-bold">
                [{team}
                {idx + 1}] {player.nickname}
              </span>
              {team === 'A' ? <TangerineLightDot /> : <TangerineFillDot />}
            </p>
            <UserTierWithIcon
              rating={player.rating}
              gameCount={player.gameCount}
            />
          </div>
        </div>
      ) : (
        <p className="text-sm text-disabled-dark font-bold text-center grow">
          매칭중...
        </p>
      )}
    </div>
  )
}
