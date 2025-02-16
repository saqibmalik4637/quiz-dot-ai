import { fetchCategories } from './categorySlice';
import { getRequestWithToken } from '../../config/apiRequest';

export const fetchCategoriesAction = ({carouselId, query}) => async (dispatch) => {
  let res

  if (carouselId) {
    res = await getRequestWithToken('/api/v1/categories', { carousel_id: carouselId })
  } else if (query) {
    res = await getRequestWithToken('/api/v1/categories', { query: query })
  }

  if (res.status === 200) {
    dispatch(fetchCategories({ categories: res.data.categories, error: '' }))
  } else {
    dispatch(fetchCategories({ categories: [], error: 'Unable to fetch categories' }))
  }
}
