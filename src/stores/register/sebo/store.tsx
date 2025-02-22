import { createContext, useContext, useState, ReactNode } from 'react';
import { Sebo } from '@domains/Sebo';

interface RegisterSeboContextType {
  sebo: Sebo;
  setField: (field: keyof Sebo, value: any) => void;
  validateStep: (stepIndex: number) => boolean;
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
  const [sebo, setFormData] = useState<Sebo>({
    nomeSebo: '',
    cpfCnpj: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    whatsapp: '',
    concordaVenda: false,
  });

  const setField = (field: keyof Sebo, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  return (
    <RegisterSeboContext.Provider value={{ sebo, setField, validateStep }}>{children}</RegisterSeboContext.Provider>
  );
};
