import { createContext, ReactNode, useContext } from 'react';
import { CredenciaisRecoverRequest } from '@domains/Credenciais';
import { useForm } from '@hooks/useForm';

interface RecoverRequestContextType {
  credenciais: CredenciaisRecoverRequest;
  setField: (field: string, value: any) => void;
  validate: () => boolean;
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
  const { formData, setField, validate } = useForm<CredenciaisRecoverRequest>({
    initialData: {
      email: '',
    },
    rules: {
      email: [{ rule: 'isEmail' }, { rule: 'required' }],
    },
  });

  return (
    <RecoverRequestContext.Provider value={{ credenciais: formData, setField, validate }}>
      {children}
    </RecoverRequestContext.Provider>
  );
};
