import { useEffect, useState } from 'react'

import { SignUpStepType } from '@/features/auth/types/SignUpType.ts'
import CheckedBox from '@/static/imgs/auth/signup/signup_checkedBox_icon.svg'
import TOSArrow from '@/static/imgs/auth/signup/signup_TOS_arrow.svg'
import UnCheckedBox from '@/static/imgs/auth/signup/signup_unCheckedBox_icon.svg'

interface SignUpStep1Props {
  changeViewStep: (viewStep: SignUpStepType) => void
}

export default function SignUpStep1({ changeViewStep }: SignUpStep1Props) {
  const [allCheck, setAllCheck] = useState(false)
  const [checkAge, setCheckAge] = useState(false)
  const [checkTos, setCheckTos] = useState(false)
  const [checkService, setCheckService] = useState(false)
  const [checkPersonal, setCheckPersonal] = useState(false)
  const [checkMarketing, setCheckMarketing] = useState(false)
  const [isNextStepEnabled, setIsNextStepEnabled] = useState<boolean>(false)

  // 서비스 이용약관 동의
  const [isTosOpen, setIsTosOpen] = useState(false)
  const [isServiceOpen, setIsServiceOpen] = useState(false)
  const [isPersonalOpen, setIsPersonalOpen] = useState(false)

  const handleAllCheck = () => {
    setAllCheck(!allCheck)
    setCheckAge(!allCheck)
    setCheckTos(!allCheck)
    setCheckService(!allCheck)
    setCheckPersonal(!allCheck)
    setCheckMarketing(!allCheck)
  }

  useEffect(() => {
    if (checkAge && checkTos && checkService && checkPersonal) {
      setIsNextStepEnabled(true)
    } else {
      setIsNextStepEnabled(false)
    }
  }, [checkAge, checkTos, checkService, checkPersonal])
  return (
    <>
      <button
        type="button"
        className="flex font-bold"
        onClick={() => handleAllCheck()}
      >
        {allCheck && <CheckedBox />}
        {!allCheck && <UnCheckedBox />}
        <p className="ml-2.5 text-[#262626]">전체 동의</p>
      </button>

      <div className="grow border-t" />

      <button
        type="button"
        className="flex"
        onClick={() => setCheckAge(!checkAge)}
      >
        {checkAge && <CheckedBox />}
        {!checkAge && <UnCheckedBox />}
        <p className="ml-2.5 text-disabled-dark">[필수] 만 14세 이상입니다.</p>
      </button>
      <div className="flex justify-between">
        <button
          type="button"
          className="flex"
          onClick={() => setCheckTos(!checkTos)}
        >
          {checkTos && <CheckedBox />}
          {!checkTos && <UnCheckedBox />}
          <p className="ml-2.5 text-disabled-dark">[필수] 따다 이용약관 동의</p>
        </button>
        <button
          type="button"
          onClick={() => setIsTosOpen(!isTosOpen)}
          aria-label="이용약관 보기"
        >
          {!isTosOpen && <TOSArrow />}
          {isTosOpen && <TOSArrow className="rotate-90" />}
        </button>
      </div>
      {isTosOpen && (
        <div className="ml-6 mt-2 text-sm whitespace-pre-line text-disabled-dark">
          <p>
            따다의 이용약관은 따다 서비스 이용을 위한 기본 규칙을 설명합니다.
          </p>
          <p>
            서비스 사용에 동의함으로써 이용약관을 준수해야 하며, 부정 사용 시
          </p>
          <p>서비스가 제한될 수 있습니다.</p>
        </div>
      )}
      <div className="flex justify-between">
        <button
          type="button"
          className="flex"
          onClick={() => setCheckService(!checkService)}
        >
          {checkService && <CheckedBox />}
          {!checkService && <UnCheckedBox />}
          <p className="ml-2.5 text-disabled-dark">
            [필수] 따다 서비스 이용약관 동의
          </p>
        </button>
        <button
          type="button"
          onClick={() => setIsServiceOpen(!isServiceOpen)}
          aria-label="서비스 이용약관 보기"
        >
          {!isServiceOpen && <TOSArrow />}
          {isServiceOpen && <TOSArrow className="rotate-90" />}
        </button>
      </div>
      {isServiceOpen && (
        <div className="ml-6 mt-2 text-sm whitespace-pre-line text-disabled-dark">
          <p>따다의 서비스 이용약관은 서비스의 세부 이용 방법 및 제한 사항을</p>
          <p>
            설명합니다. 서비스 사용 시 발생할 수 있는 권리와 의무를 포함하며,
          </p>
          <p>이를 숙지하고 동의해야 합니다.</p>
        </div>
      )}
      <div className="flex justify-between">
        <button
          type="button"
          className="flex"
          onClick={() => setCheckPersonal(!checkPersonal)}
        >
          {checkPersonal && <CheckedBox />}
          {!checkPersonal && <UnCheckedBox />}
          <p className="ml-2.5 text-disabled-dark">
            [필수] 따다 개인정보 수집 및 이용 동의
          </p>
        </button>
        <button
          type="button"
          onClick={() => setIsPersonalOpen(!isPersonalOpen)}
          aria-label="개인정보 수집 및 이용 동의 보기"
        >
          {!isPersonalOpen && <TOSArrow />}
          {isPersonalOpen && <TOSArrow className="rotate-90" />}
        </button>
      </div>
      {isPersonalOpen && (
        <div className="ml-6 mt-2 text-sm whitespace-pre-line text-disabled-dark">
          <p>따다는 회원의 개인정보를 안전하게 보호하며, 본 동의는 회원님의</p>
          <p>정보를 수집하고, 서비스 제공을 위해 사용할 수 있음을 동의하는</p>
          <p> 절차입니다.</p>
        </div>
      )}

      <button
        type="button"
        className="flex"
        onClick={() => setCheckMarketing(!checkMarketing)}
      >
        {checkMarketing && <CheckedBox />}
        {!checkMarketing && <UnCheckedBox />}
        <p className="ml-2.5 text-disabled-dark">
          [선택] 마케팅 및 프로모션 수신 동의
        </p>
      </button>

      <button
        type="button"
        onClick={() => changeViewStep(SignUpStepType.step2)}
        className={`py-[1.1875rem] w-full mt-3 rounded-xl ${
          isNextStepEnabled
            ? 'bg-theme text-white cursor-pointer'
            : 'bg-disabled text-disabled-dark cursor-not-allowed'
        }`}
        disabled={!isNextStepEnabled}
      >
        다음단계{' '}
      </button>
    </>
  )
}
