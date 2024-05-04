import { createSlice } from '@reduxjs/toolkit'

export const questionSlice = createSlice({
  name: 'question',
  initialState: {
    fetchingQuestions: false,
    fetchedQuestions: false,
    fetchError: '',
    questions: []
  },
  reducers: {
    fetchQuestions: (state, action) => {
      state.questions = [...action.payload.questions]
      state.fetchError = action.payload.error
      state.fetchingQuestions = false
      state.fetchedQuestions = true
    },

    setQuestionsInitialState: (state, action) => {
      state.questions = []
      state.fetchError = ''
      state.fetchingQuestions = true
      state.fetchedQuestions = false
    }
  }
});

export const { fetchQuestions, setQuestionsInitialState } = questionSlice.actions
export const selectQuestions = (state) => state.question.questions
export const fetchedQuestions = (state) => state.question.fetchedQuestions
export const fetchingQuestions = (state) => state.question.fetchingQuestions
export default questionSlice.reducer
