'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import LocationModal from '@/features/court-reservation/components/LocationModal/index.tsx'
import Pagination from '@/features/court-reservation/components/Pagination/index.tsx'
import { useObserver } from '@/features/court-reservation/components/useObserver/index.tsx'
import { getMatchList } from '@/features/match-reservation/api/match/index.ts'
import Matches from '@/features/match-reservation/components/Matches/index.tsx'
import MatchToggle from '@/features/match-reservation/components/MatchToggle/index.tsx'
import MatchTypeModal from '@/features/match-reservation/components/MatchTypeModal/index.tsx'
import { MatchType } from '@/features/match-reservation/types/MatchType.ts'
import LocationColorIcon from '@/static/imgs/court-reservation/court-reservation_location_color_icon.svg'
import LocationIcon from '@/static/imgs/court-reservation/court-reservation_location_icon.svg'
import LocationDetailColorIcon from '@/static/imgs/court-reservation/court-reservation_location_under_color_icon.svg'
import LocationDetailIcon from '@/static/imgs/court-reservation/court-reservation_location_under_icon.svg'
import SearchIcon from '@/static/imgs/court-reservation/court-reservation_search_icon.svg'
import BadmintonColorIcon from '@/static/imgs/match-reservation/match-reservation_badminton_color_icon.svg'
import BadmintonIcon from '@/static/imgs/match-reservation/match-reservation_badminton_icon.svg'
import ReservationLogo from '@/static/imgs/match-reservation/match-reservation_MAIN.png'

export default function MatchReservation() {
  const bottom = useRef(null)
  const today = dayjs().format('YYYY-MM-DD')
  const [selectedDate, setSelectedDate] = useState(today)
  const [search, setSearch] = useState('')
  const [filterCoat, setFilterCoat] = useState('')
  const [locationModalOpen, setLocationModalOpen] = useState(false)
  const [matchTypeModalOpen, setMatchTypeModalOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string[]>(['전체'])
  const [selectedRegionNum, setSelectedRegionNum] = useState<number>(0)
  const [selectedMatchType, setSelectedMatchType] = useState<string[]>(['전체'])
  const [selectedMatchTypeNum, setSelectedMatchTypeNum] = useState<number>(0)
  const [selectedMatchRankType, setSelectedMatchRankType] =
    useState<string>('NORMAL')

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

  useEffect(() => {
    if (selectedMatchType.length === 1) {
      if (selectedMatchType[0] === '전체') {
        setSelectedMatchTypeNum(0)
      } else {
        setSelectedMatchTypeNum(1)
      }
    } else {
      setSelectedMatchTypeNum(selectedMatchType.length)
    }
  }, [selectedMatchType])

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [
      'matchList',
      selectedMatchRankType,
      selectedMatchType,
      filterCoat,
      selectedRegion,
    ],
    queryFn: ({ pageParam = 0 }) => {
      if (selectedRegion && selectedRegion[0] === '전체') {
        if (selectedMatchType && selectedMatchType[0] === '전체') {
          return getMatchList(
            pageParam,
            10,
            selectedMatchRankType,
            '',
            '',
            filterCoat,
            '',
          )
        }
        return getMatchList(
          pageParam,
          10,
          selectedMatchRankType,
          selectedMatchType.join(','),
          '',
          filterCoat,
          '',
        )
      }

      if (selectedMatchType && selectedMatchType[0] === '전체') {
        return getMatchList(
          pageParam,
          10,
          selectedMatchRankType,
          '',
          '',
          filterCoat,
          selectedRegion.join(','),
        )
      }
      return getMatchList(
        pageParam,
        10,
        selectedMatchRankType,
        selectedMatchType.join(','),
        '',
        filterCoat,
        selectedRegion.join(','),
      )
    },
    staleTime: 1000 * 60 * 1,
    retry: 1,
    getNextPageParam: (lastPage) => {
      const page = lastPage.data.result.page.number
      const { totalPages } = lastPage.data.result.page
      if (totalPages === page + 1 || totalPages === 0) return undefined
      return page + 1
    },
    initialPageParam: 0,
  })

  const matchesEmpty = data?.pages.every(
    (page) =>
      page.data.result.content.filter(
        (match: MatchType) => match.date === selectedDate,
      ).length === 0,
  )

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
  const handleMaTchTypeModalOff = () => {
    setMatchTypeModalOpen(false)
  }
  const handleMaTchTypeModal = () => {
    setMatchTypeModalOpen(true)
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  const handleSelectedMatchType = (matchTypes: string[]) => {
    setSelectedMatchType(matchTypes)
  }

  const handleSelectedMatchRankType = (matchRankType: string) => {
    setSelectedMatchRankType(matchRankType)
  }

  return (
    <div className="flex justify-center items-center px-2 pb-20 gap-2">
      <div className="flex flex-col gap-3 py-4">
        <div className="flex justify-center">
          <Image
            src={ReservationLogo}
            alt="reservation logo"
            height={200}
            priority
          />
        </div>
        <div className="flex justify-center">
          <div className="flex text-disabled-dark text-xs items-center border rounded-[62.5rem] gap-x-3 px-4 py-2 ">
            <button
              form="search"
              type="submit"
              aria-label="지역,체육관 명으로 검색"
            >
              <SearchIcon />
            </button>
            <form id="search" onSubmit={handleClickSearch}>
              <input
                type="text"
                id="search"
                onChange={handleSearch}
                placeholder="지역, 체육관 명으로 검색"
                className="w-[7.1875rem] placeholder-disabled-dark focus:outline-none focus:border-none"
              />
            </form>
          </div>
        </div>
        <div className="flex justify-center text-disabled-dark text-xs ">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                type="button"
                className={`flex items-center border rounded-[62.5rem] gap-x-2 px-4 py-2
            ${selectedRegionNum > 0 ? 'text-theme border-theme bg-theme-light' : 'text-disabled-dark'}
          `}
                onClick={handleLocationModal}
              >
                {selectedRegionNum > 0 ? (
                  <LocationColorIcon />
                ) : (
                  <LocationIcon />
                )}
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
              <button
                type="button"
                className={`flex items-center border rounded-[62.5rem] gap-x-2 px-4 py-2 text-disabled-dark
                  ${selectedMatchTypeNum > 0 ? 'text-theme border-theme bg-theme-light' : ''}
                    `}
                onClick={handleMaTchTypeModal}
              >
                {selectedMatchTypeNum > 0 ? (
                  <BadmintonColorIcon />
                ) : (
                  <BadmintonIcon />
                )}
                {selectedMatchTypeNum > 0 ? (
                  <p>매치타입 +{selectedMatchTypeNum}</p>
                ) : (
                  <p>매치타입</p>
                )}
                {selectedMatchTypeNum > 0 ? (
                  <LocationDetailColorIcon />
                ) : (
                  <LocationDetailIcon />
                )}
              </button>
            </div>
            <div className="flex justify-center">
              <MatchToggle
                matchRankType={selectedMatchRankType}
                handleMatchRankType={handleSelectedMatchRankType}
              />
            </div>
          </div>
        </div>
        <div>
          <Pagination changeSelectedDate={setSelectedDate} />
        </div>
        {matchesEmpty ? (
          <div className="flex flex-col justify-center items-center py-6 px-[0.625rem] text-disabled-dark">
            <div className="text-sm font-bold">
              해당 일자에 매치가 없어요 :(
            </div>
            <div className="text-xs">다른 일자를 확인해보세요</div>
          </div>
        ) : (
          data?.pages.map((page) => (
            <Matches
              matchList={page.data.result.content}
              selectedDate={selectedDate}
              key={page.data.result.page.number}
            />
          ))
        )}
      </div>

      {locationModalOpen && (
        <LocationModal
          closeModal={handleLocationModalOff}
          chooseLocation={selectedRegion}
          handleLoactions={handleSelectedRegion}
        />
      )}

      {matchTypeModalOpen && (
        <MatchTypeModal
          closeModal={handleMaTchTypeModalOff}
          chooseMatchType={selectedMatchType}
          handleMatchType={handleSelectedMatchType}
        />
      )}

      {/* <div>
          <Pagination changeSelectedDate={handleSelectedDate} />
        </div>

        <div>
          <Courts courtList={DUMMY_COURTS} selectedDate={selectedDate} />
        </div> */}
      <div ref={bottom} />
    </div>
  )
}
