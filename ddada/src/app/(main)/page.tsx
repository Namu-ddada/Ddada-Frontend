'use client'

import Landing from '@/features/landing/components/landing/index.tsx'
import { useUserRole } from '@/hooks/queries/user.ts'

export default function Home() {
  useUserRole()
  return (
    <main>
      <Landing />
    </main>
  )
}
