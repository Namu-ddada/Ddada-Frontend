'use client'

import { useState } from 'react'

import ModalCloseIcon from '@/static/imgs/main/ModalcloseIcon.svg'

export default function MainFooter() {
  const [serviceModal, setServiceModal] = useState(false)
  const [privacyModal, setPrivacyModal] = useState(false)

  const closeModal = () => {
    setServiceModal(false)
    setPrivacyModal(false)
  }

  const openServiceModal = () => {
    setServiceModal(true)
  }
  const openPrivacyModal = () => {
    setPrivacyModal(true)
  }
  return (
    <>
      {(serviceModal || privacyModal) && (
        <div
          className="fixed left-0 top-0 z-20 h-screen w-screen overflow-hidden"
          onClick={closeModal}
          aria-hidden="true"
        />
      )}
      <div className="flex flex-col w-full gap-3 px-8 py-4 text-[#6B6E78] bg-[#F6F6F6] ">
        <div className="flex justify-between">
          <div className="font-bold">DDADA - 배드민턴 매치 플랫폼</div>
          <div className="flex gap-[0.625rem] text-xs underline underline-offset-2">
            <button type="button" onClick={openServiceModal}>
              서비스 이용약관
            </button>
            <button type="button" onClick={openPrivacyModal}>
              개인정보처리방침
            </button>
          </div>
        </div>
        <div className="text-sm">Copyright © SSAFY. All rights reserved.</div>
        <div className="flex flex-col text-xs">
          <div>서울특별시 강남구 테헤란로 212 | 대표자 박상우 </div>
          <div>
            사업자등록번호 123-45-67890 | 통신판매 신고번호 DDADA12345 | 전화
            010-1234-5678 | 이메일 ddada@dev.com
          </div>
        </div>
      </div>

      {serviceModal && (
        <div className="flex flex-col text-xs gap-6 fixed top-1/3 left-1/3 z-20 w-[35rem] bg-white rounded-xl overflow-hidden drop-shadow-lg py-4 px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">서비스 이용약관</h2>
            <button
              type="button"
              onClick={closeModal}
              aria-label="서비스 이용약관 모달 닫기"
            >
              <ModalCloseIcon />
            </button>
          </div>
          <div>
            <p>
              본 서비스 이용약관(이하 “약관”)은 DDADA(이하 “회사”)가 제공하는
              배드민턴 매치 플랫폼 서비스(이하 “서비스”)의 이용과 관련하여,
              회사와 이용자(이하 “회원”) 간의 권리, 의무 및 책임사항을 규정함을
              목적으로 합니다.
            </p>
            <h3>제1조 (목적)</h3>
            <p>
              본 약관은 회사가 제공하는 서비스의 이용과 관련된 회사와 회원 간의
              권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로
              합니다.
            </p>
            <h3>제2조 (용어의 정의)</h3>
            <p>
              1. “서비스”란 회사가 제공하는 모든 배드민턴 매치 관련 플랫폼을
              의미합니다.
              <br />
              2. “회원”이란 본 약관을 동의하고 서비스를 이용하는 고객을
              의미합니다.
              <br />
              3. “매치”란 회원 간의 배드민턴 경기를 위해 등록 및 예약된 이벤트를
              말합니다.
            </p>
            <h3>제3조 (이용약관의 효력 및 변경)</h3>
            <p>
              1. 본 약관은 회원이 서비스에 가입할 때 명시됨으로써 그 효력이
              발생합니다.
              <br />
              2. 회사는 필요에 따라 약관을 변경할 수 있으며, 변경된 약관은
              공지사항을 통해 안내합니다.
            </p>
            {/* 기타 약관 내용 추가 */}
          </div>
        </div>
      )}
      {privacyModal && (
        <div className="flex flex-col text-xs gap-6 fixed top-1/3 left-1/3 z-20 w-[35rem] bg-white rounded-xl overflow-hidden drop-shadow-lg py-4 px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">개인정보처리방침</h2>
            <button
              type="button"
              onClick={closeModal}
              aria-label="개인정보처리방침 모달 닫기"
            >
              <ModalCloseIcon />
            </button>
          </div>
          <div>
            <p>
              본 개인정보처리방침은 DDADA(이하 “회사”)가 제공하는 배드민턴 매치
              플랫폼 서비스(이하 “서비스”)와 관련하여, 회원의 개인정보 수집,
              이용, 제공, 보호 등과 관련된 정책을 규정합니다.
            </p>
            <h3>제1조 (수집하는 개인정보 항목)</h3>
            <p>
              회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수
              있습니다.
              <br />
              1. 회원 가입 시: 이름, 이메일 주소, 전화번호
              <br />
              2. 매치 예약 시: 결제 정보, 매치 정보
            </p>
            <h3>제2조 (개인정보의 수집 및 이용 목적)</h3>
            <p>
              회사는 다음의 목적을 위해 개인정보를 수집 및 이용합니다.
              <br />
              1. 회원 관리: 회원 식별, 서비스 이용 관리
              <br />
              2. 매치 진행 및 관리: 매치 예약, 결제 및 환불 처리
              <br />
              3. 서비스 개선: 서비스 품질 개선 및 이용자 의견 수렴
            </p>
            <h3>제3조 (개인정보의 보유 및 이용 기간)</h3>
            <p>
              회사는 법령에서 정한 기간 동안 개인정보를 보유 및 이용하며, 그
              기간은 다음과 같습니다.
              <br />
              1. 회원 가입 정보: 회원 탈퇴 시까지
              <br />
              2. 매치 관련 정보: 매치 종료 후 1년
            </p>
            {/* 기타 개인정보처리방침 내용 추가 */}
          </div>
        </div>
      )}
    </>
  )
}
