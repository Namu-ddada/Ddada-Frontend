'use client'

import Image from 'next/image'

import MainBackgroundImg from '@/static/imgs/racketRecommned/MainBackgroundImg.png'
import TimerIcon from '@/static/imgs/racketRecommned/TimerIcon.svg'
import Link from 'next/link'

export default function RacketPage() {
  return (
    <div className="relative w-full h-[calc(100vh-5.125rem)]">
      <Image
        className="w-full h-full"
        src={MainBackgroundImg}
        alt="MainBannerImg"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-y-12">
          <div className="text-2xl text-white text-center">
            <p>
              <span className="text-[#FCA211]">라켓</span>을 사고 싶은데 찾기
              어려우셨나요?
            </p>
            <p>따다에서 간단한 테스트로 추천받아보세요</p>
          </div>

          <div className="flex gap-x-2 justify-center">
            <TimerIcon />
            <span className="text-[#FCA211] text-sm">2분</span>
          </div>
          <Link
            className="border border-[#FCA211] text-[#FCA211] px-4 py-2 text-center rounded"
            href={'/racket/recommend'}
          >
            시작
          </Link>
        </div>
      </div>
    </div>
  )
}
