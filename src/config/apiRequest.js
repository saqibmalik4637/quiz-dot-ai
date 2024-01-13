import { axiosInstance } from './axiosInstance';

export const getRequest = (endpoint, params) => {
  return axiosInstance.get(`${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    params: params ?? {}
  })
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error.response
  })
}
