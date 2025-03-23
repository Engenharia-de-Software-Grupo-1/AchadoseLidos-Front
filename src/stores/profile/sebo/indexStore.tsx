import { createContext, useContext, useState, ReactNode } from 'react';
import { getPerfilById } from '@routes/routesSebo';
import { useNotification } from '@contexts/notificationContext';
import { Sebo } from '@domains/Sebo';

interface ProfileSeboContextType {
  sebo: Sebo | null;
  initialize: (id: number) => void;
  loading: boolean;
}

const ProfileSeboContext = createContext<ProfileSeboContextType | null>(null);

export const useSebo = (): ProfileSeboContextType => {
  const context = useContext(ProfileSeboContext);
  if (!context) {
    throw new Error('useSebo must be used within a SeboProvider');
  }
  return context;
};

interface SeboProviderProps {
  children: ReactNode;
}

export const SeboProvider = ({ children }: SeboProviderProps) => {
  const { showNotification } = useNotification();
  const [sebo, setSebo] = useState<Sebo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initialize = async (id: number) => {
    setLoading(true); 
    try {
      const data = await getPerfilById(id);
      setSebo(data);
    } catch (error) {
      showNotification('error', null, 'Erro ao buscar perfil do sebo');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <ProfileSeboContext.Provider value={{ sebo, initialize, loading }}>
      {children}
    </ProfileSeboContext.Provider>
  );
};
