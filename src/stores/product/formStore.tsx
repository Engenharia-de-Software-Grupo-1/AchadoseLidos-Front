import { createContext, useContext, ReactNode, useState } from 'react';
import { Produto } from '@domains/Produto';
import { useForm } from '@hooks/useForm';
import { createProduct, getById, updateProduct } from '@routes/routesProduto';
import { useNavigate } from 'react-router-dom';
import { uploadImagesToCloudinary } from '@services/cloudinaryService';

interface ProdutoFormContextType {
  produto: Produto;
  setField: (field: string, value: any) => void;
  validate: () => boolean;
  getRule: (field: string) => {};
  images: { url: string }[] | undefined;
  setProduct: (id: any) => void;
  setImages: (images: { url: string }[]) => void;
  handleSave: (isRegister: boolean, id: any) => void;
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
}

const ProdutoFormContext = createContext<ProdutoFormContextType | null>(null);

export const useProdutoForm = (): ProdutoFormContextType => {
  const context = useContext(ProdutoFormContext);
  if (!context) {
    throw new Error('useProdutoForm must be used within a ProdutoFormProvider');
  }
  return context;
};

interface ProdutoFormProviderProps {
  children: ReactNode;
}

export const ProdutoFormProvider = ({ children }: ProdutoFormProviderProps) => {
  const [images, setImages] = useState<{ url: string }[]>();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const { formData, setFormData, showNotification, getRule, validate, setField } = useForm<Produto>({
    initialData: {
      nome: '',
      preco: 0,
      categoria: '',
      qtdEstoque: 0,
      anoEdicao: 0,
      anoLancamento: 0,
      estadoConservacao: '',
      autores: '',
      descricao: '',
      status: 'ATIVO',
      fotos: [],
      generos: [],
    },
    rules: {
      nome: [{ rule: 'required' }],
      preco: [{ rule: 'required' }],
      categoria: [{ rule: 'required' }],
      qtdEstoque: [{ rule: 'required' }],
      generos: [{ rule: 'required' }],
      estadoConservacao: [{ rule: 'required' }],
    },
  });

  const setProduct = async (id: any) => {
    try {
      const product = await getById(id);
      setImages(product.fotos);
      setFormData(product);
      (Object.keys(product) as Array<keyof Produto>).forEach((key) => {
        if (product[key as keyof Produto] !== undefined) {
          setField(key, product[key]);
        }
      });
    } catch (error) {
      console.error('Erro ao buscar produto', error);
    }
  };

  const handleConfirm = async (isRegister: boolean, id: any) => {
    try {
      const newImages = formData.fotos ? formData.fotos.filter((foto: any) => !foto.url) : [];
      let formattedImages = formData.fotos;

      if (newImages.length > 0) {
        const uploadedImages = await uploadImagesToCloudinary(newImages);
        formattedImages = uploadedImages.map((url: string) => ({ url }));
      }
      formData.fotos = formattedImages;

      if (!isRegister) {
        await updateProduct({ ...formData, fotos: formattedImages }, id);
        navigate(`/product/${id}`);
      } else {
        await createProduct({ ...formData, fotos: formattedImages });
        navigate('/navigation/meus-produtos');
        window.location.reload();
      }
      showNotification('success', 'Produto salvo com sucesso!', '');
    } catch (error) {
      console.error('Erro ao salvar produto', error);
    }
  };

  const handleSave = (isRegister: boolean, id: any) => {
    const isValid = validate();
    if (!isValid) {
      showNotification('error', 'Erro ao salvar produto', 'Preencha todos os campos obrigatórios!');
      return;
    }
    handleConfirm(isRegister, id);
  };

  return (
    <ProdutoFormContext.Provider
      value={{
        produto: formData,
        setField,
        validate,
        getRule,
        images,
        setProduct,
        setImages,
        handleSave,
        submitted,
        setSubmitted,
      }}
    >
      {children}
    </ProdutoFormContext.Provider>
  );
};
