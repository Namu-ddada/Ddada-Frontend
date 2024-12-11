'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import ProgressBar from '@/features/racketRecommend/components/ProgressBar/index.tsx'
import RacketRecommendBranch from '@/features/racketRecommend/components/RacketRecommendBranch/index.tsx'
import ResultLoading from '@/features/racketRecommend/components/RacketRecommendBranch/RecommendStep/ResultLoading.tsx'
import useRacketRecommendStore from '@/features/racketRecommend/stores/useRacketRecommendStore.ts'
import useSelectRacketStore from '@/features/racketRecommend/stores/useSelectRacketStore.ts'
import { ProgressStepType } from '@/features/racketRecommend/types/RacketRecommendType.ts'
import BackIcon from '@/static/imgs/racketRecommned/BackIcon.svg'

export default function RecommendPage() {
  const router = useRouter()
  const { canMoveNext, setCanMoveNext } = useRacketRecommendStore()
  const { updateIsNone } = useSelectRacketStore()
  const [recommendStep, setRecommendStep] = useState<ProgressStepType>(
    ProgressStepType.step1,
  )
  const [step, setStep] = useState<number>(1)

  const handleMoveNext = () => {
    setStep(step + 1)
    let nextStep: ProgressStepType

    switch (step + 1) {
      case 1:
        nextStep = ProgressStepType.step1
        break
      case 2:
        nextStep = ProgressStepType.step2
        break
      case 3:
        nextStep = ProgressStepType.step3
        break
      case 4:
        nextStep = ProgressStepType.step4
        break
      case 5:
        nextStep = ProgressStepType.step5
        break
      default:
        nextStep = ProgressStepType.main // 처음으로 돌아가거나, 다른 처리를 원할 때
    }

    setRecommendStep(nextStep)
    setCanMoveNext(false)
  }

  const handleMoveBack = () => {
    updateIsNone(false)
    setCanMoveNext(false)
    router.back()
  }

  if (recommendStep === ProgressStepType.loading) {
    return (
      <div className="flex justify-center h-[calc(100vh-5.125rem)]">
        <ResultLoading />
      </div>
    )
  }
  return (
    <div className="flex justify-center pb-20">
      <div className="grow flex flex-col gap-y-[5.25rem] max-w-[34rem]">
        <div className="flex">
          <button type="button" onClick={() => handleMoveBack()}>
            <p className="flex gap-x-2 items-center text-sm  text-disabled-dark">
              <BackIcon />
              <span>이전으로 돌아가기</span>
            </p>
          </button>
        </div>

        <div className="flex flex-col gap-y-2 px-6">
          <ProgressBar step={step} />
        </div>
        <div className="grow">
          <RacketRecommendBranch
            progressStep={recommendStep}
            changeProgress={setRecommendStep}
            // changeMoveNext={setCanMoveNext}
            changeStep={setStep}
          />
        </div>

        {canMoveNext && (
          <button
            type="button"
            className=" bg-[#FCA211] text-white px-6 py-3 rounded-xl"
            // onClick={() => changeProgress(ProgressStepType.step2)}
            onClick={() => handleMoveNext()}
          >
            다음
          </button>
        )}
      </div>
    </div>
  )
}
