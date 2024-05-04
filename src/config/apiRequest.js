import axios from 'axios';
import { axiosInstance } from './axiosInstance';

export const getRequest = (endpoint, params = {}) => {
  return axiosInstance.get(`${endpoint}`, { params: params ?? {} })
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error.response
  })
}

export const postRequest = (endpoint, body = {}) => {
  return axiosInstance.post(`${endpoint}`, body)
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error.response
  })
}
