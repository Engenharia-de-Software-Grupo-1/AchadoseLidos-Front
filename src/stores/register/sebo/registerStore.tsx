import { createContext, useContext, ReactNode } from 'react';
import { Sebo } from '@domains/Sebo';
import { createSebo } from '@routes/routesSebo';
import { useForm } from '@hooks/useForm';

interface RegisterSeboContextType {
  sebo: Sebo;
  setField: (field: string, value: any) => void;
  validateStep: (stepIndex: number) => boolean;
  getRule: (field: string) => {};
  loadCitiesByState: () => Promise<void>;
  cities: { value: string; text: string }[];
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

  const checkTelefone = (sebo: Sebo, validationResults: Record<string, any>): Record<string, any> => {
    if (sebo.concordaVender && !sebo.telefone) {
      validationResults['telefone'] = {
        error: true,
        message: 'Campo obrigatório',
        rules: [],
      };
    }
    return validationResults;
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

  const aditionalValidate = (sebo: Sebo, validationResults: Record<string, any>): Record<string, any> => {
    validationResults = verifyPassword(sebo, validationResults);
    validationResults = checkTelefone(sebo, validationResults);
    return validationResults;
  };

  const saveRegisterSebo = async (sucessCallback?: () => void) => {
    try {
      formData.telefone.trim();
      await createSebo(formData);
      sucessCallback && sucessCallback();
    } catch (error) {
      console.error('Erro ao cadastrar sebo:', error);
    }
  };

  const { formData, setField, validate, getRule, loadCitiesByState, cities } = useForm<Sebo>({
    initialData: {
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
      fotoPerfil:  '',
      estanteVirtual: '',
      curadores: '',
      concordaVender: false,
      endereco: {
        estado: 'PB',
        cidade: '',
        cep: '',
        rua: '',
        bairro: '',
        numero: '',
        complemento: '',
        ehPublico: false,
      },
    },
    rules: {
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
    },
    stepFields: {
      0: ['nome', 'cpfCnpj', 'email', 'senha', 'confirmaSenha'],
      1: ['estado', 'cidade', 'cep', 'rua', 'bairro', 'numero'],
      2: [],
    },
    aditionalValidate,
  });

  return (
    <RegisterSeboContext.Provider
      value={{
        sebo: formData,
        setField,
        validateStep: validate,
        getRule: getRule,
        cities: cities,
        loadCitiesByState: loadCitiesByState,
        saveRegisterSebo,
      }}
    >
      {children}
    </RegisterSeboContext.Provider>
  );
};
