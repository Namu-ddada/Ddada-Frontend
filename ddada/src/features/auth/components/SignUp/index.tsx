'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import SignUpBranch from '@/features/auth/components/SignUpBranch/index.tsx'
import {
  SignUpFormData,
  SignUpStepType,
} from '@/features/auth/types/SignUpType.ts'
import Progress1 from '@/static/imgs/auth/signup/progress/signup_progress_step1.svg'
import Progress2 from '@/static/imgs/auth/signup/progress/signup_progress_step2.svg'
import Progress3 from '@/static/imgs/auth/signup/progress/signup_progress_step3.svg'
import Progress4 from '@/static/imgs/auth/signup/progress/signup_progress_step4.svg'
import GoBeforeArrow from '@/static/imgs/auth/signup/signup_goBeforepage_icon.svg'

const signUpSubmit: SubmitHandler<SignUpFormData> = () => {
  alert('회원가입 데이타 보내기 성공')
}

export default function SignUp() {
  const [viewStep, setViewStep] = useState<SignUpStepType>(SignUpStepType.step1)
  const methods = useForm<SignUpFormData>({
    mode: 'all',
  })
  const { handleSubmit } = methods
  const router = useRouter()

  const handleViewStep = () => {
    router.push('/login')
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className=" absolute top-5 left-0">
          <button type="button" className="flex" onClick={handleViewStep}>
            <GoBeforeArrow className="m-[.125rem]" />
            <p className="text-sm">이전으로 돌아가기</p>
          </button>
        </div>
        <div className="min-w-[34rem] mt-32">
          <div className="text-center">
            <p className="text-4xl font-bold text-[#2D2541]">따다 회원가입</p>
            <p className="mb-5 text-disabled-dark">
              가입하고 간단하게 배드민턴 즐기기
            </p>
            {viewStep === SignUpStepType.step1 && <Progress1 />}
            {viewStep === SignUpStepType.step2 && <Progress2 />}
            {viewStep === SignUpStepType.step3 && <Progress3 />}
            {viewStep === SignUpStepType.step4 && <Progress4 />}
          </div>
          <div className="py-20">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(signUpSubmit)}
                className="grid gap-4"
              >
                <SignUpBranch
                  viewStep={viewStep}
                  changeViewStep={setViewStep}
                />
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
