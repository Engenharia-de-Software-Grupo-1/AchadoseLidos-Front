import axios from 'axios';
import { FilterOrders } from 'types/NavigationFilters';
import { Pedido, PedidoList } from '@domains/Pedido';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const getById = async (id: any) => {
  const response = await api.get<Pedido>(`/pedidos/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const createOrder = async (order: Pedido) => {
  const response = await api.post<Pedido>('/pedidos', order, {
    withCredentials: true,
  });
  return response.data;
};

export const updateOrder = async (data: any, id: any) => {
  const response = await api.put<Pedido>(`/pedidos/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const getAll = async (body: FilterOrders) => {
  const response = await api.get<PedidoList[]>('/pedidos', {
    params: {
      filters: JSON.stringify(body.filters),
    },
    withCredentials: true,
  });
  return response.data;
};
