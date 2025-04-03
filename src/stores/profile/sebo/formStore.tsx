import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { Sebo } from '@domains/Sebo';
import { useForm } from '@hooks/useForm';
import { deleteUser, getPerfilById, updateUser } from '@routes/routesSebo';
import { uploadImagesToCloudinary } from '@services/cloudinaryService';

interface ProfileSeboFormContextType {
  sebo: Sebo;
  setField: (field: string, value: any) => void;
  validate: () => boolean;
  loadCitiesByState: () => Promise<void>;
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
    if (sebo.concordaVender && !sebo.telefone.trim()) {
      validationResults['telefone'] = {
        error: true,
        message: 'Campo obrigatório',
        rules: [],
      };
    }
    validationResults = checkTelefone(sebo, validationResults);
    return validationResults;
  };

  const { formData, setField, validate, loadCitiesByState, cities, setFormData, showNotification, checkTelefone } =
    useForm<Sebo>({
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

  const [loading, setLoading] = useState<boolean>(false);

  const initialize = useCallback(async (id: number | undefined) => {
    setLoading(true);
    try {
      const data = await getPerfilById(id);
      setFormData(data);
      loadCitiesByState();
    } catch (error) {
      showNotification('error', null, 'Erro ao buscar perfil do sebo');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSebo = async (sucessCallback?: () => void) => {
    try {
      const newImages = formData.fotos ? formData.fotos.filter((foto: any) => !foto.url) : [];
      let formattedImages = formData.fotos;
      if (newImages.length > 0) {
        const uploadedImages = await uploadImagesToCloudinary(newImages);
        formattedImages = uploadedImages.map((url: string) => ({ url }));
      }
      formData.fotos = formattedImages;

      formData.telefone.trim();
      await updateUser({ ...formData, fotos: formattedImages }, formData?.id);
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
