import { useProdutoForm } from '@stores/product/formStore';

const useForm = () => {
  const { produto, setField, validate, getRule, setProduct, images, setImages, handleSave, submitted, setSubmitted } =
    useProdutoForm();

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
    handleSave,
  };
};

export { useForm };
