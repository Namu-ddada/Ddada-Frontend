'use client'

import { createContext, useContext } from 'react'

import { MatchDetailType } from '@/features/manager/types/MatchDataType.ts'

interface MatchContextProps {
  matchDetailData: MatchDetailType | null
  children: React.ReactNode
}

// Context 생성
const MatchContext = createContext<MatchDetailType | null>(null)

// Context를 사용하는 Custom Hook
export const useMatchDetailContext = () => {
  const context = useContext(MatchContext)
  if (!context) {
    throw new Error('useMatchDetailContext must be used within a MatchProvider')
  }
  return context
}

// Context Provider 생성
export function MatchReservationDetailProvider({
  matchDetailData,
  children,
}: MatchContextProps) {
  return (
    <MatchContext.Provider value={matchDetailData}>
      {children}
    </MatchContext.Provider>
  )
}
