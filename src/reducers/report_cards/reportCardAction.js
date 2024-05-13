import { fetchReportCard, createReportCard, setCreateReportCardReportCardInitialState } from './reportCardSlice';
import { getRequestWithToken, postRequestWithToken } from '../../config/apiRequest';

export const fetchReportCardAction = (reportCardId) => async (dispatch) => {
  const res = await getRequestWithToken(`/api/v1/report_cards/${reportCardId}`, {});

  if (res.status === 200) {
    dispatch(createReportCard({ reportCard: res.data.report_card, error: '' }));
  } else {
    dispatch(createReportCard({ reportCard: {}, error: 'Unable to create report card' }));
  }
}

export const createReportCardAction = (payload) => async (dispatch) => {
  const res = await postRequestWithToken('/api/v1/report_cards', payload);

  if (res.status === 200) {
    dispatch(createReportCard({ reportCard: res.data.report_card, error: '' }));
  } else {
    dispatch(createReportCard({ reportCard: {}, error: 'Unable to create report card' }));
  }
}

export const createReportCardReportCardInitialStateAction = () => (dispatch) => {
  dispatch(setCreateReportCardReportCardInitialState());
}
