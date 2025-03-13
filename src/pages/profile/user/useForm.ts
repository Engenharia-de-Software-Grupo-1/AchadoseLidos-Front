import { Endereco } from '@domains/Endereco';
import { useProfileSeboForm } from '@stores/profile/sebo/formStore';
import { useProfileUserForm } from '@stores/profile/user/formStore';
import { useEffect, useState } from 'react';

const useFormUser = () => {
  const [submitted, setSubmitted] = useState(false);

  const { user, setField, validateStep, getRule } = useProfileUserForm();


  const breadcrumbItems = [
    { label: 'Meu Perfil', url: '/profile/user' },
    { label: 'Editar', url: '/profile/user/edit' }
]

  const imageProfile = '/images/anarita.JPG';

  return {
    user,
    setField,
    validateStep,
    getRule,
    breadcrumbItems,
    submitted,
    setSubmitted,
    imageProfile,
  };
};

export { useFormUser };
