import { User } from '@domains/User';
import { createContext, useContext, useState, ReactNode} from 'react';
import { extractRules, stepRules } from '@utils/formRules';
import { deleteUser, getById, updateUser } from '@routes/routesUser';
import { useAuth } from '@contexts/authContext';
import { useNotification } from '@contexts/notificationContext';
import { useNavigate } from 'react-router-dom';

interface ProfileUserFormContextType {
  user: User;
  setField: (field: string, value: any) => void;
  validateStep: (stepIndex: number) => boolean;
  getRule: (field: string) => {};
  submitted: boolean;
  setUser: () => void;
  updateDataUser: () => void;
  deleteAccount: () => void;
}

export const ProfileUserFormContext = createContext<ProfileUserFormContextType | null>(null);

export const useProfileUserForm = (): ProfileUserFormContextType => {
  const context = useContext(ProfileUserFormContext);
  if (!context) {
    throw new Error('useProfileUserForm must be used within a ProfileSeboFormProvider');
  }
  return context;
};

interface ProfileUserFormProviderProps {
  children: ReactNode;
}

export const ProfileUserFormProvider = ({ children }: ProfileUserFormProviderProps) => {
  const { conta, handleLogout } = useAuth();
  const navigate = useNavigate();
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

  const setField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  //@ts-ignore
  const rules: Record<string, Rule[]> = {
    nome: [{ rule: 'required' }],
    cpfCnpj: [{ rule: 'required' }, { rule: 'isCpfCnpj' }],
    email: [{ rule: 'required' }, { rule: 'isEmail' }],
    senha: [{ rule: 'required' }],
    confirmaSenha: [{ rule: 'required' }],
  };

  const getRule = (field: string) => {
    return rules[field] ? rules[field] : {};
  };

  const validateStep = (): boolean => {
    let fieldsToValidate = ['nome', 'cpfCnpj', 'email', 'senha', 'confirmaSenha'];

    const rulesByStep = stepRules(fieldsToValidate, rules);

    const validationResults = extractRules(rulesByStep, user);

    const hasError = Object.keys(validationResults).some((field) => validationResults[field].error);
    return !hasError;
  };

  const setUser = async () => {
    try {
      if (conta?.usuario?.id !== undefined) {
        const usuario = await getById(conta.usuario.id);
        (Object.keys(usuario) as Array<keyof typeof usuario>).forEach((key) => {
          if (usuario[key] !== undefined) {
            setField(key as string, usuario[key]);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { showNotification } = useNotification();

  const updateDataUser = async () => {
    try {
      if (conta?.usuario?.id !== undefined) {
        await updateUser(user, conta.usuario.id);
        showNotification('success', 'Dados atualizados com sucesso!', '');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAccount = async () => {
    try {
      if (conta?.usuario?.id !== undefined) {
        await deleteUser(conta.usuario.id);
        showNotification('success', 'Conta excluída com sucesso!', '');
        handleLogout();
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [submitted] = useState<boolean>(false);

  return (
    <ProfileUserFormContext.Provider
      value={{ user, setField, validateStep, getRule, submitted, setUser, updateDataUser, deleteAccount }}
    >
      {children}
    </ProfileUserFormContext.Provider>
  );
};
