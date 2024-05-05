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
    // Wait for the axios instance with token to be created
    const axiosInstanceWithToken = await createAxiosInstanceWithToken();

    // Make the GET request with token
    const response = await axiosInstanceWithToken.get(`${endpoint}`, { params: params ?? {} });
    
    // Return the response data
    return response;
  } catch (error) {
    // Handle any errors
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

export const postRequestWithToken = (endpoint, body = {}) => {
  return axiosInstanceWithToken.post(`${endpoint}`, body)
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error.response
  })
}
