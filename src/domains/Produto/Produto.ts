import { Foto } from '../Foto';
import { Sebo } from '../Sebo';
import { CategoriaProduto, EstadoConservacaoProduto, StatusProduto } from 'constants/ProdutoConstants';

export interface Produto {
    nome: string,
    status: keyof typeof StatusProduto,
    preco: number,
    categoria: keyof typeof CategoriaProduto,
    qtdEstoque: number,
    estadoConservacao: keyof typeof EstadoConservacaoProduto,
    anoEdicao?: number,
    anoLancamento?: number,
    autores?: string,
    descricao?: string,
    fotos?:  { url: string }[],
    createdAt: Date,
    updatedAt: Date,
    sebo?: Sebo,
    generos:  string[],
}
