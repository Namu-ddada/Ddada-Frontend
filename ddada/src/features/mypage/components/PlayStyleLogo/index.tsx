import Image from 'next/image'

import Allrounder from '@/static/imgs/mypage/playstyle/Allrounder.png'

interface PlayStyleLogoProps {
  userPlayStyle: {
    type: string
    type_message: string
  }
}

export default function PlayStyleLogo({ userPlayStyle }: PlayStyleLogoProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative rounded-xl">
        <p className="absolute w-full px-5 flex flex-col gap-y-2 justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
          <span className="text-4xl font-bold">
            {userPlayStyle.type.replace(/"/g, '')}
          </span>
          <span className="text-xs text-center">
            {userPlayStyle.type_message.replace(/"/g, '')}
          </span>
        </p>
        <Image
          className="w-[35.375rem] h-[18rem] object-cover overflow-hidden rounded-xl"
          src={Allrounder}
          alt="Allrounder"
          width={580}
          height={220}
        />
      </div>
      <p className="text-xs font-disabled-dark">
        위 플레이스타일은 누적 매치에 의한 분석 결과로, 참여한 매치 수가 적다면
        분석이 정확하지 않을 수 있습니다.
      </p>
    </div>
  )
}
