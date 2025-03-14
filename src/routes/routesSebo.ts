import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const registerSebo = async (data: any) => {
  const response = await api.post('/sebos', data);
  return response.data;
};
