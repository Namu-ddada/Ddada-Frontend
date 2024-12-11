'use client'

/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form'

import { sendAuthEmail } from '@/features/auth/api/resetPassword/index.ts'
import {
  ResetPasswordForm,
  ResetPasswordStepType,
} from '@/features/auth/types/ResetPasswordType.ts'

interface ResetPasswordStep1Props {
  changeViewStep: (viewStep: ResetPasswordStepType) => void
  setEmail: (email: string) => void
}
export default function ResetPasswordStep1({
  changeViewStep,
  setEmail,
}: ResetPasswordStep1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordForm>({
    mode: 'onChange',
  })

  const emailRegister = register('email', {
    required: { value: true, message: '' },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '올바른 이메일 형식이 아닙니다.',
    },
  })

  const authEmailSend = async (data: ResetPasswordForm) => {
    setEmail(data.email)
    const res = await sendAuthEmail(data.email)
    if (res.data.code === '200') {
      changeViewStep(ResetPasswordStepType.step2)
    } else {
      console.log(res.data.message)
    }
  }

  return (
    <div className="min-w-[34rem] mt-[7.4013rem]">
      <div className="mb-[5.25rem] text-center">
        <p className="text-4xl font-bold text-[#2D2541]">
          비밀번호를 잊으셨나요?
        </p>
        <p className="mb-[1.25rem] text-[#6B6E78]">
          괜찮아요, 저희가 찾아드릴게요
        </p>
      </div>
      <div className="bg-white">
        <form
          onSubmit={handleSubmit(authEmailSend)}
          className="grid gap-4 px-10"
        >
          <div className="text-sm">
            <label htmlFor="email">
              <p className="text-[#6B6E78]">이메일</p>
              <div className="flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
                <input
                  type="text"
                  id="email"
                  placeholder="이메일을 입력해주세요."
                  className="w-full focus:outline-none"
                  autoComplete="new-email"
                  {...emailRegister}
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </label>
          </div>
          <button
            type="submit"
            className={`py-[1.1875rem] w-full mt-3 rounded-xl ${
              isValid && !isSubmitting
                ? 'bg-[#FCA211] text-white cursor-pointer'
                : 'bg-[#E5E5ED] text-[#6B6E78] cursor-not-allowed'
            }`}
            disabled={!isValid || isSubmitting}
          >
            비밀번호 초기화
          </button>
        </form>
      </div>
    </div>
  )
}
