import Image from 'next/image'

interface GameUserInfoProps {
  src: string
}

export default function GameUserInfo({ src }: GameUserInfoProps) {
  return (
    <div className="w-12 h-12">
      <Image
        className="w-full h-full rounded-full overflow-hidden"
        width={48}
        height={48}
        src={src}
        alt="profileImg"
      />
    </div>
  )
}
