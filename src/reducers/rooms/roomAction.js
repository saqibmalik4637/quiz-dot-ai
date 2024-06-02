import { createRoom, fetchRoom, joinRoom, setFetchRoomInitialState, setCreateRoomInitialState } from './roomSlice';
import { getRequestWithToken, postRequestWithToken } from '../../config/apiRequest';

export const fetchRoomAction = (roomId) => async (dispatch) => {
  const res = await getRequestWithToken(`/api/v1/rooms/${roomId}`, {});

  if (res.status === 200) {
    dispatch(fetchRoom({ room: res.data.room, error: '' }));
  } else {
    dispatch(fetchRoom({ room: {}, error: 'Unable to fetch room' }));
  }
}

export const createRoomAction = (payload) => async (dispatch) => {
  const res = await postRequestWithToken('/api/v1/rooms', payload);

  if (res.status === 200) {
    dispatch(createRoom({ room: res.data.room, error: '' }));
  } else {
    dispatch(createRoom({ room: {}, error: 'Unable to create room' }));
  }
}

export const joinRoomAction = (joiningCode) => async (dispatch) => {
  const res = await postRequestWithToken(`/api/v1/rooms/${joiningCode}/join`, {});

  if (res.status === 200) {
    dispatch(joinRoom({ success: true, room: res.data.room }))
  } else {
    dispatch(joinRoom({ success: false, room: {} }))
  }
}

export const setFetchRoomInitialStateAction = () => (dispatch) => {
  dispatch(setFetchRoomInitialState());
}

export const setCreateRoomInitialStateAction = () => (dispatch) => {
  dispatch(setCreateRoomInitialState());
}
