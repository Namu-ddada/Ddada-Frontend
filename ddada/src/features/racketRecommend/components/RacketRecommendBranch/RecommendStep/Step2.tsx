'use client'

import Image from 'next/image'

import useRacketRecommendStore from '@/features/racketRecommend/stores/useRacketRecommendStore.ts'
import {
  ProgressStepType,
  RacketRecommendBranchProps,
} from '@/features/racketRecommend/types/RacketRecommendType.ts'
import AllrounderStyleImg from '@/static/imgs/racketRecommned/AllrounderStyleImg.png'
import AttackStyleImg from '@/static/imgs/racketRecommned/AttackStyleImg.png'
import DefenseStyleImg from '@/static/imgs/racketRecommned/DefenseStyleImg.png'

export default function Step1({
  changeProgress,
  changeStep,
}: RacketRecommendBranchProps) {
  const { setPreference } = useRacketRecommendStore()

  const handleSelectNext = (style: string) => {
    changeStep(3)
    changeProgress(ProgressStepType.step3)
    setPreference('balance', style)
  }

  return (
    <div className="flex flex-col gap-y-[5.25rem] w-[34rem] ">
      <p className="text-xl text-center">
        가장 마음에 드는 플레이스타일을 선택해주세요.
      </p>
      <div className="flex gap-x-3 justify-between">
        {/* 3개의 스타일 */}
        {/* 공격형 */}
        <div
          onClick={() => handleSelectNext('attack')}
          className="max-h-[13.75rem] px-3 py-6 flex flex-col gap-y-3 rounded-xl hover:bg-base-50 cursor-pointer"
          aria-hidden="true"
        >
          <Image src={AttackStyleImg} alt="AttackStyleImg" />
          <div className="flex flex-col gap-y-1 items-center">
            <span className="text-sm">공격적인 스타일</span>
            <p className="text-xs text-disabled-dark flex flex-col items-center">
              <span>과감하게 기회를 만들어내는</span>
              <span>플레이를 선호해요</span>
            </p>
          </div>
        </div>
        {/* 수비형 */}
        <div
          onClick={() => handleSelectNext('defense')}
          className="max-h-[13.75rem] px-3 py-6 flex flex-col gap-y-3 rounded-xl hover:bg-base-50 cursor-pointer"
          aria-hidden="true"
        >
          <Image src={DefenseStyleImg} alt="DefenseStyleImg" />
          <div className="flex flex-col gap-y-1 items-center">
            <span className="text-sm">수비적인 스타일</span>
            <p className="text-xs text-disabled-dark flex flex-col items-center">
              <span>실수를 최소화하며 안정적인</span>
              <span>플레이를 선호해요</span>
            </p>
          </div>
        </div>
        {/* 올라운더형 */}
        <div
          onClick={() => handleSelectNext('allround')}
          className="max-h-[13.75rem] px-3 py-6 flex flex-col gap-y-3 rounded-xl hover:bg-base-50 cursor-pointer"
          aria-hidden="true"
        >
          <Image src={AllrounderStyleImg} alt="AllrounderStyleImg" />
          <div className="flex flex-col gap-y-1 items-center">
            <span className="text-sm">올라운더</span>
            <p className="text-xs text-disabled-dark flex flex-col items-center">
              <span>상황에 맞는 유연하게 대처를</span>
              <span>선호해요</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
