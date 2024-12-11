import { create } from 'zustand'

import BadmintonScoreboardInstance from '@/features/manager/utils/BadmintonScoreboardInstance.ts'

interface BadmintonStoreProps {
  badmintonInstance: BadmintonScoreboardInstance
  update: (by: BadmintonScoreboardInstance) => void
}

const useBadmintonStore = create<BadmintonStoreProps>()((set) => ({
  badmintonInstance: new BadmintonScoreboardInstance(),
  update: (by) => set(() => ({ badmintonInstance: by })),
}))

export default useBadmintonStore
