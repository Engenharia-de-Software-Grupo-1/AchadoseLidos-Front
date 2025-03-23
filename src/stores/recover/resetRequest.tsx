import { createContext, ReactNode, useContext } from 'react';
import { CredenciaisResetRequest } from '@domains/Credenciais';
import { useForm } from '@hooks/useForm';

interface ResetRequestContextType {
  credenciais: CredenciaisResetRequest;
  setField: (field: string, value: any) => void;
  validate: () => boolean;
}

const ResetRequestContext = createContext<ResetRequestContextType | null>(null);

export const useResetRequest = (): ResetRequestContextType => {
  const context = useContext(ResetRequestContext);
  if (!context) {
    throw new Error('useResetRequest must be used within a ResetRequestProvider');
  }
  return context;
};

interface ResetRequestProviderProps {
  children: ReactNode;
}

export const ResetRequestProvider = ({ children }: ResetRequestProviderProps) => {
  const aditionalValidate = (
    credenciais: CredenciaisResetRequest,
    validationResults: Record<string, any>
  ): Record<string, any> => {
    if (!credenciais.conta['senha']) {
      validationResults['senha'] = { error: true, message: 'Por favor, preencha o campo', rules: [] };
    }
    if (!credenciais.confirmaSenha) {
      validationResults['confirmaSenha'] = { error: true, message: 'Por favor, preencha o campo', rules: [] };
    }

    if (credenciais.conta.senha && credenciais.conta.senha.length < 8) {
      validationResults['senha'] = {
        error: true,
        message: 'A senha deve ter pelo menos 8 caracteres',
        rules: [],
      };
    }

    if (credenciais.conta.senha && credenciais.confirmaSenha && credenciais.conta.senha !== credenciais.confirmaSenha) {
      validationResults['confirmaSenha'] = {
        error: true,
        message: 'Por favor, coloque senhas equivalentes',
        rules: [],
      };
    }

    return validationResults;
  };

  const { formData, setField, validate } = useForm<CredenciaisResetRequest>({
    initialData: {
      conta: {
        senha: '',
        token: '',
      },
      confirmaSenha: '',
    },
    rules: {
      senha: [{ rule: 'required' }, { rule: 'isMatchSenha' }],
      confirmaSenha: [{ rule: 'required' }, { rule: 'isMatchSenha' }],
    },
    aditionalValidate,
  });

  return (
    <ResetRequestContext.Provider value={{ credenciais: formData, setField, validate }}>
      {children}
    </ResetRequestContext.Provider>
  );
};
