import NormalMatchIcon from '@/static/imgs/match-reservation/match-reservation_normal_match_icon.svg'
import RankMatchIcon from '@/static/imgs/match-reservation/match-reservation_rank_match_icon.svg'

interface MatchToggleProps {
  matchRankType: string
  handleMatchRankType: (matchRankType: string) => void
}

export default function MatchToggle({
  matchRankType,
  handleMatchRankType,
}: MatchToggleProps) {
  const handleMatchType = () => {
    if (matchRankType === 'RANK') {
      handleMatchRankType('NORMAL')
    } else {
      handleMatchRankType('RANK')
    }
  }

  return (
    <button
      type="button"
      onClick={handleMatchType}
      className="text-xs relative grid grid-cols-2 w-[200px] rounded-full bg-disabled border border-[5px] border-disabled"
    >
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-white rounded-full transition-all duration-300 z-0 ${
          matchRankType === 'RANK' ? 'translate-x-full' : ''
        }`}
      />

      <div
        className={`flex py-2 px-4 gap-2 text-center z-10 transition-colors duration-300
        ${matchRankType === 'NORMAL' ? 'font-bold text-black' : ''}
        `}
      >
        <NormalMatchIcon />
        친선
      </div>
      <div
        className={`flex py-2 px-4 gap-2 text-center  z-10 transition-colors duration-300
        ${matchRankType === 'RANK' ? 'font-bold text-black' : ''}
        `}
      >
        <RankMatchIcon />
        랭크
      </div>
    </button>
  )
}
