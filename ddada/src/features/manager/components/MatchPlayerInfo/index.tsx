// import GameUserInfo from '@/features/manager/components/GameUserInfo/index.tsx'
import MatchTeamInfo from '@/features/manager/components/MatchTeamInfo/index.tsx'
import { MatchDetailType } from '@/features/manager/types/MatchDataType.ts'

interface MatchPlayerInfoProps {
  data: MatchDetailType
}

export default function MatchPlayerInfo({ data }: MatchPlayerInfoProps) {
  return (
    <div className="p-2 flex flex-col gap-y-6 bg-white">
      <h2 className="text-xl font-bold">선수 정보</h2>

      {/* 선수목록 */}
      <div className="flex gap-x-6 items-center">
        {/* A팀 */}
        <div className="flex flex-col gap-y-3">
          {/* 개별 컴포 */}

          {[data.team1.player1, data.team1.player2].map((player, idx) => (
            <MatchTeamInfo
              key={player ? player.id : data.id + idx}
              team="A"
              idx={idx}
              player={player}
            />
          ))}
        </div>
        <div> | </div>

        {/* B팀 */}
        <div className="flex flex-col gap-y-3">
          {[data.team2.player1, data.team2.player2].map((player, idx) => (
            <MatchTeamInfo
              key={player ? player.id : data.id + idx}
              team="B"
              idx={idx}
              player={player}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
