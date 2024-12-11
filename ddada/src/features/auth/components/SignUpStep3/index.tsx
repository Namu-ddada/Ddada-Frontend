/* eslint-disable react/jsx-props-no-spreading */

'use client'

import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { signupSubmit } from '@/features/auth/api/signup/index.ts'
import {
  SignUpFormData,
  SignUpStepType,
} from '@/features/auth/types/SignUpType.ts'
import CheckIcon from '@/static/imgs/auth/signup/checked_circle_icon.svg'
import FemaleIcon from '@/static/imgs/auth/signup/female.svg'
import UpLoadImage from '@/static/imgs/auth/signup/imageUpload_icon.svg'
import MaleIcon from '@/static/imgs/auth/signup/male.svg'
import Logo from '@/static/imgs/logo.svg'

interface SignUpStep3Props {
  changeViewStep: (viewStep: SignUpStepType) => void
}

export default function SignUpStep3({ changeViewStep }: SignUpStep3Props) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
    setError,
    clearErrors,
  } = useFormContext<SignUpFormData>()
  const router = useRouter()
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined,
  )
  const [defaultImage, setDefaultImage] = useState<boolean>(true)
  const [maleChecked, setMaleChecked] = useState<boolean>(false)
  const [femaleChecked, setFemaleChecked] = useState<boolean>(false)
  const [isNextStepEnabled, setIsNextStepEnabled] = useState<boolean>(false)
  const profilePicture = watch('profilePicture')
  const gender = watch('gender')
  useEffect(() => {
    clearErrors('profilePicture')
    if (profilePicture && gender && Object.keys(errors).length === 0) {
      setIsNextStepEnabled(true)
    } else {
      setIsNextStepEnabled(false)
    }
  }, [profilePicture, gender])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      if (!file) {
        return
      }
      const validFileTypes = ['image/png', 'image/jpeg', 'image/gif']
      const maxSizeMB = 2

      if (!validFileTypes.includes(file.type)) {
        setError('profilePicture', {
          type: 'manual',
          message:
            '지원되지 않는 파일 형식입니다. PNG, JPEG, GIF만 지원됩니다.',
        })
        return
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        setError('profilePicture', {
          type: 'manual',
          message: '파일 크기가 2MB를 초과합니다.',
        })
        return
      }
      clearErrors('profilePicture')
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
        setDefaultImage(false)
        setValue('profilePicture', file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageDelete = () => {
    setProfileImage(undefined)
    setDefaultImage(true)
  }
  const handleMaleGender = () => {
    setValue('gender', 'MALE')
    setMaleChecked(true)
    setFemaleChecked(false)
  }

  const handleFeMaleGender = () => {
    setValue('gender', 'FEMALE')
    setFemaleChecked(true)
    setMaleChecked(false)
  }

  const signUpFinished = async (data: SignUpFormData) => {
    clearErrors('profilePicture')
    const payload = {
      nickname: data.nickname,
      email: data.email,
      gender: data.gender,
      profileImage: data.profilePicture,
      birthYear: data.birthYear,
      password: data.password,
      phoneNumber: data.phoneNumber,
      description: data.introduction,
    }
    try {
      const res = await signupSubmit(payload)
      sessionStorage.setItem('accessToken', res.data.result.accessToken)
      sessionStorage.setItem('refreshToken', res.data.result.refreshToken)
      if (sessionStorage.getItem('loginType') !== 'kakao') {
        sessionStorage.setItem('loginType', 'custom')
      }
      changeViewStep(SignUpStepType.step4)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setError('email', {
            type: 'manual',
            message: '이미 가입된 이메일입니다.',
          })
          toast.error('이미 가입된 이메일입니다.')
          router.push('/login')
        }
      }
    }
  }
  const profilePictureRegister = register('profilePicture', {})

  const genderRegister = register('gender', {
    required: { value: true, message: '성별을 선택해주세요.' },
  })

  const introductionRegister = register('introduction', {})

  return (
    <>
      <div className="text-sm">
        <label htmlFor="profilePicture">
          <p className="text-disabled-dark">프로필 사진</p>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            className="hidden"
            {...profilePictureRegister}
            onChange={handleImageUpload}
          />
        </label>
        <div>
          <div className="flex gap-6">
            <div className="h-[9.375rem] w-[9.375rem] flex justify-center items-center rounded-full bg-[#F6F6F6] overflow-hidden">
              {defaultImage ? (
                <Logo />
              ) : (
                profileImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <Image
                    src={profileImage}
                    alt="프로필 사진"
                    objectFit="cover"
                    width={150}
                    height={150}
                    className="w-full h-full"
                  />
                )
              )}
            </div>

            <div className="grid gap-4 mb-[3.625rem]">
              <div className="flex gap-4">
                <button
                  type="button"
                  className="px-[1.5rem] py-[0.75rem] rounded-[0.75rem] border border-disabled text-disabled-dark"
                  onClick={() =>
                    document.getElementById('profilePicture')?.click()
                  }
                >
                  <div className="flex">
                    <div className="mr-[0.625rem]">
                      <UpLoadImage className="fill" />
                    </div>
                    <p>이미지 업로드</p>
                  </div>
                </button>
                {profileImage && (
                  <button
                    type="button"
                    className="text-danger rounded-[0.75rem] border border-danger px-[1.5rem] py-[0.75rem]"
                    onClick={handleImageDelete}
                  >
                    삭제
                  </button>
                )}
              </div>
              <div>
                <p>.png, .jpeg, .gif 파일은 최대 2MB까지 지원합니다.</p>
                {errors.profilePicture && (
                  <p className="text-danger">{errors.profilePicture.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm">
        <label htmlFor="gender">
          <p className="text-disabled-dark">성별</p>
          <input
            type="text"
            id="gender"
            {...genderRegister}
            className="hidden"
          />
        </label>

        <div className="flex gap-2">
          <div
            className={`bg-white relative flex-col justify-center items-center border rounded-[0.75rem] ${
              maleChecked ? 'border-theme' : 'border-disabled'
            }`}
          >
            {maleChecked && <CheckIcon className="absolute top-4 right-6" />}
            <button type="button" onClick={handleMaleGender}>
              <div className="p-6">
                <MaleIcon />
                <p className="text-center text-disabled-dark">남성</p>
              </div>
            </button>
          </div>
          <div
            className={`bg-white relative flex-col justify-center items-center border rounded-[0.75rem] ${
              femaleChecked ? 'border-theme' : 'border-disabled'
            }`}
          >
            {femaleChecked && <CheckIcon className="absolute top-4 right-6" />}
            <button type="button" onClick={handleFeMaleGender}>
              <div className="p-6">
                <FemaleIcon />
                <p className="text-center text-disabled-dark">여성</p>
              </div>
            </button>
          </div>
        </div>
        {errors.gender && (
          <p className="text-danger">{errors.gender.message}</p>
        )}
      </div>

      <div className="text-sm">
        <label htmlFor="introduction">
          <p className="text-disabled-dark">(선택) 한줄 소개</p>
          <div
            className={`flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-theme 
              ${errors.email ? 'border-danger' : ''}`}
          >
            <input
              type="text"
              id="introduction"
              placeholder="간략한 한 줄 소개를 남겨보세요."
              className="w-full focus:outline-none"
              autoComplete="new-email"
              {...introductionRegister}
            />
          </div>
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </label>
      </div>
      <button
        type="button"
        onClick={handleSubmit(signUpFinished)}
        className={`py-[1.1875rem] w-full mt-3 rounded-xl ${
          isNextStepEnabled
            ? 'bg-theme text-white cursor-pointer'
            : 'bg-disabled text-disabled-dark cursor-not-allowed'
        }`}
        disabled={!isNextStepEnabled}
      >
        회원가입
      </button>
    </>
  )
}
