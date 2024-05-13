import { fetchQuestions, setQuestionsInitialState } from './questionSlice';
import { getRequestWithToken } from '../../config/apiRequest';

export const fetchQuestionsAction = ({quizId, query}) => async (dispatch) => {
  const res = await getRequestWithToken(`/api/v1/quizzes/${quizId}/questions`, {});
   
  if (res.status === 200) {
    dispatch(fetchQuestions({ questions: res.data.questions, error: '' }))
  } else {
    dispatch(fetchQuestions({ questions: [], error: 'Unable to fetch questions' }))
  }
}

export const setQuestionsInitialStateAction = () => async (dispatch) => {
  dispatch(setQuestionsInitialState());
}
