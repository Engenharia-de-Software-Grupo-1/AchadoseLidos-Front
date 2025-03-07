import { Endereco } from './Endereco';

export interface Sebo {
  id?: number;
  nomeSebo: string;
  cpfCnpj: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  whatsapp: string;
  concordaVenda: boolean;
  endereco: Endereco;
  biografia: string;
  instagram: string;
  estanteVirtual: string;
  curadores: string;
}
