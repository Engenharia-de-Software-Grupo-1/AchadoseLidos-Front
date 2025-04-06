import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const getFavoritos = async () => {
  const response = await api.get('/favoritos');
  return response.data;
};

export const adicionarFavorito = async (productId: number, userId: number) => {
  return await api.post('/favoritos', { produtoId: Number(productId), usuarioId: Number(userId) });
};

export const removerFavorito = async (productId: number, userId: number) => {
  return await api.delete(`/favoritos/${productId}`, {
    data: { usuarioId_produtoId: { produtoId: productId, usuarioId: userId } },
  });
};
