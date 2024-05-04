import { fetchSuggestions } from './searchSlice';
import { getRequest } from '../../config/apiRequest';

export const fetchSuggestionsAction = (query) => async (dispatch) => {
  const res = await getRequest(`/api/v1/search/suggestions/${query}`, {})
  if (res.status === 200) {
    dispatch(fetchSuggestions({ suggestions: res.data.suggestions, error: '' }))
  } else {
    dispatch(fetchSuggestions({ suggestions: [], error: 'Unable to fetch suggestions' }))
  }
}

export const clearSuggestionsAction = () => (dispatch) => {
  dispatch(fetchSuggestions({ suggestions: [], error: '' }))
}
