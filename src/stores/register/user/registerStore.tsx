import { createContext, useContext, ReactNode } from 'react';
import { Usuario } from '@domains/Usuario';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@routes/routesUser';
import { useForm } from '@hooks/useForm';

interface RegisterUserContextType {
  user: Usuario;
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
  const validateStep = async (stepIndex: number): Promise<boolean> => {
    if (stepIndex === 0) {
      const emailIsValid = await validateEmail();
      !emailIsValid && showNotification('error', null, 'Email já está associado a uma conta');
    }
    return validate(stepIndex);
  };

  const aditionalValidate = (user: Usuario, validationResults: Record<string, any>): Record<string, any> => {
    validationResults = verifyPassword(user, validationResults);
    validationResults = checkTelefone(user, validationResults);
    return validationResults;
  };

  const { formData, setField, validate, getRule, showNotification, validateEmail, verifyPassword, checkTelefone } =
    useForm<Usuario>({
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
    } catch (error: Any) {
      console.error(error);
      if (error.response) {
          const errorMessage = error.response.data.message || 'Erro ao cadastrar usuário. Verifique os campos do formulário.';
          showNotification('error', null, errorMessage);
        } else if (error.request) {
          showNotification('error', null, 'Sem resposta do servidor. Verifique sua conexão.');
        } else {
          showNotification('error', null, 'Erro ao cadastrar Usuário. Tente novamente mais tarde.');
        }
    }
  };

  return (
    <RegisterUserContext.Provider value={{ user: formData, setField, validateStep, getRule, finalizeRegister }}>
      {children}
    </RegisterUserContext.Provider>
  );
};
