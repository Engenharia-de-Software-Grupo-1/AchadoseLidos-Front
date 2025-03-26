import { useState } from 'react';
import { Orders } from 'types/NavigationFilters';

export const useSorting = (orders: Orders[]) => {
  const [nameIcon, setNameIcon] = useState('pi pi-arrow-down');
  const [priceIcon, setPriceIcon] = useState('pi pi-arrow-down');
  const [dateIcon, setDateIcon] = useState('pi pi-arrow-up');

  const changeOrder = (field: string) => {
    if (field === 'name') {
      setNameIcon((prev) => (prev === 'pi pi-arrow-down' ? 'pi pi-arrow-up' : 'pi pi-arrow-down'));
    } else if (field === 'price') {
      setPriceIcon((prev) => (prev === 'pi pi-arrow-down' ? 'pi pi-arrow-up' : 'pi pi-arrow-down'));
    } else if (field === 'date') {
      setDateIcon((prev) => (prev === 'pi pi-arrow-down' ? 'pi pi-arrow-up' : 'pi pi-arrow-down'));
    }

    orders.forEach((item) => {
      if (item.field === field) {
        item.order = item.order === 'ASC' ? 'DESC' : 'ASC';
      }
    });
  };

  return { nameIcon, priceIcon, dateIcon, changeOrder };
};
