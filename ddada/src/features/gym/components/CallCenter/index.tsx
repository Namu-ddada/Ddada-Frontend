import CenterIcon from '@/static/imgs/gym/CenterIcon.svg'

export default function Callcenter() {
  return (
    <div className="bg-white rounded-3xl py-6 px-8 flex flex-col gap-y-6 w-[20.5625rem]">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-3">
          <CenterIcon />
          <span className="text-2xl font-bold">고객센터 · 상담</span>
        </div>
        <div className="text-disabled-dark">
          <span>· 상담시간 매일 10시 - 19시</span>
        </div>
      </div>
      <div className="w-full">
        <button
          type="button"
          className="w-full px-6 py-3 rounded-xl text-theme border border-theme"
        >
          상담 요청하기
        </button>
      </div>
    </div>
  )
}
