'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import dayjs from 'dayjs'
import { usePathname, useRouter } from 'next/navigation'
import Script from 'next/script'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

import {
  getPlayerBookings,
  postMatchReservation,
} from '@/features/court-reservation/api/court/index.ts'
import {
  KR_DAY_OF_WEEK,
  MATCH_INFO,
} from '@/features/court-reservation/constants/court-reservation.ts'
import { getProfile } from '@/features/mypage/api/mypage/index.ts'
import useInvalidateMatchReservations from '@/hooks/useInvalidateMatchReservations/index.tsx'
import ModalCloseIcon from '@/static/imgs/court-reservation/court-reservation_modalclose_icon.svg'
import CheckedIcon from '@/static/imgs/court-reservation/court-reservation_payment_checked_icon.svg'
import UnCheckedIcon from '@/static/imgs/court-reservation/court-reservation_paymenty_unchecked_icon.svg'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PortOne: any
  }
}

interface PaymentModalProps {
  courtId: number
  closeModal: () => void
  courtName: string
  reservationDay: string
  reservationTime: string
}

export default function PaymentModal({
  courtId,
  closeModal,
  courtName,
  reservationDay,
  reservationTime,
}: PaymentModalProps) {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const { gender } = data
  const router = useRouter()
  const pathName = usePathname()
  const day = dayjs(reservationDay).format('MM.DD')
  const date = dayjs(reservationDay).format('YYYY-MM-DD')
  const DAY_OF_WEEK = KR_DAY_OF_WEEK[dayjs(reservationDay).day()]
  const [competitionType, setCompetitionType] = useState('친선')
  const [matchType, setMatchType] = useState('혼합복식')

  const { invalidateReservationList } = useInvalidateMatchReservations()

  const matchReservation = async () => {
    let RankType = ''
    let MatchType = ''
    if (competitionType === '경쟁') {
      RankType = 'RANK'
    } else {
      RankType = 'NORMAL'
    }
    if (matchType === '혼합복식') {
      MatchType = 'MIXED_DOUBLE'
    } else if (matchType === '남자복식') {
      MatchType = 'MALE_DOUBLE'
    } else if (matchType === '여자복식') {
      MatchType = 'FEMALE_DOUBLE'
    }
    const payload = {
      courtId,
      rankType: RankType,
      matchType: MatchType,
      date,
      time: `${reservationTime}`,
    }
    try {
      await postMatchReservation(payload)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response!.data.message ===
          '같은 시간에 다른 경기가 이미 예약된 선수입니다.'
        ) {
          toast.error('이미 동시간대 예약된 매치가 있습니다.')
        }
      }
    }
  }

  const handleCloseModal = () => {
    closeModal()
  }

  const handlePayment = async () => {
    const accessToken = sessionStorage.getItem('accessToken')
    if (!accessToken) {
      router.push(`/login?redirect=${encodeURIComponent(pathName)}`)
    } else {
      try {
        await getPlayerBookings(date, reservationTime)
        handlePortOne()
        closeModal()
      } catch {
        toast.error('이미 동시간대 예약된 매치가 있습니다.')
        closeModal()
      }
    }
  }

  const handlePortOne = () => {
    async function requestPayment() {
      const response = await window.PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_STORE_ID,
        channelKey: process.env.NEXT_PUBLIC_CHANNEL_KEY,
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: `${courtName} ${day} ${reservationTime} 예약`,
        totalAmount: 4000,
        currency: 'CURRENCY_KRW',
        payMethod: 'EASY_PAY',
        issueName: 'ddada',
      })

      if (response.code != null) {
        toast.error('예약 실패')
        return console.log('예약 실패')
      }
      invalidateReservationList()
      router.push('/mypage/mymatch')
      matchReservation()
      toast.success('예약 성공')
      return console.log('예약 성공')
    }
    requestPayment()
  }

  return (
    <>
      <Script src="https://cdn.portone.io/v2/browser-sdk.js" />
      <div
        className="fixed z-10 inset-0 overflow-hidden flex justify-center items-center"
        onClick={closeModal}
        aria-hidden="true"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          aria-hidden="true"
          className="flex flex-col gap-6 z-20 w-[35rem] bg-white rounded-xl overflow-hidden drop-shadow-lg py-4 px-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">예약 및 결제 </h2>
            <button
              type="button"
              onClick={closeModal}
              aria-label="예약 및 결제 닫기"
            >
              <ModalCloseIcon />
            </button>
          </div>
          <div className="flex-col gap-3 px-6 py-3 border border-3.5 border-black rounded-xl text-lg font-bold">
            <p>{courtName}</p>
            <p>
              {day}({DAY_OF_WEEK}) {reservationTime.slice(0, 5)}
            </p>
          </div>
          <div>
            <hr />
          </div>
          <div className="flex flex-col gap-3 ">
            <h3 className="text-lg font-bold">매치정보 선택</h3>
            <div className="flex flex-col gap-2">
              <p>경쟁여부</p>

              <div>
                <button
                  type="button"
                  onClick={() => setCompetitionType('친선')}
                  className="flex items-center gap-2"
                >
                  {competitionType === '친선' ? (
                    <CheckedIcon />
                  ) : (
                    <UnCheckedIcon />
                  )}
                  친선
                  <p className="text-theme">
                    (승리와 패배에 따른 실력점수와 등락이 없습니다.)
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setCompetitionType('경쟁')}
                  className="flex items-center gap-2"
                >
                  {competitionType === '경쟁' ? (
                    <CheckedIcon />
                  ) : (
                    <UnCheckedIcon />
                  )}
                  경쟁
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>매치타입</p>
              <div>
                {MATCH_INFO.matchType.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setMatchType(type)}
                    className={`flex items-center gap-2
                    ${gender === 'MALE' && type === '여자복식' && 'line-through text-disabled-dark'}
                    ${gender === 'FEMALE' && type === '남자복식' && 'line-through text-disabled-dark'}
                    `}
                    disabled={
                      (gender === 'MALE' && type === '여자복식') ||
                      (gender === 'FEMALE' && type === '남자복식')
                    }
                  >
                    {matchType === type ? <CheckedIcon /> : <UnCheckedIcon />}
                    {type}
                  </button>
                ))}
                <p className="text-disabled-dark">
                  단식은 추후 지원 예정입니다.
                </p>
              </div>
            </div>
          </div>
          <div>
            <hr />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">결제 정보</h3>

            <div className="flex justify-between">
              <p>매치 가격</p>
              <p>5,000원</p>
            </div>
            <div className="flex justify-between">
              <p>런칭 할인</p>
              <p>-1,000원</p>
            </div>

            <div>
              <hr />
            </div>
            <div className="flex justify-between">
              <p className="font-bold">결제 금액</p>
              <p>4,000원</p>
            </div>
          </div>
          <div className="flex gap-6">
            <button
              type="button"
              className="text-theme  rounded px-4 py-2 border border-disabled grow"
              onClick={handleCloseModal}
            >
              닫기
            </button>
            <button
              type="button"
              className="text-white bg-theme rounded px-4 py-2 grow"
              onClick={handlePayment}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
