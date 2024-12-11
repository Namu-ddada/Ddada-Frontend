interface MatchTypeButtonProps {
  matchType?: string
  matchRankType?: string
}

export default function MatchTypeButton({
  matchType,
  matchRankType,
}: MatchTypeButtonProps) {
  return (
    <div
      className={`rounded-full px-2 py-1 text-xs text-white
    ${matchType ? 'bg-theme' : ''}
    ${matchRankType && (matchRankType === 'RANK' ? 'bg-danger' : 'bg-primary')}
    `}
    >
      {matchType === 'FEMALE_DOUBLE' && '여성복식'}
      {matchType === 'MIXED_DOUBLE' && '혼합복식'}
      {matchType === 'MALE_DOUBLE' && '남성복식'}
      {matchRankType && (matchRankType === 'RANK' ? '경쟁전' : '친선경기')}
    </div>
  )
}
