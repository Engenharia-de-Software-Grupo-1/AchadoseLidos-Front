export interface Cesta {
  sebo: {
    id: number;
    nome: string;
    concordaVender:boolean;
  };
  produtos: ProdutoCesta[];
}

export interface ProdutoCesta {
  quantidade: number;
  produto: {
    id: number;
    fotos: {url:string}[]; 
    nome: string;
    categoria: string;
    preco: number;
    qtdEstoque: number;
  };
}

export type CestaResponse = Cesta[];