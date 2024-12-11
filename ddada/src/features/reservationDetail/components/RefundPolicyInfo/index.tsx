export default function RefundPolicyInfo() {
  return (
    <div className="p-2 flex flex-col gap-y-6  text-xs">
      {/* 제목 */}
      <div className="py-1 flex">
        <h1 className="text-base font-bold border-b-2 border-theme box-border">
          취소/환불규정
        </h1>
      </div>
      {/* 규정 */}
      <div className="flex flex-col gap-y-3">
        <div className="flex gap-x-4 pb-1 border-b border-disabled">
          <span className="text-disabled-dark w-20">매치 7일 전</span>
          <span>무료 취소</span>
        </div>
        <div className="flex gap-x-4 pb-1 border-b border-disabled">
          <span className="text-disabled-dark w-20">매치 5일 전</span>
          <span>총 금액의 70% 환급</span>
        </div>
        <div className="flex gap-x-4 pb-1 border-b border-disabled">
          <span className="text-disabled-dark w-20">매치 3일 전</span>
          <span>총 금액의 40% 환급</span>
        </div>
        <div className="flex gap-x-4 pb-1 border-b border-disabled">
          <span className="text-disabled-dark w-20">매치 전날</span>
          <span>환불 불가</span>
        </div>
        <div className="flex gap-x-4 pb-1 border-b border-disabled">
          <span className="text-disabled-dark w-20">매치 당일</span>
          <span>환불 불가</span>
        </div>
      </div>

      {/* 주의사항 */}
      <div className="pb-1 flex flex-col gap-y-1">
        <h2 className="text-sm font-bold">환불 시 주의사항</h2>
        <ul className="">
          <li className="list-inside list-disc pl-2">
            구매자의 책임이 있는 사유
          </li>
          <li className="list-inside list-disc pl-2">
            취소 시,{' '}
            <span className="font-bold">
              송금 수수료(500)를 제외한 나머지 금액을 돌려드려요
            </span>
          </li>
          <li className="list-inside list-disc pl-2">
            태풍, 지진 등과 같은 천재지변 혹은 재난상황의 경우 수수료 없이
            전액을 돌려드려요
          </li>
          <li className="list-inside list-disc pl-2">
            환불 요청 접수 후 처리까지는 최대 3~5일의 시간이 소요될 수 있어요
          </li>
          <li className="list-inside list-disc pl-2">
            환불 규정은 DDADA의 정책에 따라 변경될 수 있으며, 구매 시점에 명시된
            규정을 우선으로 따라요
          </li>
        </ul>
      </div>
    </div>
  )
}
