// api/deleteApi.ts
import axios from 'axios';
import { BASE_URL } from './index';

interface ApiPayload {
  [key: string]: any;
}

export const deleteApi = async (
  endpoint: string,
  payload?: ApiPayload,
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
    const response = await axios.delete(url, {
      headers,
      data: payload, // ✅ Correct way to send payload in DELETE
    });
    return response.data;
  } catch (error: any) {
    console.error('DELETE API Error:', error);
    throw error.response?.data || error;
  }
};
