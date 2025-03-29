import { StatusPedido } from '@constants/statusConstants';
import { ProdutoPedido } from './Produto';
import { Sebo } from './Sebo';
import { Usuario } from './Usuario';

export interface Pedido {
  id: number;
  sebo: Sebo;
  usuario: Usuario;
  status: keyof typeof StatusPedido
  qtdProdutos: number;
  total: number;
  produtos: ProdutoPedido[];
  createdAt: string;
}

export interface PedidoList  {
  id: number;
  status: keyof typeof StatusPedido
  qtdProdutos: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  usuario: Usuario;
  sebo: Sebo;
}