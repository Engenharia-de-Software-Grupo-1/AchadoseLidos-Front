import { createContext, useContext, useState, ReactNode } from 'react';
import { ibge } from 'brasilapi-js';
import { Sebo } from '@domains/Sebo';
import { useNotification } from '@utils/notificationContext';

interface RegisterSeboContextType {
  sebo: Sebo;
  setField: (field: keyof Sebo, value: any) => void;
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
    nomeSebo: '',
    cpfCnpj: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    whatsapp: '',
    concordaVenda: false,
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
    biografia: '',
    instagram: '',
    estanteVirtual: '',
    curadores: '',
  });

  const [cities, setCities] = useState<{ value: string; text: string }[]>([]);

  const setField = (field: keyof Sebo, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const rules: Record<string, Rule[]> = {
    nomeSebo: [{ rule: 'required' }],
    cpfCnpj: [{ rule: 'required' }, { rule: 'isCpfCnpj' }],
    email: [{ rule: 'required' }, { rule: 'isEmail' }],
    senha: [{ rule: 'required' }],
    confirmarSenha: [{ rule: 'required' }],
    whatsapp: [{ rule: 'required' }],
    estado: [{ rule: 'required' }],
    cidade: [{ rule: 'required' }],
    cep: [{ rule: 'required' }],
    rua: [{ rule: 'required' }],
    bairro: [{ rule: 'required' }],
    numero: [{ rule: 'required' }],
    complemento: [{ rule: 'required' }],
  };

  const getRule = (field: string) => {
    return rules[field] ? rules[field] : {};
  };

  const validateStep = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0:
        return (
          !!sebo.nomeSebo.trim() &&
          !!sebo.cpfCnpj.trim() &&
          !!sebo.email.trim() &&
          !!sebo.senha.trim() &&
          !!sebo.confirmarSenha.trim() &&
          !!sebo.whatsapp.trim()
        );
      case 1:
        return true;
      case 2:
        return sebo.concordaVenda;
      default:
        return false;
    }
  };

  const loadCitiesByState = async (state: string): Promise<void> => {
    try {
      const response = await ibge.state.getBy(state);
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
