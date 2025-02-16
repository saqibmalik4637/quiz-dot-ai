import { fetchQuestions, setQuestionsInitialState } from './questionSlice';
import { getRequestWithToken } from '../../config/apiRequest';

export const fetchQuestionsAction = ({quizId, query, limit}) => async (dispatch) => {
  console.log("LIMIT", limit);
  const res = await getRequestWithToken(`/api/v1/quizzes/${quizId}/questions`, { limit: limit });
   
  if (res.status === 200) {
    dispatch(fetchQuestions({ questions: res.data.questions, error: '' }))
  } else {
    dispatch(fetchQuestions({ questions: [], error: 'Unable to fetch questions' }))
  }
}

export const setQuestionsInitialStateAction = () => async (dispatch) => {
  dispatch(setQuestionsInitialState());
}
