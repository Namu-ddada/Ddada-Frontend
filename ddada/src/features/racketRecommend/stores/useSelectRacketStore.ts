import { create } from 'zustand'

import { RacketDetailType } from '@/features/racketRecommend/types/RacketRecommendType.ts'

interface SelectRacketStoreProps {
  isSelectNone: boolean
  selectedRacketList: RacketDetailType[]
  updateIsNone: (value: boolean) => void
  addSelectedRacketList: (value: RacketDetailType) => void
  deleteSelectedRacketList: (value: number) => void
  init: () => void
}

const useSelectRacketStore = create<SelectRacketStoreProps>()((set) => ({
  isSelectNone: false,
  selectedRacketList: [],

  init: () => {
    set({
      isSelectNone: false,
      selectedRacketList: [],
    })
  },

  updateIsNone: (value) => set(() => ({ isSelectNone: value })),

  addSelectedRacketList: (value) => {
    set((state) => ({
      selectedRacketList: [...state.selectedRacketList, value],
    }))
  },
  deleteSelectedRacketList: (value) => {
    set((state) => ({
      selectedRacketList: state.selectedRacketList.filter(
        (item) => item.id !== value,
      ),
    }))
  },
}))

export default useSelectRacketStore
