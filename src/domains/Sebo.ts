import { Conta } from './Conta';
import { Endereco } from './Endereco';
import { Foto } from './Foto';

export interface Sebo {
  id?: number;
  conta: Conta;
  nome: string;
  cpfCnpj: string;
  telefone: string;
  biografia?: string;
  estanteVirtual?: string;
  instagram?: string;
  curadores?: string;
  historia?: string;
  fotoPerfil?: Foto;
  concordaVender: boolean;
  endereco: Endereco;
  fotos?: Foto[];
  mercadoLivre?: string;
  enjoei?: string;
  amazon?: string;
}
