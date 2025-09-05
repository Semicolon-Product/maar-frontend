
import axios from 'axios';
//export const BASE_URL = "http://localhost:5000/api/";

export const BASE_URL = "https://api.makautstudents.help/api/";

interface ApiPayload {
    [key: string]: any;
}


export const getApi = async (endpoint: string) => {
    try {
        const token = localStorage.getItem('token'); // Adjust key if your token key is different
        const url = `${BASE_URL}${endpoint}`;

        const response = await axios.get(url, {
            //params: payload,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log("res== in get",response)
        return response.data;
    } catch (error: any) {
        console.error('API GET Error:', error);
        throw error.response?.data || error;
    }
};

export const postApi = async (
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

    const response = await axios.post(url, payload, { headers });

    if (response.data?.data?.token) {
        localStorage.setItem('token', response.data.data.token);
    }

    console.log("in postApi token:", response.data?.data?.token);
    console.log("in postApi response:", response);

    return response.data;
};
export const FileUpload = async (
    endpoint: string,
    payload?: ApiPayload,
    requireAuth: boolean = true
) => {
    const url = `${BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
        "Content-Type": "multipart/form-data",
    };

    if (requireAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const response = await axios.post(url, payload, { headers });
console.log("upload payload::",payload)
    if (response.data?.data?.token) {
        localStorage.setItem('token', response.data.data.token);
    }

    console.log("in postApi token:", response.data?.data?.token);
    console.log("in postApi response:", response);

    return response.data;
};




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


