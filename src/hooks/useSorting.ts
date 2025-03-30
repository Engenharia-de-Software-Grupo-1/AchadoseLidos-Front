import { useEffect, useState } from 'react';
import { Sorter } from 'types/NavigationFilters';

export const useSorting = (sorters: Sorter[]) => {
  const [nameIcon, setNameIcon] = useState('pi pi-sort-alpha-down');

  useEffect(() => {
    const order = sorters.find((item) => item.campo === 'nome');
    if (order) {
      order.ordem = order.ordem === 'ASC' ? 'DESC' : 'ASC';
    }
  }, [nameIcon]);

  const changeOrder = (field: string) => {
    if (field === 'nome') {
      setNameIcon((prev) => (prev === 'pi pi-sort-alpha-down' ? 'pi pi-sort-alpha-up' : 'pi pi-sort-alpha-down'));
    }
  };

  return { nameIcon, changeOrder };
};
