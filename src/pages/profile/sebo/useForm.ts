import { Endereco } from '@domains/Endereco';
import { useProfileSeboForm } from '@stores/profile/sebo/formStore';
import { useEffect, useState } from 'react';

const useForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [endereco, setEndereco] = useState<Endereco>({
    bairro: '',
    cep: '',
    cidade: '',
    complemento: '',
    estado: '',
    numero: '',
    rua: '',
    ehPublico: false,
  });

  const { sebo, setField, validateStep, getRule, cities } = useProfileSeboForm();

  useEffect(() => {
    setField('endereco', endereco);
  }, [endereco]);

  const handleEnderecoChange = (field: keyof Endereco, value: string) => {
    setEndereco((prevEndereco) => ({
      ...prevEndereco,
      [field]: value,
    }));
  };

  const breadcrumbItems = [
    { label: 'Meu Perfil', url: '/profile/sebo' },
    { label: 'Editar Sebo', url: '/profile/sebo/edit' },
  ];

  const imageProfile = '/images/anarita.JPG';

  return {
    sebo,
    setField,
    validateStep,
    getRule,
    cities,
    endereco,
    handleEnderecoChange,
    breadcrumbItems,
    submitted,
    setSubmitted,
    imageProfile,
  };
};

export { useForm };
