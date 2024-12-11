'use client'

import { createPortal } from 'react-dom'

import RacketSearchModal from '@/features/racketRecommend/components/RacketSearchModal/index.tsx'
import RacketShortCard from '@/features/racketRecommend/components/RacketShortCard/index.tsx'
import useRacketRecommendStore from '@/features/racketRecommend/stores/useRacketRecommendStore.ts'
import useSelectRacketStore from '@/features/racketRecommend/stores/useSelectRacketStore.ts'
// import { RacketRecommendBranchProps } from '@/features/racketRecommend/types/RacketRecommendType.ts'
import useModal from '@/hooks/useModal/index.tsx'
import SearchIcon from '@/static/imgs/racketRecommned/SearchIcon.svg'

export default function Step1() {
  const {
    isSelectNone,
    selectedRacketList,
    updateIsNone,
    deleteSelectedRacketList,
  } = useSelectRacketStore()
  const { setPreference, setCanMoveNext } = useRacketRecommendStore()
  const { isModalOpen, portalElement, handleModalOpen, handleModalClose } =
    useModal()

  const handleSelectNone = () => {
    if (isSelectNone) {
      updateIsNone(false)
      setCanMoveNext(false)
      return
    }
    updateIsNone(true)
    setCanMoveNext(true)
    setPreference('racket', [])
  }

  const handleDeleteRacket = async (racketId: number) => {
    deleteSelectedRacketList(racketId)
    if (selectedRacketList.length - 1 === 0) {
      setCanMoveNext(false)
    }
    setPreference(
      'racket',
      selectedRacketList
        .filter((item) => item.id !== racketId)
        .map((item) => {
          return item.id
        }),
    )
  }

  return (
    <>
      {isModalOpen && portalElement
        ? createPortal(
            <RacketSearchModal handleModalClose={handleModalClose} />,
            portalElement,
          )
        : null}
      <div className="flex flex-col gap-y-[5.25rem] w-[34rem] ">
        <p className="text-xl text-center">가지고 계신 라켓을 알려주세요</p>
        <div className="flex flex-col gap-y-3">
          <div>
            <button
              type="button"
              className="border border-theme py-3 px-6 flex gap-x-2.5 text-sm text-theme rounded-xl items-center"
              onClick={() => handleModalOpen()}
            >
              <span>라켓 찾기</span>
              <SearchIcon />
            </button>
          </div>
          {selectedRacketList.length === 0 ? (
            <button
              type="button"
              className={`border border-disabled text-disabled-dark rounded-xl py-3 px-6 ${isSelectNone && `bg-theme-light text-theme border-theme-light`}`}
              onClick={() => handleSelectNone()}
            >
              <span className="text-bold">없음</span>
            </button>
          ) : (
            <div className="grid grid-cols-3 gap-x-3 ">
              {selectedRacketList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleDeleteRacket(item.id)}
                  aria-hidden="true"
                >
                  <RacketShortCard data={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
