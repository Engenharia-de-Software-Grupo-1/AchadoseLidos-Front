import { Produto } from '@domains/Produto/Produto';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const getById = async (id: number) => {
  const response = await api.get<Produto>(`/produtos/${id}`);
  return response.data;
};

export const createProduct = async (product: Produto) => {
  const response = await api.post<Produto>('/produtos', product, {
    withCredentials: true,
  });
  return response.data;
};

export const updateProduct = async (product: Produto, id: any) => {
  const response = await api.put<Produto>(`/produtos/${id}`, product, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteProduct = async (id: any) => {
  await api.delete(`/produtos/${id}`, {
    withCredentials: true,
  });
};