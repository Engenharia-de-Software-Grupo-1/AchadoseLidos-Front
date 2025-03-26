import axios from 'axios';
import { Produto } from '@domains/Produto/Produto';
import { FilterOrders } from 'types/NavigationFilters';
import { ProductCardProps } from '@components/ProductCard/productCard';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const getById = async (id: number) => {
  const response = await api.get<Produto>(`/produtos/${id}`);
  return response.data;
};

export const getAllProducts = async () => {
  const response = await api.get<ProductCardProps[]>('/produtos');
  return response.data;
};

export const getProductsByFiltersAndOrders = async (body: FilterOrders) => {
  const response = await api.get<ProductCardProps[]>('/produtos/filters/orders', {
    params: body,
  });
  return response.data;
};

export const getProductsBySeboId = async (id: number) => {
  const response = await api.get<ProductCardProps[]>(`/produtos/sebo/${id}`);
  return response.data;
};
