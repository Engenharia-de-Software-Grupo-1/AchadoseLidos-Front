import { useProdutoForm } from '@stores/product/formStore';
import { useState } from 'react';

const useForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const { produto, setField, validateStep, getRule } = useProdutoForm();




  const imageProduct = '/images/anarita.JPG';

  return {
    produto,
    setField,
    validateStep,
    getRule,
    submitted,
    setSubmitted,
    imageProduct,
  };
};

export { useForm };
