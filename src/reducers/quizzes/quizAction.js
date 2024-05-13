import {
  fetchQuizzes,
  markFavorited,
  markFavoritedInitialState,
  unmarkFavorited,
  unmarkFavoritedInitialState,
  markPlayed
} from './quizSlice';
import { getRequestWithToken, postRequestWithToken } from '../../config/apiRequest';

export const fetchQuizzesAction = ({categoryId, query}) => async (dispatch) => {
  let res
  if (categoryId) {
    res = await getRequestWithToken(`/api/v1/categories/${categoryId}/quizzes`, {});
  } else {
    res = await getRequestWithToken(`/api/v1/quizzes`, { query: query });
  }
  if (res.status === 200) {
    dispatch(fetchQuizzes({ quizzes: res.data.quizzes, error: '' }))
  } else {
    dispatch(fetchQuizzes({ quizzes: [], error: 'Unable to fetch quizzes' }))
  }
}

export const markFavoritedInitialStateAction = () => async (dispatch) => {
  dispatch(markFavoritedInitialState());
}

export const unmarkFavoritedInitialStateAction = () => async (dispatch) => {
  dispatch(unmarkFavoritedInitialState());
}

export const markFavoritedAction = ({quizId}) => async (dispatch) => {
  const res = await postRequestWithToken(`/api/v1/quizzes/${quizId}/mark_favorited`, {});

  if (res.status === 200) {
    dispatch(markFavorited({ quiz: res.data.quiz, error: '' }));
  } else {
    dispatch(markFavorited({ error: 'Unable to mark favorite quiz' }));
  }
}

export const unmarkFavoritedAction = ({quizId}) => async (dispatch) => {
  const res = await postRequestWithToken(`/api/v1/quizzes/${quizId}/unmark_favorited`, {});

  if (res.status === 200) {
    dispatch(unmarkFavorited({ quiz: res.data.quiz, error: '' }));
  } else {
    dispatch(unmarkFavorited({ error: 'Unable to unmark favorite quiz' }));
  }
}

export const markPlayedAction = ({quizId}) => async (dispatch) => {
  const res = await postRequestWithToken(`/api/v1/quizzes/${quizId}/mark_played`, {});

  if (res.status === 200) {
    dispatch(markPlayed({ quiz: res.data.quiz, error: '' }));
  } else {
    dispatch(markPlayed({ error: 'Unable to mark played quiz' }));
  }
}
