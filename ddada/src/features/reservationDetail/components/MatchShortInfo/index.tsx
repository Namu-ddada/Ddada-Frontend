import { WEEKDAYS } from '@/constants/day/index.ts'
import MatchTypeButton from '@/features/match-reservation/components/MatchTypeButton/index.tsx'
import { useMatchDetailContext } from '@/features/reservationDetail/providers/index.tsx'

export default function MatchShortInfo() {
  const matchDetailData = useMatchDetailContext()

  return (
    <div className="flex flex-col gap-y-6 p-2 text-sm bg-white">
      <div className=" py-1 flex">
        <h1 className="text-base font-bold border-b-2 border-theme box-border">
          매치정보
        </h1>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">타이틀</h2>
        <p className=" text-disabled-dark">{matchDetailData.court.name}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">주소</h2>
        <p className=" text-disabled-dark">{matchDetailData.court.address}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">일시</h2>
        <p className=" text-disabled-dark">
          {matchDetailData.date}(
          {WEEKDAYS[new Date(matchDetailData.date).getDay()]}){' '}
          {new Date(
            `${matchDetailData.date}T${matchDetailData.time}`,
          ).getHours()}
          :00-
          {new Date(
            `${matchDetailData.date}T${matchDetailData.time}`,
          ).getHours() + 1}
          :00(1시간){' '}
        </p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">매치타입</h2>
        <div className="flex gap-x-1">
          <MatchTypeButton matchType={matchDetailData.matchType as string} />
          <MatchTypeButton matchRankType={matchDetailData.rankType} />
        </div>
      </div>
    </div>
  )
}
