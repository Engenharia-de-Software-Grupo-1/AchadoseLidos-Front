import { GenericCardProps } from '@components/GenericCard/genericCard';
import { NavigationPageProps } from '@pages/navigation';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const registerSebo = async (data: any) => {
  const response = await api.post('/sebos', data);
  return response.data;
};

export const getAllSebos = async (body: NavigationPageProps) => {
  const response = await api.get<GenericCardProps[]>('/sebos', {
    params: body,
  });
  return response.data;
};