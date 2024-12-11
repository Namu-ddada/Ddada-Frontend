'use client'

import dynamic from 'next/dynamic'

import { useGymContext } from '@/features/gym/providers/index.tsx'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function GymChart() {
  const gymInfo = useGymContext()
  const defalutCount = Array.from({ length: 15 }, () => 0)
  return (
    <div className="bg-white rounded-3xl px-8 py-6 flex flex-col gap-y-6">
      <h2 className="text-2xl font-bold">날짜 별 매치 현황 통계</h2>
      <Chart
        type="bar"
        series={[
          {
            name: '매치현황',
            data: gymInfo
              ? gymInfo.matchStatistics.map((item) => item.matchCount)
              : defalutCount,
          },
        ]}
        options={{
          theme: { mode: 'light' },
          chart: {
            toolbar: { show: false },
            background: 'transparent',
          },
          grid: { show: false },
          yaxis: { show: true },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            labels: { show: true },
            axisTicks: { show: true },
            axisBorder: { show: true },
            categories: gymInfo?.matchStatistics.map((item) => {
              const [, month, day] = item.date.split('-')
              return `${month}.${day}`
            }),
          },
          colors: ['#FCA211'],
          legend: { show: true },
        }}
      />
    </div>
  )
}
