'use client'

import Image from 'next/image'

import Benefits from '@/static/imgs/manager/Benefits.png'
import FreeCoupon from '@/static/imgs/manager/Coupon.png'
import Money from '@/static/imgs/manager/Money.png'
import Number1 from '@/static/imgs/manager/Number1.svg'
import Number2 from '@/static/imgs/manager/Number2.svg'
import Number3 from '@/static/imgs/manager/Number3.svg'
import Number4 from '@/static/imgs/manager/Number4.svg'
import RecruitMainLogo from '@/static/imgs/manager/RecruitMainLogo.png'
import RecruitProcess from '@/static/imgs/manager/RecruitProcess.png'
import YellowBell from '@/static/imgs/manager/YellowBell.png'

export default function ManagerRecruitPage() {
  const recruitForm = () => {
    window.open('https://forms.gle/5XjS4LYvaVXVxYT97')
  }

  return (
    <div className="w-full">
      <button
        className="fixed bottom-10 z-50 py-3 px-12 bg-theme rounded-full text-theme-light text-xl left-1/2 -translate-x-1/2 -translate-y-1/2
        hover:animate-pulse"
        type="button"
        onClick={recruitForm}
      >
        매니저 신청하기
      </button>
      <div className="w-full h-[31.25rem] relative flex justify-center items-center">
        <Image
          src={RecruitMainLogo}
          alt="landing page main logo"
          className="absolute w-full"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="z-40 flex flex-col gap-6">
          <div className="text-white flex flex-col justify-center items-center gap-[0.625rem]">
            <p className="text-5xl  font-bold">DDADA 매니저</p>
            <p className="text-3xl text-theme">
              DDADA
              <span className="text-3xl text-white">
                와 함께 문화생활을 만들어요
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-40 px-8 py-[4.5rem] justify-center items-center">
        <div className="flex flex-col gap-3 justify-center items-center text-5xl font-bold">
          <p>DDADA 매니저하고</p>
          <p>혜택 받자</p>
        </div>
        <div className="w-full max-w-[75rem] flex gap-20">
          <div className="aspect-square flex-1 flex flex-col gap-2 py-4 justify-center items-center shadow-xl rounded-3xl">
            <div>
              <Image src={Benefits} alt="복리후생" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-3xl font-bold">복리후생</p>
              <p className="text-xl text-disabled-dark">
                4대보험부터 우수매니저 포상 등
              </p>
            </div>
          </div>
          <div className="aspect-square flex-1 flex flex-col gap-2 py-4 justify-center items-center shadow-xl rounded-3xl">
            <div>
              <Image src={FreeCoupon} alt="매치 무료쿠폰" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-3xl font-bold">매치 무료쿠폰</p>
              <p className="text-xl text-disabled-dark">
                일정 횟수 심판보고 무료쿠폰 받기
              </p>
            </div>
          </div>
          <div className="aspect-square flex-1 flex flex-col gap-2 py-4 justify-center items-center shadow-xl rounded-3xl">
            <div>
              <Image src={Money} alt="매치수당" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-3xl font-bold">매치수당</p>
              <p className="text-xl text-disabled-dark">
                경기 심판보고 입금받기
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full px-[0.625rem] bg-primary gap-[0.625rem]">
        <Image src={YellowBell} alt="yellow bell" />
        <p className="text-white text-3xl font-extralight">
          즉시 <span className="font-bold">매니저 지원</span> 하러 가기!
        </p>
      </div>
      <div className="flex flex-col px-8 py-[4.5rem] justify-center items-center gap-[7.5rem]">
        <div className="text-5xl font-bold w-[28.125rem]">
          <p className="text-left">DDADA 매니저, </p>
          <p className="text-right">어떤 일을 해요?</p>
        </div>
        <div className="flex flex-col gap-6 justify-center items-center">
          <div className="w-[1376px] flex gap-6 px-20 justify-center items-center">
            <div className="flex flex-col gap-6 py-10 w-[596px] shadow-xl rounded-xl">
              <div className="flex justify-center items-center">
                <Number1 />
              </div>
              <div>
                <p className="text-3xl font-bold text-center">매치 심판</p>
                <p className="text-xl text-center">
                  매치 시작부터 종료까지 매치 전체를 관리해요
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 py-10 w-[596px] shadow-xl rounded-xl">
              <div className="flex justify-center items-center">
                <Number2 />
              </div>
              <div>
                <p className="text-3xl font-bold text-center">선수 관리</p>
                <p className="text-xl text-center">
                  매치 시작 전부터 끝까지 플레이어를 응대해요
                </p>
              </div>
            </div>
          </div>
          <div className="w-[1376px] flex gap-6 px-20 justify-center items-center">
            <div className="flex flex-col gap-6 py-10 w-[596px] shadow-xl rounded-xl">
              <div className="flex justify-center items-center">
                <Number3 />
              </div>
              <div>
                <p className="text-3xl font-bold text-center">스코어 기록</p>
                <p className="text-xl text-center">
                  서비스 내 존재하는 기록판에 매치 과정을 기록해요
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 py-10 w-[596px] shadow-xl rounded-xl">
              <div className="flex justify-center items-center">
                <Number4 />
              </div>
              <div>
                <p className="text-3xl font-bold text-center">규칙 설명</p>
                <p className="text-xl text-center">
                  DDADA 매치 규정을 플레이어들에게 설명해요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Image
          src={RecruitProcess}
          alt="landing page main logo"
          className="w-full"
          priority
        />
      </div>
    </div>
  )
}
