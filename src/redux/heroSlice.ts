import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type TravelerKey = 'kidsBaby' | 'kids' | 'adults' | 'seniors'

interface HeroState {
  place: string
  dateFrom: string
  dateTo: string
  counts: Record<TravelerKey, number>
}

const initialState: HeroState = {
  place: '',
  dateFrom: '01.01.2026',
  dateTo: '01.01.2026',
  counts: {
    kidsBaby: 0,
    kids: 0,
    adults: 1,
    seniors: 0,
  },
}

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    setPlace: (state, action: PayloadAction<string>) => {
      state.place = action.payload
    },
    setDateFrom: (state, action: PayloadAction<string>) => {
      state.dateFrom = action.payload
    },
    setDateTo: (state, action: PayloadAction<string>) => {
      state.dateTo = action.payload
    },
    changeCount: (
      state,
      action: PayloadAction<{ key: TravelerKey; delta: number }>,
    ) => {
      const { key, delta } = action.payload
      state.counts[key] = Math.max(0, state.counts[key] + delta)
    },
  },
})

export const { setPlace, setDateFrom, setDateTo, changeCount } = heroSlice.actions
export default heroSlice.reducer
