import { useRegisterSebo } from '@stores/register/sebo/store';
import { useEffect } from 'react';

export const useLoadCities = (uf: string) => {
  const { loadCitiesByState } = useRegisterSebo();

  useEffect(() => {
    if (uf) {
      loadCitiesByState(uf);
    }
  }, [uf, loadCitiesByState]);
};
