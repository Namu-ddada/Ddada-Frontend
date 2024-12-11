'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { fetchRecommendRacket } from '@/features/racketRecommend/api/racketSearch.ts'
import RacketRecommendCard from '@/features/racketRecommend/components/RacketRecommendCard/index.tsx'
import useRacketRecommendStore from '@/features/racketRecommend/stores/useRacketRecommendStore.ts'
import LoadingSpinner from '@/static/imgs/mypage/playstyle/my-page-playstyle-spinner.svg'
import BackIcon from '@/static/imgs/racketRecommned/BackIcon.svg'
import ResultBanner from '@/static/imgs/racketRecommned/ResultBanner.png'

export default function ResultLoading() {
  const router = useRouter()

  const { userPreference } = useRacketRecommendStore()
  const [isVisible, setVisible] = useState<boolean>(false)
  const { data, isSuccess } = useQuery({
    queryKey: ['racketRecommend'],
    queryFn: () => fetchRecommendRacket(userPreference),
    staleTime: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible || !isSuccess) {
    return (
      <div className="flex flex-col gap-y-4 w-[34rem] items-center justify-center">
        <LoadingSpinner className="animate-spin" />
        <span className="text-xl animate-pulse text-theme">
          결과를 분석 중이에요
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-20 max-w-[34rem]">
      <div className="flex">
        <button type="button" onClick={() => router.back()}>
          <p className="flex gap-x-2 items-center text-sm  text-disabled-dark">
            <BackIcon />
            <span>이전으로 돌아가기</span>
          </p>
        </button>
      </div>
      <div className="relative rounded-xl">
        <p className="absolute w-full px-2 flex flex-col gap-y-2 justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
          <span className="text-sm">내 선호 라켓유형은?</span>
          {/* 여기에 props */}
          <span className="text-[2.5rem] font-bold text-center">
            {data?.my_type.nickname}
          </span>
        </p>
        <Image
          className="w-[35.375rem] h-[18rem] object-cover overflow-hidden rounded-xl"
          src={ResultBanner}
          alt="ResultBanner"
          width={566}
          height={288}
        />
      </div>
      {/* des */}
      <div className="flex flex-col gap-y-2.5 items-center">
        <span>🧐</span>
        <span className="text-xl">
          <span className="text-theme">{data?.my_type.nickname}</span>은 어떤
          특징을 가지고있나요?
        </span>
        <span className="text-sm text-center">{data?.my_type.explanation}</span>
      </div>

      <div className="bg-base-50 rounded-xl px-6 py-3 ">
        <ul className=" text-sm list-disc list-inside flex flex-col gap-y-2">
          <li className="">
            유형에 맞는 라켓이 없을 시 가장 유사한 라켓을 추천해드려요
          </li>
          <li>
            추천 결과는 최신 데이터를 기반으로 하고 있으나, 시간에 따라 상품
            정보가 변경될 수 있어요
          </li>
          <li>
            라켓의 실제 사용감은 개인의 체형, 기호에 따라 다를 수 있으니, 구매
            전 실제 제품을 방문체험해보시는 것을 권장해요
          </li>
        </ul>
      </div>

      <div className="text-center">
        <p className="text-sm">
          플레이어님께 딱 맞는{' '}
          <span className="font-bold">{data?.racket.length}개의 라켓</span>을
          찾았어요!
        </p>
      </div>

      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-1">
          <span>
            DDADA만의 <span className="text-theme">똑똑한 라켓추천</span>
          </span>
          <span className="text-2xl font-bold">
            선수님의 유형에 맞게 준비했어요
          </span>
        </div>
        <div className="grid grid-cols-3 gap-x-6 mb-40">
          {data?.racket.map((racket) => (
            <RacketRecommendCard key={racket.racket_id} data={racket} />
          ))}
        </div>
      </div>
    </div>
  )
}
