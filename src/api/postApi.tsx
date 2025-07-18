import axios from 'axios';
import { BASE_URL } from './index';

interface ApiPayload {
  [key: string]: any;
}

export const postApi = async (
  endpoint: string,
  payload?: ApiPayload,
  requireAuth: boolean = true // Default: token is required
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

  
    const response = await axios.post(url, payload, { headers });
    return response;
 
};
