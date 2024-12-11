import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import CommonModal from '@/components/CommonModal/index.tsx'
import { fetchRacketSearch } from '@/features/racketRecommend/api/racketSearch.ts'
import RacketDetailCard from '@/features/racketRecommend/components/RacketDetailCard/index.tsx'
import useRacketRecommendStore from '@/features/racketRecommend/stores/useRacketRecommendStore.ts'
import useSelectRacketStore from '@/features/racketRecommend/stores/useSelectRacketStore.ts'
import { RacketDetailType } from '@/features/racketRecommend/types/RacketRecommendType.ts'
import ModalCloseIcon from '@/static/imgs/court-reservation/court-reservation_modalclose_icon.svg'
import SearchIcon from '@/static/imgs/racketRecommned/SearchIcon.svg'

interface MatchCancelModalProps {
  handleModalClose: () => void
}

export default function RacketSearchModal({
  handleModalClose,
}: MatchCancelModalProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [racketDataList, setRacketDataList] = useState<RacketDetailType[] | []>(
    [],
  )
  const { selectedRacketList, updateIsNone, addSelectedRacketList } =
    useSelectRacketStore()
  const { setCanMoveNext, setPreference } = useRacketRecommendStore()

  const handleSelectRacket = (data: RacketDetailType) => {
    if (selectedRacketList.find((item) => item.id === data.id)) {
      return alert('이미 추가한 라켓입니다')
    }
    updateIsNone(false)
    setCanMoveNext(true)
    addSelectedRacketList(data)
    setPreference(
      'racket',
      [...selectedRacketList, data].map((item) => {
        return item.id
      }),
    )
    return handleModalClose()
  }

  const handleRacketSearch = async () => {
    if (inputRef.current === null) {
      return toast.error('최소 2글자 이상 입력해주세요')
    }
    if (inputRef.current.value === null || inputRef.current.value.length <= 1) {
      return toast.error('최소 2글자 이상 입력해주세요')
    }
    const racketData = await fetchRacketSearch(inputRef.current.value)
    setRacketDataList(racketData)
    return null
  }

  return (
    <CommonModal handleModalClose={handleModalClose}>
      <div className="w-[35rem] bg-white rounded-xl flex flex-col px-6 py-8 gap-y-6 ">
        {/* 헤더 */}
        <div className="flex gap-x-2.5 justify-between">
          <h1 className="text-xl font-bold">라켓 검색</h1>
          <ModalCloseIcon
            className="cursor-pointer"
            onClick={() => handleModalClose()}
          />
        </div>
        {/* 검색 인풋 */}
        <form
          className="flex gap-x-6 py-2 px-4 border border-disabled rounded-full"
          onSubmit={(event) => {
            event.preventDefault()
            handleRacketSearch()
          }}
        >
          <input
            type="text"
            ref={inputRef}
            placeholder="라켓, 브랜드 명으로 검색"
            className="text-xs text-disabled-dark grow focus:outline-none"
          />
          <SearchIcon
            onClick={() => handleRacketSearch()}
            className="cursor-pointer"
          />
        </form>
        <div className="max-h-[31.25rem] flex flex-col gap-y-6 overflow-y-scroll pr-2">
          {racketDataList.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label="racket"
              onClick={() => handleSelectRacket(item)}
            >
              <RacketDetailCard data={item} />
            </button>
          ))}
        </div>
      </div>
    </CommonModal>
  )
}
