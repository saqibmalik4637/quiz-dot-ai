import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    isLoading: false,
    categoriesList: []
  },
  reducers: {
    fetchCategories: (state, action) => {
      console.log(action)
      debugger
      // if (action.payload.status == 200) {
      //   state.isLoading = false
      //   state.categoriesList = action.payload.data.categories
      // } else {
      //   state.isLoading = false
      // }
    }
  }
})

export const { fetchCategories } = categorySlice.actions

export default categorySlice.reducer
