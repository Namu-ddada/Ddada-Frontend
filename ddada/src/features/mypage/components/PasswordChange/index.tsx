'use client'

/* eslint-disable react/jsx-props-no-spreading */

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { patchPasswordChange } from '@/features/mypage/api/mypage/index.ts'
import PasswordUnVisible from '@/static/imgs/auth/auth_password_unvisible_icon.svg'
import PasswordVisible from '@/static/imgs/auth/auth_password_visible_icon.svg'
import PassworeMatchChecked from '@/static/imgs/auth/signup/checked_circle_icon.svg'
import PasswordIcon from '@/static/imgs/mypage/mypage-password-icon.svg'

interface ResetPasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
export default function PasswordChange() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordForm>({
    mode: 'onChange',
  })
  const [currentPasswordVisibility, setCurrentPasswordVisibility] =
    useState<boolean>(false)
  const [newPasswordVisibility, setNewPasswordVisibility] =
    useState<boolean>(false)
  const [passwordConfirmVisibility, setPasswordConfirmVisibility] =
    useState<boolean>(false)
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<string>('')
  const currentPassword = watch('currentPassword')
  const newPassword = watch('newPassword')
  const confirmPassword = watch('confirmPassword')
  const router = useRouter()

  useEffect(() => {
    if (newPassword === confirmPassword) {
      setIsPasswordMatch(newPassword === confirmPassword)
    } else {
      setIsPasswordMatch(false)
    }
  }, [newPassword, confirmPassword])
  const currentPasswordRegister = register('currentPassword', {
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

  const newPasswordRegister = register('newPassword', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
    pattern: {
      value:
        // eslint-disable-next-line no-useless-escape
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?]).{8,20}$/,
      message: '한 개 이상의 숫자/영어/특수문자를 포함해야 합니다.',
    },
    minLength: {
      value: 8,
      message: '비밀번호는 8자 이상으로 입력해주세요.',
    },
  })

  const passwordConFirmRegister = register('confirmPassword', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
    validate: (value) =>
      value === watch('newPassword') || '비밀번호가 일치하지 않아요.',
  })

  const sendResetPassword = async () => {
    if (currentPassword === newPassword) {
      setPasswordError('현재 비밀번호와 새 비밀번호가 같습니다.')
      return
    }
    try {
      await patchPasswordChange({
        currentPassword,
        newPassword,
      })
      toast.success('비밀번호가 초기화되었습니다.')
      router.push('/mypage/profile-edit')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message === '비밀번호가 일치하지 않습니다.') {
          setPasswordError('현재 비밀번호가 틀렸습니다.')
        } else if (
          error.response?.data.message ===
          '이전에 사용한 비밀번호는 사용할 수 없습니다.'
        ) {
          setPasswordError('이전에 사용한 비밀번호는 사용할 수 없습니다.')
        }
      }
    }
  }
  return (
    <div className="py-20 flex flex-col justify-start items-center gap-12 h-full">
      <div>
        <PasswordIcon />
      </div>
      <div className="flex flex-col gap-3 justify-center items-center">
        <p className="text-5xl font-normal">비밀번호 변경</p>
        <p className="text-disabled-dark">
          0-16자의 영문 대/소문자, 숫자, 특수기호 조합을 사용할 수 있습니다.
        </p>
      </div>
      <div className="w-[33.25rem]">
        <form
          onSubmit={handleSubmit(sendResetPassword)}
          className="grid gap-4 px-10"
        >
          <div className="mb-8 flex items-center text-sm">
            <p className="w-[7.5rem] text-sm font-bold">현재 비밀번호</p>
            <div className="flex-grow">
              <label htmlFor="currentPassword">
                <div className="flex items-center border rounded-xl px-4 py-2 focus-within:ring-1 focus-within:ring-theme">
                  <input
                    type={currentPasswordVisibility ? 'text' : 'password'}
                    id="currentPassword"
                    placeholder="비밀번호를 입력해주세요."
                    className="w-full py-2 focus:outline-none"
                    autoComplete="new-password"
                    {...currentPasswordRegister}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPasswordVisibility(!currentPasswordVisibility)
                    }
                    className="ml-2 w-6 h-6"
                  >
                    {currentPasswordVisibility ? (
                      <PasswordVisible className="cursor-pointer" />
                    ) : (
                      <PasswordUnVisible className="cursor-pointer" />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="text-danger">
                    {errors.currentPassword.message}
                  </p>
                )}
              </label>
            </div>
          </div>

          <div className="flex items-center text-sm">
            <p className="w-[7.5rem] text-sm font-bold">새 비밀번호</p>
            <div className="flex-grow">
              <label htmlFor="newPassword">
                <div className="flex items-center border rounded-xl px-4 py-2 focus-within:ring-1 focus-within:ring-theme">
                  <input
                    type={newPasswordVisibility ? 'text' : 'password'}
                    id="newPassword"
                    placeholder="비밀번호를 입력해주세요."
                    className="w-full py-2 focus:outline-none"
                    autoComplete="new-password"
                    {...newPasswordRegister}
                  />
                  {newPassword && isPasswordMatch && (
                    <PassworeMatchChecked className="flex-none" />
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setNewPasswordVisibility(!newPasswordVisibility)
                    }
                    className="ml-2 w-6 h-6"
                  >
                    {newPasswordVisibility ? (
                      <PasswordVisible className="cursor-pointer" />
                    ) : (
                      <PasswordUnVisible className="cursor-pointer" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-danger">{errors.newPassword.message}</p>
                )}
              </label>
            </div>
          </div>

          <div className="flex items-center text-sm">
            <p className="w-[7.5rem] text-sm font-bold">새 비밀번호 확인</p>
            <div className="flex-grow">
              <label htmlFor="confirmPassword">
                <div className="flex items-center border rounded-xl px-4 py-2 focus-within:ring-1 focus-within:ring-theme">
                  <input
                    type={passwordConfirmVisibility ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder="비밀번호를 한번 더 입력해주세요."
                    className="w-full py-2 focus:outline-none"
                    autoComplete="new-password"
                    {...passwordConFirmRegister}
                  />
                  {newPassword && isPasswordMatch && (
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
                  <p className="text-danger">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </label>
            </div>
          </div>
          {passwordError && <p className="text-danger">{passwordError}</p>}
          <button
            type="submit"
            className={`py-[1.1875rem] w-full mt-3 rounded-xl ${
              isValid && !isSubmitting
                ? 'bg-theme text-white cursor-pointer'
                : 'bg-disabled text-disabled-dark cursor-not-allowed'
            }`}
            disabled={!isValid}
          >
            변경하기
          </button>
        </form>
      </div>
    </div>
  )
}
