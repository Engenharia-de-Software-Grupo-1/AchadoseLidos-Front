import { ProdutoPedido } from './Produto';


export interface Pedido  {
  id: number;
  nome: string;
  produtos: ProdutoPedido[];
  createdAt:string;
}