import { Conta } from '@domains/Conta';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { informacoes } from 'routes/routesAuth';

type AuthContextType = {
  isAuthenticated: boolean;
    conta: Conta | null;
  auth_login: (conta: Conta) => void; 
  auth_logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [conta, setConta] = useState<Conta | null>(null);

  const auth_login = useCallback((conta: Conta) => {
    setIsAuthenticated(true);
    setConta(conta);
  }, []);

  const auth_logout = useCallback(() => {
    setIsAuthenticated(false);
    setConta(null);
  }, []);

  useEffect(() => {
    const validateAuth = async () => {

      try {
        const response = await informacoes();
        if (response.data.autenticado == true) {
          auth_login(response.data.conta);
        } else {
          auth_logout();
        }
      } catch (err) {
        auth_logout();
      }
    };

    validateAuth();
  }, [auth_login, auth_logout]);

  return (
    <AuthContext.Provider value={{ isAuthenticated,  conta, auth_login, auth_logout }}>
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