import instance from '@/features/auth/api/axiosModule.ts'

const originLogin = async (email: string, password: string) => {
  const res = await instance.post('/auth/login', {
    email,
    password,
    loginType: 'basic',
  })
  return res
}

const socialLogin = async (authcode: string) => {
  const res = await instance.post('/auth/login', {
    authcode,
    loginType: 'kakao',
  })
  return res
}

const logout = async (accessToken: string) => {
  const res = await instance.post('/auth/logout', {
    accessToken,
    logoutType: 'kakao',
  })
  return res
}

const sendRefreshToken = async (refreshToken: string) => {
  const res = await instance.post('/auth/refresh', { refreshToken })
  return res
}

export { sendRefreshToken, socialLogin, originLogin, logout }
