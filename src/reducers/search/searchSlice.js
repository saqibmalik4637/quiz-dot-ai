import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    fetchingSuggestions: false,
    fetchedSuggestions: false,
    fetchError: '',
    suggestions: []
  },
  reducers: {
    fetchSuggestions: (state, action) => {
      state.suggestions = [...action.payload.suggestions]
      state.fetchError = action.payload.error
      state.fetchingSuggestions = false
      state.fetchedSuggestions = true
    }
  }
});

export const { fetchSuggestions } = searchSlice.actions
export const selectSuggestions = (state) => state.search.suggestions
export default searchSlice.reducer
