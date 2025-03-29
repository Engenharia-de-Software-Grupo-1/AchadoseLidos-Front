import { Produto } from '@domains/Produto';
import axios from 'axios';
import { FilterOrders } from '@types/NavigationFilters';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const getById = async (id: any) => {
  const response = await api.get<Produto>(`/produtos/${id}`);
  return response.data;
};

export const getAllProducts = async (body: FilterOrders) => {
  const response = await api.get<Produto[]>('/produtos', {
    params: {
      filters: JSON.stringify(body.filters),
      sorters: JSON.stringify(body.sorters),
    },
  });
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
