'use client'

import { useState } from 'react'

import { LOCATION_NAME } from '@/features/court-reservation/constants/court-reservation.ts'
import ModalCloseIcon from '@/static/imgs/court-reservation/court-reservation_modalclose_icon.svg'

interface LocationModalProps {
  chooseLocation: string[]
  closeModal: () => void
  handleLoactions: (regions: string[]) => void
}

export default function LocationModal({
  chooseLocation,
  closeModal,
  handleLoactions,
}: LocationModalProps) {
  const [selectedRegion, setSelectedRegion] = useState<string[]>(chooseLocation)

  const handleSelectedRegion = (region: string) => {
    if (selectedRegion.includes('전체')) {
      setSelectedRegion([region])
      return
    }
    if (selectedRegion.includes(region)) {
      setSelectedRegion(
        selectedRegion.filter((selected) => selected !== region),
      )
      return
    }
    setSelectedRegion([...selectedRegion, region])
  }

  const handleClearSelectedRegion = () => {
    setSelectedRegion(['전체'])
  }

  const handleSelectedAllRegion = () => {
    if (selectedRegion.includes('전체')) {
      setSelectedRegion([])
      return
    }
    setSelectedRegion(['전체'])
  }

  const handleSaveSelectedRegion = () => {
    if (selectedRegion.length === 0) {
      setSelectedRegion(['전체'])
    }
    handleLoactions(selectedRegion)
    closeModal()
  }
  return (
    <div
      className="fixed z-10 inset-0 overflow-hidden flex justify-center items-center"
      onClick={closeModal}
      aria-hidden="true"
    >
      {/* height 수정 필요 */}
      <div
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
        className="flex flex-col text-xs gap-6 fixed z-20 w-[35rem] bg-white rounded-xl overflow-hidden drop-shadow-lg py-4 px-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">지역 선택</h2>
          <button
            type="button"
            onClick={closeModal}
            aria-label="지역 선택 닫기"
          >
            <ModalCloseIcon />
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={handleSelectedAllRegion}
            className={`${
              selectedRegion.includes('전체')
                ? 'bg-theme text-white'
                : 'text-disabled-dark'
            } border rounded-xl px-4 py-2`}
          >
            전체
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold">특별시</h3>
          <div>
            {LOCATION_NAME.특별시.map((region) => (
              <button
                type="button"
                key={region}
                onClick={() => handleSelectedRegion(region)}
                className={`${
                  selectedRegion.includes(region)
                    ? 'bg-theme text-white'
                    : 'text-disabled-dark border-disabled'
                } border rounded-xl px-4 py-2`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold">도</h3>
          <div className="flex gap-3">
            {LOCATION_NAME.도.map((region) => (
              <button
                type="button"
                key={region}
                onClick={() => handleSelectedRegion(region)}
                className={`${
                  selectedRegion.includes(region)
                    ? 'bg-theme text-white'
                    : 'text-disabled-dark border-disabled'
                } border rounded-xl px-4 py-2`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold">광역시</h3>
          <div className="flex gap-3">
            {LOCATION_NAME.광역시.map((region) => (
              <button
                type="button"
                key={region}
                onClick={() => handleSelectedRegion(region)}
                className={`${
                  selectedRegion.includes(region)
                    ? 'bg-theme text-white'
                    : 'text-disabled-dark border-disabled'
                } border rounded-xl px-4 py-2`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold">특별자치도</h3>
          <div className="flex gap-3">
            {LOCATION_NAME.특별자치도.map((region) => (
              <button
                type="button"
                key={region}
                onClick={() => handleSelectedRegion(region)}
                className={`${
                  selectedRegion.includes(region)
                    ? 'bg-theme text-white'
                    : 'text-disabled-dark border-disabled'
                } border rounded-xl px-4 py-2`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold">특별자치시</h3>
          <div>
            {LOCATION_NAME.특별자치시.map((region) => (
              <button
                type="button"
                key={region}
                onClick={() => handleSelectedRegion(region)}
                className={`${
                  selectedRegion.includes(region)
                    ? 'bg-theme text-white'
                    : 'text-disabled-dark border-disabled'
                } border rounded-xl px-4 py-2`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          <button
            type="button"
            onClick={handleClearSelectedRegion}
            className="text-disabled-dark border rounded px-4 py-2 border border-disabled"
          >
            초기화
          </button>
          <button
            type="button"
            onClick={handleSaveSelectedRegion}
            className="text-white bg-theme rounded px-4 py-2 grow"
          >
            적용
          </button>
        </div>
      </div>
    </div>
  )
}
