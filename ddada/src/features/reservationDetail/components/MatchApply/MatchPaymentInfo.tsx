interface MatchPaymentInfoProps {
  isMatchReserved: boolean
}

export default function MatchPaymentInfo({
  isMatchReserved,
}: MatchPaymentInfoProps) {
  if (isMatchReserved) {
    return (
      <>
        <div className="pb-3 flex flex-col gap-y-1 border-b border-disabled text-xs text-disabled-dark">
          <h2 className="text-sm font-bold text-black">결제금액</h2>
          <div className="flex justify-between">
            <span>공간사용료</span>
            <span>₩5,000</span>
          </div>
          <div className="flex justify-between">
            <span>수수료</span>
            <span>₩500</span>
          </div>
        </div>
        <div className="flex justify-end">
          <span className="text-base text-theme font-bold">₩5,500</span>
        </div>
      </>
    )
  }
  // return null
}
