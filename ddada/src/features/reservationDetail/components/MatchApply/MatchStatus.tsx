interface MatchStatusProps {
  status: string | number
  isMatchReserved: boolean
}

export default function MatchStatus({
  status,
  isMatchReserved,
}: MatchStatusProps) {
  let textJsx
  switch (status) {
    case 'CREATED':
      textJsx = (
        <>
          <p className="font-bold">결제하고 바로 매치 확정하기 🤙</p>
          <p className="text-sm text-disabled-dark ">
            빠르게 팀을 고르고 매치를 준비하세요
          </p>
        </>
      )
      break
    case 'RESERVED':
      textJsx = <p className="font-bold">신청이 마감된 경기에요 🙏</p>
      break
    case 'FINISHED':
      textJsx = <p className="font-bold">이미 종료된 경기에요 🙏</p>
      break
    case 'PLAYING':
      textJsx = <p className="font-bold">이미 진행중인 경기에요🙏</p>
      break

    default:
      textJsx = (
        <>
          <p className="font-bold">결제하고 바로 매치 확정하기 🤙</p>
          <p className="text-sm text-disabled-dark ">
            빠르게 팀을 고르고 매치를 준비하세요
          </p>
        </>
      )
  }

  return (
    <div className="pb-3 border-b border-disabled">
      <div className="flex flex-col items-center">
        {isMatchReserved ? (
          <p className="font-bold">이미 예약한 매치에요.</p>
        ) : (
          textJsx
        )}
      </div>
    </div>
  )
}
