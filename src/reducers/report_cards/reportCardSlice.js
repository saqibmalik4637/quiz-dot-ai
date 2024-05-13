import { createSlice } from '@reduxjs/toolkit'

export const reportCardSlice = createSlice({
  name: 'reportCard',
  initialState: {
    fetchingReportCard: false,
    fetchedReportCard: false,
    fetchReportCardError: '',
    creatingReportCard: false,
    createdReportCard: false,
    createReportCardError: '',
    reportCard: {}
  },
  reducers: {
    fetchReportCard: (state, action) => {
      state.reportCard = action.payload.reportCard
      state.fetchError = action.payload.error
      state.fetchingReportCard = false
      state.fetchedReportCard = true
    },

    createReportCard: (state, action) => {
      state.reportCard = action.payload.reportCard
      state.createReportCardError = action.payload.error
      state.creatingReportCard = false
      state.createdReportCard = true
    },

    setCreateReportCardReportCardInitialState: (state, action) => {
      state.reportCard = {}
      state.createReportCardError = ''
      state.creatingReportCard = false
      state.createdReportCard = false
    }
  }
});

export const { fetchReportCard, createReportCard, setCreateReportCardReportCardInitialState } = reportCardSlice.actions
export const selectReportCard = (state) => state.reportCard
export default reportCardSlice.reducer
