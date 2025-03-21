import { Conta } from './Conta';

export interface User {
    id?: number;
    conta: Conta;
    nome: string;
    cpf: string;
    telefone: string;
    biografia?: string;
    instagram?: string;
    twitter?: string;
    skoob?: string;
    goodreads?: string;
    fotoPerfil?: string;
}