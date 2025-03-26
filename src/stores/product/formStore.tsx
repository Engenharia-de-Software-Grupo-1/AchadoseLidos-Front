import { createContext, useContext, ReactNode, useState } from 'react';
import { Produto } from '@domains/Produto/Produto';
import { useForm } from '@hooks/useForm';
import { createProduct, getById, updateProduct } from '@routes/routesProduto';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '@services/cloudinaryService';

interface ProdutoFormContextType {
  produto: Produto;
  setField: (field: string, value: any) => void;
  validate: () => boolean;
  getRule: (field: string) => {};
  images: { url: string }[] | undefined;
  setProduct: (id: any) => void;
  setImages: (images: { url: string }[]) => void;
  handleConfirm: (isRegister: boolean, id: any) => void;
  errors: any;
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
    const navigate = useNavigate();
  
  const { formData, setFormData, showNotification, getRule } = useForm<Produto>({
  initialData: {
    nome: '',
    preco: 0,
    categoria: 'Livro',
    qtdEstoque: 0,
    anoEdicao: 0,
    anoLancamento: 0,
    estadoConservacao: 'Novo',
    autores: '',
    descricao: '',
    status: 'ATIVO',
    createdAt: new Date(),
    updatedAt: new Date(),
    generos: [],
  }, rules: {
    nome: [{ rule: 'required' }],
    preco: [{ rule: 'required' }],
    categoria: [{ rule: 'required' }],
    estoque: [{ rule: 'required' }],
    genero: [{ rule: 'required' }],
    estado: [{ rule: 'required' }],
  }
  });

  const [errors, setErrors] = useState<any>({});

  const validate = (): boolean => {
    const validationResults = {
      nome: formData.nome.trim() === '',
      preco: formData.preco <= 0,
      categoria: formData.categoria.trim() === '',
      genero: formData.generos.length === 0,
      estoque: formData.qtdEstoque <= 0,
      estado: formData.estadoConservacao.trim() === '',
    };

    const errors = Object.keys(validationResults).reduce((acc, field) => {
      if (validationResults[field]) {
        acc[field] = { error: true, message: `${field} é obrigatório!` };
      }
      return acc;
    }, {});

    setErrors(errors);
    return !Object.values(errors).some((field) => field.error);
  };

  const setField = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  
    setErrors((prevErrors) => {
      if (prevErrors[fieldName]) {
        const updatedErrors = { ...prevErrors };
        
        // Remove erro caso o campo não esteja mais vazio ou inválido
        if (Array.isArray(value) ? value.length > 0 : value) {
          delete updatedErrors[fieldName];
        }
    
        return updatedErrors;
      }
      return prevErrors;
    });
  };
  
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

    const handleConfirm = async (isRegister: boolean, id:any) => {
      try {
          // @ts-ignore
          const uploadedImages = await uploadImages(formData.fotos || []);
  
          const formattedImages = uploadedImages.map((url) => ({ url }));
  
          formData.fotos = formattedImages;
  
          if (!isRegister) {
            await updateProduct({ ...formData, fotos: formattedImages }, id);
            navigate(`/product/${id}`);
            //window.location.reload();
          } else {
            await createProduct({ ...formData, fotos: formattedImages });
            //navigate('/meus-produtos');
            //window.location.reload();
          }
          showNotification('success', 'Produto salvo com sucesso!', '');
      } catch (error) {
          console.error('Erro ao salvar produto', error);
      }
  };
  
  const uploadImages = async (files: File[]): Promise<string[]> => {
    try {
        const uploadedUrls: string[] = [];
  
        for (const file of files) {
            const uploadedUrl = await uploadImage(file);
            if (uploadedUrl) {
                uploadedUrls.push(uploadedUrl);
            }
        }
  
        return uploadedUrls;
    } catch (error) {
        console.error('Erro ao fazer upload de imagens', error);
        return [];
    } 
  };
  
  return (
    <ProdutoFormContext.Provider value={{ produto: formData, setField, validate, getRule, images, setProduct, setImages, handleConfirm, errors }}>
      {children}
    </ProdutoFormContext.Provider>
  );
};
