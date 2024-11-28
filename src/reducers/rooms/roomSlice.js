import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    creatingRoom: false,
    createdRoom: false,
    createRoomError: '',

    fetchingRoom: false,
    fetchedRoom: false,
    fetchRoomError: '',

    room: {},
    scoreboard: [],
  },

  reducers: {
    createRoom: (state, action) => {
      state.room = action.payload.room
      state.createRoomError = action.payload.error
      state.creatingRoom = false
      state.createdRoom = true
    },
    fetchRoom: (state, action) => {
      state.room = action.payload.room
      state.fetchRoomError = action.payload.error
      state.fetchingRoom = false
      state.fetchedRoom = true
    },
    joinRoom: (state, action) => {
      state.newUserJoined = action.payload.success
      state.room = action.payload.room
    },
    getScoreboard: (state, action) => {
      state.scoreboard = action.payload.scoreboard
    },
    setFetchRoomInitialState: (state, action) => {
      state.room = {}
      state.fetchRoomError = ''
      state.fetchingRoom = false
      state.fetchedRoom = false
    },
    setCreateRoomInitialState: (state, action) => {
      state.room = {}
      state.createRoomError = ''
      state.creatingRoom = false
      state.createdRoom = false
    }
  }
});

export const { createRoom,
               fetchRoom,
               joinRoom,
               setFetchRoomInitialState,
               setCreateRoomInitialState,
               getScoreboard } = roomSlice.actions

export const selectRoom = (state) => state.room
export default roomSlice.reducer
