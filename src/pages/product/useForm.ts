import { useProductForm } from '@stores/product/formStore';
import { useEffect, useState } from 'react';

const useForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const { product, setField, validateStep, getRule } = useProductForm();


  const breadcrumbItems = [
    { label: 'Meu Produto', url: '/product' },
    { label: 'Editar Produto', url: '/product/edit' },
  ];

  const imageProduct = '/images/anarita.JPG';

  return {
    product,
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
