import Link from 'next/link'
import { useEffect, useState } from 'react'

import { logOut } from '@/api/user/index.ts'

export default function GymHeader() {
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const handleLogout = async () => {
    await logOut()
    window.location.href = '/'
  }

  useEffect(() => {
    setAccessToken(sessionStorage.getItem('accessToken'))
  }, [])

  return (
    <div className="border-b border-base-100 px-6 py-2.5">
      <div className="flex items-center">
        <p className="text-2xl grow">
          <span>DDADA</span> <span className="font-bold">for gym</span>
        </p>
        <div>
          {accessToken ? (
            <button
              type="button"
              className="text-disabled-dark underline py-3"
              onClick={() => handleLogout()}
            >
              로그아웃
            </button>
          ) : (
            <Link
              className="bg-[#6B6E78] rounded-[62.5rem] text-white py-3 px-6"
              href="/login"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
