import { Sebo } from './Sebo';
import { CategoriaProduto, EstadoConservacaoProduto } from '@constants/categoriaConstants';
import { StatusProduto } from '@constants/statusConstants';

export interface Produto {
  id: number;
  nome: string;
  status: keyof typeof StatusProduto;
  preco: number;
  categoria: keyof typeof CategoriaProduto;
  qtdEstoque: number;
  estadoConservacao: keyof typeof EstadoConservacaoProduto;
  anoEdicao?: number;
  anoLancamento?: number;
  autores?: string;
  descricao?: string;
  fotos?: { url: string }[];
  createdAt?: Date;
  updatedAt?: Date;
  sebo?: Sebo;
  generos: string[];
}

export interface ProdutoPedido {
  produto: Produto;
  quantidade: number;
  selected?: boolean;
  status: number;
}
