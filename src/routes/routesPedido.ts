import axios from 'axios';
import { FilterOrders } from '@types/NavigationFilters';
import { Pedido, PedidoList } from '@domains/Pedido';
  
const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const getById = async (id: any) => {
  const response = await api.get<Pedido>(`/pedidos/${id}`);
  return response.data;
};

export const createProduct = async (order: Pedido) => {
  const response = await api.post<Pedido>('/pedidos', order, {
    withCredentials: true,
  });
  return response.data;
};

export const updateProductStatus = async (status: string, id: any) => {
  const response = await api.put<Pedido>(`/pedidos/${id}`, status, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteProduct = async (id: any) => {
  await api.delete(`/pedidos/${id}`, {
    withCredentials: true,
  });
};

export const getAllPedidosById = async (body: FilterOrders, id: number) => {
  const response = await api.get<PedidoList[]>(`/pedidos/${id}`, {
    params: {
      filters: JSON.stringify(body.filters),
    }
  });
  return response.data;
};