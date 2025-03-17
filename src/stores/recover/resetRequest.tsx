import { useErrorContext } from '@contexts/errorContext';
import { extractRules, validateRule } from '@utils/formRules';
import { createContext, ReactNode, useContext, useState } from 'react';
import { getField } from '@utils/utils';
import { CredenciaisResetRequest } from '@domains/Credenciais';

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
  const [credenciais, setFormData] = useState<CredenciaisResetRequest>({
    conta: {
      senha: '',
      token: '',
    },
    confirmaSenha: '',
  });

  const [rules, setRules] = useState<Record<string, Rule[]>>({
    senha: [{ rule: 'required' }, { rule: 'isMatchSenha' }],
    confirmaSenha: [{ rule: 'required' }, { rule: 'isMatchSenha' }],
  });

  const { setErrors, setError } = useErrorContext();

  const validate = (): boolean => {
    let validationResults = extractRules(rules, credenciais);
    validationResults = verifyPassword(credenciais, validationResults);

    setErrors(validationResults);
    return !Object.values(validationResults).some((field) => field.error);
  };

  const setField = (field: string, value: any) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev! };

      const keys = field.split('.');
      let currentField = updatedFormData;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          currentField[key] = value;
        } else {
          currentField = currentField[key];
        }
      });

      return updatedFormData;
    });

    const fieldName = getField(field);
    setError(fieldName, validateRule(value, getRule(fieldName)));
  };

  const getRule = (field: string): Rule[] => {
    return rules[field] || [];
  };

  const verifyPassword = (
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

  return (
    <ResetRequestContext.Provider value={{ credenciais, setField, validate }}>{children}</ResetRequestContext.Provider>
  );
};
