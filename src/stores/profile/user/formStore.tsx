import { User } from '@domains/User';
import { createContext, useContext, ReactNode } from 'react';
import { deleteUser, getById, updateUser } from '@routes/routesUser';
import { useAuth } from '@contexts/authContext';
import { useNotification } from '@contexts/notificationContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@hooks/useForm';

interface ProfileUserFormContextType {
  user: User;
  setField: (field: string, value: any) => void;
  validate: () => boolean;
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

  const { formData, setField, validate, setFormData } = useForm<User>({
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
    } as User,
    rules: {
      nome: [{ rule: 'required' }],
      cpfCnpj: [{ rule: 'required' }, { rule: 'isCpfCnpj' }],
      email: [{ rule: 'required' }, { rule: 'isEmail' }],
      senha: [{ rule: 'required' }],
      confirmaSenha: [{ rule: 'required' }],
    },
  });

  const setUser = async () => {
    try {
      if (conta?.usuario?.id !== undefined) {
        const usuario = await getById(conta.usuario.id);
        setFormData(usuario);
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
        await updateUser(formData, conta.usuario.id);
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

  return (
    <ProfileUserFormContext.Provider
      value={{ user: formData, setField, validate, setUser, updateDataUser, deleteAccount }}
    >
      {children}
    </ProfileUserFormContext.Provider>
  );
};
