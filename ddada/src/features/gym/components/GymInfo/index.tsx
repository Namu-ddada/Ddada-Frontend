import { createPortal } from 'react-dom'

import IncomeModal from '@/features/gym/components/IncomeModal/index.tsx'
import { useGymContext } from '@/features/gym/providers/index.tsx'
import useModal from '@/hooks/useModal/index.tsx'
import WithdrawIcon from '@/static/imgs/gym/WithdrawIcon.svg'

export default function GymInfo() {
  const gymInfo = useGymContext()
  const { isModalOpen, portalElement, handleModalClose, handleModalOpen } =
    useModal()

  return (
    <>
      {isModalOpen && portalElement
        ? createPortal(
            <IncomeModal handleModalClose={handleModalClose} />,
            portalElement,
          )
        : null}
      <div className="p-6 flex">
        <div className="flex flex-col gap-y-3 grow">
          <p className="text-5xl font-bold">
            안녕하세요 {gymInfo?.gymAdmin.nickname}님 ✌
          </p>
          <p className="text-2xl">오늘 하루 예약을 알려드려요</p>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="bg-theme rounded-full text-white"
            onClick={() => handleModalOpen()}
          >
            <div className="flex gap-x-1 py-3 px-6">
              <WithdrawIcon />
              <span>인출하기</span>
            </div>
          </button>
        </div>
      </div>
    </>
  )
}
