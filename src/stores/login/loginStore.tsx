import { useErrorContext } from '@contexts/errorContext';
import { Credenciais } from '@domains/Credenciais';
import { createContext, ReactNode, useContext } from 'react';
import { useForm } from '@hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/authContext';
import { login } from '@routes/routesAuth';

interface LoginContextType {
  credenciais: Credenciais;
  setField: (field: string, value: any) => void;
  validate: () => boolean;
  finalizeLogin: () => void;
}

const LoginContext = createContext<LoginContextType | null>(null);

export const useLogin = (): LoginContextType => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const { setError } = useErrorContext();
  const navigate = useNavigate();
  const { validateAuth } = useAuth();

  const { formData, setField, validate, showNotification } = useForm<Credenciais>({
    initialData: {
      senha: '',
      email: '',
    },
    rules: {
      senha: [{ rule: 'required' }],
      email: [{ rule: 'isEmail' }, { rule: 'required' }],
    },
  });

  const finalizeLogin = async () => {
    if (validate()) {
      try {
        const response = await login(formData);

        if (response.status === 200) {
          showNotification('success', 'Login realizado com sucesso!', '');
          validateAuth();
          navigate('/');
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          setError('senha', {error:true, message:'Senha incorreta.'});
        } else if (error.response.status === 404) {
          setError('email', {error:true, message:'Email inválido.'});
          setError('senha', {error:true, message:''});
        } else if (error.response) {
          const errorMessage = error.response.data.message || 'Erro no servidor.';
          showNotification('error', errorMessage, '');
        } else if (error.request) {
          showNotification('error', 'Sem resposta do servidor. Verifique sua conexão.', '');
        } else {
          showNotification('error', 'Algo deu errado. Tente novamente mais tarde.', '');
        }
      }
    } 
  };

  return <LoginContext.Provider value={{ credenciais: formData, setField, validate, finalizeLogin }}>{children}</LoginContext.Provider>;
};
