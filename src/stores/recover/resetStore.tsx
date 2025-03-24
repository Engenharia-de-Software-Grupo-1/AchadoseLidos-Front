import { createContext, ReactNode, useContext } from 'react';
import { CredenciaisResetRequest } from '@domains/Credenciais';
import { useForm } from '@hooks/useForm';
import { useNotification } from '@contexts/notificationContext';
import { useNavigate } from 'react-router-dom';
import { atualizar_senha } from '@routes/routesRecover';

interface ResetRequestContextType {
  credenciais: CredenciaisResetRequest;
  setField: (field: string, value: any) => void;
  finalizeResetRequest: (token: string | null) => void;
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
  const navigate = useNavigate();

  const aditionalValidate = (
    credenciais: CredenciaisResetRequest,
    validationResults: Record<string, any>
  ): Record<string, any> => {
    if (!credenciais.conta['senha']) {
      validationResults['senha'] = { error: true, message: 'Campo obrigatório', rules: [] };
    }
    if (!credenciais.confirmaSenha) {
      validationResults['confirmaSenha'] = { error: true, message: 'Campo obrigatório', rules: [] };
    }

    if (credenciais.conta.senha && credenciais.conta.senha.length < 8) {
      validationResults['senha'] = {
        error: true,
        message: 'O campo deve ter pelo menos 8 caracteres',
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

  const { formData, setField, validate, showNotification } = useForm<CredenciaisResetRequest>({
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

  const finalizeResetRequest = async (token: string | null) => {
    if (validate()) {
      try {
        await setField('conta.token', token);
        const response = await atualizar_senha(formData.conta);

        if (response.status === 200) {
          showNotification('success', 'Senha atualizada com sucesso!', '');
          navigate('/login');
        }
      } catch (error: any) {
        if (error.response) {
          const errorData = error.response.data;

          if (errorData.errors && Array.isArray(errorData.errors)) {
            errorData.errors.forEach((err: { message: string }) => {
              showNotification('error', err.message, '');
            });
          } else {
            showNotification('error', errorData.mensagem || 'Erro no servidor.', '');
          }
        } else if (error.request) {
          showNotification('error', 'Sem resposta do servidor. Verifique sua conexão.', '');
        } else {
          showNotification('error', 'Algo deu errado. Tente novamente mais tarde.', '');
        }
      }
    }
  };

  return (
    <ResetRequestContext.Provider value={{ credenciais: formData, setField, finalizeResetRequest }}>
      {children}
    </ResetRequestContext.Provider>
  );
};
