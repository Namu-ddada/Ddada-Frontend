// eslint-disable-next-line import/no-extraneous-dependencies
import qs from 'qs'

import { publicAPI } from '@/api/axios.ts'
import {
  RacketDetailType,
  RacketRecommendPaylaod,
  RacketRecommendResult,
} from '@/features/racketRecommend/types/RacketRecommendType.ts'

export async function fetchRacketSearch(
  keyword: string,
): Promise<RacketDetailType[]> {
  const params = {
    keyword,
  }
  const res = await publicAPI.get('/rackets', { params })
  return res.data.result.rackets
}

export async function fetchRecommendRacket(
  payload: RacketRecommendPaylaod,
): Promise<RacketRecommendResult> {
  const res = await publicAPI.get(`/data/rackets`, {
    params: {
      balance: payload.balance,
      weight: payload.weight,
      shaft: payload.shaft,
      price: payload.price,
      racket_id: payload.racket,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })

  return res.data.result
}
