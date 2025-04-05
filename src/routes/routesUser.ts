import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const registerUser = async (data: any) => {
  const response = await api.post('/usuarios', data);
  return response.data;
};

export const getOthersUsersById = async (id: any) => {
  const response = await api.get(`/usuarios/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const getById = async (id: any) => {
  const response = await api.get(`/usuarios/perfil/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const updateUser = async (data: any, id: any) => {
  const response = await api.put(`/usuarios/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteUser = async (id: any) => {
  const response = await api.delete(`/usuarios/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
