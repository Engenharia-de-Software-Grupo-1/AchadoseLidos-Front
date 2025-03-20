import { Produto } from '@domains/Produto/Produto';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const getById = async (id: number) => {
  const response = await api.get<Produto>(`/produtos/${id}`);
  return response.data;
};
