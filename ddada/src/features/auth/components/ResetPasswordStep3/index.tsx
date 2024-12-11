'use client'

/* eslint-disable react/jsx-props-no-spreading */

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { resetPassword } from '@/features/auth/api/resetPassword/index.ts'
import PasswordUnVisible from '@/static/imgs/auth/auth_password_unvisible_icon.svg'
import PasswordVisible from '@/static/imgs/auth/auth_password_visible_icon.svg'
import PassworeMatchChecked from '@/static/imgs/auth/signup/checked_circle_icon.svg'

interface ResetPasswordStep3Props {
  email: string
}
interface ResetPasswordForm {
  password: string
  confirmPassword: string
}

export default function ResetPasswordStep3({ email }: ResetPasswordStep3Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordForm>({
    mode: 'onChange',
  })
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [passwordConfirmVisibility, setPasswordConfirmVisibility] =
    useState<boolean>(false)
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<string>('')
  const password = watch('password')
  const confirmPassword = watch('confirmPassword')
  const router = useRouter()

  useEffect(() => {
    if (password === confirmPassword) {
      setIsPasswordMatch(password === confirmPassword)
    } else {
      setIsPasswordMatch(false)
    }
  }, [password, confirmPassword])

  const passwordRegister = register('password', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
    maxLength: {
      value: 20,
      message: '비밀번호는 20자 이하로 입력해주세요.',
    },
    minLength: {
      value: 8,
      message: '비밀번호는 8자 이상으로 입력해주세요.',
    },
    pattern: {
      value:
        // eslint-disable-next-line no-useless-escape
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?]).{8,20}$/,
      message: '한 개 이상의 숫자/영어/특수문자를 포함해야 합니다.',
    },
  })

  const passwordConFirmRegister = register('confirmPassword', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
    validate: (value) =>
      value === watch('password') || '비밀번호가 일치하지 않아요.',
  })

  const sendResetPassword = async () => {
    try {
      await resetPassword(email, password)
      toast.success('비밀번호가 초기화되었습니다.')
      router.push('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.data.message ===
          '이전에 사용한 비밀번호는 사용할 수 없습니다.'
        ) {
          setPasswordError('이전에 사용한 비밀번호는 사용할 수 없습니다.')
        }
      }
    }
  }
  return (
    <div className="min-w-[34rem] mt-[7.4013rem]">
      <div className="mb-[5.25rem] text-center">
        <p className="text-4xl font-bold text-[#2D2541]">
          새로운 비밀번호를 알려주세요
        </p>
      </div>
      <div className="bg-white">
        <form
          onSubmit={handleSubmit(sendResetPassword)}
          className="grid gap-4 px-10"
        >
          <div className="text-sm">
            <label htmlFor="password">
              <p className="text-[#6B6E78]">새 비밀번호</p>
              <div className="flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
                <input
                  type={passwordVisibility ? 'text' : 'password'}
                  id="password"
                  placeholder="비밀번호를 입력해주세요."
                  className="w-full focus:outline-none"
                  autoComplete="new-password"
                  {...passwordRegister}
                />
                {password && isPasswordMatch && (
                  <PassworeMatchChecked className="flex-none" />
                )}
                <button
                  type="button"
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                  className="ml-2 w-6 h-6"
                >
                  {passwordVisibility ? (
                    <PasswordVisible className="cursor-pointer" />
                  ) : (
                    <PasswordUnVisible className="cursor-pointer" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#DC3545]">{errors.password.message}</p>
              )}
            </label>
          </div>

          <div className="text-sm">
            <label htmlFor="confirmPassword">
              <div className="flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
                <input
                  type={passwordConfirmVisibility ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="비밀번호를 한번 더 입력해주세요."
                  className="w-full focus:outline-none"
                  autoComplete="new-password"
                  {...passwordConFirmRegister}
                />
                {password && isPasswordMatch && (
                  <PassworeMatchChecked className="flex-none" />
                )}
                <button
                  type="button"
                  onClick={() =>
                    setPasswordConfirmVisibility(!passwordConfirmVisibility)
                  }
                  className="ml-2 w-6 h-6"
                >
                  {passwordConfirmVisibility ? (
                    <PasswordVisible className="cursor-pointer" />
                  ) : (
                    <PasswordUnVisible className="cursor-pointer" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[#DC3545]">
                  {errors.confirmPassword.message}
                </p>
              )}
            </label>
          </div>
          {passwordError && <p className="text-danger">{passwordError}</p>}
          <button
            type="submit"
            className={`py-[1.1875rem] w-full mt-3 rounded-xl ${
              isValid && !isSubmitting
                ? 'bg-[#FCA211] text-white cursor-pointer'
                : 'bg-[#E5E5ED] text-[#6B6E78] cursor-not-allowed'
            }`}
            disabled={!isValid}
          >
            비밀번호 초기화
          </button>
        </form>
      </div>
    </div>
  )
}
