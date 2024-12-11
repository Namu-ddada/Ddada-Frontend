'use client'

import CourtDetail from '@/features/court-reservation/components/CourtDetail/index.tsx'
import { CourtType } from '@/features/court-reservation/types/CourtType.ts'

interface CourtsProps {
  courtList: CourtType[]
  selectedDate: string
}

export default function Courts({ courtList, selectedDate }: CourtsProps) {
  return (
    <div>
      {courtList.map((court) => (
        <CourtDetail court={court} selectedDate={selectedDate} key={court.id} />
      ))}
    </div>
  )
}
