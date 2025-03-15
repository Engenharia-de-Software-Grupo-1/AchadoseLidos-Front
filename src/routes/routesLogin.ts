import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const login = async (data: any) => {
  const response = await api.post('/login', data);
  return response.data;
};