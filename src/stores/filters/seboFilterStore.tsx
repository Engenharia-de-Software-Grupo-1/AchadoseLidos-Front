import { create } from 'zustand';
import { Filter } from '@types/NavigationFilters';

interface SeboFilterState {
  nome: string;
  endereco: string[];
  concordaVender: boolean;
  filters: Filter[];
  setNome: (nome: string) => void;
  setEndereco: (endereco: string[]) => void;
  setConcordaVender: (concordaVender: boolean) => void;
  applyFilters: () => void;
}

export const useSeboFilterStore = create<SeboFilterState>((set, get) => ({
  nome: '',
  endereco: [],
  concordaVender: false,
  filters: [],

  setNome: (nome) => set({ nome }),
  setEndereco: (endereco: string[]) => set({ endereco }),
  setConcordaVender: (concordaVender: boolean) => set({ concordaVender }),

  applyFilters: () => {
    const { nome, endereco, concordaVender } = get();
    const filters: Filter[] = [];

    if (nome) filters.push({ campo: 'nome', operador: 'like', valor: nome });
    if (endereco.length > 0) filters.push({ campo: 'bairro', operador: 'in', valor: endereco });
    if (concordaVender) filters.push({ campo: 'concordaVender', operador: '==', valor: true });

    set({ filters });
  },
}));
