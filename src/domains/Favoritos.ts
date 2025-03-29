export interface Favorito {
    sebo: {
        id: number;
        nome: string;
    };
    produtos: ProdutoFavorito[];
}

export interface ProdutoFavorito {
    produto: {
        id: number;
        nome: string;
        preco: number;
        fotos: string[];
        sebo: {
            id: number;
            nome: string;
        };
    };
}

