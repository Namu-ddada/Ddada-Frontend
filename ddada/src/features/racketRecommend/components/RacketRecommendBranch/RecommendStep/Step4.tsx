'use client'

import { useState } from 'react'

import PriceSelectCard from '@/features/racketRecommend/components/PriceSelectCard/index.tsx'
import useRacketRecommendStore from '@/features/racketRecommend/stores/useRacketRecommendStore.ts'

export default function Step4() {
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null)
  const { setCanMoveNext, setPreference } = useRacketRecommendStore()

  const handlePriceSelect = (price: number) => {
    setCanMoveNext(true)
    setPreference('price', price)
    setSelectedPrice(price)
  }

  return (
    <div className="flex flex-col gap-y-[5.25rem] w-[34rem] ">
      <p className="text-xl text-center">
        구매하려는 라켓의 가격대를 골라주세요
      </p>
      <div className="flex flex-col gap-y-3">
        <button type="button" onClick={() => handlePriceSelect(-1)}>
          <PriceSelectCard isClicked={selectedPrice === -1}>
            <span>가격은 상관없어요</span>
          </PriceSelectCard>
        </button>
        <button type="button" onClick={() => handlePriceSelect(0)}>
          <PriceSelectCard isClicked={selectedPrice === 0}>
            <span>10만 원 미만</span>
          </PriceSelectCard>
        </button>
        <button type="button" onClick={() => handlePriceSelect(10)}>
          <PriceSelectCard isClicked={selectedPrice === 10}>
            <span>10만 원대</span>
          </PriceSelectCard>
        </button>
        <button type="button" onClick={() => handlePriceSelect(20)}>
          <PriceSelectCard isClicked={selectedPrice === 20}>
            <span>20만 원대</span>
          </PriceSelectCard>
        </button>
        <button type="button" onClick={() => handlePriceSelect(30)}>
          <PriceSelectCard isClicked={selectedPrice === 30}>
            <span>30만 원대</span>
          </PriceSelectCard>
        </button>
      </div>
    </div>
  )
}
