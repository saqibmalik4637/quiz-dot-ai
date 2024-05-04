import { fetchQuizzes } from './quizSlice';
import { getRequest } from '../../config/apiRequest';

export const fetchQuizzesAction = ({categoryId, query}) => async (dispatch) => {
  let res
  if (categoryId) {
    res = await getRequest(`/api/v1/categories/${categoryId}/quizzes`, {});
  } else {
    res = await getRequest(`/api/v1/quizzes`, { query: query });
  }
  if (res.status === 200) {
    dispatch(fetchQuizzes({ quizzes: res.data.quizzes, error: '' }))
  } else {
    dispatch(fetchQuizzes({ quizzes: [], error: 'Unable to fetch quizzes' }))
  }
}
