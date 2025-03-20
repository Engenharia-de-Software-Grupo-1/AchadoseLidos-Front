export const StatusProduto = {
    ATIVO: 'ATIVO',
    EXCLUIDO: 'EXCLUIDO'
} as const;

export const CategoriaProduto = { 
    LIVRO: 'LIVRO',
    DISCO: 'DISCO',
    CD: 'CD',
    DVD: 'DVD',
    REVISTA: 'REVISTA',
    GIBI: 'GIBI',
} as const;

export const EstadoConservacaoProduto = {
    NOVO: 'NOVO',
    EXCELENTE: 'EXCELENTE',
    BOM: 'BOM',
    ACEITAVEL: 'ACEITAVEL',
    RUIM: 'RUIM',
} as const;