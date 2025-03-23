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
