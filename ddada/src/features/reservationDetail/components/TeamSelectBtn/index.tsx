interface TeamSelectBtnProps {
  isDisabled: boolean
  isClicked?: boolean
  isJoined?: boolean
  isOtherTeamSelect?: boolean
  children: React.ReactNode
}

export default function TeamSelectBtn({
  isDisabled,
  isClicked,
  isJoined,
  isOtherTeamSelect,
  children,
}: TeamSelectBtnProps) {
  if (isJoined) {
    return (
      <div
        className={`rounded-xl px-4 py-2 border border-theme text-theme ${isClicked || isJoined ? `bg-theme text-white` : `bg-white text-theme`}`}
      >
        <div>{isClicked}</div>
        <div className="flex flex-col ">{children}</div>
      </div>
    )
  }
  if (isDisabled || isOtherTeamSelect) {
    return (
      <div className="rounded-xl px-4 py-2 border bg-base-50 border-disabled text-disabled-dark">
        {isClicked}
        <div className="flex flex-col">{children}</div>
      </div>
    )
  }
  return (
    <div
      className={`rounded-xl px-4 py-2 border border-theme text-theme ${isClicked || isJoined ? `bg-theme text-white` : `bg-white text-theme`}`}
    >
      <div>{isClicked}</div>
      <div className="flex flex-col ">{children}</div>
    </div>
  )
}
