import axios from 'axios';
import { axiosInstance, createAxiosInstanceWithToken } from './axiosInstance';

export const getRequest = (endpoint, params = {}) => {
  return axiosInstance.get(`${endpoint}`, { params: params ?? {} })
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error.response
  })
}

export const getRequestWithToken = async (endpoint, params = {}) => {
  try {
    const axiosInstanceWithToken = await createAxiosInstanceWithToken();

    const response = await axiosInstanceWithToken.get(`${endpoint}`, { params: params ?? {} });

    return response;
  } catch (error) {
    console.error("Error in getRequestWithToken:", error);
    return { error: 'Unable to fetch data' };
  }
};

export const postRequest = (endpoint, body = {}) => {
  return axiosInstance.post(`${endpoint}`, body)
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error.response
  })
}

export const postRequestWithToken = async (endpoint, body = {}) => {
  try {
    const axiosInstanceWithToken = await createAxiosInstanceWithToken();

    const response = await axiosInstanceWithToken.post(`${endpoint}`, body);

    return response;
  } catch (error) {
    console.error("Error in postRequestWithToken:", error);
    return { error: 'Unable to post data' };
  }
};