import { create } from 'zustand';
import { Filter } from 'types/NavigationFilters';

interface FilterState {
  name: string;
  genre: string[];
  firstPrice: number | null;
  secondPrice: number | null;
  selectedCategories: string[];
  estadoConservacao: string[];
  seboId: string | null;
  filters: Filter[];
  setName: (name: string) => void;
  setGenre: (genre: string[]) => void;
  setFirstPrice: (price: number | null) => void;
  setSecondPrice: (price: number | null) => void;
  setSelectedCategories: (categories: string[]) => void;
  setEstadoConservacao: (estado: string[]) => void;
  setSeboId: (seboId: number | null) => void;
  applyFilters: () => void;
}

export const useProductFilterStore = create<FilterState>((set, get) => ({
  name: '',
  genre: [],
  firstPrice: null,
  secondPrice: null,
  selectedCategories: [],
  estadoConservacao: [],
  seboId: null,
  filters: [],

  setName: (name) => set({ name }),
  setGenre: (genre) => set({ genre }),
  setFirstPrice: (firstPrice) => set({ firstPrice }),
  setSecondPrice: (secondPrice) => set({ secondPrice }),
  setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
  setEstadoConservacao: (estadoConservacao) => set({ estadoConservacao }),
  setSeboId: (seboId) => set({ seboId: seboId ? seboId.toString() : null }),

  applyFilters: () => {
    const { name, genre, firstPrice, secondPrice, selectedCategories, estadoConservacao, seboId } = get();
    const filters: Filter[] = [];

    if (name) filters.push({ campo: 'nome', operador: 'like', valor: name });
    if (genre.length > 0) filters.push({ campo: 'generos', operador: 'hasSome', valor: genre });
    if (firstPrice && firstPrice != 0) filters.push({ campo: 'preco', operador: '>=', valor: firstPrice });
    if (secondPrice && secondPrice != 0) filters.push({ campo: 'preco', operador: '<=', valor: secondPrice });
    if (selectedCategories.length > 0) filters.push({ campo: 'categoria', operador: 'in', valor: selectedCategories });
    if (estadoConservacao.length > 0)
      filters.push({ campo: 'estadoConservacao', operador: 'in', valor: estadoConservacao });
    if (seboId && !isNaN(Number(seboId))) filters.push({ campo: 'seboId', operador: '=', valor: Number(seboId) });

    set({ filters });
  },
}));
