import { fetchInterests, setInterestsInitialState } from './interestsSlice';
import { getRequest } from '../../config/apiRequest';

export const fetchInterestsAction = () => async (dispatch) => {
  const res = await getRequest('/api/v1/interests');
   
  if (res.status === 200) {
    dispatch(fetchInterests({ interests: res.data.interests, error: '' }))
  } else {
    dispatch(fetchInterests({ interests: [], error: 'Unable to fetch interests' }))
  }
}

export const setInterestsInitialStateAction = () => async (dispatch) => {
  dispatch(setInterestsInitialState());
}
