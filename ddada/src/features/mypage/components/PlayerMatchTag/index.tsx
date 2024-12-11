interface PlayerMatchTagProps {
  matchTag: string
}

export default function PlayerMatchTag({ matchTag }: PlayerMatchTagProps) {
  return (
    <div
      className={`rounded-full py-2 px-6 flex justify-center items-center text-white text-xl
      ${matchTag === '저지불가' && ' bg-danger'}
      ${matchTag === '스프린터' && 'bg-[#0D6EFD]'}
      ${matchTag === '평범함' && 'bg-disabled-dark'}
      ${matchTag === '롤러코스터' && 'bg-theme'}
      ${matchTag === '슬로우스타터' && 'bg-success'}
      ${matchTag === '오르막길' && 'bg-[#007E00]'}
      ${matchTag === '내리막길' && 'bg-[#963D0A]'}
      ${matchTag === '번지점프' && 'bg-[#F27F3D]'}
  
    `}
    >
      {matchTag}
    </div>
  )
}
