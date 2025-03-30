import { useProfileUserForm } from '@stores/profile/user/formStore';
import { useState } from 'react';

const useFormUser = () => {
  const [submitted, setSubmitted] = useState(false);

  const { user, setField, validate, setUser, updateDataUser, deleteAccount, loading } = useProfileUserForm();

  const breadcrumbItems = [
    { label: 'Meu Perfil', url: '/profile/user' },
    { label: 'Editar', url: '/profile/user/edit' },
  ];

  const imageProfile = '/images/anarita.JPG';

  return {
    user,
    setField,
    validate,
    breadcrumbItems,
    submitted,
    setSubmitted,
    imageProfile,
    setUser,
    updateDataUser,
    deleteAccount,
    loading,
  };
};

export { useFormUser };
