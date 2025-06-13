
import type { SuperAdminLoginForm, SuperAdminSignupApiPayload, TeacherCreatePayload } from '@/components/types/superadminType';
import { postApi } from './postApi';
import { getApi } from './getApi';
import { deleteApi } from './deleteApi';
import { putApi } from './putApi';

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
    console.log("in api ",response)
    return response;
  } catch (error) {
    throw error;
  }
}
export const getAllTeacher = async()=>{
  const response = await getApi('superadmin/getAllTeachers');
  return response.data;
}


export const deleteTeacherById = async (id: number) => {
  const response = await deleteApi(`superadmin/deleteTeacher/${id}`);
  return response;
};


export const updateTeacherById = async (id: number | string, payload: any) => {
  const endpoint = `/superadmin/updateTeacher/${id}`;
  return await putApi(endpoint, payload);
};