import { Foto } from '../Foto';
import { Sebo } from '../Sebo';
import { CategoriaProduto, EstadoConservacaoProduto, StatusProduto } from 'constants/ProdutoConstants';

export interface Produto {
    nome: string,
    status: keyof typeof StatusProduto,
    preco: number,
    categoria: keyof typeof CategoriaProduto,
    qtdEstoque: number,
    anoEdicao?: number,
    anoLancamento?: number,
    estadoConservacao: keyof typeof EstadoConservacaoProduto,
    autores?: string,
    descricao?: string,
    fotos?: Foto[],
    createdAt: Date,
    updatedAt: Date,
    sebo?: Sebo, //Esse campo não é opcional, verificar como ficaria no forms o Sebo após remover "?".
}
