import { toast } from 'react-hot-toast'

import { MatchDetailType } from '@/features/manager/types/MatchDataType.ts'
import ClockIcon from '@/static/imgs/manager/ClockIcon.svg'
import ReportIcon from '@/static/imgs/manager/ReportIcon.svg'

interface MatchCourtInfoProps {
  data: MatchDetailType
}

export default function MatchCourtShortInfo({ data }: MatchCourtInfoProps) {
  const matchDate = new Date(data.date)

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address)
    toast.success('번호를 복사했습니다!')
  }
  return (
    <div>
      {/* 경기장 정보 */}
      <div className=" py-6 px-2 flex items-center">
        <div className="flex gap-y-1 grow text-sm flex-col">
          <p className="font-bold text-2xl">{data.court.name}</p>
          <p>
            <span className="text-[#5F6368]">{data.court.address}</span>{' '}
            <button
              type="button"
              className="text-theme underline"
              onClick={() => handleCopy(data.court.address)}
            >
              주소복사
            </button>
          </p>
          <div className="text-[#5F6368] flex gap-x-1 items-center">
            <ClockIcon />
            <p>
              {matchDate.getMonth()}월 {matchDate.getDay()}일{' '}
              {matchDate.getHours()}:{matchDate.getMinutes()}
            </p>
          </div>
        </div>
        <ReportIcon />
      </div>
    </div>
  )
}
