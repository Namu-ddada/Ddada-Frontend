import CommonModal from '@/components/CommonModal/index.tsx'
import ExclamationIcon from '@/static/imgs/matchReservation/ExclamationIcon.svg'

interface MatchCancelModalProps {
  handleMatchCancel: () => void
  handleModalClose: () => void
}

export default function MatchCancelModal({
  handleModalClose,
  handleMatchCancel,
}: MatchCancelModalProps) {
  return (
    <CommonModal handleModalClose={handleModalClose}>
      <div className="bg-white rounded-xl flex flex-col gap-y-6 p-6">
        <div className="w-full flex justify-center">
          <ExclamationIcon />
        </div>
        <div className="flex flex-col gap-y-1 items-center">
          <p className="text-2xl font-bold">예약된 매치를 취소하시겠어요?</p>
          <p className="text-xs text-disabled-dark">
            매치 취소 시 불이익이 발생할 수 있으며, DDADA 환불 정책에 따라
            환불이 가능합니다.
          </p>
        </div>

        <div className="flex gap-x-1 text-xs justify-between">
          <button
            type="button"
            onClick={() => handleModalClose()}
            className="px-6 py-3 rounded-xl grow border border-[#EDE5E9]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              handleMatchCancel()
              handleModalClose()
            }}
            className="px-6 py-3 bg-theme text-white rounded-xl grow"
          >
            확인
          </button>
        </div>
      </div>
    </CommonModal>
  )
}
