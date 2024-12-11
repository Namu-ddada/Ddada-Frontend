interface LandingRacketBtnProps {
  name: string
  value: string
}

function LandingRacketBtn(props: LandingRacketBtnProps) {
  const { name, value } = props
  return (
    <div className="flex-1 px-12 py-6 shadow-xl rounded-xl flex flex-col gap-6 justify-center items-center">
      <p className="text-2xl font-bold">{name}</p>
      <p className="text-4xl text-disabled-dark">{value}</p>
    </div>
  )
}

export default LandingRacketBtn
