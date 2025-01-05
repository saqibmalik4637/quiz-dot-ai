import {
  fetchUserInterests,
  createUserInterest,
  initialStateCreateUserInterest
} from './userInterestsSlice';
import { postRequestWithToken } from '../../config/apiRequest';

export const createUserInterestAction = (interests_ids) => async (dispatch) => {
  const res = await postRequestWithToken(`/api/v1/user_interests`, {interests_ids: interests_ids});
   
  if (res.status === 200) {
    dispatch(createUserInterest({error: '', status: true }));
  } else {
    dispatch(createUserInterest({error: 'Unable to create user interest' }))
  }
}

export const setInitialStateCreateUserInterest = () => async (dispatch) => {
  dispatch(initialStateCreateUserInterest());
}
