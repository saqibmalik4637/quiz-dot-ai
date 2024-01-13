import { fetchCategories } from './categorySlice';
import { getRequest } from '../../config/apiRequest';

export const fetchCategoriesAction = () => (dispatch) => {
  getRequest('/api/v1/categories', {}).then((res) => {
    dispatch(fetchCategories(res));
  });
};
