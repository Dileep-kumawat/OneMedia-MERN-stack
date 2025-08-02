import { createSlice } from '@reduxjs/toolkit'
import { LoginUserThunk } from './userThunk';

const initialState = {
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(LoginUserThunk.fulfilled, (state, action) => {
      console.log('fulfilled');
    })
    builder.addCase(LoginUserThunk.pending, (state, action) => {
      console.log('pending');
    })
    builder.addCase(LoginUserThunk.rejected, (state, action) => {
      console.log('rejeceted');
    })
  }
})

export const {  } = userSlice.actions

export default userSlice.reducer