'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import { getUserPlayStyle } from '@/features/mypage/api/mypage/index.ts'
import PlayStyleLogoProps from '@/features/mypage/components/PlayStyleLogo/index.tsx'
import MiniChart from '@/static/imgs/mypage/playstyle/my-page-playstyle-chart.png'
import NoDataIcon from '@/static/imgs/mypage/playstyle/my-page-playstyle-nodata.svg'
import LoadingSpinner from '@/static/imgs/mypage/playstyle/my-page-playstyle-spinner.svg'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function PlayStyle() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userPlayStyle'],
    queryFn: getUserPlayStyle,
    retry: 0,
  })

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-6 justify-center items-center px-6 py-20">
        <LoadingSpinner className="animate-spin" />
        <p className="text-theme animate-pulse">
          플레이스타일 분석을 가져오는 중입니다. 잠시만 기달려주세요.
        </p>
      </div>
    )
  }
  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center gap-[2.625rem] px-6 py-20">
        <NoDataIcon />
        <div className="flex flex-col gap-6 text-disabled-dark justify-center">
          <p className="text-6xl font-bold text-center">앗!</p>
          <div className="flex flex-col justify-center items-center text-sm">
            <p>아직 플레이스타일이 생성되지 않았어요.</p>
            <p>
              매치 수가 3판 미만이거나, 일관적인 플레이가 없는 것이 원인일 수
              있어요.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // if (data.match < 3) {
  //   return (
  //     <div className="flex flex-col justify-center items-center gap-[2.625rem] px-6 py-20">
  //       <NoDataIcon />
  //       <div className="flex flex-col gap-6 text-disabled-dark justify-center">
  //         <p className="text-6xl font-bold text-center">앗!</p>
  //         <div className="flex flex-col justify-center items-center text-sm">
  //           <p>아직 플레이스타일이 생성되지 않았어요.</p>
  //           <p>
  //             매치 수가 3판 미만이거나, 일관적인 플레이가 없는 것이 원인일 수
  //             있어요.
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <PlayStyleLogoProps userPlayStyle={data} />
      <Chart
        type="radar"
        series={[
          {
            name: '플레이어',
            data: [
              data.rate.strategy,
              data.rate.score_rate,
              data.rate.lose_rate,
              data.rate.skills,
              data.rate.recovery,
            ],
          },
        ]}
        height="530px"
        width="600px"
        options={{
          theme: { mode: 'light' },
          chart: {
            toolbar: { show: false },
            background: 'transparent',
          },
          fill: {
            opacity: 0.5,
            colors: ['#fffbea'],
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['#fdbb52'],
            dashArray: 0,
          },
          grid: { show: false },
          yaxis: { show: false, min: 0, max: 100 },
          xaxis: {
            labels: {
              show: true,
              style: {
                fontSize: '0.75rem',
              },
            },
            axisTicks: { show: false },
            axisBorder: { show: false },
            categories: ['전략', '득점율', '실점율', '기술', '회복'],
          },
          markers: { size: 4, strokeColors: '#fdbb52', colors: '#fffbea' },
          colors: [`#E5E5ED`, '#E5E5ED'],
          tooltip: {
            y: { formatter: (value) => `점수 ${value}` },
          },
          legend: { show: false },
        }}
      />
      <div className="w-full flex justify-center items-center bg-theme text-theme-light gap-[0.625rem] py-3">
        <Image src={MiniChart} alt="미니차트이미지" />
        <p>점수 별 세부 수치를 정리했어요</p>
      </div>
      <div className="flex flex-col gap-6 py-10 w-full">
        <div className="flex gap-3">
          <div className="border rounded-3xl py-4 px-8 flex flex-col gap-3 flex-1">
            <p className="text-xl font-bold flex-1">누적 매치 수(매치)</p>
            <div className="flex-1 flex-col gap-1">
              <p className="text-3xl font-bold">{data.match}</p>
            </div>
          </div>

          <div className="border rounded-3xl py-4 px-8 flex flex-col gap-3 flex-1">
            <div className=" flex-1">
              <p className="text-xl font-bold">전략(점)</p>
              <p className="text-xs text-disabled-dark">
                상대의 약점을 얼마나 잘 파악하는지에
              </p>
              <p className="text-xs text-disabled-dark">관한 지표</p>
            </div>

            <div className="flex-1 flex-col gap-1">
              <p className="text-3xl font-bold">{data.rate.strategy}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="border rounded-3xl py-4 px-8 flex flex-col gap-3 flex-1">
            <div className=" flex-1">
              <p className="text-xl font-bold">매치 득점 비율(%)</p>
              <p className="text-xs text-disabled-dark">
                경기 당 득점비율을 백분율로 나타냈어요
              </p>
            </div>
            <div className="flex-1 flex-col gap-1">
              <p className="text-3xl font-bold">{data.rate.score_rate}</p>
            </div>
          </div>

          <div className="border rounded-3xl py-4 px-8 flex flex-col gap-3 flex-1">
            <div className=" flex-1">
              <p className="text-xl font-bold">매치 실점 비율(%)</p>
              <p className="text-xs text-disabled-dark">
                경기 당 실점비율을 백분율로 나타냈어요
              </p>
            </div>
            <div className="flex-1 flex-col gap-1">
              <p className="text-3xl font-bold">{data.rate.lose_rate}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="border rounded-3xl py-4 px-8 flex flex-col gap-3 flex-1">
            <div className="flex-1">
              <p className="text-xl font-bold ">기술(점)</p>
              <p className="text-xs text-disabled-dark">
                다양한 기술을 활용할수록 높아지는 지표
              </p>
            </div>
            <div className="flex-1 flex-col gap-1">
              <p className="text-3xl font-bold">{data.rate.skills}</p>
            </div>
          </div>

          <div className="border rounded-3xl py-4 px-8 flex flex-col gap-3 flex-1">
            <div className="flex-1">
              <p className="text-xl font-bold">회복력(점)</p>
              <p className="text-xs text-disabled-dark">
                실점 상황에도 흔들리지 않는지 알 수
              </p>
              <p className="text-xs text-disabled-dark">있는 지표</p>
            </div>
            <div className="flex-1 flex-col gap-1">
              <p className="text-3xl font-bold">{data.rate.recovery}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
