import { Conta } from '@domains/Conta';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { logout, perfil } from 'routes/routesAuth';
import { useNotification } from './notificationContext';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  isAuthenticated: boolean;
  conta: Conta | null;
  auth_login: (conta: Conta) => void;
  auth_logout: () => void;
  validateAuth: () => Promise<void>;
  handleLogout: () => Promise<void>;
  authChecked: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [conta, setConta] = useState<Conta | null>(null);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  const auth_login = useCallback((conta: Conta) => {
    setIsAuthenticated(true);
    setConta(conta);
    localStorage.setItem('auth', JSON.stringify(conta));
  }, []);

  const auth_logout = useCallback(() => {
    setIsAuthenticated(false);
    setConta(null);
    localStorage.removeItem('auth');

  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const response = await logout();
      if (response.status == 200) {
        showNotification('success', null, 'Logout realizado com sucesso!');
      } else {
        showNotification('error', null, 'Logout falhou');
      }

      auth_logout();
      navigate('/');
    } catch (err: any) {
      showNotification('error', null, err);
    }
  }, []);

  const validateAuth = useCallback(async () => {
    try {
      const response = await perfil();
      if (response.data.autenticado) {
        auth_login(response.data.conta);
      } else {
        auth_logout();
      }
    } catch (err) {
      auth_logout();
    } finally {
      setAuthChecked(true);
    }
  }, [auth_login, auth_logout]);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      auth_login(JSON.parse(storedAuth));
    }
    validateAuth();
  }, [validateAuth, auth_login]);

  return (
    <AuthContext.Provider value={{ isAuthenticated,  conta, auth_login, auth_logout, validateAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
