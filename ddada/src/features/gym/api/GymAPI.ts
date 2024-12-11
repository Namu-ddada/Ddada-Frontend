import { privateAPI } from '@/api/axios.ts'
import { GymInfo, GymMatchList } from '@/features/gym/types/GymTypes.ts'

export async function fetchGymInfo(): Promise<GymInfo> {
  const res = await privateAPI.get(`/gym`)
  return res.data.result
}

export async function fetchGymMatchList(date: string): Promise<GymMatchList> {
  const params = {
    date,
  }
  const res = await privateAPI.get(`/gym/matches`, { params })
  return res.data.result
}

export async function gymWithdraw(account: string) {
  const payload = {
    AcountAddress: account,
  }
  await privateAPI.patch('/gym/withdraw', payload)
}
