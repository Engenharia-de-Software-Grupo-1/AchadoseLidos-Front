import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ibge } from 'brasilapi-js';
import { Sebo } from '@domains/Sebo';
import { useNotification } from '@contexts/notificationContext';
import { extractRules, stepRules, validateRule } from '@utils/formRules';
import { addRuleToField, getField } from '@utils/utils';
import { useErrorContext } from '@contexts/errorContext';
import { Rule } from '@domains/Rule';
import { createSebo } from '@routes/routesSebo';

interface RegisterSeboContextType {
  sebo: Sebo;
  setField: (field: string, value: any) => void;
  validateStep: (stepIndex: number) => boolean;
  getRule: (field: string) => {};
  loadCitiesByState: (state: string) => Promise<void>;
  cities: { value: string; text: string }[];
  checkTelefone: (checked: boolean) => void;
  saveRegisterSebo: (sucessCallback?: () => void) => void;
}

const RegisterSeboContext = createContext<RegisterSeboContextType | null>(null);

export const useRegisterSebo = (): RegisterSeboContextType => {
  const context = useContext(RegisterSeboContext);
  if (!context) {
    throw new Error('useRegisterSebo must be used within a RegisterSeboProvider');
  }
  return context;
};

interface RegisterSeboProviderProps {
  children: ReactNode;
}

export const RegisterSeboProvider = ({ children }: RegisterSeboProviderProps) => {
  const { showNotification } = useNotification();
  const [sebo, setFormData] = useState<Sebo>({
    conta: {
      email: '',
      senha: '',
      confirmaSenha: '',
      tipo: 'SEBO',
      status: 'ATIVA',
    },
    nome: '',
    cpfCnpj: '',
    telefone: '',
    biografia: '',
    instagram: '',
    fotoPerfil: undefined,
    estanteVirtual: '',
    curadores: '',
    concordaVender: false,
    endereco: {
      estado: '',
      cidade: '',
      cep: '',
      rua: '',
      bairro: '',
      numero: '',
      complemento: '',
      ehPublico: false,
    },
  });

  const [cities, setCities] = useState<{ value: string; text: string }[]>([]);
  const [rules, setRules] = useState<Record<string, Rule[]>>({
    nome: [{ rule: 'required' }],
    cpfCnpj: [{ rule: 'required' }, { rule: 'getTypeCpfCnpj' }],
    email: [{ rule: 'required' }, { rule: 'isEmail' }],
    senha: [{ rule: 'required' }, { rule: 'isMatchSenha' }, { rule: 'isValidLength', minLength: 8 }],
    confirmaSenha: [{ rule: 'required' }, { rule: 'isMatchSenha' }, { rule: 'isValidLength', minLength: 8 }],
    estado: [{ rule: 'required' }],
    cidade: [{ rule: 'required' }],
    cep: [{ rule: 'required' }],
    rua: [{ rule: 'required' }],
    bairro: [{ rule: 'required' }],
    numero: [{ rule: 'required' }],
    complemento: [{ rule: 'required' }],
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

  const getRule = (field: string): Rule[] => {
    return rules[field] || [];
  };

  const checkTelefone = (checked: boolean) => {
    if (checked) {
      const updatedRules = addRuleToField(rules, 'telefone', { rule: 'required' });
      setRules(updatedRules);
    }
  };

  const validateStep = (stepIndex: number): boolean => {
    const stepFields: Record<number, string[]> = {
      0: ['nome', 'cpfCnpj', 'email', 'senha', 'confirmaSenha'],
      1: ['estado', 'cidade', 'cep', 'rua', 'bairro', 'numero'],
      2: [],
    };

    let fieldsToValidate = stepFields[stepIndex] || [];

    if (stepIndex === 0 && sebo.concordaVender) {
      fieldsToValidate.push('telefone');
    }

    const rulesByStep = stepRules(fieldsToValidate, rules);
    let validationResults = extractRules(rulesByStep, sebo);
    validationResults = verifyPassword(sebo, validationResults);

    setErrors(validationResults);

    return !Object.values(validationResults).some((field) => field.error);
  };

  const verifyPassword = (sebo: Sebo, validationResults: Record<string, any>): Record<string, any> => {
    const passwordFields = ['senha', 'confirmaSenha'];
    passwordFields.forEach((field) => {
      if (!sebo.conta[field]) {
        validationResults[field] = { error: true, message: 'Campo obrigatório', rules: [] };
      }
    });

    if (sebo.conta.senha && sebo.conta.confirmaSenha && sebo.conta.senha !== sebo.conta.confirmaSenha) {
      validationResults['confirmaSenha'] = {
        error: true,
        message: 'Por favor, coloque senhas equivalentes',
        rules: [],
      };
    }

    return validationResults;
  };

  const loadCitiesByState = useCallback(async (state: string) => {
    try {
      const response = await ibge.country.getBy(state);
      const citiesOptions = response.data.map((city: any) => ({
        value: city.codigo_ibge,
        text: city.nome,
      }));
      setCities(citiesOptions);
    } catch (error) {
      showNotification('error', null, 'Erro ao carregar cidades');
      setCities([]);
    }
  }, []);

  const saveRegisterSebo = async (sucessCallback?: () => void) => {
    try {
      const response = await createSebo(sebo);
      showNotification('success', null, 'Sebo cadastrado com sucesso!');

      sucessCallback && sucessCallback();
    } catch (error) {
      console.error('Erro ao cadastrar sebo:', error);
    }
  };

  return (
    <RegisterSeboContext.Provider
      value={{ sebo, setField, validateStep, getRule, cities, loadCitiesByState, checkTelefone, saveRegisterSebo }}
    >
      {children}
    </RegisterSeboContext.Provider>
  );
};
