import axios from 'axios';
import { BASE_URL } from './index';

export const loginTeacher = async (userId: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}teacher/login`, {
      userId,
      password,
    });

    return response;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
