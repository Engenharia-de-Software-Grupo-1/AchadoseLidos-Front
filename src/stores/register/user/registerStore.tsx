import { createContext, useContext, ReactNode } from 'react';
import { User } from '@domains/User';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@routes/routesUser';
import { useForm } from '@hooks/useForm';
import { validarEmail } from '@routes/routesAuth';

interface RegisterUserContextType {
  user: User;
  setField: (field: string, value: any) => void;
  validateStep: (stepIndex: number) => Promise<boolean>;
  getRule: (field: string) => {};
  finalizeRegister: () => Promise<void>;
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

  const validateEmail = async (): Promise<boolean> => {
    try {
      const response = await validarEmail(formData?.conta?.email);
      return response.status === 200;
    } catch (error) {
      console.error('Erro ao validar e-mail:', error);
      return false;
    }
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

  const validateStep = async (stepIndex: number): Promise<boolean> => {
    if (stepIndex === 0) {
      const emailIsValid = await validateEmail();
      !emailIsValid && showNotification('error', null, 'Email já está associado a uma conta');
    }
    return validate(stepIndex);
  };

  const aditionalValidate = (user: User, validationResults: Record<string, any>): Record<string, any> => {
    validationResults = verifyPassword(user, validationResults);
    return validationResults;
  };

  const { formData, setField, validate, getRule, showNotification } = useForm<User>({
    initialData: {
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
    },
    rules: {
      nome: [{ rule: 'required' }],
      cpf: [{ rule: 'required' }, { rule: 'getTypeCpfCnpj' }],
      email: [{ rule: 'required' }, { rule: 'isEmail' }],
      senha: [{ rule: 'required' }, { rule: 'isMatchSenha' }, { rule: 'isValidLength', minLength: 8 }],
      confirmaSenha: [{ rule: 'required' }, { rule: 'isMatchSenha' }, { rule: 'isValidLength', minLength: 8 }],
    },
    aditionalValidate,
  });

  const navigate = useNavigate();

  const finalizeRegister = async () => {
    try {
      await registerUser(formData);
      showNotification('success', null, 'Usuário cadastrado com sucesso!');
      navigate('/login');
    } catch {
      showNotification('error', null, 'Erro ao cadastrar usuário!');
    }
  };

  return (
    <RegisterUserContext.Provider value={{ user: formData, setField, validateStep, getRule, finalizeRegister }}>
      {children}
    </RegisterUserContext.Provider>
  );
};
