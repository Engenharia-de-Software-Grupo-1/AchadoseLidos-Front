import { create } from 'zustand';
import { Filter } from 'types/NavigationFilters';

interface SeboFilterState {
  name: string;
  location: string;
  filters: Filter[];
  setName: (name: string) => void;
  setLocation: (location: string) => void;
  applyFilters: () => void;
}

export const useSeboFilterStore = create<SeboFilterState>((set, get) => ({
  name: '',
  location: '',
  filters: [],

  setName: (name) => set({ name }),
  setLocation: (location) => set({ location }),

  applyFilters: () => {
    const { name, location } = get();
    const filters: Filter[] = [];

    if (name) filters.push({ campo: 'nome', operador: 'like', valor: name });
    if (location) filters.push({ campo: 'bairro', operador: 'like', valor: location });

    set({ filters });
  },
}));
