import { Sebo } from './Sebo';
import { Usuario } from './Usuario';

export interface Conta {
  id?: number;
  email: string;
  senha: string;
  confirmaSenha: string;
  tipo: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Conta {
  id?: number;
  tipo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  sebo?: Sebo;
  usuario?: Usuario;
}