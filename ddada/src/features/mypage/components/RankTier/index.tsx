import Image from 'next/image'
import { useEffect, useState } from 'react'

import Amateur from '@/static/imgs/rank/Amateur.png'
import Master from '@/static/imgs/rank/Master.png'
import Professional from '@/static/imgs/rank/Professional.png'
import Rookie from '@/static/imgs/rank/Rookie.png'
import SemiPro from '@/static/imgs/rank/Semi-pro.png'

interface RankTierProps {
  rating: number
  gameCount?: number
}

export default function RankTier({ rating, gameCount }: RankTierProps) {
  const [tier, setTier] = useState<string>('')
  const [tierNum, setTierNum] = useState<string>('')

  useEffect(() => {
    const tiers = [
      { min: -Infinity, max: 800, tier: '아마추어', tierNum: 1 },
      { min: 800, max: 1000, tier: '아마추어', tierNum: 2 },
      { min: 1000, max: 1200, tier: '아마추어', tierNum: 3 },
      { min: 1200, max: 1400, tier: '세미프로', tierNum: 1 },
      { min: 1400, max: 1600, tier: '세미프로', tierNum: 2 },
      { min: 1600, max: 1800, tier: '세미프로', tierNum: 3 },
      { min: 1800, max: 2000, tier: '프로페셔널', tierNum: 1 },
      { min: 2000, max: 2200, tier: '프로페셔널', tierNum: 2 },
      { min: 2200, max: 2400, tier: '프로페셔널', tierNum: 3 },
      { min: 2400, max: Infinity, tier: '마스터', tierNum: 0 },
    ]
    const currentTier = tiers.find((t) => rating >= t.min && rating < t.max)

    if (gameCount !== undefined && (gameCount === 0 || gameCount < 3)) {
      setTier('루키')
      setTierNum('')
    } else if (currentTier) {
      setTier(currentTier.tier)
      if (currentTier.tierNum === 0) {
        setTierNum('')
      } else if (currentTier.tierNum === 1) {
        setTierNum('I')
      } else if (currentTier.tierNum === 2) {
        setTierNum('II')
      } else if (currentTier.tierNum === 3) {
        setTierNum('III')
      }
    }
  }, [rating, gameCount])

  return (
    <div
      className={`border-2 rounded-full flex items-center justify-center py-1 px-3 gap-2
      ${tier === '루키' && 'border-black text-black bg-black bg-opacity-20'}
      ${tier === '아마추어' && 'border-[#963D0A] text-[#963D0A] bg-[#963D0A] bg-opacity-20'}
      ${tier === '세미프로' && 'border-[#6D6D6D] text-[#6D6D6D] bg-[#F6F6F6]'}
      ${tier === '프로페셔널' && 'border-theme text-theme bg-theme-light'}
      ${tier === '마스터' && 'border-[#9180D4] text-[#9180D4] bg-[#F1F2FC]'}
      `}
    >
      <div className="flex items-center justify-center h-6 w-6">
        {tier === '루키' && (
          <Image src={Rookie} alt="루키" width={24} height={24} />
        )}
        {tier === '아마추어' && (
          <Image src={Amateur} alt="아마추어" width={24} height={24} />
        )}
        {tier === '세미프로' && (
          <Image src={SemiPro} alt="세미프로" width={24} height={24} />
        )}
        {tier === '프로페셔널' && (
          <Image src={Professional} alt="프로페셔널 " width={24} height={24} />
        )}
        {tier === '마스터' && (
          <Image src={Master} alt="마스터" width={24} height={24} />
        )}
      </div>
      <p className="text-sm font-normal">
        {tier} {tierNum}
      </p>
    </div>
  )
}
