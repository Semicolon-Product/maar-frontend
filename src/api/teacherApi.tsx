import axios from 'axios';
import { BASE_URL } from './index';
import { getApi } from './getApi';

export const loginTeacher = async (userId: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}teacher/login`, {
      userId,
      password,
    });
    //console.log("res of login",response.data.token)
    
    localStorage.setItem('token', response.data.token)
    return response;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getTeacherDetailsFromApi = async () => {
  const res = await getApi('teacher/getTeacherDetails');
  return res;
}