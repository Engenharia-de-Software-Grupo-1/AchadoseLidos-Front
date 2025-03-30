import { useRegisterSebo } from '@stores/register/sebo/registerStore';
import { useEffect } from 'react';

export const useLoadCities = () => {
  const { loadCitiesByState } = useRegisterSebo();

  useEffect(() => {
    loadCitiesByState();
  }, [loadCitiesByState]);
};
