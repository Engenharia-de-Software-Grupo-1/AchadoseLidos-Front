import { createContext, ReactNode, useContext } from 'react';
import { CredenciaisRecoverRequest } from '@domains/Credenciais';
import { useForm } from '@hooks/useForm';
import { recuperar_senha } from '@routes/routesRecover';
import { useErrorContext } from '@contexts/errorContext';

interface RecoverRequestContextType {
  credenciais: CredenciaisRecoverRequest;
  setField: (field: string, value: any) => void;
  validate: () => boolean;
  finalizeRecoverRequest: () => void;
}

const RecoverRequestContext = createContext<RecoverRequestContextType | null>(null);

export const useRecoverRequest = (): RecoverRequestContextType => {
  const context = useContext(RecoverRequestContext);
  if (!context) {
    throw new Error('useRecoverRequest must be used within a RecoverRequestProvider');
  }
  return context;
};

interface RecoverRequestProviderProps {
  children: ReactNode;
}

export const RecoverRequestProvider = ({ children }: RecoverRequestProviderProps) => {
  const { setError } = useErrorContext();
  const { formData, setField, validate, showNotification } = useForm<CredenciaisRecoverRequest>({
    initialData: {
      email: '',
    },
    rules: {
      email: [{ rule: 'isEmail' }, { rule: 'required' }],
    },
  });

  const finalizeRecoverRequest = async () => {
    if (validate()) {
      try {
        const response = await recuperar_senha(formData);

        if (response.status === 200) {
          showNotification('success', null, response.data.mensagem);
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
      }
    } else {
      setError('email', { error: true, message: 'Por favor, preencha o campo.' });
    }
  };

  return (
    <RecoverRequestContext.Provider value={{ credenciais: formData, setField, validate, finalizeRecoverRequest }}>
      {children}
    </RecoverRequestContext.Provider>
  );
};
