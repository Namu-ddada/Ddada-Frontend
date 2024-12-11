export default function ProgressBar({ step }: { step: number }) {
  return (
    <div className="relative h-[.3125rem] bg-disabled rounded-full">
      <div
        className="absolute flex flex-col gap-y-2 transition-all duration-700 ease-in-out"
        style={{ width: `calc(100% * ${step} / 6)` }}
      >
        <div className="w-full h-[.3125rem] bg-theme rounded-full" />
        <p className="w-full text-xs text-theme text-end">
          {Math.floor((step / 6) * 100)}%
        </p>
      </div>
    </div>
  )
}
