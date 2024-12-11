import { create } from 'zustand'

interface RacketRecommendStoreProps {
  canMoveNext: boolean
  userPreference: {
    racket: number[]
    price: number | null
    balance: string
    weight: string
    shaft: string
  }
  init: () => void

  setCanMoveNext: (value: boolean) => void
  setPreference: (
    key: keyof RacketRecommendStoreProps['userPreference'],
    value: string | number[] | number,
  ) => void
}

const useRacketRecommendStore = create<RacketRecommendStoreProps>()((set) => ({
  canMoveNext: false,

  userPreference: {
    racket: [],
    price: null,
    balance: '',
    weight: '',
    shaft: '',
  },

  init: () => {
    set({
      canMoveNext: false,
      userPreference: {
        racket: [],
        price: null,
        balance: '',
        weight: '',
        shaft: '',
      },
    })
  },

  setCanMoveNext: (value) =>
    set(() => ({
      canMoveNext: value,
    })),
  setPreference: (key, value) =>
    set((state) => ({
      userPreference: {
        ...state.userPreference,
        [key]: value,
      },
    })),
}))

export default useRacketRecommendStore
