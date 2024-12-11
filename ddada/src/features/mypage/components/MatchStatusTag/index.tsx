import { useEffect, useState } from 'react'

interface MatchStatusTagProps {
  matchStatus: string
  ratingChange?: number
}

export default function MatchStatusTag({
  matchStatus,
  ratingChange,
}: MatchStatusTagProps) {
  const [ratingChangeColor, setRatingChangeColor] = useState<string>('')
  useEffect(() => {
    if (ratingChange && ratingChange < 0) {
      setRatingChangeColor('DEFEAT')
    } else if (ratingChange && ratingChange > 0) {
      setRatingChangeColor('VICTORY')
    }
  }, [ratingChange])
  return (
    <div
      className={`border rounded-full h-[3.125rem] w-[3.125rem] flex justify-center items-center
      ${matchStatus === 'CREATED' && 'border-theme text-theme bg-theme-light'}
      ${matchStatus === 'RESERVED' && 'border-success text-success bg-success bg-opacity-20'}
      ${matchStatus === 'CANCELED' && 'border-disabled-dark text-disabled-dark bg-disabled-dark bg-opacity-20'}
      ${matchStatus === 'PLAYING' && 'border-purple-700 text-purple-700 bg-purple-700 bg-opacity-20'}
      ${ratingChangeColor === 'VICTORY' && 'border-primary text-primary bg-primary bg-opacity-10'}
      ${ratingChangeColor === 'DEFEAT' && 'border-danger text-danger bg-danger bg-opacity-20'}
    `}
    >
      {matchStatus === 'CREATED' && <p className="text-theme">모집중</p>}
      {matchStatus === 'RESERVED' && <p className="text-success">모집완료</p>}
      {matchStatus === 'PLAYING' && <p className="text-purple-600">게임중</p>}
      {matchStatus === 'CANCELED' && (
        <p className="text-disabled-dark">취소됨</p>
      )}
      {matchStatus === 'FINISHED' && ratingChangeColor === 'VICTORY' && (
        <p className="text-primary">+{ratingChange}</p>
      )}
      {matchStatus === 'FINISHED' && ratingChangeColor === 'DEFEAT' && (
        <p className="text-danger">{ratingChange}</p>
      )}
    </div>
  )
}
