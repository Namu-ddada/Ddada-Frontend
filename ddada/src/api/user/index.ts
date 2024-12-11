import { privateAPI, publicAPI } from '@/api/axios.ts'
import { UserPk, UserProfile, UserRole } from '@/types/user/index.ts'

const loginUserRole = async (): Promise<UserRole | null> => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) return null
  const res = await privateAPI.get('/auth/type')
  return res.data.result
}

const fetchUserProfile = async (): Promise<UserProfile | null> => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) return null
  const res = await privateAPI.get('/player/profile')
  return res.data.result
}

const logOut = async () => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) return null
  await privateAPI.post('/auth/logout', {
    accessToken,
  })
  sessionStorage.removeItem('accessToken')
  sessionStorage.removeItem('refreshToken')
  sessionStorage.removeItem('loginType')
  return null
}

const fetchUserPk = async (): Promise<UserPk | null> => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) return null
  const res = await privateAPI.get('/player/id')
  return res.data.result
}

const postRefreshToken = async () => {
  const refreshToken = sessionStorage.getItem('refreshToken')
  if (!refreshToken) return null
  const res = await publicAPI.post('/auth/refresh', {
    refreshToken,
  })
  console.log(res)
  sessionStorage.setItem('accessToken', res.data.result.accessToken)
  sessionStorage.setItem('refreshToken', res.data.result.refreshToken)
  return res.data.accessToken
}

export {
  loginUserRole,
  logOut,
  fetchUserProfile,
  fetchUserPk,
  postRefreshToken,
}
