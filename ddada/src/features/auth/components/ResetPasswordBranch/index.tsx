import { useState } from 'react'

import ResetPasswordStep1 from '@/features/auth/components/ResetPasswordStep1/index.tsx'
import ResetPasswordStep2 from '@/features/auth/components/ResetPasswordStep2/index.tsx'
import ResetPasswordStep3 from '@/features/auth/components/ResetPasswordStep3/index.tsx'
import { ResetPasswordStepType } from '@/features/auth/types/ResetPasswordType.ts'

export default function ResetPasswordBranch() {
  const [viewStep, setViewStep] = useState<ResetPasswordStepType>(
    ResetPasswordStepType.step1,
  )
  const [email, setEmail] = useState<string>('')

  const changeViewStep = (resetPasswordStep: ResetPasswordStepType) => {
    setViewStep(resetPasswordStep)
  }
  switch (viewStep) {
    case ResetPasswordStepType.step1:
      return (
        <ResetPasswordStep1
          changeViewStep={changeViewStep}
          setEmail={setEmail}
        />
      )
    case ResetPasswordStepType.step2:
      return (
        <ResetPasswordStep2 changeViewStep={changeViewStep} email={email} />
      )
    case ResetPasswordStepType.step3:
      return <ResetPasswordStep3 email={email} />
    default:
      return <div>잘못된 접근입니다.</div>
  }
}
