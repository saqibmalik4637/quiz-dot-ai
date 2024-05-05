import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    fetchingCurrentUser: false,
    fetchedCurrentUser: false,
    fetchingusers: false,
    fetchedusers: false,
    creatingUser: false,
    createdUser: false,
    createUserError: '',
    fetchCurrentUserError: '',
    fetchUsersError: '',
    userToken: null,
    currentUser: null,
    users: []
  },
  reducers: {
    fetchCurrentUser: (state, action) => {
      state.currentUser = action.payload.user
      state.fetchCurrentUserError = action.payload.error
      state.fetchingCurrentUser = false
      state.fetchedCurrentUser = true
    },
    createUser: (state, action) => {
      state.userToken = action.payload.token
      state.createUserError = action.payload.error
      state.creatingUser = false
      state.createdUser = false
    }
  }
});

export const { fetchCurrentUser, createUser } = userSlice.actions
export const selectCurrentUser = (state) => state.user.currentUser
export const selectFetchedCurrentUser = (state) => state.user.fetchedCurrentUser
export const selectUserToken = (state) => state.user.userToken
export default userSlice.reducer
