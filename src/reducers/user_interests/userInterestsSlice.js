import { createSlice } from '@reduxjs/toolkit'

export const userInterestsSlice = createSlice({
  name: 'userInterests',
  initialState: {
    fetchingUserInterests: false,
    fetchedUserInterests: false,
    createdUserInterest: false,
    createError: '',
    fetchError: '',
    userInterests: [],
  },

  reducers: {
    fetchUserInterests: (state, action) => {
      state.userInterests = [...action.payload.userInterests]
      state.fetchError = action.payload.error
      state.fetchingUserInterests = false
      state.fetchedUserInterests = true
    },

    createUserInterest: (state, action) => {
      state.createError = action.payload.error
      state.createdUserInterest = action.payload.status
    },

    initialStateCreateUserInterest: (state, action) => {
      state.createdUserInterest = false
      state.createError = ""
    }
  }
});

export const { fetchUserInterests, createUserInterest } = userInterestsSlice.actions
export const selectUserInterests = (state) => state.userInterests

export default userInterestsSlice.reducer
