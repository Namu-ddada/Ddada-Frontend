import { publicAPI } from '@/api/axios.ts'

const getMatchList = async (
  page: number,
  size: number,
  rankType: string,
  matchTypes?: string,
  statues?: string,
  keyword?: string,
  regions?: string,
) => {
  const params: {
    page: number
    size: number
    rankType: string
    matchTypes?: string
    statues?: string
    keyword?: string
    regions?: string
  } = { page, size, rankType }

  if (keyword) {
    params.keyword = keyword
  }
  if (regions) {
    params.regions = regions
  }
  if (matchTypes) {
    params.matchTypes = matchTypes
  }
  if (statues) {
    params.statues = statues
  }

  const res = await publicAPI.get('/matches', {
    params,
  })
  return res
}

export { getMatchList }
