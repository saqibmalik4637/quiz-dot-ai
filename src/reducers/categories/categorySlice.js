import { createSlice } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    fetchingCategories: false,
    fetchedCategories: false,
    fetchError: '',
    categories: []
  },
  reducers: {
    fetchCategories: (state, action) => {
      state.categories = [...action.payload.categories]
      state.fetchError = action.payload.error
      state.fetchingCategories = false
      state.fetchedCategories = true
    }
  }
});

export const { fetchCategories } = categorySlice.actions
export const selectCategories = (state) => state.category.categories
export default categorySlice.reducer
