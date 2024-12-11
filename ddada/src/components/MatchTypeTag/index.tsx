interface MatchTypeButtonProps {
  matchType?: string
  matchRankType?: string
}

export default function MatchTypeTag({
  matchType,
  matchRankType,
}: MatchTypeButtonProps) {
  return (
    <div
      className={`rounded-full px-2 py-1 text-xs text-white
    ${matchType ? 'bg-[#FCA211]' : ''}
    ${matchRankType && (matchRankType === 'RANK' ? 'bg-[#DC3545]' : 'bg-[#0D6EFD]')}
    `}
    >
      {matchType === 'FEMALE_DOUBLE' && '여성복식'}
      {matchType === 'MIXED_DOUBLE' && '혼합복식'}
      {matchType === 'MALE_DOUBLE' && '남성복식'}
      {matchRankType && (matchRankType === 'RANK' ? '경쟁전' : '친선경기')}
    </div>
  )
}
