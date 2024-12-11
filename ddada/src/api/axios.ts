'use client'

import axios from 'axios'

import { postRefreshToken } from '@/api/user/index.ts'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const publicAPI = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})
export const privateAPI = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

privateAPI.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem('accessToken')

  config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

privateAPI.interceptors.response.use(
  (response) => {
    return response
  },
  // acceeToken이 만료되었을 때 refresh token을 이용해 accessToken을 재발급
  async (error) => {
    const originalRequest = error.config
    const statusCode = error.response?.status
    if (statusCode === 401) {
      const newAccessToken = await postRefreshToken()

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      const res = await axios(originalRequest)
      return res
    }

    return Promise.reject(error)
  },
)
