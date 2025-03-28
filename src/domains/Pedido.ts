import { ProdutoPedido } from './Produto/Produto';


export interface Pedido  {
  id: number;
  nome: string;
  produtos: ProdutoPedido[];
  createdAt:string;
}