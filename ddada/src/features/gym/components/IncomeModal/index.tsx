import { useQueryClient } from '@tanstack/react-query'

import CommonModal from '@/components/CommonModal/index.tsx'
import { gymWithdraw } from '@/features/gym/api/GymAPI.ts'
import { useGymContext } from '@/features/gym/providers/index.tsx'
import CheckIcon from '@/static/imgs/gym/CheckIcon.svg'

interface IncomeModalProps {
  handleModalClose: () => void
}

export default function IncomeModal({ handleModalClose }: IncomeModalProps) {
  const gymInfo = useGymContext()
  const queryClient = useQueryClient()

  const handleWithdraw = async () => {
    await gymWithdraw('112-345-678')
    queryClient.invalidateQueries({ queryKey: ['gyminfo'] })
    handleModalClose()
  }
  return (
    <CommonModal handleModalClose={handleModalClose}>
      <div className="w-[31.25rem] bg-white rounded-xl">
        <div className="flex flex-col p-6 gap-y-6 items-center">
          {/* 아이콘 */}
          <CheckIcon />
          {/* text */}
          <div className="flex flex-col gap-y-1 items-center">
            <h1 className="text-2xl font-bold ">아래 계좌로 보낼까요?</h1>
            <span className="text-xs text-disabled-dark">
              저장되어있는 계좌번호로 누적 수입을 송금합니다.
            </span>
          </div>
          {/* 계좌 */}
          <div className="flex flex-col gap-y-1 w-full text-disabled-dark">
            <span>계좌번호</span>
            <input
              className="px-6 h-[3.875rem] rounded-xl"
              type="text"
              value="112-345-678"
              disabled
            />
          </div>

          {/* 금액 */}
          <div className="flex flex-col gap-y-1 w-full text-disabled-dark">
            <span>금액</span>
            <input
              className="px-6 h-[3.875rem] rounded-xl"
              type="text"
              value={`₩ ${gymInfo?.gymAdmin.income}`}
              disabled
            />
          </div>

          {/* btn */}
          <div className="flex gap-x-1 w-full">
            <button
              type="button"
              onClick={() => handleModalClose()}
              className="rounded-xl py-3 px-6 grow border border-disabled "
            >
              <span>아니오</span>
            </button>
            <button
              type="button"
              onClick={() => handleWithdraw()}
              className="rounded-xl py-3 px-6 grow bg-theme text-white"
            >
              <span>예</span>
            </button>
          </div>
        </div>
      </div>
    </CommonModal>
  )
}
