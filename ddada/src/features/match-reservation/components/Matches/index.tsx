import MatchesCards from '@/features/match-reservation/components/MatchesDetail/index.tsx'
import { MatchType } from '@/features/match-reservation/types/MatchType.ts'

interface MatchesProps {
  matchList: MatchType[]
  selectedDate: string
}

export default function Matches({ matchList, selectedDate }: MatchesProps) {
  return (
    <div className="flex flex-col gap-1">
      {matchList.map((match) =>
        selectedDate !== match.date ||
        match.status === 'FINISHED' ||
        match.status === 'PLAYING'
          ? null
          : !match.isReserved && <MatchesCards match={match} key={match.id} />,
      )}
    </div>
  )
}
