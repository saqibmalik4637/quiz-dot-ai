import { createSlice } from '@reduxjs/toolkit'

export const interestsSlice = createSlice({
  name: 'interests',
  initialState: {
    fetchingInterests: false,
    fetchedInterests: false,
    fetchError: '',
    interests: []
  },
  reducers: {
    fetchInterests: (state, action) => {
      state.interests = [...action.payload.interests]
      state.fetchError = action.payload.error
      state.fetchingInterests = false
      state.fetchedInterests = true
    },

    setInterestsInitialState: (state, action) => {
      state.interests = []
      state.fetchError = ''
      state.fetchingInterests = true
      state.fetchedInterests = false
    }
  }
});

export const { fetchInterests, setInterestsInitialState } = interestsSlice.actions
export const selectInterests = (state) => state.interests
export default interestsSlice.reducer
