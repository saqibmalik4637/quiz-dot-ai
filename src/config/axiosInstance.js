import axios from 'axios';
import { getToken } from './token';

const BASE_URL = 'https://0ae8-2401-4900-5d9e-733f-14b6-8a67-20c7-5d8c.ngrok-free.app';

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
