'use client'

import { createContext, useContext } from 'react'

import { GymInfo } from '@/features/gym/types/GymTypes.ts'

interface GymContextProps {
  gymInfo: GymInfo | null
  children?: React.ReactNode
}

// Context 생성
const GymContext = createContext<GymInfo | null>(null)

// Context를 사용하는 Custom Hook
export const useGymContext = () => {
  const context = useContext(GymContext)
  if (!context) {
    throw new Error('must be used within a GymProvider')
  }
  return context
}

// Context Provider 생성
export function GymProvider({ gymInfo, children }: GymContextProps) {
  return <GymContext.Provider value={gymInfo}>{children}</GymContext.Provider>
}
