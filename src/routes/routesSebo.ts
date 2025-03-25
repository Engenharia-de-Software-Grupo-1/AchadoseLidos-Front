import { GenericCardProps } from '@components/GenericCard/genericCard';
import { NavigationPageProps } from '@pages/navigation';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const createSebo = async (data: any) => {
  const response = await api.post('/sebos', data);
  return response.data;
};

export const getPerfilById = async (id: any) => {
  const response = await api.get(`/sebos/perfil/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const getById = async (id: any) => {
  const response = await api.get(`/sebos/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const getAll = async () => {
  const response = await api.get('/sebos', {
    withCredentials: true,
  });
  return response.data;
};

export const updateUser = async (data: any, id: any) => {
  const response = await api.put(`/sebos/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteUser = async (id: any) => {
  const response = await api.delete(`/sebos/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const getAllSebos = async (body: NavigationPageProps) => {
  const response = await api.get<GenericCardProps[]>('/sebos', {
    params: body,
  });
  return response.data;
};