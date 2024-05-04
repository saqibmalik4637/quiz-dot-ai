import { fetchQuestions, setQuestionsInitialState } from './questionSlice';
import { getRequest } from '../../config/apiRequest';

export const fetchQuestionsAction = ({quizId, query}) => async (dispatch) => {
  const res = await getRequest(`/api/v1/quizzes/${quizId}/questions`, {});
   
  if (res.status === 200) {
    dispatch(fetchQuestions({ questions: res.data.questions, error: '' }))
  } else {
    dispatch(fetchQuestions({ questions: [], error: 'Unable to fetch questions' }))
  }
}

export const setQuestionsInitialStateAction = () => async (dispatch) => {
  dispatch(setQuestionsInitialState());
}
