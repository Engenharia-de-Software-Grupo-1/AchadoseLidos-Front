import { Conta } from './Conta';
import { Endereco } from './Endereco';

export interface Sebo {
  id: number;
  conta: Conta;
  nome: string;
  cpfCnpj: string;
  telefone: string;
  biografia?: string;
  estanteVirtual?: string;
  instagram?: string;
  curadores?: string;
  historia?: string;
  fotoPerfil?: string;
  concordaVender: boolean;
  endereco: Endereco;
  fotos?: string[];
  mercadoLivre?: string;
  enjoei?: string;
  amazon?: string;
  horarioFuncionamento?: string,
}
