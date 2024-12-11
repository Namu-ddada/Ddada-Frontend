import MainStep from '@/features/racketRecommend/components/RacketRecommendBranch/RecommendStep/MainStep.tsx'
import Step1 from '@/features/racketRecommend/components/RacketRecommendBranch/RecommendStep/Step1.tsx'
import Step2 from '@/features/racketRecommend/components/RacketRecommendBranch/RecommendStep/Step2.tsx'
import Step3 from '@/features/racketRecommend/components/RacketRecommendBranch/RecommendStep/Step3.tsx'
import Step4 from '@/features/racketRecommend/components/RacketRecommendBranch/RecommendStep/Step4.tsx'
import Step5 from '@/features/racketRecommend/components/RacketRecommendBranch/RecommendStep/Step5.tsx'
import {
  ProgressStepType,
  RacketRecommendBranchProps,
} from '@/features/racketRecommend/types/RacketRecommendType.ts'

export default function RacketRecommendBranch({
  progressStep,
  changeProgress,
  // changeMoveNext,
  changeStep,
}: RacketRecommendBranchProps) {
  switch (progressStep) {
    case ProgressStepType.main:
      return (
        <MainStep changeProgress={changeProgress} changeStep={changeStep} />
      )
    case ProgressStepType.step1:
      return <Step1 />
    case ProgressStepType.step2:
      return <Step2 changeProgress={changeProgress} changeStep={changeStep} />
    case ProgressStepType.step3:
      return <Step3 changeProgress={changeProgress} changeStep={changeStep} />
    case ProgressStepType.step4:
      return <Step4 />
    case ProgressStepType.step5:
      return <Step5 changeProgress={changeProgress} changeStep={changeStep} />

    default:
      return <div>잘못된 접근입니다.</div>
  }
}
