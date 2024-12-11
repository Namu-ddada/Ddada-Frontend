import Image from 'next/image'

import { RacketDetailType } from '@/features/racketRecommend/types/RacketRecommendType.ts'

interface RacketDetailCardProps {
  data: RacketDetailType
}

export default function RacketDetailCard({ data }: RacketDetailCardProps) {
  return (
    <div className="border border-disabled py-6 px-3 gap-x-3 flex items-center rounded-xl cursor-pointer hover:bg-base-50 ">
      <Image
        width={100}
        height={100}
        src={data.image.startsWith('//') ? `https:${data.image}` : data.image}
        alt={data.name}
      />
      <p className="flex flex-col gap-y-1 items-center">
        <span className="text-sm">
          {data.name.length >= 16 ? `${data.name.slice(0, 15)}..` : data.name}
        </span>
        <span className="text-xs text-disabled-dark">{data.manufacturer}</span>
      </p>
      <p className="flex flex-col gap-y-1 grow items-center">
        <span className="text-sm ">무게</span>
        <span className="text-xs text-disabled-dark">{data.weight}</span>
      </p>
      <p className="flex flex-col gap-y-1 grow items-center">
        <span className="text-sm ">재질</span>
        <span className="text-xs text-disabled-dark">{data.material}</span>
      </p>
    </div>
  )
}
