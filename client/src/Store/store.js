import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/User/userSlice'

export const store = configureStore({
  reducer: {
    userSlice
  },
})