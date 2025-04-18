import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const login = async (data: any) => {
  const response = await api.post('/contas/login', data);
  return response;
};

export const logout = async () => {
  const response = await api.post('/contas/logout');
  return response;
};

export const perfil = async () => {
  const response = await api.get('/contas/perfil');
  return response;
};

export const validarEmail = async (email: string) => {
  const response = await api.get('/contas/validar_email', {
    params: { email },
  });
  return response;
};
