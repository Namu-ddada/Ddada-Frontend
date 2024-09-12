'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { originLogin, socialLogin } from '@/features/auth/api/login/index.ts'
import PasswordUnVisible from '@/static/imgs/auth/auth_password_unvisible_icon.svg'
import PasswordVisible from '@/static/imgs/auth/auth_password_visible_icon.svg'
import KakaoLogo from '@/static/imgs/auth/kakao_logo.svg'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any
  }
}
interface LoginForm {
  email: string
  password: string
}

export default function Login() {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [passwordExists, setPasswordExists] = useState<boolean>(false)
  const [emailExists, setEmailExists] = useState<boolean>(false)
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const [axiosError, setAxiosError] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>()

  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
      }
    }
  }, [])

  useEffect(() => {
    const fetchSocialLogin = async () => {
      const authCode = searchParams!.get('code')

      if (authCode) {
        try {
          const res = await socialLogin(authCode)
          if (res.data.result.isRegistered) {
            sessionStorage.setItem('accessToken', res.data.accessToken)
            sessionStorage.setItem('refreshToken', res.data.refreshToken)

            router.push('/')
          } else {
            const kakaoEmail = res.data.result.kakaoEmail as string
            router.push(`/signup?kakaoEmail=${encodeURIComponent(kakaoEmail)}`)
          }
        } catch (error) {
          console.error('소셜 로그인 실패', error)
        }
      }
    }

    fetchSocialLogin()
  }, [searchParams])

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI}&response_type=code`
  }
  const emailRegister = register('email', {
    required: { value: true, message: '' },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '올바른 이메일 형식이 아닙니다.',
    },
  })

  const passwordRegister = register('password', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
  })

  const handleVisibility = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  const handlePasswordExists = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      setPasswordExists(true)
    } else {
      setPasswordExists(false)
    }
    if (emailExists && event.target.value.length > 0) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }

  const handleLoginVisibility = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.value.length > 0) {
      setEmailExists(true)
    } else {
      setEmailExists(false)
    }
    if (passwordVisibility && event.target.value.length > 0) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }

  const loginSubmit = async (data: LoginForm) => {
    try {
      const res = await originLogin(data.email, data.password)
      sessionStorage.setItem('accessToken', res.data.accessToken)
      sessionStorage.setItem('refreshToken', res.data.refreshToken)
      setAxiosError(false)
      router.push('/')
    } catch {
      setAxiosError(true)
    }
  }

  return (
    <div className="flex items-center justify-center  mt-[7.4013rem]">
      <div className="min-w-[544px]">
        <p className="text-4xl font-bold text-center mb-[70px]">
          따다에 가입하세요
        </p>
        <div className="bg-white">
          <form
            onSubmit={handleSubmit(loginSubmit)}
            className="grid gap-4 px-10"
          >
            <div className="text-sm">
              <label htmlFor="email ">
                <p className="text-[#6B6E78]">이메일</p>
                <div className="flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
                  <input
                    type="text"
                    id="email"
                    placeholder="이메일을 입력해주세요."
                    className="w-full focus:outline-none"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...emailRegister}
                    onChange={handleLoginVisibility}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </label>
            </div>
            <div className="text-sm">
              <label htmlFor="password">
                <p className="text-[#6B6E78]">비밀번호</p>
                <div className="flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
                  <input
                    type={passwordVisibility ? 'text' : 'password'}
                    id="password"
                    placeholder="비밀번호를 입력해주세요."
                    className="w-full focus:outline-none"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...passwordRegister}
                    onChange={handlePasswordExists}
                  />

                  {passwordExists && (
                    <button
                      type="button"
                      onClick={handleVisibility}
                      className="ml-2"
                    >
                      {passwordVisibility ? (
                        <PasswordVisible className="cursor-pointer" />
                      ) : (
                        <PasswordUnVisible className="cursor-pointer" />
                      )}
                    </button>
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                {axiosError && (
                  <p className="text-red-500">
                    잘못된 이메일 또는 비밀번호입니다.
                  </p>
                )}
              </label>
            </div>
            <div className="text-sm">
              <Link
                href="reset-password"
                className="text-[#B0B0B0] hover:text-black"
              >
                비밀번호를 잊어버리셨나요?
              </Link>
              <button
                type="submit"
                className={`py-[1.1875rem] w-full mt-3 rounded-xl ${
                  isButtonEnabled && !isSubmitting
                    ? 'bg-[#FCA211] text-white cursor-pointer'
                    : 'bg-[#E5E5ED] text-[#6B6E78] cursor-not-allowed'
                }`}
                disabled={!isButtonEnabled || isSubmitting}
              >
                로그인
              </button>
            </div>
            <div className="text-sm">
              <div className="flex justify-center items-center">
                <div className="grow border-t" />
                <span className="mx-2 text-[#E7E7E7]">또는</span>
                <div className="grow border-t" />
              </div>
              <button
                type="button"
                onClick={handleKakaoLogin}
                className="py-[1.2744rem] w-full bg-[#FEE500] text-[#000000] rounded-xl flex items-center justify-center relative mt-3"
              >
                <KakaoLogo className="absolute left-[10px]" />
                카카오로 로그인
              </button>
            </div>
            <p className="text-sm text-center">
              아직 계정이 없으신가요?{' '}
              <Link href="signup/" className="text-[#FCA211] font-bold">
                회원가입
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}