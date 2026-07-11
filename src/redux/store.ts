import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import heroReducer from './heroSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    hero: heroReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
