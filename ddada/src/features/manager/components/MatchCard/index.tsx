'use client'

import Image from 'next/image'

import { ManagerMatchDetailType } from '@/features/manager/types/MatchDataType.ts'
import TangerineBlankDot from '@/static/imgs/manager/TangerineBlankDot.svg'
import TangerinefillDot from '@/static/imgs/manager/TangerineFillDot.svg'

interface MatchCardProps {
  data: ManagerMatchDetailType
  isClicked: boolean
}

export default function MatchCard({ data, isClicked }: MatchCardProps) {
  const time = data.time.split(':')
  const diffDate =
    new Date(new Date(data.date).getTime() - new Date().getTime()).getDate() - 1

  return (
    <div
      className={`px-2 py-6 flex gap-x-3 border border-base-100 box-border ${isClicked && `bg-theme-light`}`}
    >
      <div className="w-16 rounded-lg relative overflow-hidden">
        <Image
          src={data.court.image}
          alt="court image"
          sizes="50vw"
          style={{ objectFit: 'cover' }}
          fill
          priority
        />
      </div>
      <div className="flex flex-col gap-y-3 w-full max-w-[16.375rem]">
        <div className="flex flex-col gap-y-1">
          <p className="flex gap-x-2.5">
            <span className="font-bold grow">
              {data.court.name.length > 14
                ? `${data.court.name.substring(0, 14)}...`
                : data.court.name}
            </span>
            <span className="text-sm">
              {diffDate === 0 ? (
                <span className=" text-danger">오늘</span>
              ) : (
                <span className=" text-disabled-dark">{diffDate}일 후</span>
              )}
            </span>
          </p>
          <p className="text-sm">
            {data.court.address.length > 20
              ? `${data.court.address.substring(0, 20)}...`
              : data.court.address}
          </p>
          <p className="text-xs">
            {time[0]}:{time[1]}
          </p>
        </div>
        <div className="text-theme">
          {data.team1PlayerCount + data.team2PlayerCount === 4 ? (
            <span className="font-bold text-xs">모집완료</span>
          ) : (
            <div className="flex gap-x-1 ">
              {Array.from({
                length: data.team1PlayerCount + data.team2PlayerCount,
              }).map(() => (
                <TangerinefillDot key={data.id + Math.random()} />
              ))}

              {Array.from({
                length: 4 - (data.team1PlayerCount + data.team2PlayerCount),
              }).map(() => (
                <TangerineBlankDot key={data.id + Math.random()} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
