import { fetchCurrentUser, createUser } from './userSlice';
import { getRequest, postRequest } from '../../config/apiRequest';

export const fetchCurrentUserAction = () => async (dispatch) => {
  const res = await getRequest(`/api/v1/me`, {});

  if (res.status === 200) {
    dispatch(fetchCurrentUser({ user: res.data.user, error: '' }))
  } else {
    dispatch(fetchCurrentUser({ user: null, error: 'Unable to fetch current user' }))
  }
}

export const createUserAction = (body) => async (dispatch) => {
  const res = await postRequest('/api/v1/users', body);

  if (res.status === 200) {
    dispatch(createUser({ token: res.data.token, error: '' }));
  } else {
    dispatch(createUser({ token: null, error: 'Unable to create user' }));
  }
}
