import { useErrorContext } from "@contexts/errorContext"
import { extractRules, validateRule } from "@utils/formRules";
import { createContext, ReactNode, useContext, useState } from "react"
import { getField } from '@utils/utils';
import { CredenciaisRecoverRequest } from "@domains/Credenciais";

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

    const [credenciais, setFormData] = useState<CredenciaisRecoverRequest>({
        email: ''
    });

    const [rules, setRules] = useState<Record<string, Rule[]>>({
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
        <RecoverRequestContext.Provider value={{ credenciais, setField, validate }}>
          {children}
        </RecoverRequestContext.Provider>
      );
};