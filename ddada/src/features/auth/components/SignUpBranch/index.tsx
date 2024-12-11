'use client'

import SignUpStep1 from '@/features/auth/components/SignUpStep1/index.tsx'
import SignUpStep2 from '@/features/auth/components/SignUpStep2/index.tsx'
import SignUpStep3 from '@/features/auth/components/SignUpStep3/index.tsx'
import SignUpStep4 from '@/features/auth/components/SignUpStep4/index.tsx'
import { SignUpStepType } from '@/features/auth/types/SignUpType.ts'

interface SignUpBranchProps {
  viewStep: SignUpStepType
  changeViewStep: (viewStep: SignUpStepType) => void
}

export default function SignUpBranch({
  viewStep,
  changeViewStep,
}: SignUpBranchProps) {
  switch (viewStep) {
    case SignUpStepType.step1:
      return <SignUpStep1 changeViewStep={changeViewStep} />
    case SignUpStepType.step2:
      return <SignUpStep2 changeViewStep={changeViewStep} />
    case SignUpStepType.step3:
      return <SignUpStep3 changeViewStep={changeViewStep} />
    case SignUpStepType.step4:
      return <SignUpStep4 />

    default:
      return <div>잘못된 접근입니다.</div>
  }
}
