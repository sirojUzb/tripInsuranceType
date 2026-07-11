import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]
const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

interface DateFieldProps {
  value: string
  onChange: (value: string) => void
  align?: 'left' | 'right'
}

function parseDate(str: string): Date | null {
  const [d, m, y] = (str || '').split('.').map(Number)
  if (!d || !m || !y) return null
  const date = new Date(y, m - 1, d)
  return isNaN(date.getTime()) ? null : date
}

function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  return `${dd}.${mm}.${date.getFullYear()}`
}

function sameDay(a: Date | null, b: Date | null): boolean {
  return Boolean(
    a &&
      b &&
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear(),
  )
}

function DateField({ value, onChange, align = 'left' }: DateFieldProps) {
  const [open, setOpen] = useState(false)
  const selected = parseDate(value)
  const [view, setView] = useState(selected || new Date())
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (open) setView(parseDate(value) || new Date())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const year = view.getFullYear()
  const month = view.getMonth()
  const today = new Date()

  const firstDay = new Date(year, month, 1)
  const offset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  const changeMonth = (delta: number) => setView(new Date(year, month + delta, 1))

  const pick = (date: Date) => {
    onChange(formatDate(date))
    setOpen(false)
  }

  return (
    <div className="relative flex-1" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2.5 border-t border-neutral-200 px-4 py-4 text-left md:border-t-0 md:border-l"
      >
        <Calendar className="h-5 w-5 shrink-0 text-purple-brand" />
        <span className="text-[15px] text-neutral-800">{value}</span>
      </button>

      {open && (
        <div
          className={`absolute top-[calc(100%+12px)] z-30 w-72 rounded-lg bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)] ring-1 ring-black/5 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-purple-brand/10 hover:text-purple-brand"
              aria-label="Предыдущий месяц"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[15px] font-semibold text-neutral-800">
              {MONTHS[month]} {year}
            </span>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-purple-brand/10 hover:text-purple-brand"
              aria-label="Следующий месяц"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((w) => (
              <span
                key={w}
                className="flex h-8 items-center justify-center text-xs font-medium text-neutral-400"
              >
                {w}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((date, i) =>
              date ? (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(date)}
                  className={`flex h-8 w-8 items-center justify-center rounded-md text-[14px] transition-colors ${
                    sameDay(date, selected)
                      ? 'bg-purple-brand text-white'
                      : sameDay(date, today)
                        ? 'text-purple-brand ring-1 ring-purple-brand/40 hover:bg-purple-brand/10'
                        : 'text-neutral-800 hover:bg-purple-brand/10'
                  }`}
                >
                  {date.getDate()}
                </button>
              ) : (
                <span key={i} />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DateField
