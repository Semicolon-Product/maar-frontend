import axios from 'axios';
import { BASE_URL } from './index'; // Adjust the path if needed

interface ApiPayload {
  [key: string]: any;
}

export const getApi = async (endpoint: string, payload?: ApiPayload) => {
  try {
    const token = localStorage.getItem('token'); // Adjust key if your token key is different
    const url = `${BASE_URL}${endpoint}`;

    const response = await axios.get(url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    //console.log("res==",response)
    return response;
  } catch (error: any) {
    console.error('API GET Error:', error);
    throw error.response?.data || error;
  }
};
