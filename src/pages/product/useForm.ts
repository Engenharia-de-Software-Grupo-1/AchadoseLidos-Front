import { useProdutoForm } from '@stores/product/formStore';
import { useEffect, useState } from 'react';

const useForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const { produto, setField, validateStep, getRule } = useProdutoForm();


  const breadcrumbItems = [
    { label: 'Meu Produto', url: '/product' },
    { label: 'Editar Produto', url: '/product/edit' },
  ];

  const imageProduct = '/images/anarita.JPG';

  return {
    produto,
    setField,
    validateStep,
    getRule,
    breadcrumbItems,
    submitted,
    setSubmitted,
    imageProduct,
  };
};

export { useForm };
