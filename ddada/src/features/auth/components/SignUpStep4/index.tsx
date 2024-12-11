import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'

import { SignUpFormData } from '@/features/auth/types/SignUpType.ts'

export default function SignUpStep4() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const router = useRouter()
  const { getValues } = useFormContext<SignUpFormData>()
  const userNickname = getValues('nickname')
  const handleGoMainPage = () => {
    if (redirect) router.push(redirect)
    else {
      router.push('/')
    }
  }
  return (
    <div className="mx-[2.0625rem]">
      <div>
        <p className="text-4xl font-bold inline">{userNickname}님,</p>
        <p className="text-4xl inline"> 환영해요!</p>
        <div className="whitespace-pre-line text-[#6B6E78]">
          <p>회원가입이 완료되었습니다.</p>
          <p>이제 3번의 경기를 통해 실력을 측정하고, </p>
          <p>따다의 다양한 서비스를 즐겨보세요.</p>
        </div>
      </div>
      <Image
        src="/signup/signup_finished_gif.gif"
        alt="animated gif"
        width={500}
        height={500}
      />
      <button
        type="button"
        onClick={handleGoMainPage}
        className="py-[1.1875rem] w-full mt-3 rounded-xl 
      bg-[#FCA211] text-white cursor-pointer"
      >
        홈으로 이동하기
      </button>
    </div>
  )
}
