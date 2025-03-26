import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
  withCredentials: true
});

export const getCesta = async () => {
  const response = await api.get('/cesta');
  return response;
};

export const updateProductQuantCesta = async (produtoId: number, data: any) => {
  const response = await api.put(`/cesta/produtos/${produtoId}`, data);
  return response;
};

export const removeProductCesta = async (produtoId: number) => {
  const response = await api.delete(`/cesta/produtos/${produtoId}`);
  return response;
};


