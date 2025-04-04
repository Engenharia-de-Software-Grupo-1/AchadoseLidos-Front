import { Usuario } from '@domains/Usuario';
import { createContext, useContext, ReactNode, useState } from 'react';
import { deleteUser, getById, updateUser } from '@routes/routesUser';
import { useAuth } from '@contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@hooks/useForm';

interface ProfileUserFormContextType {
  user: Usuario;
  setField: (field: string, value: any) => void;
  validate: () => boolean;
  setUser: () => void;
  updateDataUser: () => void;
  deleteAccount: () => void;
  loading: boolean;
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
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { formData, setField, validate, setFormData, showNotification } = useForm<Usuario>({
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
    } as Usuario,
    rules: conta?.usuario?.id
      ? {
          nome: [{ rule: 'required' }],
          cpf: [{ rule: 'required' }, { rule: 'isCpfCnpj' }],
        }
      : {
          nome: [{ rule: 'required' }],
          cpf: [{ rule: 'required' }, { rule: 'isCpfCnpj' }],
          email: [{ rule: 'required' }, { rule: 'isEmail' }],
          senha: [{ rule: 'required' }],
          confirmaSenha: [{ rule: 'required' }],
        },
  });

  const setUser = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const updateDataUser = async () => {
    try {
      const isValid = validate();
      if (!isValid) {
        showNotification('error', 'Erro ao atualizar dados', 'Verifique os campos obrigatórios');
        return;
      }
      if (conta?.usuario?.id !== undefined) {
        const response = await updateUser(formData, conta.usuario.id);
        setFormData(response);
        conta.usuario = response;
        navigate('/profile/user');
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
      value={{ user: formData, setField, validate, setUser, updateDataUser, deleteAccount, loading }}
    >
      {children}
    </ProfileUserFormContext.Provider>
  );
};
