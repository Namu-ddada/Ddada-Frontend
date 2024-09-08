'use client'

import SignUpStep1 from '@/features/auth/pages/SignUpStep1.tsx'
import SignUpStep2 from '@/features/auth/pages/SignUpStep2.tsx'
import SignUpStep3 from '@/features/auth/pages/SignUpStep3.tsx'
import SignUpStep4 from '@/features/auth/pages/SignUpStep4.tsx'
import {
  // SignUpFormData,
  SignUpStepType,
} from '@/features/auth/types/SignUpType.ts'

interface SignUpBranchProps {
  viewStep: SignUpStepType
  changeViewStep: (viewStep: SignUpStepType) => void
  // submitFormData: SignUpFormData
  // setSubmitFormData: (submitFormData: SignUpFormData) => void
}

export default function SignUpBranch({
  viewStep,
  changeViewStep,
  // submitFormData,
  // setSubmitFormData,
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
