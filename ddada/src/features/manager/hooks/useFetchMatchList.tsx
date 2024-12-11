import { useInfiniteQuery } from '@tanstack/react-query'
import { useRef } from 'react'

import { useObserver } from '@/features/court-reservation/components/useObserver/index.tsx'
import { fetchManagerMatchList } from '@/features/manager/api/managerAPI.tsx'

interface UseFetchMatchListProps {
  todayOnly: boolean
  keyword: string
}

export default function useFetchMatchList({
  todayOnly,
  keyword,
}: UseFetchMatchListProps) {
  const bottom = useRef(null)

  const createdQuery = useInfiniteQuery({
    queryKey: ['managerMatch', { type: 'CREATED' }],
    queryFn: ({ pageParam = 0 }) =>
      fetchManagerMatchList({
        statuses: 'CREATED',
        page: pageParam,
        todayOnly,
        keyword,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.page.totalPages === lastPage.page.number + 1 ||
      lastPage.page.totalPages === 0
        ? undefined
        : lastPage.page.number + 1,
    initialPageParam: 0,
  })
  const reservedQuery = useInfiniteQuery({
    queryKey: ['managerMatch', { type: 'RESERVED' }],
    queryFn: ({ pageParam = 0 }) =>
      fetchManagerMatchList({
        statuses: 'RESERVED',
        page: pageParam,
        todayOnly,
        keyword,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.page.totalPages === lastPage.page.number + 1 ||
      lastPage.page.totalPages === 0
        ? undefined
        : lastPage.page.number + 1,
    initialPageParam: 0,
  })

  const playingQuery = useInfiniteQuery({
    queryKey: ['managerMatch', { type: 'PLAYING' }],
    queryFn: ({ pageParam = 0 }) =>
      fetchManagerMatchList({
        statuses: 'PLAYING',
        page: pageParam,
        todayOnly,
        keyword,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.page.totalPages === lastPage.page.number + 1 ||
      lastPage.page.totalPages === 0
        ? undefined
        : lastPage.page.number + 1,
    initialPageParam: 0,
  })

  const finishedQuery = useInfiniteQuery({
    queryKey: ['managerMatch', { type: 'FINISHED' }],
    queryFn: ({ pageParam = 0 }) =>
      fetchManagerMatchList({
        statuses: 'FINISHED',
        page: pageParam,
        todayOnly,
        keyword,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.page.totalPages === lastPage.page.number + 1 ||
      lastPage.page.totalPages === 0
        ? undefined
        : lastPage.page.number + 1,
    initialPageParam: 0,
  })

  // 모든 쿼리의 상태를 확인
  const allSuccess =
    reservedQuery.isSuccess &&
    playingQuery.isSuccess &&
    finishedQuery.isSuccess &&
    createdQuery.isSuccess

  // 각 쿼리의 데이터를 배열로 평탄화
  const createdList =
    createdQuery.data?.pages.flatMap((page) => page.content) || []
  const reservedList =
    reservedQuery.data?.pages.flatMap((page) => page.content) || []
  const playingList =
    playingQuery.data?.pages.flatMap((page) => page.content) || []
  const finishedList =
    finishedQuery.data?.pages.flatMap((page) => page.content) || []

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      if (hasNextPageCreated) fetchNextPageCreated()
      if (hasNextPageReserved) fetchNextPageReserved()
      if (hasNextPagePlaying) fetchNextPagePlaying()
      if (hasNextPageFinished) fetchNextPageFinished()
    }
  }
  useObserver({
    target: bottom,
    onIntersect,
  })
  const allRefetch = () => {
    createdQuery.refetch()
    reservedQuery.refetch()
    playingQuery.refetch()
    finishedQuery.refetch()
  }

  // fetchNextPage 및 hasNextPage 정보를 각 쿼리에서 가져옴
  const fetchNextPageCreated = createdQuery.fetchNextPage
  const fetchNextPageReserved = reservedQuery.fetchNextPage
  const fetchNextPagePlaying = playingQuery.fetchNextPage
  const fetchNextPageFinished = finishedQuery.fetchNextPage

  const hasNextPageCreated = createdQuery.hasNextPage
  const hasNextPageReserved = reservedQuery.hasNextPage
  const hasNextPagePlaying = playingQuery.hasNextPage
  const hasNextPageFinished = finishedQuery.hasNextPage

  return {
    allSuccess,
    reservedList,
    playingList,
    finishedList,
    createdList,
    bottom,
    allRefetch,
  }
}
