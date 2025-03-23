import { ProductCardProps } from '@components/ProductCard/productCard';
import { Produto } from '@domains/Produto/Produto';
import { NavigationPageProps } from '@pages/navigation';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const getById = async (id: number) => {
  const response = await api.get<Produto>(`/produtos/${id}`);
  return response.data;
};

export const getAll = async (body: NavigationPageProps) => {
  const response = await api.get<ProductCardProps[]>('/produtos', {
    params: body,
  });
  return response.data;
};
