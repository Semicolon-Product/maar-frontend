// utils/api/putApi.ts or services/putApi.ts

import axios from 'axios';
import { BASE_URL } from './index';

interface ApiPayload {
  [key: string]: any;
}

export const putApi = async (
  endpoint: string,
  payload: ApiPayload,
  requireAuth: boolean = true
) => {
  const url = `${BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (requireAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const response = await axios.put(url, payload, { headers });
    return response;
  } catch (error: any) {
    console.error('PUT API Error:', error);
    throw error.response?.data || error;
  }
};
