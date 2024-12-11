import CheckedIcon from '@/static/imgs/racketRecommned/CheckedIcon.svg'
import UnCheckedIcon from '@/static/imgs/racketRecommned/UnCheckedIcon.svg'

interface PriceSelectCardProps {
  // data: string
  isClicked: boolean
  children: React.ReactNode
}

export default function PriceSelectCard({
  // data,
  isClicked,
  children,
}: PriceSelectCardProps) {
  if (isClicked) {
    return (
      <div className="flex items-center gap-x-6 py-3 px-6 border text-sm rounded-xl border-theme text-theme bg-theme-light">
        <CheckedIcon />
        {children}
      </div>
    )
  }
  if (!isClicked) {
    return (
      <div className="flex items-center gap-x-6 py-3 px-6 border text-sm rounded-xl border-disabled text-disabled-dark">
        <UnCheckedIcon />
        {children}
      </div>
    )
  }
}
