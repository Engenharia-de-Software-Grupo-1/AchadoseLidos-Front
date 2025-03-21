import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
  withCredentials: true
  
});

export const login = async (data: any) => {
  const response = await api.post('/contas/login', data);
  return response;
};

export const logout = async () => {
  const response = await api.post('/contas/logout');
  return response;
};

export const informacoes = async () => {
  const response = await api.get('/contas/perfil');
  return response;
};
