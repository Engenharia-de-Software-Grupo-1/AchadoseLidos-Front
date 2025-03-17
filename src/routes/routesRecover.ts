import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const recuperar_senha = async (data: any) => {
  const response = await api.post('/contas/recuperar_senha/', data);
  return response;
};

export const atualizar_senha = async (data: any) => {
  const response = await api.put('/contas/atualizar_senha/', data);
  return response;
};