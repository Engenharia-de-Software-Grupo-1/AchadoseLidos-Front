import { useErrorContext } from "@contexts/errorContext"
import { useNotification } from "@contexts/notificationContext";
import { Credenciais } from "@domains/Credenciais";
import { extractRules, validateRule } from "@utils/formRules";
import { createContext, ReactNode, useContext, useState } from "react"
import { getField } from '@utils/utils';

interface LoginContextType {
  credenciais: Credenciais;
  setField: (field: string, value: any) => void;
  validate: () => boolean;
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

    const [credenciais, setFormData] = useState<Credenciais>({
    senha: '',
    email: ''
    });

    const [rules, setRules] = useState<Record<string, Rule[]>>({
        senha: [{rule: 'required'}],
        email: [{rule: 'isEmail'}, {rule: 'required'}]
    })

    const {setErrors, setError} = useErrorContext();

    const validate = (): boolean => {
        let validationResults = extractRules(rules, credenciais);
        setErrors(validationResults);
        return !Object.values(validationResults).some((field) => field.error);
    }

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

    return (
        <LoginContext.Provider value={{ credenciais, setField, validate }}>
          {children}
        </LoginContext.Provider>
      );
};