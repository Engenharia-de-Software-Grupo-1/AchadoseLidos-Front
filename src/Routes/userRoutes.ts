import axios from 'axios';
 
 const api = axios.create({
   baseURL: 'http://localhost:3333/api',
 });
 
 export const registerUser = async (data: any) => {
   const response = await api.post('/usuarios', data);
   return response.data;
 };