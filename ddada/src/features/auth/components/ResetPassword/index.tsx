'use client'

/* eslint-disable react/jsx-props-no-spreading */
import Link from 'next/link'

import ResetPasswordBranch from '@/features/auth/components/ResetPasswordBranch/index.tsx'
import GoBeforeArrow from '@/static/imgs/auth/signup/signup_goBeforepage_icon.svg'

export default function ResetPassword() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="absolute top-[1.2138rem] left-0">
          <Link href="/login" type="button" className="flex">
            <GoBeforeArrow className="m-[0.125rem]" />
            <p className="text-sm">이전으로 돌아가기</p>
          </Link>
        </div>
        <ResetPasswordBranch />
      </div>
    </div>
  )
}
