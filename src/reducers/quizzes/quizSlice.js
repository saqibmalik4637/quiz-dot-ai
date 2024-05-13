import { createSlice } from '@reduxjs/toolkit'

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    requestingMarkFavorite: false,
    requestedMarkFavorite: false,
    requestMarkFavoriteError: '',
    requestingUnmarkFavorite: false,
    requestedUnmarkFavorite: false,
    requestUnmarkFavoriteError: '',
    requestingMarkPlayed: false,
    requestedMarkPlayed: false,
    requestMarkPlayedError: '',
    fetchingQuizzes: false,
    fetchedQuizzes: false,
    fetchError: '',
    quizzes: [],
    quiz: {}
  },
  reducers: {
    fetchQuizzes: (state, action) => {
      state.quizzes = [...action.payload.quizzes]
      state.fetchError = action.payload.error
      state.fetchingQuizzes = false
      state.fetchedQuizzes = true
    },

    markFavorited: (state, action) => {
      state.quiz = action.payload.quiz
      state.requestingMarkFavorite = false
      state.requestedMarkFavorite = true
      state.requestMarkFavoriteError = action.payload.error
    },

    markFavoritedInitialState: (state, action) => {
      state.requestingMarkFavorite = false
      state.requestedMarkFavorite = false
      state.requestMarkFavoriteError = ''
    },

    unmarkFavorited: (state, action) => {
      state.quiz = action.payload.quiz
      state.requestingUnmarkFavorite = false
      state.requestedUnmarkFavorite = true
      state.requestUnmarkFavoriteError = action.payload.error
    },

    unmarkFavoritedInitialState: (state, action) => {
      state.requestingUnmarkFavorite = false
      state.requestedUnmarkFavorite = false
      state.requestUnmarkFavoriteError = ''
    },

    markPlayed: (state, action) => {
      state.quiz = action.payload.quiz
      state.requestingMarkPlayed = false
      state.requestedMarkPlayed = true
      state.requestMarkPlayedError = action.payload.error
    }
  }
});

export const {
  fetchQuizzes,
  markFavorited,
  markFavoritedInitialState,
  unmarkFavorited,
  unmarkFavoritedInitialState,
  markPlayed
} = quizSlice.actions

export const selectQuiz = (state) => state.quiz
export default quizSlice.reducer
