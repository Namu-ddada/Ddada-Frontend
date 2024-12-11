import { Suspense } from 'react'

import AuthHeader from '@/features/auth/components/Header/index.tsx'
import Login from '@/features/auth/components/Login/index.tsx'

export default function LoginPage() {
  return (
    <main>
      <AuthHeader />
      <Suspense fallback={<div>카카오 로딩 정보 가져오는중...</div>}>
        <Login />
      </Suspense>
    </main>
  )
}
