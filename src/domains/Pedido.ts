import { StatusPedido, StatusProdutoPedido } from '@constants/statusConstants';
import { Produto } from './Produto';
import { Sebo } from './Sebo';
import { Usuario } from './Usuario';

export interface Pedido {
  id?: number;
  sebo: {
    id: number;
    nome: string;
    concordaVender: boolean;
    telefone: string;
  };
  usuario: Usuario;
  status: keyof typeof StatusPedido;
  qtdProdutos: number;
  total: number;
  produtos: ProdutoPedido[];
  createdAt?: string;
}

export interface PedidoList {
  id: number;
  status: keyof typeof StatusPedido;
  qtdProdutos: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  usuario: Usuario;
  sebo: Sebo;
}

export interface ProdutoPedido {
  produto: Produto;
  quantidade: number;
  selected?: boolean;
  status: keyof typeof StatusProdutoPedido;
}
