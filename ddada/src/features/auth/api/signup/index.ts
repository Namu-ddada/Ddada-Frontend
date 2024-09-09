'use client'

import instance from '@/features/auth/api/axiosModule.ts'
import { SignUpSubmitType } from '@/features/auth/types/SignUpType.ts'

// 닉네임 중복확인
const checkNicknameDuplicate = async (nickname: string) => {
  const res = await instance.get('/member/nickname', { params: { nickname } })
  return res
}

// 휴대폰 인증번호 요청 API
const requestPhoneAuthCode = async (phoneNumber: string) => {
  const res = await instance.post('/auth/sms/send', {
    phoneNum: phoneNumber,
  })
  if (res.status === 200) return true
  return false
}

// 휴대폰 인증번호 확인 API
const verificationPhone = async (phoneNumber: string, snsCode: string) => {
  const res = await instance.post('/auth/sms/verify', {
    phoneNum: phoneNumber,
    certificationCode: snsCode,
  })
  return res
}

// 회원가입
const signupSubmit = async (payload: SignUpSubmitType) => {
  const formData = new FormData()
  formData.append('nickname', payload.nickname)
  formData.append('email', payload.email)
  formData.append('gender', payload.gender)
  formData.append('birth', payload.birthYear)
  formData.append('password', payload.password)
  formData.append('phoneNumber', payload.phoneNumber)
  if (payload.introduction) {
    formData.append('description', payload.introduction)
  }
  if (payload.profilePicture) {
    formData.append('profileImagePath', payload.profilePicture)
  }
  const res = await instance.post('/member/signup', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res
}
export {
  checkNicknameDuplicate,
  requestPhoneAuthCode,
  verificationPhone,
  signupSubmit,
}
