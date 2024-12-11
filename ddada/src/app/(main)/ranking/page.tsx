'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'

import { getProfile } from '@/features/mypage/api/mypage/index.ts'
import RankTier from '@/features/mypage/components/RankTier/index.tsx'
import { getRanking } from '@/features/ranking/api/getRanking.ts'
import LoadingSpinner from '@/static/imgs/mypage/playstyle/my-page-playstyle-spinner.svg'
import RankingLogo from '@/static/imgs/ranking/ranking_main_logo.png'

export default function RankingPage() {
  const [page, setPage] = useState(1)
  const itemsPerPage = 50

  const {
    data,
    isLoading,
    isError: rankError,
  } = useQuery({
    queryKey: ['ranking'],
    queryFn: getRanking,
    retry: 0,
    staleTime: 1000 * 60 * 1,
  })

  const {
    data: userProfile,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    retry: 0,
    staleTime: 1000 * 60 * 1,
  })

  if (userLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col gap-y-6 py-8 justify-center items-center">
          <LoadingSpinner className="animate-spin" />
          <p className="text-theme animate-pulse">
            랭킹을 불러오는 중입니다. 잠시만 기달려주세요.
          </p>
        </div>
      </div>
    )
  }

  if (rankError || userError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col gap-y-6 py-8 justify-center items-center">
          <p className="text-disabled-dark font-bold">
            랭킹을 불러오는 중 문제가 발생했습니다.
          </p>
        </div>
      </div>
    )
  }

  const firstPlace = data.length > 0 ? data[0] : null
  const secondPlace = data.length > 1 ? data[1] : null
  const thirdPlace = data.length > 2 ? data[2] : null
  const allRankings = data.slice(3, -1)
  const displayedRankings = allRankings.slice(0, page * itemsPerPage)
  const hasMore = displayedRankings.length < allRankings.length

  return (
    <div className="flex flex-col items-center py-8 min-h-screen">
      <div className="flex justify-center mb-6">
        <Image
          src={RankingLogo}
          alt="랭킹 로고"
          height={200}
          width={734}
          priority
        />
      </div>

      <div className="flex flex-col rounded-xl p-6 w-full max-w-2xl gap-y-6">
        {data.length > 0 && (
          <div className="rounded-lg p-4 mb-6 text-gray-700">
            <p className="font-semibold text-lg text-gray-600">플레이어 랭킹</p>
            <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              {data[data.length - 1].ranking < 0 ? (
                <p className="text-xl font-bold text-theme">-위</p>
              ) : (
                <p className="text-xl font-bold text-theme">
                  {data[data.length - 1].ranking}위
                </p>
              )}
              <p className="text-lg text-theme font-medium">
                {data[data.length - 1].nickname}
              </p>
              <RankTier
                rating={data[data.length - 1].rating}
                gameCount={data[data.length - 1].playCount}
              />
            </div>
          </div>
        )}

        <p className="font-semibold text-lg text-gray-600">전체 랭킹</p>

        <div className="flex justify-center items-end mb-12 gap-4">
          {secondPlace && (
            <div className="text-center">
              <div className="bg-gray-200 rounded-full p-4 mb-2 text-2xl font-bold">
                2
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="font-semibold">{secondPlace.nickname}</p>
                <RankTier rating={secondPlace.rating} />
              </div>
            </div>
          )}

          {firstPlace && (
            <div className="text-center -mt-8">
              <div className="bg-yellow-400 rounded-full p-4 mb-2 text-3xl font-bold">
                1
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <p className="font-bold text-xl">{firstPlace.nickname}</p>
                <RankTier rating={firstPlace.rating} />
              </div>
            </div>
          )}

          {thirdPlace && (
            <div className="text-center">
              <div className="bg-orange-200 rounded-full p-4 mb-2 text-2xl font-bold">
                3
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="font-semibold">{thirdPlace.nickname}</p>
                <RankTier rating={thirdPlace.rating} />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {displayedRankings.map(
            (rank: { ranking: number; nickname: string; rating: number }) => (
              <div
                key={rank.ranking}
                className={`flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150 ease-in-out
                  ${userProfile?.nickname === rank.nickname && 'border-theme border-2'}`}
              >
                <p
                  className={`text-lg font-semibold text-gray-700
                  ${userProfile?.nickname === rank.nickname ? 'text-theme' : 'text-gray-700'}`}
                >
                  {rank.ranking}위
                </p>
                <p
                  className={`text-lg
                  ${userProfile?.nickname === rank.nickname ? 'text-theme' : 'text-gray-700'}`}
                >
                  {rank.nickname}
                </p>
                <RankTier rating={rank.rating} />
              </div>
            ),
          )}
        </div>

        {hasMore && (
          <button
            type="button"
            onClick={() => setPage(page + 1)}
            className="mt-6 px-4 py-2 bg-theme text-white font-semibold rounded-lg hover:bg-opacity-50"
          >
            더보기
          </button>
        )}
      </div>
    </div>
  )
}
