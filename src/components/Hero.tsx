import { useState, useRef, useEffect, type KeyboardEvent, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronDown, Minus, Plus } from 'lucide-react'
import DateField from './DateField'
import { countries } from '../data/countries'
import {
  setPlace,
  setDateFrom,
  setDateTo,
  changeCount,
  type TravelerKey,
} from '../redux/heroSlice'
import type { RootState, AppDispatch } from '../redux/store'
import mainImg from '../images/main-img.jpg'

interface PassengerGroup {
  key: TravelerKey
  title: string
  note: string
}

const PASSENGER_GROUPS: PassengerGroup[] = [
  { key: 'kidsBaby', title: 'Дети до 3-х лет', note: '' },
  { key: 'kids', title: 'Дети', note: 'от 4 до 17 лет' },
  { key: 'adults', title: 'Взрослые', note: 'от 18 до 68 лет' },
  { key: 'seniors', title: 'Взрослые', note: 'от 70 до 79 лет' },
]

function peopleLabel(count: number): string {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return `${count} человек`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return `${count} человека`
  return `${count} человек`
}

interface HeroProps {
  title?: string
  subtitle?: string
}

function Hero({
  title = 'Страхование путешественников',
  subtitle = 'Полис, который действительно работает',
}: HeroProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { place, dateFrom, dateTo, counts } = useSelector((state: RootState) => state.hero)

  const [openPlace, setOpenPlace] = useState(false)
  const [openPeople, setOpenPeople] = useState(false)
  const [highlight, setHighlight] = useState(-1)

  const placeRef = useRef<HTMLDivElement>(null)
  const peopleRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const totalPeople = Object.values(counts).reduce((a, b) => a + b, 0)

  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().includes(place.trim().toLowerCase()),
  )

  const selectCountry = (country: string) => {
    dispatch(setPlace(country))
    setOpenPlace(false)
    setHighlight(-1)
  }

  const handlePlaceKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!openPlace || filteredCountries.length === 0) {
      if (e.key === 'ArrowDown') setOpenPlace(true)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((i) => (i + 1) % filteredCountries.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((i) => (i <= 0 ? filteredCountries.length - 1 : i - 1))
    } else if (e.key === 'Enter') {
      if (highlight >= 0) {
        e.preventDefault()
        selectCountry(filteredCountries[highlight])
      }
    } else if (e.key === 'Escape') {
      setOpenPlace(false)
      setHighlight(-1)
    }
  }

  useEffect(() => {
    if (highlight < 0 || !listRef.current) return
    const node = listRef.current.children[highlight]
    if (node) node.scrollIntoView({ block: 'nearest' })
  }, [highlight])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (placeRef.current && !placeRef.current.contains(e.target as Node))
        setOpenPlace(false)
      if (peopleRef.current && !peopleRef.current.contains(e.target as Node))
        setOpenPeople(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log({ place, dateFrom, dateTo, counts, totalPeople })
  }

  return (
    <section
      className="relative flex min-h-screen flex-col overflow-hidden bg-cover bg-center
        before:absolute before:inset-0 before:bg-linear-to-b
        before:from-black/45 before:via-black/25 before:to-black/45"
      style={{ backgroundImage: `url(${mainImg})` }}
    >
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="mb-2.5 text-3xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:text-[38px]">
          {title}
        </h1>
        <p className="mb-8 text-lg font-normal text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] md:text-[19px]">
          {subtitle}
        </p>

        <form
          onSubmit={handleSubmit}
          className="relative flex w-full max-w-3xl flex-col rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] md:flex-row md:items-stretch"
        >
          <div className="relative flex-[1.4]" ref={placeRef}>
            <div className="flex items-center gap-2.5 px-4 py-4">
              <input
                type="text"
                value={place}
                onChange={(e) => {
                  dispatch(setPlace(e.target.value))
                  setOpenPlace(true)
                  setHighlight(-1)
                }}
                onFocus={() => setOpenPlace(true)}
                onKeyDown={handlePlaceKeyDown}
                placeholder="Куда едем?"
                className="w-full border-none bg-transparent text-[15px] text-neutral-800 outline-none placeholder:text-neutral-400"
              />
            </div>

            {openPlace && filteredCountries.length > 0 && (
              <ul
                ref={listRef}
                className="absolute left-0 top-[calc(100%+12px)] z-30 max-h-64 w-full min-w-65 overflow-y-auto rounded-lg bg-white py-1.5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.2)] ring-1 ring-black/5"
              >
                {filteredCountries.map((country, index) => (
                  <li key={country}>
                    <button
                      type="button"
                      onClick={() => selectCountry(country)}
                      onMouseEnter={() => setHighlight(index)}
                      className={`block w-full px-5 py-2.5 text-left text-[15px] text-neutral-800 transition-colors ${
                        highlight === index ? 'bg-purple-brand/10' : ''
                      }`}
                    >
                      {country}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <DateField value={dateFrom} onChange={(v) => dispatch(setDateFrom(v))} />
          <DateField value={dateTo} onChange={(v) => dispatch(setDateTo(v))} align="right" />

          <div className="relative flex-[0.9]" ref={peopleRef}>
            <button
              type="button"
              onClick={() => setOpenPeople((v) => !v)}
              className="flex h-full w-full cursor-pointer items-center justify-between gap-2 border-t border-neutral-200 px-4 py-4 text-[15px] text-neutral-800 md:border-t-0 md:border-l"
            >
              {peopleLabel(totalPeople)}
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-purple-brand transition-transform ${openPeople ? 'rotate-180' : ''}`}
              />
            </button>

            {openPeople && (
              <div className="absolute right-0 top-[calc(100%+12px)] z-30 w-72 rounded-lg bg-white p-4 text-left shadow-[0_10px_30px_rgba(0,0,0,0.2)] ring-1 ring-black/5">
                {PASSENGER_GROUPS.map((group) => (
                  <div
                    key={group.key}
                    className="flex items-center justify-between py-2.5"
                  >
                    <div>
                      <p className="text-[15px] text-neutral-800">{group.title}</p>
                      {group.note && (
                        <p className="text-xs text-neutral-400">{group.note}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => dispatch(changeCount({ key: group.key, delta: -1 }))}
                        disabled={counts[group.key] === 0}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-300 text-neutral-600 transition-colors hover:border-purple-brand hover:text-purple-brand disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-4 text-center text-[15px] text-neutral-800">
                        {counts[group.key]}
                      </span>
                      <button
                        type="button"
                        onClick={() => dispatch(changeCount({ key: group.key, delta: 1 }))}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-300 text-neutral-600 transition-colors hover:border-purple-brand hover:text-purple-brand"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-6 cursor-pointer rounded-lg bg-purple-brand px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-purple-brand-dark active:translate-y-px"
        >
          Узнать стоимость
        </button>
      </div>
    </section>
  )
}

export default Hero
