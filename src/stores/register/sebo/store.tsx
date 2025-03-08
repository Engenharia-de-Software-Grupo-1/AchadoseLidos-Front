import { createContext, useContext, useState, ReactNode } from 'react';
import { ibge } from 'brasilapi-js';
import { Sebo } from '@domains/Sebo';
import { useNotification } from '@contexts/notificationContext';
import { extractRules, stepRules, validateRule } from '@utils/formRules';
import { addRuleToField, getField } from '@utils/utils';
import { useErrorContext } from 'contexts/errorContext';

interface RegisterSeboContextType {
  sebo: Sebo;
  setField: (field: string, value: any) => void;
  validateStep: (stepIndex: number) => boolean;
  getRule: (field: string) => {};
  loadCitiesByState: (state: string) => Promise<void>;
  cities: { value: string; text: string }[];
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
    // falta foto
    conta: {
      email: '',
      senha: '',
      confirmaSenha: '',
      tipo: 'SEBO',
      status: 'ATIVA',
      createdAt: '',
      updatedAt: '',
    },
    nome: '',
    cpfCnpj: '',
    telefone: '',
    biografia: '',
    instagram: '',
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
    cpfCnpj: [{ rule: 'required' }, { rule: 'isCpfCnpj' }],
    email: [{ rule: 'required' }, { rule: 'isEmail' }],
    senha: [{ rule: 'required' }, { rule: 'isMatchSenha' }],
    confirmaSenha: [{ rule: 'required' }, { rule: 'isMatchSenha' }],
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

  const validateStep = (stepIndex: number): boolean => {
    let fieldsToValidate: string[] = [];

    if (stepIndex === 0) {
      fieldsToValidate = ['nome', 'cpfCnpj', 'email', 'senha', 'confirmaSenha'];
      if (sebo.concordaVender) {
        setRules((prevRules) => addRuleToField(prevRules, 'telefone', { rule: 'required' }));
        fieldsToValidate.push('telefone');
      }
    } else if (stepIndex === 1) {
      fieldsToValidate = ['estado', 'cidade', 'cep', 'rua', 'bairro', 'numero'];
    } else if (stepIndex === 2) {
      // salvar
      fieldsToValidate = [];
    }

    const rulesByStep = stepRules(fieldsToValidate, rules);
    let validationResults = extractRules(rulesByStep, sebo);
    validationResults = verifyPassword(sebo, validationResults);

    setErrors(validationResults);
    return !Object.values(validationResults).some((field) => field.error);
  };

  const verifyPassword = (sebo: Sebo, validationResults: Record<string, any>): Record<string, any> => {
    const { senha, confirmaSenha } = sebo.conta ?? {};

    if (!senha) {
      validationResults['senha'] = { error: true, message: 'Por favor, preencha o campo', rules: [] };
    }
    if (!confirmaSenha) {
      validationResults['confirmaSenha'] = { error: true, message: 'Por favor, preencha o campo', rules: [] };
    }
    if (senha && confirmaSenha && senha !== confirmaSenha) {
      validationResults['confirmaSenha'] = {
        error: true,
        message: 'Por favor, coloque senhas equivalentes',
        rules: [],
      };
    }

    return validationResults;
  };

  const loadCitiesByState = async (state: string): Promise<void> => {
    try {
      const response = await ibge.country.getBy(state);
      const citiesOptions = (response.data as unknown as any[]).map((city: any) => ({
        value: city.codigo_ibge,
        text: city.nome,
      }));
      setCities(citiesOptions);
    } catch (error) {
      showNotification('error', null, 'Erro ao carregar cidades');
      setCities([]);
    }
  };

  return (
    <RegisterSeboContext.Provider value={{ sebo, setField, validateStep, getRule, cities, loadCitiesByState }}>
      {children}
    </RegisterSeboContext.Provider>
  );
};
