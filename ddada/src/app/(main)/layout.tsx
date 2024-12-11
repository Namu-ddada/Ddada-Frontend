import MainFooter from '@/components/MainFooter/index.tsx'
import MainHeader from '@/components/MainHeader/index.tsx'

export default function MatchReservationDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col h-screen">
      <MainHeader />
      <div className="flex justify-center flex-1">{children}</div>
      <MainFooter />
    </div>
  )
}
