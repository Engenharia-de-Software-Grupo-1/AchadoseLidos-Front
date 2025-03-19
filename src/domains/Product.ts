import { Foto } from './Foto';

export interface Product {
    nome: string,
    preco: number,
    categoria: string,
    estoque: string,
    anoEdicao?: string,
    anoLancamento?: string,
    estado: string,
    autores?: string,
    descricao?: string,
    fotos?: Array<Foto>,
}