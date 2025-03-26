import { useProdutoForm } from '@stores/product/formStore';
import { useState } from 'react';

const useForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const { produto, setField, validate, getRule, setProduct, images, setImages, handleConfirm, errors } = useProdutoForm();

  return {
    produto,
    setField,
    validate,
    getRule,
    submitted,
    setSubmitted,
    setProduct,
    images,
    setImages,
    handleConfirm,
    errors,  
  };
};

export { useForm };
