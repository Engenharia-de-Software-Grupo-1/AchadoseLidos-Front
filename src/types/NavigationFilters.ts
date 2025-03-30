export interface Filter {
  campo: string;
  operador: string;
  valor: string | string[] | number | boolean;
}

export interface Sorter {
  campo: string;
  ordem: string;
}

export interface FilterOrders {
  filters: Filter[];
  sorters: Sorter[];
}
