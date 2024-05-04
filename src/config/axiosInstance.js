import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://3b2f-2401-4900-1f39-5179-59ab-5099-efd9-3a0d.ngrok-free.app',
  headers: { "Content-Type": "application/json", "accept": "application/json" }
});
