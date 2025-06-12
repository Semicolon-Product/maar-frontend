
import type { SuperAdminLoginForm, SuperAdminSignupApiPayload, TeacherCreatePayload } from '@/components/types/superadminType';
import { postApi } from './postApi';

export const superAdminSignup = async (data: SuperAdminSignupApiPayload) => {
  try {
    const response = await postApi('superadmin/signup', data, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const superAdminLogin = async (data:SuperAdminLoginForm)=>{
    try {
    const response = await postApi('superadmin/signin', data, false); 
    localStorage.setItem('token', response.token);
    return response;
  } catch (error) {
    throw error;
  }
}

export const createTeacher = async(data:TeacherCreatePayload)=>{
    const payload ={
        teacher_name : data.name,
        department : data.dept,
        user_id:data.userId,
        password:data.password,
    }
    try {
    const response = await postApi('superadmin/createTeacher', payload, true); 
    
    return response;
  } catch (error) {
    throw error;
  }
}