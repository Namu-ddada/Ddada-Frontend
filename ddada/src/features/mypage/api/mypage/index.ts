import { privateAPI } from '@/api/axios.ts'
import {
  PasswordChangeType,
  ProfileEditType,
} from '@/features/mypage/types/ProfileEditType.ts'

const getProfile = async () => {
  const response = await privateAPI.get('/player/profile')
  return response.data.result
}

const patchDeleteUser = async () => {
  await privateAPI.patch('/player')
  sessionStorage.removeItem('accessToken')
  sessionStorage.removeItem('refreshToken')
  sessionStorage.removeItem('loginType')
  return null
}

const putProfileEdit = async (data: ProfileEditType) => {
  const formData = new FormData()
  if (data.nickname) {
    formData.append('nickname', data.nickname)
  }
  if (data.introduction) {
    formData.append('description', data.introduction)
  }
  if (data.profilePicture) {
    formData.append('profileImagePath', data.profilePicture)
  }
  formData.append('deleteImage', data.deleteImage ? 'true' : 'false')
  const res = await privateAPI.put('/player/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data.result
}

const patchPasswordChange = async (data: PasswordChangeType) => {
  const res = await privateAPI.patch('/player/password', data)
  return res.data.result
}

const getMyMatchList = async () => {
  const res = await privateAPI.get('/player/matches')
  return res.data.result
}

const getMyMatchDetail = async (matchId: string) => {
  const res = await privateAPI.get(`/matches/${matchId}`)
  return res.data.result
}

const getSetDetail = async (matchId: string, setNum: number) => {
  const res = await privateAPI.get(`/matches/${matchId}/sets/${setNum}`)
  return res.data.result
}

const getUserAnalysis = async (matchId: string) => {
  const res = await privateAPI.get(`/data/player/${matchId}`)
  return res.data.result
}

const getUserPlayStyle = async () => {
  const res = await privateAPI.get('/data/player')
  return res.data.result
}

export {
  getProfile,
  patchDeleteUser,
  putProfileEdit,
  patchPasswordChange,
  getMyMatchList,
  getMyMatchDetail,
  getSetDetail,
  getUserPlayStyle,
  getUserAnalysis,
}
