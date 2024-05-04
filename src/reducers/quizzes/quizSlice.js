import { createSlice } from '@reduxjs/toolkit'

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    fetchingQuizzes: false,
    fetchedQuizzes: false,
    fetchError: '',
    quizzes: []
  },
  reducers: {
    fetchQuizzes: (state, action) => {
      state.quizzes = [...action.payload.quizzes]
      state.fetchError = action.payload.error
      state.fetchingQuizzes = false
      state.fetchedQuizzes = true
    }
  }
});

export const { fetchQuizzes } = quizSlice.actions
export const selectQuizzes = (state) => state.quiz.quizzes
export default quizSlice.reducer
