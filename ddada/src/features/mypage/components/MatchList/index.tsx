'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { getMyMatchList } from '@/features/mypage/api/mypage/index.ts'
import MyMatchCard from '@/features/mypage/components/MyMatchCard/index.tsx'
import { MyMatchDetailsType } from '@/features/mypage/types/MyMatchType.ts'
import MatchListLogo from '@/static/imgs/mypage/my-page-matchlist.png'

export default function MatchList() {
  const { data } = useQuery({
    queryKey: ['myMatchList'],
    queryFn: getMyMatchList,
    staleTime: 1000 * 60 * 1,
  })
  const router = useRouter()
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Image src={MatchListLogo} alt="mypage-MatchList-logo" />
      </div>
      <div className="flex flex-col gap-3">
        {data && data.length ? (
          data.map((match: MyMatchDetailsType) => (
            <MyMatchCard key={match.matchId} match={match} />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center text-sm  text-disabled-dark gap-1">
            <div className="flex flex-col justify-center items-center font-bold">
              <p>예약된 결과가 없어요 :(</p>
              <p>
                <Link href="/match-reservation">예약해볼까요? </Link>
              </p>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => router.push('/match-reservation')}
                className="border border-theme text-theme py-1 px-3 rounded-xl hover:bg-theme hover:text-white transition-colors duration-200"
              >
                매치 예약
              </button>
              <button
                type="button"
                onClick={() => router.push('/court-reservation')}
                className="border border-theme text-theme py-1 px-3 rounded-xl hover:bg-theme hover:text-white transition-colors duration-200"
              >
                장소 예약
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
