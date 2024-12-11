'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import PaymentModal from '@/features/court-reservation/components/PaymentModal/index.tsx'
import { COURT_RESERVATION_TIMES } from '@/features/court-reservation/constants/court-reservation.ts'
import { CourtType } from '@/features/court-reservation/types/CourtType.ts'
import ParkingIcon from '@/static/imgs/court-reservation/court-reservation_parking-lot_icon.svg'
import ShowerIcon from '@/static/imgs/court-reservation/court-reservation_shower_icon.svg'
import ToiletIcon from '@/static/imgs/court-reservation/court-reservation_toilet_icon.svg'
import WifiIcon from '@/static/imgs/court-reservation/court-resservation_wifi_icon.svg'

interface CourtsDetailProps {
  court: CourtType
  selectedDate: string
}

export default function Courts({ court, selectedDate }: CourtsDetailProps) {
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const router = useRouter()
  const now = new Date()
  const todayString = now.toISOString().split('T')[0]
  const currentTime = now.getHours() * 60 + now.getMinutes()

  useEffect(() => {
    setSelectedTime('')
  }, [selectedDate])

  const handlePaymentModal = () => {
    if (sessionStorage.getItem('accessToken')) {
      setPaymentModalOpen(true)
    } else {
      router.push(`/login?redirect=court-reservation`)
    }
  }

  const handlePaymentModalOff = () => {
    setPaymentModalOpen(false)
  }

  const handleSelectedTime = (time: string) => {
    setSelectedTime(time)
  }

  return (
    <div
      key={court.name}
      className="flex border-b w-[46rem] gap-[0.625rem] py-2"
    >
      <div className="w-[9.375rem] max-h-[11.5rem] rounded-[0.5rem] relative overflow-hidden">
        <Image
          src={court.image}
          alt="코트이미지"
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 50vw, 100vw"
          fill
        />
      </div>
      <div className="flex flex-col gap-4 flex-grow">
        <div>
          <p className="font-bold">{court.name}</p>
          <p className="text-sm text-disabled-dark">{court.address}</p>
        </div>
        <div className="flex gap-[0.625rem]">
          <ParkingIcon />
          <ShowerIcon />
          <ToiletIcon />
          <WifiIcon />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold">예약 가능시간</p>
          <div className="flex gap-[0.625rem] text-xs">
            {COURT_RESERVATION_TIMES.map((time) => {
              const [hours, minutes] = time.split(':').map(Number)
              const reservationTime = hours * 60 + minutes
              const isPastTime =
                selectedDate === todayString && reservationTime < currentTime
              const isDisabled =
                isPastTime ||
                (court.reservations &&
                  court.reservations[selectedDate] &&
                  court.reservations[selectedDate].includes(time))

              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleSelectedTime(time)}
                  className={`border px-2 py-1 rounded-[62.5rem]
                    ${isDisabled ? 'text-disabled' : ''}
                    ${selectedTime === time ? 'bg-theme text-white' : ''}`}
                  disabled={isDisabled}
                >
                  {time.slice(0, 5)}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div className="text-xs flex flex-col justify-end gap-3">
        <div className="text-right">
          <p className="text-disabled line-through">5000원</p>
          <div className="flex justify-end">
            <p className="font-bold">4000</p>
            <span>원/매치</span>
          </div>
        </div>
        <button
          type="button"
          className={`text-white px-4 py-2 rounded-xl
            ${selectedTime ? 'bg-theme' : 'bg-disabled'}`}
          onClick={handlePaymentModal}
          disabled={!selectedTime}
        >
          매치 생성하기
        </button>
      </div>
      {paymentModalOpen && (
        <PaymentModal
          courtId={court.id}
          closeModal={handlePaymentModalOff}
          courtName={court.name}
          reservationDay={selectedDate}
          reservationTime={selectedTime}
        />
      )}
    </div>
  )
}
