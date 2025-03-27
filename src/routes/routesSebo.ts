import { Sebo } from '@domains/Sebo';
import axios from 'axios';
import { FilterOrders } from 'types/NavigationFilters';

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

export const getAll = async (): Promise<Sebo[]> => {
  const response = await api.get<Sebo[]>('/sebos', {
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

export const getAllSebosByFilterAndOrders = async (body: FilterOrders) => {
  const response = await api.get<Sebo[]>('/sebos', {
    params: body,
  });
  return response.data;
};