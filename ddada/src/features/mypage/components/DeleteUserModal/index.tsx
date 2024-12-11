import { useState } from 'react'

import { patchDeleteUser } from '@/features/mypage/api/mypage/index.ts'
import ExclamationMarkIcon from '@/static/imgs/common/exclamationIcon.svg'
import ModalCloseIcon from '@/static/imgs/court-reservation/court-reservation_modalclose_icon.svg'
import CheckedBoxIcon from '@/static/imgs/mypage/mypage-checkedbox-icon.svg'
import UnChekedBoxIcon from '@/static/imgs/mypage/mypage-uncheckedbox-icon.svg'

interface DeleteUserModalProps {
  closeModal: () => void
  nickname: string
}

export default function DeleteUserModal({
  closeModal,
  nickname,
}: DeleteUserModalProps) {
  const [checked, setChecked] = useState<boolean>(false)
  const handleCloseModal = () => {
    closeModal()
  }
  const handleDeleteUser = async () => {
    patchDeleteUser()
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('refreshToken')
    sessionStorage.removeItem('loginType')
    window.location.href = '/'
  }
  return (
    <>
      <div>
        <div
          className="fixed left-0 top-0 z-10 h-screen w-screen overflow-hidden bg-black opacity-20"
          onClick={handleCloseModal}
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col gap-6 fixed top-1/5 left-1/3 z-20 w-[35rem] bg-white rounded-xl overflow-hidden drop-shadow-lg p-6">
        <div className="flex justify-between items-center">
          <ExclamationMarkIcon />
          <button
            type="button"
            onClick={handleCloseModal}
            aria-label="회원 탈퇴 모달 닫기"
          >
            <ModalCloseIcon />
          </button>
        </div>
        <div className="text-2xl font-bold">
          <p>{nickname}님,</p>
          <p>정말 탈퇴하시겠어요?</p>
        </div>
        <div className="text-sm flex flex-col gap-2 text-disabled-dark">
          <p>· 대기중인 매치가 있는 경우 삭제할 수 없습니다.</p>
          <p>· 회원님의 모든 정보가 삭제됩니다.</p>
          <p>· 회원탈퇴 후 30일 간 재가입이 불가능합니다.</p>
          <p className="text-[#D1D1D1]">
            · DDADA를 사용하신 경험이 도움이 되셨기를 바랍니다.
          </p>
        </div>
        <div>
          <button
            type="button"
            className="flex gap-2 items-center"
            onClick={() => setChecked(!checked)}
          >
            {checked ? <CheckedBoxIcon /> : <UnChekedBoxIcon />}
            <p className="text-disabled-dark">
              위 사항을 확인하였으며, 이에 동의합니다.
            </p>
          </button>
        </div>
        <div className="flex">
          <button
            type="button"
            className={`text-sm px-6 py-4 grow  rounded-xl
              ${checked ? 'bg-theme text-theme-light' : 'bg-disabled text-disabled-dark cursor-not-allowed'}
              `}
            disabled={!checked}
            onClick={handleDeleteUser}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </>
  )
}
