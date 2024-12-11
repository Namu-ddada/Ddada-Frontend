import { useGymContext } from '@/features/gym/providers/index.tsx'
import HomeIcon from '@/static/imgs/gym/HomeIcon.svg'

export default function GymIncome() {
  const gymInfo = useGymContext()
  return (
    <div className="bg-white rounded-3xl py-6 px-8 flex flex-col gap-y-6 w-[20.5625rem]">
      <div className="flex gap-x-3">
        <HomeIcon />
        <span className="text-2xl font-bold">누적 수입</span>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex gap-x-3">
          <span>₩ {gymInfo?.gymAdmin.income}</span>
          <div className="rounded-full px-2 py-1 text-xs bg-success bg-opacity-30 text-success flex justify-center items-center">
            <span>+ 5,000</span>
          </div>
        </div>
        <p className="text-xs text-disabled-dark">
          <span>전일과 비교</span>
        </p>
      </div>
    </div>
  )
}
