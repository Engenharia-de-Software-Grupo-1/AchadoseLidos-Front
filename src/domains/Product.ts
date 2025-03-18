import { Foto } from './Foto';

export interface Product {
    nomeProduto: string,
    preco: string,
    categoria: string,
    estoque: string,
    anoEdicao?: string,
    anoLancamento?: string,
    estado: string,
    autores?: string,
    descricao?: string,
    fotos?: Array<Foto>,
}