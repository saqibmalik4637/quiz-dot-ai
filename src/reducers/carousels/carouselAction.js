import { fetchCarousels } from './carouselSlice';
import { getRequest } from '../../config/apiRequest';

export const fetchCarouselsAction = () => async (dispatch) => {
  const res = await getRequest('/api/v1/carousels', {})
  if (res.status === 200) {
    dispatch(fetchCarousels({ carousels: res.data.carousels, error: '' }))
  } else {
    dispatch(fetchCarousels({ carousels: [], error: 'Unable to fetch carousels' }))
  }
}
