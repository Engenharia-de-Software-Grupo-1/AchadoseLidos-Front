import { createContext, useContext, ReactNode, useState } from 'react';
import { Produto } from '@domains/Produto/Produto';
import { useForm } from '@hooks/useForm';
import { createProduct, getById, updateProduct } from '@routes/routesProduto';
import { set } from 'cypress/types/lodash';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '@services/cloudinaryService';

interface ProdutoFormContextType {
  produto: Produto;
  setField: (field: string, value: any) => void;
  validate: (stepIndex: number) => boolean;
  getRule: (field: string) => {};
  images: { url: string }[] | undefined;
  setProduct: (id: any) => void;
  setImages: (images: { url: string }[]) => void;
  handleConfirm: (isRegister: boolean, id: any) => void;
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
  
  const { formData, setField, validate, setFormData, showNotification, getRule } = useForm<Produto>({
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
    nomeProduto: [{ rule: 'required' }],
    preco: [{ rule: 'required' }],
    categoria: [{ rule: 'required' }],
    estoque: [{ rule: 'required' }],
    estado: [{ rule: 'required' }],
  }
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
    <ProdutoFormContext.Provider value={{ produto: formData, setField, validate, getRule, images, setProduct, setImages, handleConfirm}}>
      {children}
    </ProdutoFormContext.Provider>
  );
};
