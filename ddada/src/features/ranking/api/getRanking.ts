import { privateAPI } from '@/api/axios.ts'

const getRanking = async () => {
  const res = await privateAPI.get('/player/rankings')
  return res.data.result.rankings
}

export { getRanking }
