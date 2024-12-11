import Image from 'next/image'

import {
  ProgressStepType,
  RacketRecommendBranchProps,
} from '@/features/racketRecommend/types/RacketRecommendType.ts'
import MainBackgroundImg from '@/static/imgs/racketRecommned/MainBackgroundImg.png'
import TimerIcon from '@/static/imgs/racketRecommned/TimerIcon.svg'

export default function MainStep({
  changeProgress,
}: RacketRecommendBranchProps) {
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
              <span className="text-theme">라켓</span>을 사고 싶은데 찾기
              어려우셨나요?
            </p>
            <p>따다에서 간단한 테스트로 추천받아보세요</p>
          </div>

          <div className="flex gap-x-2 justify-center">
            <TimerIcon />
            <span className="text-theme text-sm">2분</span>
          </div>
          <button
            type="button"
            className="border border-theme text-theme px-4 py-2"
            onClick={() => changeProgress(ProgressStepType.step1)}
          >
            시작
          </button>
        </div>
      </div>
    </div>
  )
}
