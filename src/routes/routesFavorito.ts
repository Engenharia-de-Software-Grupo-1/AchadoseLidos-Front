import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333/api',
    withCredentials: true
});

export const getFavoritos = async () => {
    return await api.get('/favorito/getAllForUser');
  };
  
export const adicionarFavorito = async (productId: number) => {
  return await api.post('/favoritos', { produtoId: Number(productId)}, { withCredentials: true });
};

export const removerFavorito = async (productId: number) => {
  return await api.delete('/favorito/delete', { data: { productId } });
};