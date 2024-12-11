'use client'

import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import {
  checkAuthCode,
  sendAuthEmail,
} from '@/features/auth/api/resetPassword/index.ts'
import { ResetPasswordStepType } from '@/features/auth/types/ResetPasswordType.ts'

interface ResetPasswordStep2Props {
  changeViewStep: (viewStep: ResetPasswordStepType) => void
  email: string
}

const authEmailReSend = async (email: string, resetTimer: () => void) => {
  await sendAuthEmail(email)
  toast.success('인증번호를 재전송했습니다.')
  resetTimer()
}

export default function ResetPasswordStep2({
  changeViewStep,
  email,
}: ResetPasswordStep2Props) {
  const [authCode, setAuthCode] = useState<string[]>(['', '', '', '', '', ''])
  const [authCodeCheck, setAuthCodeCheck] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState<number>(180) // 3분 = 180초
  const [isExpired, setIsExpired] = useState<boolean>(false)

  // Input references for focusing
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target

    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    const updatedCode = [...authCode]
    updatedCode[index] = value
    setAuthCode(updatedCode)

    if (updatedCode.join('').length === 6) {
      setAuthCodeCheck(true)
    } else {
      setAuthCodeCheck(false)
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && authCode[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }
  const handleCheckAuthCode = async () => {
    const verificationCode = authCode.join('')
    try {
      await checkAuthCode(email, verificationCode)
      changeViewStep(ResetPasswordStepType.step3)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 404) {
          setErrorMessage('잘못된 인증번호입니다.')
        }
      }
    }
  }

  // 인증 코드 제출 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isExpired) {
      setErrorMessage('만료된 인증번호입니다.')
      setAuthCode(['', '', '', '', '', ''])
      setAuthCodeCheck(false)
      return
    }

    handleCheckAuthCode()
  }

  // 타이머 설정 및 관리
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (timeLeft > 0 && !isExpired) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0) {
      setIsExpired(true)
      setAuthCodeCheck(false)
      setErrorMessage('만료된 인증번호입니다.')
    }

    return () => clearTimeout(timer)
  }, [timeLeft, isExpired])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const resetTimer = () => {
    setTimeLeft(180)
    setIsExpired(false)
    setErrorMessage('')
    setAuthCode(['', '', '', '', '', ''])
    setAuthCodeCheck(false)
  }

  return (
    <div className="min-w-[34rem] mt-[7.4013rem]">
      <div className="mb-[5.25rem] text-center">
        <p className="text-4xl font-bold text-[#2D2541]">
          인증번호를 보내드렸어요
        </p>
        <p className="mb-[1.25rem] text-[#6B6E78]">
          이메일을 받지 못하셨나요?
          <button
            type="button"
            className="text-[#FCA211] underline"
            onClick={() => authEmailReSend(email, resetTimer)}
          >
            이곳을 클릭하세요
          </button>
        </p>
      </div>
      <div className="bg-white max-w-[34rem]">
        <form onSubmit={handleSubmit} className="grid gap-4 px-10">
          <div className="text-sm">
            <p className="text-[#FCA211] mb-4 text-center font-bold">
              {formatTime(timeLeft)}
            </p>
            <div className="flex gap-1 h-[100px]">
              {authCode.map((value, index) => (
                <input
                  key={`authCode-${email + index}`}
                  id={`authCode-${index}`}
                  type="text"
                  maxLength={1}
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  value={value}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-full border text-center text-5xl font-bold rounded-xl focus:outline-none focus:border-[#FCA211]
                    ${value ? 'border-[#FCA211]' : 'border-[#E5E5ED]'}`}
                />
              ))}
            </div>
            {errorMessage && (
              <p className="text-[#DC3545] text-sm mt-2">{errorMessage}</p>
            )}
          </div>
          <button
            type="submit"
            className={`py-[1.1875rem] w-full mt-3 rounded-xl
            ${authCodeCheck && !isExpired ? 'bg-[#FCA211] text-white cursor-pointer' : 'bg-[#E5E5ED] text-[#6B6E78] cursor-not-allowed'}`}
            disabled={!authCodeCheck || isExpired}
          >
            계속하기
          </button>
        </form>
      </div>
    </div>
  )
}
