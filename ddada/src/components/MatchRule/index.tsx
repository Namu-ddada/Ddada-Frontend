'use client'

import { createContext } from 'react'

const MatchRuleContext = createContext(null)

export default function MatchRule({ children }: { children: React.ReactNode }) {
  return (
    <MatchRuleContext.Provider value={null}>
      <div className="flex flex-col gap-y-6 p-2 text-sm bg-white">
        {children}
      </div>
    </MatchRuleContext.Provider>
  )
}

function Title() {
  return (
    <div>
      <h1 className="text-xl font-bold">경기 진행 규칙</h1>
    </div>
  )
}

function TitleWithUnderline() {
  return (
    <div className=" py-1 flex">
      <h1 className="text-base font-bold border-b-2 border-[#FCA211] box-border">
        경기 진행 규칙
      </h1>
    </div>
  )
}

function TossRule() {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold">토스</h2>
      <ul>
        <li className="list-inside list-disc pl-2">
          경기 전 양편이 매니저 주관으로 동전을 토스하여 이긴편이 첫 서브권,
          또는 코트 선택권 중 하나를 선택하게되며 진편은 나머지를 선택해요
        </li>
      </ul>
    </div>
  )
}

function ScoreRule() {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold">스코어</h2>
      <ul>
        <li className="list-inside list-disc pl-2">
          3게임(2게임 선취시 승리)을 원칙으로 해요
        </li>
        <li className="list-inside list-disc pl-2">
          한 게임의 매치포인트는 21점이에요
        </li>
        <li className="list-inside list-disc pl-2">
          세번째 게임에서는 11점 선취시 코트를 변경해요
        </li>
      </ul>
    </div>
  )
}

function DoubleRule() {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold">복식경기</h2>
      <ul>
        <li className="list-inside list-disc pl-2">
          점수가 짝수인 경우 우측에서, 홀수인 경우 좌측에서 서비스를 해요
        </li>
        <li className="list-inside list-disc pl-2">
          서비스 코트의 대각선 위치의 선수가 리시버에요
        </li>
        <li className="list-inside list-disc pl-2">
          리시버는 임의로 바꿀 수 없어요
        </li>
      </ul>
    </div>
  )
}

function InvalidityRule() {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold">레트(무효)</h2>
      <ul>
        <li className="list-inside list-disc pl-2">
          예기치 못한 외부요인이나 우발적 사고로 인해 중단될 때 선언돼요
        </li>
        <li className="list-inside list-disc pl-2">
          리시버가 준비되지 않은 상황에 서비스할 경우 레트에요
        </li>
        <li className="list-inside list-disc pl-2">
          다른 코트로부터 셔틀이 들어와 경기에 방해를 줄 경우 레트에요
        </li>
        <li className="list-inside list-disc pl-2">
          선수 외 타인이 코트로 들어와 경기에 방해를 줄 경우 레트에요
        </li>
      </ul>
    </div>
  )
}

function FaultRule() {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold">반칙(폴트)</h2>
      <ul>
        <li className="list-inside list-disc pl-2">
          아래의 경우 반칙이 선언되고, 상대측 점수가 1점 올라가요
        </li>
        <li className="list-inside list-disc pl-2">
          서비스폴트
          <ul>
            <li className="list-inside list-disc pl-5">
              라켓의 헤드부분이 라켓을 잡은 손보다 높으면 안돼요
            </li>
            <li className="list-inside list-disc pl-5">
              라켓의 위치가 허리보다 높으면 안돼요
            </li>
            <li className="list-inside list-disc pl-5">
              셔틀콕의 하단부만 맞춰야 해요
            </li>
            <li className="list-inside list-disc pl-5">
              페인팅 동작을 하면 안돼요
            </li>
          </ul>
        </li>
        <li className="list-inside list-disc pl-2">
          랠리폴트
          <ul>
            <li className="list-inside list-disc pl-5">
              라인을 벗어나면 안돼요
            </li>
            <li className="list-inside list-disc pl-5">
              네트를 통과하거나, 네트 아래로 통과하면 안돼요
            </li>
            <li className="list-inside list-disc pl-5">
              천장이나 벽에 닿으면 안돼요 셔틀콕이 몸에 닿으면 안돼요
            </li>
            <li className="list-inside list-disc pl-5">
              한 번의 타격으로 상대방 코트로 넘겨야 해요
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

MatchRule.Title = Title
MatchRule.TitleWithUnderline = TitleWithUnderline
MatchRule.TossRule = TossRule
MatchRule.DoubleRule = DoubleRule
MatchRule.ScoreRule = ScoreRule
MatchRule.InvalidityRule = InvalidityRule
MatchRule.FaultRule = FaultRule
