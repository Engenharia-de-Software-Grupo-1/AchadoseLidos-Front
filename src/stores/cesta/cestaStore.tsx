import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { useNotification } from '@contexts/notificationContext';
import { CestaResponse } from '@domains/Cesta';
import { getCesta } from '@routes/routesCesta';

interface CestaContextType {
    cestas: CestaResponse | null;
    initialize: () => void;
    loading: boolean;
}

const CestaContext = createContext<CestaContextType | null>(null);

export const useCesta = (): CestaContextType => {
  const context = useContext(CestaContext);
  if (!context) {
    throw new Error('useCesta must be used within a CestaProvider');
  }
  return context;
};

interface CestaProviderProps {
  children: ReactNode;
}

export const CestaProvider = ({ children }: CestaProviderProps) => {
    const { showNotification } = useNotification();
    const [cestas, setCestas] = useState<CestaResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    const initialize = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getCesta();
            if (response.status == 200) {
                setCestas(response.data);
            }

        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message || 'Erro no servidor.';
                showNotification('error', null, errorMessage);
            } else if (error.request) {
                showNotification('error', null, 'Sem resposta do servidor. Verifique sua conexão.');
            } else {
                showNotification('error', null, 'Algo deu errado. Tente novamente mais tarde.');
            }
        } finally {
            setLoading(false);
        }
    }, []);


  return <CestaContext.Provider value={{cestas, loading, initialize}}>{children}</CestaContext.Provider>;
};
