'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import MatchCard from '@/features/manager/components/MatchCard/index.tsx'
import { CATEGORY_TO_PAGE } from '@/features/manager/constants/constManager.ts'
import useFetchMatchList from '@/features/manager/hooks/useFetchMatchList.tsx'
import LoadingSpinner from '@/static/imgs/mypage/playstyle/my-page-playstyle-spinner.svg'

export default function ManagerSidebar() {
  const [clickedCard, setClickedCard] = useState<number>(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const [todayOnly, setTodayOnly] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')
  const [clickedCategory, setClickedCategory] = useState<number>(1)
  const {
    allRefetch,
    allSuccess,
    reservedList,
    createdList,
    playingList,
    finishedList,
    bottom,
  } = useFetchMatchList({ todayOnly, keyword })

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!inputRef.current) {
      return
    }
    setKeyword(inputRef.current.value)
  }

  const handleToggle = () => {
    setTodayOnly(!todayOnly)
  }

  useEffect(() => {
    allRefetch()
  }, [keyword, todayOnly])

  if (!allSuccess) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-[.625rem]">
      <form onSubmit={(event) => handleSearch(event)} className="p-2">
        <input
          className="border placeholder-disabled-dark px-6 py-5 w-full text-black border-disabled rounded-xl h-16 "
          placeholder="검색"
          ref={inputRef}
          type="text"
        />
      </form>
      <div className="p-2 flex gap-x-1 items-center">
        <button
          aria-label="todayOnly"
          type="button"
          onClick={() => handleToggle()}
        >
          <div
            className={`rounded-full w-[1.375rem] h-[.7813rem] border-[.1875rem] flex items-center p-[.01rem] transition-colors duration-300 ${todayOnly ? `bg-theme border-theme` : ` border-[#5F6368]`}`}
          >
            <div
              className={`rounded-full  w-[.375rem] h-[.375rem] transition-all duration-300 ${todayOnly ? `bg-white translate-x-[.625rem] ` : `bg-[#5F6368]`}`}
            />
          </div>
        </button>
        <label htmlFor="todayOnly" className="text-[#5F6368] text-xs">
          오늘 일정 모아보기
        </label>
      </div>
      <div className="flex flex-col">
        <div className="flex text-sm w-full">
          <span
            className={`py-3 text-center flex-1 shrink-0 cursor-pointer ${clickedCategory === 1 && `font-bold text-theme border-b-2 border-theme`}`}
            onClick={() => setClickedCategory(1)}
            aria-hidden="true"
          >
            매치대기 ({reservedList.length + createdList.length})
          </span>
          <span
            className={`py-3 text-center flex-1 shrink-0 cursor-pointer ${clickedCategory === 2 && `font-bold text-theme border-b-2 border-theme`}`}
            onClick={() => setClickedCategory(2)}
            aria-hidden="true"
          >
            매치진행 ({playingList.length})
          </span>
          <span
            className={`py-3  text-center flex-1 shrink-0 cursor-pointer ${clickedCategory === 3 && `font-bold text-theme border-b-2 border-theme`}`}
            onClick={() => setClickedCategory(3)}
            aria-hidden="true"
          >
            매치완료 ({finishedList.length})
          </span>
        </div>
        {clickedCategory === 1 &&
          [...createdList, ...reservedList].map((item) => (
            <Link
              href={`/manager/${CATEGORY_TO_PAGE[clickedCategory]}/${item.id}`}
              key={item.id}
              onClick={() => setClickedCard(item.id)}
            >
              <MatchCard data={item} isClicked={item.id === clickedCard} />
            </Link>
          ))}
        {clickedCategory === 2 &&
          playingList.map((item) => (
            <Link
              href={`/manager/${CATEGORY_TO_PAGE[clickedCategory]}/${item.id}`}
              key={item.id}
              onClick={() => setClickedCard(item.id)}
            >
              <MatchCard data={item} isClicked={item.id === clickedCard} />
            </Link>
          ))}
        {clickedCategory === 3 &&
          finishedList.map((item) => (
            <Link
              href={`/manager/${CATEGORY_TO_PAGE[clickedCategory]}/${item.id}`}
              key={item.id}
              onClick={() => setClickedCard(item.id)}
            >
              <MatchCard data={item} isClicked={item.id === clickedCard} />
            </Link>
          ))}
        <div ref={bottom} />
      </div>
    </div>
  )
}
