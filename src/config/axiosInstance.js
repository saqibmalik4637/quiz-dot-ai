import axios from 'axios';
import { getToken } from './token';

const BASE_URL = 'https://952e-2401-4900-1c5b-24f-23c7-5319-f9e5-652d.ngrok-free.app'
const HEADERS = { "Content-Type": "application/json", "accept": "application/json" }

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS
});

export const createAxiosInstanceWithToken = async () => {
  try {
    const token = await getToken();

    const axiosInstanceWithToken = axios.create({
      baseURL: BASE_URL,
      headers: Object.assign({}, HEADERS, { token })
    });

    return axiosInstanceWithToken;
  } catch (error) {
    console.error("Error creating axios instance with token:", error);
    throw error;
  }
};
