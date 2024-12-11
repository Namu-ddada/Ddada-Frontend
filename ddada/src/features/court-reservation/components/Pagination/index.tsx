import dayjs from 'dayjs'
import { useState } from 'react'

import { KR_DAY_OF_WEEK } from '@/features/court-reservation/constants/court-reservation.ts'
import NextDateIcon from '@/static/imgs/court-reservation/court-reservation_pagination_next_icon.svg'
import PrevDateIcon from '@/static/imgs/court-reservation/court-reservation_pagination_prev_icon.svg'
import SelectedLine from '@/static/imgs/court-reservation/court-reservation_selected_line.svg'
import UnSelectedLine from '@/static/imgs/court-reservation/court-reservation_unselected_line.svg'

interface PaginationProps {
  changeSelectedDate: (date: string) => void
}

export default function Pagination({ changeSelectedDate }: PaginationProps) {
  const today = dayjs()
  const nextWeekStartDay = today.add(1, 'week')
  const [selectedDay, setSelectedDay] = useState(today.format('YYYY-MM-DD'))

  const getWeekDays = (dayStart: dayjs.Dayjs) => {
    const weekDays = []
    for (let i = 0; i < 7; i += 1) {
      weekDays.push(dayStart.add(i, 'day'))
    }
    return weekDays
  }

  const [currentWeek, setCurrentWeek] = useState(getWeekDays(today))

  const handleClickPrev = () => {
    if (currentWeek[0].format('YYYY-MM-DD') === today.format('YYYY-MM-DD'))
      return
    const prevWeekLastDay = currentWeek[6]
      .subtract(1, 'week')
      .format('YYYY-MM-DD')
    const prevWeek = currentWeek[0].subtract(1, 'week')
    setCurrentWeek(getWeekDays(prevWeek))
    setSelectedDay(prevWeekLastDay)
    changeSelectedDate(prevWeekLastDay)
  }

  const handleClickNext = () => {
    if (
      currentWeek[0].format('YYYY-MM-DD') ===
      nextWeekStartDay.format('YYYY-MM-DD')
    )
      return
    const nextWeek = currentWeek[0].add(1, 'week')
    setCurrentWeek(getWeekDays(nextWeek))
    setSelectedDay(nextWeek.format('YYYY-MM-DD'))
    changeSelectedDate(nextWeek.format('YYYY-MM-DD'))
  }

  return (
    <div className="flex gap-1 justify-center items-center w-[47.6875rem]">
      <button type="button" onClick={handleClickPrev} aria-label="이전 주">
        <PrevDateIcon />
      </button>
      <div className="flex flex-grow gap-1">
        {currentWeek.map((day) => (
          <button
            type="button"
            key={day.format('YYYY-MM-DD')}
            className={`
              flex-grow
              ${selectedDay === day.format('YYYY-MM-DD') ? 'bg-theme text-white font-bold' : 'text-disabled-dark'}`}
            onClick={() => {
              setSelectedDay(day.format('YYYY-MM-DD'))
              changeSelectedDate(day.format('YYYY-MM-DD'))
            }}
          >
            <div className="flex flex-col border px-6 py-4 gap-[10px]">
              <p>{day.format('MM.DD')}</p>
              {selectedDay === day.format('YYYY-MM-DD') ? (
                <SelectedLine />
              ) : (
                <UnSelectedLine />
              )}
              <p className="text-xs">{KR_DAY_OF_WEEK[day.day()]}요일</p>
            </div>
          </button>
        ))}
      </div>
      <button type="button" onClick={handleClickNext} aria-label="다음 주">
        <NextDateIcon />
      </button>
    </div>
  )
}
