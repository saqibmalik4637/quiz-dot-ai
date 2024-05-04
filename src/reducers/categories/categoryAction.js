import { fetchCategories } from './categorySlice';
import { getRequest } from '../../config/apiRequest';

export const fetchCategoriesAction = (query) => async (dispatch) => {
  const res = await getRequest('/api/v1/categories', { query: query })
  if (res.status === 200) {
    dispatch(fetchCategories({ categories: res.data.categories, error: '' }))
  } else {
    dispatch(fetchCategories({ categories: [], error: 'Unable to fetch categories' }))
  }
}
