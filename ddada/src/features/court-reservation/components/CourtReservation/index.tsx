'use client'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import { getCourtList } from '@/features/court-reservation/api/court/index.ts'
import Courts from '@/features/court-reservation/components/Courts/index.tsx'
import LocationModal from '@/features/court-reservation/components/LocationModal/index.tsx'
import Pagination from '@/features/court-reservation/components/Pagination/index.tsx'
import { useObserver } from '@/features/court-reservation/components/useObserver/index.tsx'
import { getProfile } from '@/features/mypage/api/mypage/index.ts'
import LocationColorIcon from '@/static/imgs/court-reservation/court-reservation_location_color_icon.svg'
import LocationIcon from '@/static/imgs/court-reservation/court-reservation_location_icon.svg'
import LocationDetailColorIcon from '@/static/imgs/court-reservation/court-reservation_location_under_color_icon.svg'
import LocationDetailIcon from '@/static/imgs/court-reservation/court-reservation_location_under_icon.svg'
import ReservationLogo from '@/static/imgs/court-reservation/court-reservation_MAIN.png'
import SearchIcon from '@/static/imgs/court-reservation/court-reservation_search_icon.svg'

export default function CoatReservation() {
  const bottom = useRef(null)
  const accessToken =
    typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null
  const today = dayjs().format('YYYY-MM-DD')
  const [selectedDate, setSelectedDate] = useState(today)
  const [search, setSearch] = useState('')
  const [filterCoat, setFilterCoat] = useState('')
  const [locationModalOpen, setLocationModalOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string[]>(['전체'])
  const [selectedRegionNum, setSelectedRegionNum] = useState<number>(0)
  useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!accessToken,
    retry: 0,
  })
  useEffect(() => {
    if (selectedRegion.length === 1) {
      if (selectedRegion[0] === '전체') {
        setSelectedRegionNum(0)
      } else {
        setSelectedRegionNum(1)
      }
    } else {
      setSelectedRegionNum(selectedRegion.length)
    }
  }, [selectedRegion])

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['courtList', filterCoat, selectedRegion],
    queryFn: ({ pageParam = 0 }) => {
      if (selectedRegion && selectedRegion[0] === '전체') {
        return getCourtList(pageParam, 10, filterCoat)
      }
      return getCourtList(pageParam, 10, filterCoat, selectedRegion.join(','))
    },
    getNextPageParam: (lastPage) => {
      const page = lastPage.data.result.page.number
      const { totalPages } = lastPage.data.result.page
      if (totalPages === page + 1 || totalPages === 0) return undefined
      return page + 1
    },
    staleTime: 1000 * 60 * 1,
    retry: 1,
    initialPageParam: 0,
  })
  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  }
  useObserver({
    target: bottom,
    onIntersect,
  })

  const handleClickSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (search.length < 2) {
      toast.error('검색어는 2글자 이상 입력해주세요')
    }
    setFilterCoat(search)
  }
  const handleSelectedRegion = (regions: string[]) => {
    setSelectedRegion(regions)
  }

  const handleLocationModalOff = () => {
    setLocationModalOpen(false)
  }
  const handleLocationModal = () => {
    setLocationModalOpen(true)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  const handleSelectedDate = (date: string) => {
    setSelectedDate(date)
  }
  return (
    <div className="pb-20 flex justify-center items-center">
      <div className=" px-2">
        <div className="flex flex-col gap-3 py-4">
          <div className="flex justify-center">
            <Image
              src={ReservationLogo}
              alt="reservation logo"
              height={200}
              priority
            />
          </div>

          <div className="flex gap-x-2 text-disabled-dark text-xs">
            <div className="flex items-center border rounded-[62.5rem] gap-x-3 px-4 py-2 ">
              <form id="search" onSubmit={handleClickSearch}>
                <input
                  type="text"
                  id="search"
                  onChange={handleSearch}
                  placeholder="지역, 체육관 명으로 검색"
                  className="w-[7.1875rem] placeholder-disabled-dark focus:outline-none focus:border-none"
                />
              </form>
              <button
                form="search"
                type="submit"
                aria-label="지역,체육관 명으로 검색"
              >
                <SearchIcon />
              </button>
            </div>
            <button
              type="button"
              className={`flex items-center border rounded-[62.5rem] gap-x-2 px-4
                ${selectedRegionNum > 0 ? 'text-theme border-theme bg-theme-light' : 'text-disabled-dark'}
              `}
              onClick={handleLocationModal}
            >
              {selectedRegionNum > 0 ? <LocationColorIcon /> : <LocationIcon />}
              {selectedRegionNum > 0 ? (
                <p>지역 +{selectedRegionNum}</p>
              ) : (
                <p>지역</p>
              )}
              {selectedRegionNum > 0 ? (
                <LocationDetailColorIcon />
              ) : (
                <LocationDetailIcon />
              )}
            </button>
          </div>
        </div>

        {locationModalOpen && (
          <LocationModal
            closeModal={handleLocationModalOff}
            chooseLocation={selectedRegion}
            handleLoactions={handleSelectedRegion}
          />
        )}

        <div>
          <Pagination changeSelectedDate={handleSelectedDate} />
        </div>

        <div>
          {data?.pages[0].data.result.content[0] ? (
            data?.pages.map((page) => (
              <Courts
                courtList={page.data.result.content}
                selectedDate={selectedDate}
                key={page.data.result.page.number}
              />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center py-6 px-[0.625rem] text-disabled-dark">
              <div className="text-sm font-bold">
                해당 일자에 예약 가능한 코트가 없어요 :({' '}
              </div>
              <div className="text-xs">다른 일자를 확인해보세요</div>
            </div>
          )}
        </div>
        <div ref={bottom} />
      </div>
    </div>
  )
}
