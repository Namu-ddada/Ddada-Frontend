import { publicAPI } from '@/api/axios.ts'

const sendAuthEmail = async (email: string) => {
  const res = await publicAPI.post('/auth/email', {
    email,
  })
  return res
}

const checkAuthCode = async (email: string, authCode: string) => {
  const res = await publicAPI.post('/auth/verify_code', {
    userInfo: email,
    certificationCode: authCode,
  })
  return res
}

const resetPassword = async (email: string, newPassword: string) => {
  const res = await publicAPI.patch('/player/password', {
    email,
    newPassword,
  })
  return res
}

export { sendAuthEmail, checkAuthCode, resetPassword }
