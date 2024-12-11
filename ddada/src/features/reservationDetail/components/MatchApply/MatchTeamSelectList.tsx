import { MatchDetailType } from '@/features/manager/types/MatchDataType.ts'
import TeamSelectBtn from '@/features/reservationDetail/components/TeamSelectBtn/index.tsx'

interface MatchTeamSelectListProps {
  userRole: string | undefined
  data: MatchDetailType
  isTeamA: boolean
  isTeamB: boolean
  isManager: boolean
  clickedTeam: number
  setClickedTeam: (arg: number) => void
}

export default function MatchTeamSelectList({
  userRole,
  isTeamA,
  isTeamB,
  isManager,
  clickedTeam,
  data,
  setClickedTeam,
}: MatchTeamSelectListProps) {
  const teamALength = [data.team1.player1, data.team1.player2].filter(
    (player) => player !== null,
  ).length
  const teamBLength = [data.team2.player1, data.team2.player2].filter(
    (player) => player !== null,
  ).length

  const managerLength = [data.manager].filter(
    (player) => player !== null,
  ).length
  if (userRole === 'PLAYER') {
    return (
      <div className="p-1 flex gap-x-2">
        {/* A 팀 */}
        <button
          type="button"
          className="flex-1"
          onClick={() => {
            setClickedTeam(1)
          }}
          disabled={isTeamA || isTeamB || isManager || teamALength === 2}
        >
          <TeamSelectBtn
            isDisabled={isManager || isTeamB || teamALength === 2}
            isJoined={isTeamA}
            isClicked={clickedTeam === 1 || isTeamA}
          >
            <span className="font-bold">A팀</span>
            <span>
              ({teamALength}
              /2)
            </span>
          </TeamSelectBtn>
        </button>

        {/* B 팀 */}
        <button
          type="button"
          className="flex-1"
          onClick={() => {
            setClickedTeam(2)
          }}
          disabled={isTeamA || isTeamB || isManager || teamBLength === 2}
        >
          <TeamSelectBtn
            isDisabled={isManager || isTeamA || teamBLength === 2}
            isClicked={clickedTeam === 2 || isTeamB}
            isJoined={isTeamB}
          >
            <span className="font-bold">B팀</span>
            <span>
              ({teamBLength}
              /2)
            </span>
          </TeamSelectBtn>
        </button>

        {/* Manager */}
        <button type="button" className="flex-1" disabled>
          <TeamSelectBtn isDisabled>
            <span className="font-bold">매니저</span>
            <span>
              ({managerLength}
              /1)
            </span>
          </TeamSelectBtn>
        </button>
      </div>
    )
  }

  return (
    <div className="p-1 flex gap-x-2">
      {/* A 팀 */}
      <button type="button" className="flex-1" disabled>
        <TeamSelectBtn isDisabled>
          <span className="font-bold">A팀</span>
          <span>
            ({teamALength}
            /2)
          </span>
        </TeamSelectBtn>
      </button>

      {/* B 팀 */}
      <button type="button" className="flex-1" disabled>
        <TeamSelectBtn isDisabled>
          <span className="font-bold">B팀</span>
          <span>
            ({teamBLength}
            /2)
          </span>
        </TeamSelectBtn>
      </button>

      {/* Manager */}
      <button
        type="button"
        className="flex-1"
        onClick={() => {
          setClickedTeam(3)
        }}
        disabled={
          isTeamA ||
          isTeamB ||
          isManager ||
          userRole === 'PLAYER' ||
          userRole === undefined
        }
      >
        <TeamSelectBtn
          isDisabled={
            isTeamA ||
            isTeamB ||
            userRole === 'PLAYER' ||
            managerLength === 1 ||
            userRole === undefined
          }
          isJoined={isManager}
          isClicked={clickedTeam === 3 || isManager}
        >
          <span className="font-bold">매니저</span>
          <span>
            ({managerLength}
            /1)
          </span>
        </TeamSelectBtn>
      </button>
    </div>
  )
}
