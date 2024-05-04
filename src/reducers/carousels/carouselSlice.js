import { createSlice } from '@reduxjs/toolkit'

export const carouselSlice = createSlice({
  name: 'carousel',
  initialState: {
    fetchingCarousels: false,
    fetchedCarousels: false,
    fetchingError: '',
    carousels: [],
  },

  reducers: {
    fetchCarousels: (state, action) => {
      state.carousels = [...action.payload.carousels]
      state.fetchingCarousels = false
      state.fetchedCarousels = true
      state.fetchingError = action.payload.error
    }
  }
});

export const { fetchCarousels } = carouselSlice.actions
export const selectCarousels = (state) => state.carousel.carousels
export default carouselSlice.reducer
