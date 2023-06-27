import axios from 'axios';

export const BASE_URL = 'https://oversweet-admin.shop/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: (data) => {
    return JSON.parse(data).data;
  }
});

export default api;