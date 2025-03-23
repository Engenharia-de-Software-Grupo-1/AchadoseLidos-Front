import { useRegisterSebo } from '@stores/register/sebo/registerStore';
import { useEffect, useRef } from 'react';

export const useLoadCities = (uf: string) => {
  const { loadCitiesByState } = useRegisterSebo();
  const lastUf = useRef<string | null>(null);

  useEffect(() => {
    if (uf && lastUf.current !== uf) {
      lastUf.current = uf;
      loadCitiesByState(uf);
    }
  }, [uf, loadCitiesByState]);
};
