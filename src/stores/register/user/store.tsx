import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@domains/User';
import { useNotification } from '@contexts/notificationContext';
import { extractRules, stepRules, validateRule } from '@utils/formRules';
import { addRuleToField, getField } from '@utils/utils';
import { useErrorContext } from 'contexts/errorContext';

interface RegisterUserContextType {
  user: User;
  setField: (field: string, value: any) => void;
  validateStep: (stepIndex: number) => boolean;
  getRule: (field: string) => {};
}

const RegisterUserContext = createContext<RegisterUserContextType | null>(null);

export const useRegisterUser = (): RegisterUserContextType => {
  const context = useContext(RegisterUserContext);
  if (!context) {
    throw new Error('useRegisterUser must be used within a RegisterUserProvider');
  }
  return context;
};

interface RegisterUserProviderProps {
  children: ReactNode;
}

export const RegisterUserProvider = ({ children }: RegisterUserProviderProps) => {
    const { showNotification } = useNotification();
    const [user, setFormData] = useState<User>({
        
        conta: {
        email: '',
        senha: '',
        confirmaSenha: '',
        tipo: 'USUARIO',
        status: 'ATIVA',
        createdAt: '',
        updatedAt: '',
        },
        nome: '',
        cpf: '',
        telefone: '',
        biografia: '',
        instagram: '',
        twitter: '',
        skoob: '',
        goodreads: '',
    });

    const { setErrors, setError } = useErrorContext();
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

    const [rules, setRules] = useState<Record<string, Rule[]>>({
        nome: [{ rule: 'required' }],
        cpf: [{ rule: 'required' }, { rule: 'isCpfCnpj' }],
        email: [{ rule: 'required' }, { rule: 'isEmail' }],
        senha: [{ rule: 'required' }, { rule: 'isMatchSenha' }],
        confirmaSenha: [{ rule: 'required' }, { rule: 'isMatchSenha' }],
      });

    const getRule = (field: string) => {
        return rules[field] || [];
    };
    
    const validateStep = (stepIndex: number): boolean => {
        const stepFields: Record<number, string[]> = {
          0: ['nome', 'cpf', 'email', 'senha', 'confirmaSenha'],
          1: [] 
        };

        let fieldsToValidate = stepFields[stepIndex] || [];
    
  
    const rulesByStep = stepRules(fieldsToValidate, rules);
    let validationResults = extractRules(rulesByStep, user);
    validationResults = verifyPassword(user, validationResults);
  
    setErrors(validationResults);
    
    return !Object.values(validationResults).some((field) => field.error);
  };

  const verifyPassword = (user: User, validationResults: Record<string, any>): Record<string, any> => {
    const passwordFields = ['senha', 'confirmaSenha'];
    passwordFields.forEach((field) => {
      if (!user.conta[field]) {
        validationResults[field] = { error: true, message: 'Por favor, preencha o campo', rules: [] };
      }
    });

    if (user.conta.senha && user.conta.confirmaSenha && user.conta.senha !== user.conta.confirmaSenha) {
        validationResults['confirmaSenha'] = {
          error: true,
          message: 'Por favor, coloque senhas equivalentes',
          rules: [],
        };
      }
    
      return validationResults;
    };

    return (
        <RegisterUserContext.Provider value={{ user, setField, validateStep, getRule }}>
            {children}
        </RegisterUserContext.Provider>
    );
};