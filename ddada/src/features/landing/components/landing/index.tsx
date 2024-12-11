import Image from 'next/image'
import Link from 'next/link'

import LandingRacketBtn from '@/components/landing/racket/button/index.tsx'
import Computer from '@/static/imgs/landing/landing-page-computres.png'
import IntroductionMessage from '@/static/imgs/landing/landing-page-information_message.png'
import ManagerImage from '@/static/imgs/landing/landing-page-manager.png'
import BadmintonRacket from '@/static/imgs/landing/landing-page_badminton_raket.svg'
import EasyCount from '@/static/imgs/landing/landing-page_easy_count.png'
import RealTimeRegister from '@/static/imgs/landing/landing-page_free_register.png'
import LandingPageMainLogo from '@/static/imgs/landing/landing-page_JOIN.png'
import ManagerIcon from '@/static/imgs/landing/landing-page_manager_icon.svg'
import Rank from '@/static/imgs/landing/landing-page_rank_cut.png'
import FreeRegister from '@/static/imgs/landing/landing-page_real_time_reservation.png'

export default function Landing() {
  const handleGymPartnership = () => {
    window.open('http://pf.kakao.com/_ewcIn/chat')
  }
  return (
    <div className="w-full">
      <div className="w-full h-[31.25rem] relative flex justify-center items-center">
        <Image
          src={LandingPageMainLogo}
          alt="landing-page-main-logo"
          fill
          objectFit="cover"
          priority
        />
        <div className="z-10 flex flex-col gap-6">
          <div className="text-white flex flex-col justify-center items-center gap-3">
            <p className="text-5xl  font-bold">짜릿한 즐거움을 선사하는</p>
            <p className="text-3xl text-theme">
              DDADA
              <span className="text-3xl text-white">
                와 함께 문화생활을 만들어요
              </span>
            </p>
          </div>
          <div className="flex justify-center">
            <Link href="/login">
              <div className="py-4 px-12 text-theme border border-theme hover:bg-theme hover:text-theme-light transition-colors duration-300 ease-in-out">
                지금 가입하기
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="px-8 py-20 flex flex-col justify-center items-center gap-12">
        <div className="text-5xl font-bold flex flex-col justify-center items-center gap-3">
          <div className="flex flex-col justify-center items-center">
            <p>매치 신청부터 </p>
            <p>
              요약, 분석까지<span className="text-theme">.</span>
            </p>
          </div>
          <div className="text-base font-normal flex flex-col justify-center items-center">
            <p>DDADA를 즐겨주시는 여러분의</p>
            <p>매치데이터를 기반으로 분석을 해드려요</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src={Computer}
            alt="computers"
            width={800}
            height={352}
            priority
          />
        </div>
      </div>
      <div className="w-full">
        <Image
          src={IntroductionMessage}
          alt="introduction-message"
          className="w-full"
          priority
        />
      </div>
      <div className="flex flex-col px-8 py-20 gap-12 justify-center items-center">
        <div className="text-5xl font-bold flex flex-col justify-center items-center">
          <p>체육관 예약관리의 </p>
          <p>가장 쉬운 방법,</p>
          <p>
            DDADA<span className="text-theme">.</span>
          </p>
        </div>
        <div className="flex justify-center">
          <button type="button" onClick={handleGymPartnership}>
            <div className="text-theme text-xl py-4 px-12 border border-theme hover:bg-theme hover:text-theme-light transition-colors duration-300 ease-in-out">
              체육관 제휴맺기
            </div>
          </button>
        </div>
        <div>
          <div className="w-full max-w-[75rem] flex gap-20">
            <div className="aspect-square flex-1 flex items-center justify-center">
              <Image src={FreeRegister} alt="free register" priority />
            </div>
            <div className="aspect-square flex-1 flex items-center justify-center">
              <Image src={EasyCount} alt="easy count" priority />
            </div>
            <div className="aspect-square flex-1 flex items-center justify-center">
              <Image src={RealTimeRegister} alt="real time register" priority />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden relative">
        <Image src={Rank} alt="rank" style={{ objectFit: 'cover' }} priority />
      </div>

      <div className="w-full h-[31.25rem] px-[12.5rem] py-20 relative flex justify-start items-center">
        <Image
          src={ManagerImage}
          alt="manager"
          fill
          objectFit="cover"
          priority
        />

        <div className="z-10 flex flex-col gap-6 items-start justify-center">
          <ManagerIcon />
          <div className="text-white flex flex-col gap-y-3">
            <p className="text-5xl font-bold">공정한 심판,</p>
            <p className="text-5xl font-bold">따다 매니저</p>
            <p>
              매니저는 경기 심판을 보고
              <br />
              과정을 기록해요
            </p>
          </div>
          <div className="flex justify-left">
            <Link href="/manager-recruit">
              <div className="text-theme py-4 px-12 border border-theme hover:bg-theme hover:text-theme-light transition-colors duration-300 ease-in-out">
                매니저 신청하기
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-20 px-24 gap-20 justify-center items-center">
        <BadmintonRacket />
        <div className="flex flex-col gap-3 justify-center items-center">
          <p className="text-5xl font-bold">
            취향에 맞는 라켓은 모두, DDADA
            <span
              className="
          text-theme"
            >
              .
            </span>
          </p>
          <p>
            내 플레이 스타일은 어떤지, 딱 맞는 라켓을 찾고 계시다면 DDADA에서
            추천받아보세요
          </p>
        </div>
        <div className="w-full max-w-[75rem] flex flex-col items-center justify-center gap-6">
          <div className="w-full flex gap-20 items-center justify-center">
            <LandingRacketBtn name="무게" value="가벼움" />
            <LandingRacketBtn name="스타일" value="공격적" />
            <LandingRacketBtn name="재질" value="카본" />
          </div>
          <div className="w-full flex gap-20 items-center justify-center">
            <LandingRacketBtn name="가격" value="10만원대" />
            <LandingRacketBtn name="탄성" value="유연" />
            <LandingRacketBtn name="색감" value="유채색" />
          </div>
        </div>
      </div>
    </div>
  )
}
