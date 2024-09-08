'use client'

/* eslint-disable react/jsx-props-no-spreading */

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  checkNicknameDuplicate,
  requestPhoneAuthCode,
  verificationPhone,
} from '@/features/auth/api/signup/index.ts'
import {
  SignUpFormData,
  SignUpStepType,
} from '@/features/auth/types/SignUpType.ts'
import PasswordUnVisible from '@/static/imgs/auth/auth_password_unvisible_icon.svg'
import PasswordVisible from '@/static/imgs/auth/auth_password_visible_icon.svg'
import CalenderIcon from '@/static/imgs/auth/signup/calender_icon.svg'
import PassworeMatchChecked from '@/static/imgs/auth/signup/checked_circle_icon.svg'

interface SignUpStep2Props {
  changeViewStep: (viewStep: SignUpStepType) => void
}

export default function SignUpStep2({ changeViewStep }: SignUpStep2Props) {
  const {
    register,
    formState: { errors },
    watch,
    trigger,
    setError,
    clearErrors,
  } = useFormContext<SignUpFormData>()
  const email = watch('email')
  const password = watch('password')
  const confirmPassword = watch('confirmPassword')
  const nickName = watch('nickname')
  const phoneNumber = watch('phoneNumber')
  const birthYear = watch('birthYear')
  const smsAuthCode = watch('authNumber')

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [passwordConfirmVisibility, setPasswordConfirmVisibility] =
    useState<boolean>(false)
  const [authNumber, setAuthNumber] = useState<boolean>(false)
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false)
  const [nickNameCheck, setNickNameCheck] = useState<boolean>(false)
  const [nickNameAlreadyExist, setNickNameAlreadyExist] =
    useState<boolean>(false)
  const [phoneNumberCheck, setPhoneNumberCheck] = useState<boolean>(false)
  const [isNextStepEnabled, setIsNextStepEnabled] = useState<boolean>(false)
  // 인증번호 타이머 관련
  const [timeLeft, setTimeLeft] = useState<number>(0) // 3분 타이머 (180초)
  const [isExpired, setIsExpired] = useState<boolean>(false)

  useEffect(() => {
    // birthYear 의 validation 체크가 바로바로안되어 강제로 trigger로 갱신
    const checkValidation = async () => {
      await trigger('birthYear')

      if (
        email &&
        password &&
        confirmPassword &&
        nickName &&
        phoneNumber &&
        birthYear &&
        isPasswordMatch &&
        nickNameCheck &&
        phoneNumberCheck &&
        Object.keys(errors).length === 0
      ) {
        console.log('다음단계활성화')
        setIsNextStepEnabled(true)
      } else {
        setIsNextStepEnabled(false)
      }
    }

    checkValidation()
  }, [
    errors,
    email,
    password,
    confirmPassword,
    nickName,
    phoneNumber,
    birthYear,
    trigger,
  ])

  useEffect(() => {
    setNickNameAlreadyExist(false)
  }, [nickName])
  useEffect(() => {
    setIsPasswordMatch(password === confirmPassword)
  }, [password, confirmPassword])

  // 타이머 관련
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (authNumber && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0) {
      setIsExpired(true)
    }

    return () => clearTimeout(timer) // 컴포넌트 언마운트 시 타이머 클리어
  }, [authNumber, timeLeft, setError])

  const handleVisibility = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  const handleConfirmVisibility = () => {
    setPasswordConfirmVisibility(!passwordConfirmVisibility)
  }

  const handleCheckNickName = async () => {
    // 닉네임 중복체크가 됬다고 가정
    const duplicateCheck = await checkNicknameDuplicate(nickName)
    if (duplicateCheck) {
      setNickNameCheck(true)
      setNickNameAlreadyExist(false)
    } else {
      setNickNameCheck(false)
      setNickNameAlreadyExist(true)
    }
  }

  // sns 인증번호 받기
  const handleCheckPhoneNumber = async () => {
    const sendSNSAuth = await requestPhoneAuthCode(phoneNumber)
    if (sendSNSAuth) {
      setAuthNumber(true)
      setTimeLeft(180)
      clearErrors('phoneNumber')
    } else {
      setError('phoneNumber', {
        message: '인증번호 발송에 실패했습니다. 다시 시도해주세요.',
      })
      setAuthNumber(false)
    }
  }

  // 다시 sns 인증번호 받기
  const handleReCheckPhoneNumber = async () => {
    await requestPhoneAuthCode(phoneNumber)
    setTimeLeft(180)
    setIsExpired(false)
  }

  // 받은 sns 인증번호로 인증하기
  const handleSendAuthNumber = async () => {
    console.log('받은 인증번호 보내기')
    console.log(smsAuthCode)
    if (isExpired) {
      setError('authNumber', {
        message: '인증번호가 만료되었습니다. 다시 시도해주세요.',
      })
      return
    }
    const verificationPhoneResult = await verificationPhone(
      phoneNumber,
      smsAuthCode,
    )
    setPhoneNumberCheck(true)
    console.log(verificationPhoneResult)
  }
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  const emailRegister = register('email', {
    required: '이메일을 입력해주세요.',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: '이메일을 올바르게 입력해주세요',
    },
  })

  const passwordRegister = register('password', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
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

  const nicknameRegister = register('nickname', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
    maxLength: {
      value: 20,
      message: '닉네임은 20자 이하로 입력해주세요.',
    },
  })

  const phoneNumberRegister = register('phoneNumber', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
    pattern: {
      value: /^(010)(\d{4})(\d{4})$/,
      message: '전화번호 형식을 확인해주세요.',
    },
  })

  const birthYearRegister = register('birthYear', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
    pattern: {
      value:
        /^(19[0-9][0-9]|20[0-2][0-9]|2030)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/,
      message: '생년월일 형식을 확인해주세요.',
    },
  })

  return (
    <>
      {/* 이메일 입력 */}
      <div className="text-sm">
        <label htmlFor="email">
          <p className="text-[#6B6E78]">이메일</p>
          <div
            className={`flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211] 
              ${errors.email ? 'border-[#DC3545]' : ''}`}
          >
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
            <p className="text-[#DC3545]">{errors.email.message}</p>
          )}
        </label>
      </div>

      {/* 비밀번호 입력 */}
      <div className="text-sm">
        <label htmlFor="password">
          <p className="text-[#6B6E78]">비밀번호</p>
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
            <button type="button" onClick={handleVisibility} className="ml-2">
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

      {/* 비밀번호 확인 입력 */}
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
              onClick={handleConfirmVisibility}
              className="ml-2"
            >
              {passwordConfirmVisibility ? (
                <PasswordVisible className="cursor-pointer" />
              ) : (
                <PasswordUnVisible className="cursor-pointer" />
              )}
            </button>
            {/* 비밀번호가 일치하면 체크 아이콘 표시 */}
          </div>
          {errors.confirmPassword && (
            <p className="text-[#DC3545]">{errors.confirmPassword.message}</p>
          )}
        </label>
      </div>

      {/* 닉네임 입력 */}
      <div className="text-sm">
        <label htmlFor="nickname">
          <p className="text-[#6B6E78]">닉네임</p>
          <div className="flex items-center gap-[0.5rem]">
            <div
              className={`flex-grow flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211] ${
                nickNameAlreadyExist && 'border-[#DC3545]'
              }`}
            >
              <input
                type="text"
                id="nickname"
                placeholder="닉네임을 입력해주세요. (최대 20자)"
                className="w-full focus:outline-none"
                {...nicknameRegister}
              />
              {nickName && nickNameCheck && (
                <PassworeMatchChecked className="flex-none" />
              )}
            </div>

            <button
              type="button"
              onClick={() => handleCheckNickName()}
              className={`px-[1.5rem] py-[1.3125rem] rounded-xl ${
                nickName && !errors.nickname
                  ? 'bg-[#FCA211] text-white cursor-pointer'
                  : 'bg-[#E5E5ED] text-[#6B6E78] cursor-not-allowed'
              }`}
              disabled={!nickName}
            >
              중복체크
            </button>
          </div>
          {errors.nickname && (
            <p className="text-[#DC3545]">{errors.nickname.message}</p>
          )}
          {nickNameAlreadyExist && (
            <p className="text-[#DC3545]">이미 사용중인 닉네임입니다.</p>
          )}
        </label>
      </div>

      {/* 전화번호 입력 */}
      <div className="text-sm">
        <label htmlFor="phoneNumber">
          <p className="text-[#6B6E78]">휴대폰번호</p>
          <div className="flex gap-[0.5rem]">
            <select className=" border rounded-xl px-6 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
              <option>+82</option>
              <option>+81</option>
            </select>
            <div className="flex w-full items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
              <input
                type="text"
                id="phoneNumber"
                placeholder="숫자만 입력해주세요."
                className="w-full focus:outline-none"
                {...phoneNumberRegister}
              />
              {phoneNumber && phoneNumberCheck && (
                <PassworeMatchChecked className="flex-none" />
              )}
            </div>
          </div>
        </label>
        {!phoneNumberCheck && authNumber && (
          <>
            <div className="flex items-center border rounded-xl px-4 py-[1.3125rem] mt-[0.5rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
              <input
                type="text"
                id="authNumber"
                placeholder="인증번호"
                className="w-full focus:outline-none"
                {...register('authNumber')}
              />
              <div className="text-[#FCA211]">
                <p>{formatTime(timeLeft)}</p>
              </div>
            </div>
            <div className="mt-[0.5rem] flex gap-[0.25rem] justify-end">
              <button
                type="button"
                onClick={() => handleReCheckPhoneNumber()}
                className="px-[1.5rem] py-[1.3125rem] rounded-xl border border-[#FCA211] text-[#FCA211]"
                disabled={!phoneNumber}
              >
                인증번호 재전송
              </button>

              <button
                type="button"
                onClick={() => handleSendAuthNumber()}
                className={`px-[1.5rem] py-[1.3125rem] rounded-xl ${
                  phoneNumber && !errors.phoneNumber
                    ? 'bg-[#FCA211] text-white cursor-pointer'
                    : 'bg-[#E5E5ED] text-[#6B6E78] cursor-not-allowed'
                }`}
                disabled={!phoneNumber}
              >
                인증하기
              </button>
            </div>
          </>
        )}

        {!authNumber && (
          <div className="mt-[0.5rem] flex justify-end">
            <button
              type="button"
              onClick={() => handleCheckPhoneNumber()}
              className={`px-[1.5rem] py-[1.3125rem] rounded-xl ${
                phoneNumber && !errors.phoneNumber
                  ? 'bg-[#FCA211] text-white cursor-pointer'
                  : 'bg-[#E5E5ED] text-[#6B6E78] cursor-not-allowed'
              }`}
              disabled={!phoneNumber || !!errors.phoneNumber}
            >
              인증번호받기
            </button>
          </div>
        )}
      </div>

      {/* 생년월일 입력 */}
      <div className="text-sm ">
        <label htmlFor="birthYear">
          <p className="text-[#6B6E78]">생년월일</p>
          <div className="flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
            <input
              type="text"
              id="birthYear"
              placeholder="연도. 월. 일"
              className="w-full focus:outline-none"
              {...birthYearRegister}
            />
            <CalenderIcon />
          </div>
          {errors.birthYear && (
            <p className="text-[#DC3545]">{errors.birthYear.message}</p>
          )}
        </label>
      </div>

      <button
        type="button"
        onClick={() => changeViewStep(SignUpStepType.step3)}
        className={`py-[1.1875rem] w-full mt-3 rounded-xl ${
          isNextStepEnabled
            ? 'bg-[#FCA211] text-white cursor-pointer'
            : 'bg-[#E5E5ED] text-[#6B6E78] cursor-not-allowed'
        }`}
        disabled={!isNextStepEnabled}
      >
        다음단계{' '}
      </button>
      <button
        type="button"
        onClick={() => changeViewStep(SignUpStepType.step3)}
      >
        테스트용{' '}
      </button>
    </>
  )
}
