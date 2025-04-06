import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const getCesta = async () => {
  const response = await api.get('/cesta');
  return response;
};

export const addProductCesta = async (produtoId: number) => {
  const response = await api.post('/cesta/produtos', { produtoId: Number(produtoId) }, { withCredentials: true });
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
