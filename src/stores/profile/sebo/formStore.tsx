import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { Sebo } from '@domains/Sebo';
import { useForm } from '@hooks/useForm';
import { deleteUser, getPerfilById, updateUser } from '@routes/routesSebo';
import { useNotification } from '@contexts/notificationContext';

interface ProfileSeboFormContextType {
  sebo: Sebo;
  setField: (field: string, value: any) => void;
  validate: () => boolean;
  loadCitiesByState: (state: string) => Promise<void>;
  cities: { value: string; text: string }[];
  initialize: (id: number) => void;
  loading: boolean;
  updateSebo: (sucessCallback?: () => void) => void;
  deleteSebo: (sucessCallback?: () => void) => void;
}

const ProfileSeboFormContext = createContext<ProfileSeboFormContextType | null>(null);

export const useProfileSeboForm = (): ProfileSeboFormContextType => {
  const context = useContext(ProfileSeboFormContext);
  if (!context) {
    throw new Error('useProfileSeboForm must be used within a ProfileSeboFormProvider');
  }
  return context;
};

interface ProfileSeboFormProviderProps {
  children: ReactNode;
}

export const ProfileSeboFormProvider = ({ children }: ProfileSeboFormProviderProps) => {
  const aditionalValidate = (sebo: Sebo, validationResults: Record<string, any>): Record<string, any> => {
    if (sebo.concordaVender && !sebo.telefone) {
      validationResults['telefone'] = {
        error: true,
        message: 'Campo obrigatório',
        rules: [],
      };
    }
    return validationResults;
  };

  const { formData, setField, validate, loadCitiesByState, cities, setFormData } = useForm<Sebo>({
    initialData: null,
    rules: {
      nome: [{ rule: 'required' }],
      cpfCnpj: [{ rule: 'required' }, { rule: 'getTypeCpfCnpj' }],
      estado: [{ rule: 'required' }],
      cidade: [{ rule: 'required' }],
      cep: [{ rule: 'required' }],
      rua: [{ rule: 'required' }],
      bairro: [{ rule: 'required' }],
      numero: [{ rule: 'required' }],
    },
    aditionalValidate,
  });

  const { showNotification } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const initialize = useCallback(async (id: number | undefined) => {
    setLoading(true);
    try {
      const data = await getPerfilById(id);
      setFormData(data);
    } catch (error) {
      showNotification('error', null, 'Erro ao buscar perfil do sebo');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSebo = async (sucessCallback?: () => void) => {
    try {
      formData.telefone.trim();
      await updateUser(formData, formData?.id);
      sucessCallback && sucessCallback();
    } catch (error) {
      console.error('Erro ao cadastrar sebo:', error);
    }
  };

  const deleteSebo = async (sucessCallback?: () => void) => {
    try {
      await deleteUser(formData?.id);
      sucessCallback && sucessCallback();
    } catch (error) {
      console.error('Erro ao cadastrar sebo:', error);
    }
  };

  return (
    <ProfileSeboFormContext.Provider
      value={{
        sebo: formData,
        setField,
        cities,
        loadCitiesByState,
        validate,
        initialize,
        loading,
        updateSebo,
        deleteSebo,
      }}
    >
      {children}
    </ProfileSeboFormContext.Provider>
  );
};
