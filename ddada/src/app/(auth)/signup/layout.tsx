'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken')

    if (accessToken) {
      router.push('/')
    } else {
      setIsAllowed(true)
    }
  }, [router])

  if (!isAllowed) {
    return null
  }

  return <div>{children}</div>
}
