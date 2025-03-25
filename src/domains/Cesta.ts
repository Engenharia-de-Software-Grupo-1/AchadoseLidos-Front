export interface Cesta {
  sebo: {
    id: number;
    nome: string;
  };
  produtos: ProdutoCesta[];
}

export interface ProdutoCesta {
  quantidade: number;
  produto: {
    id: number;
    fotos: string[]; 
    nome: string;
    categoria: string;
    preco: number;
    qtdEstoque: number;
  };
}



export type CestaResponse = Cesta[];